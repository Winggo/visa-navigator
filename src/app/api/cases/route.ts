import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { createCase } from "@/lib/firebase/firestore";
import { createEmptyCase } from "@/lib/schemas/case";

export async function POST(request: NextRequest) {
  try {
    const caseId = nanoid(10);
    const resumeToken = nanoid(20);

    const newCase = createEmptyCase(caseId, resumeToken);
    await createCase(newCase);

    return NextResponse.json({
      caseId,
      resumeToken,
      resumeUrl: `/questionnaire/${caseId}?token=${resumeToken}`,
    });
  } catch (error) {
    console.error("Failed to create case:", error);
    return NextResponse.json(
      { error: "Failed to create case" },
      { status: 500 }
    );
  }
}
