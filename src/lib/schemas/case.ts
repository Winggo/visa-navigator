export interface QuestionnaireResponses {
  jobTitle: string | null;
  compensation: string | null;
  roleDescription: string | null;
  hasAwards: boolean | null;
  awardsDescription: string | null;
  professionalActivities: string[];
  hasMemberships: boolean | null;
  membershipsDescription: string | null;
  yearsExperience: number | null;
  hasMediaCoverage: boolean | null;
  mediaCoverageDescription: string | null;
  employerType: string | null;
  measurableImpact: string | null;
}

export interface CriteriaRecommendation {
  criteriaId: string;
  score: number;
  reasoning: string;
}

export type CaseStatus =
  | "questionnaire_in_progress"
  | "questionnaire_complete"
  | "evidence_in_progress"
  | "submitted";

export interface EvidenceData {
  [fieldId: string]: string | string[] | null;
}

export interface Case {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: CaseStatus;
  resumeToken: string;

  // Questionnaire
  questionnaireResponses: QuestionnaireResponses;
  currentQuestionIndex: number;

  // AI recommendations (populated after questionnaire)
  recommendedCriteria: CriteriaRecommendation[];

  // Evidence (keyed by criteriaId)
  evidenceData: Record<string, EvidenceData>;
  completedCriteria: string[];

  submittedAt: Date | null;
}

export function createEmptyQuestionnaireResponses(): QuestionnaireResponses {
  return {
    jobTitle: null,
    compensation: null,
    roleDescription: null,
    hasAwards: null,
    awardsDescription: null,
    professionalActivities: [],
    hasMemberships: null,
    membershipsDescription: null,
    yearsExperience: null,
    hasMediaCoverage: null,
    mediaCoverageDescription: null,
    employerType: null,
    measurableImpact: null,
  };
}

export function createEmptyCase(
  id: string,
  resumeToken: string
): Omit<Case, "createdAt" | "updatedAt"> {
  return {
    id,
    status: "questionnaire_in_progress",
    resumeToken,
    questionnaireResponses: createEmptyQuestionnaireResponses(),
    currentQuestionIndex: 0,
    recommendedCriteria: [],
    evidenceData: {},
    completedCriteria: [],
    submittedAt: null,
  };
}
