import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { QuestionnaireResponses, CriteriaRecommendation } from "@/lib/schemas/case";
import { O1_CRITERIA } from "@/lib/schemas/criteria";
import { updateCase } from "@/lib/firebase/firestore";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert O-1 visa attorney assistant. Your task is to analyze an applicant's background and recommend the 3 strongest O-1 criteria they should focus on for their visa application.

The 8 O-1 criteria are:
1. awards - Receipt of nationally or internationally recognized prizes or awards for excellence
2. membership - Membership in associations that require outstanding achievements for membership
3. press - Published material about the applicant in professional or major media
4. judging - Participation as a judge of the work of others in the field
5. original_contributions - Original scientific, scholarly, or business-related contributions of major significance
6. scholarly_authorship - Authorship of scholarly articles in professional journals or major media
7. critical_employment - Employment in a critical or essential capacity at distinguished organizations
8. high_remuneration - Evidence of high salary or remuneration compared to others in the field

Based on the applicant's responses, select exactly 3 criteria where they have the strongest evidence potential. For each criterion, provide:
- criteriaId: the exact criterion ID from the list above
- score: a number from 0-100 representing how strong their case is for this criterion
- reasoning: a brief explanation of why this criterion is strong for them

Respond ONLY with valid JSON in this exact format:
{
  "recommendations": [
    { "criteriaId": "string", "score": number, "reasoning": "string" },
    { "criteriaId": "string", "score": number, "reasoning": "string" },
    { "criteriaId": "string", "score": number, "reasoning": "string" }
  ]
}`;

function buildUserPrompt(responses: QuestionnaireResponses): string {
  const parts: string[] = [];

  parts.push(`Applicant Background:`);
  parts.push(`- Job Title/Field: ${responses.jobTitle || "Not provided"}`);
  parts.push(`- Total Compensation: $${responses.compensation || "Not provided"}/year`);
  parts.push(`- Years of Experience: ${responses.yearsExperience || "Not provided"}`);
  parts.push(`- Role Description: ${responses.roleDescription || "Not provided"}`);
  parts.push(`- Measurable Impact: ${responses.measurableImpact || "Not provided"}`);
  parts.push(`- Employer Type: ${responses.employerType || "Not provided"}`);

  parts.push(`\nAwards and Recognition:`);
  if (responses.hasAwards) {
    parts.push(`- Has awards: Yes`);
    parts.push(`- Details: ${responses.awardsDescription || "Not provided"}`);
  } else {
    parts.push(`- Has awards: No`);
  }

  parts.push(`\nProfessional Activities:`);
  if (responses.professionalActivities.length > 0) {
    responses.professionalActivities.forEach((activity) => {
      parts.push(`- ${activity}`);
    });
  } else {
    parts.push(`- None selected`);
  }

  parts.push(`\nProfessional Memberships:`);
  if (responses.hasMemberships) {
    parts.push(`- Has memberships: Yes`);
    parts.push(`- Details: ${responses.membershipsDescription || "Not provided"}`);
  } else {
    parts.push(`- Has memberships: No`);
  }

  parts.push(`\nMedia Coverage:`);
  if (responses.hasMediaCoverage) {
    parts.push(`- Has media coverage: Yes`);
    parts.push(`- Details: ${responses.mediaCoverageDescription || "Not provided"}`);
  } else {
    parts.push(`- Has media coverage: No`);
  }

  parts.push(`\nBased on this background, recommend the 3 strongest O-1 criteria for this applicant.`);

  return parts.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const { caseId, responses } = (await request.json()) as {
      caseId: string;
      responses: QuestionnaireResponses;
    };

    if (!caseId || !responses) {
      return NextResponse.json(
        { error: "Missing caseId or responses" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(responses) },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0].message.content;
    if (!responseText) {
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(responseText);
    const recommendations: CriteriaRecommendation[] = parsed.recommendations;

    // Validate recommendations
    const validCriteriaIds = O1_CRITERIA.map((c) => c.id);
    const validatedRecommendations = recommendations
      .filter((r) => validCriteriaIds.includes(r.criteriaId))
      .slice(0, 3)
      .map((r) => ({
        criteriaId: r.criteriaId,
        score: Math.min(100, Math.max(0, Math.round(r.score))),
        reasoning: r.reasoning,
      }));

    if (validatedRecommendations.length !== 3) {
      throw new Error("Failed to get 3 valid recommendations");
    }

    // Update case with recommendations
    await updateCase(caseId, {
      recommendedCriteria: validatedRecommendations,
      status: "evidence_in_progress",
    });

    return NextResponse.json({
      recommendations: validatedRecommendations,
    });
  } catch (error) {
    console.error("Failed to get AI recommendations:", error);
    return NextResponse.json(
      { error: "Failed to process recommendations" },
      { status: 500 }
    );
  }
}
