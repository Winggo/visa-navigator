import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "./admin";
import { Case } from "../schemas/case";

const CASES_COLLECTION = "cases";

export async function createCase(caseData: Omit<Case, "createdAt" | "updatedAt">): Promise<void> {
  const db = getAdminDb();
  await db.collection(CASES_COLLECTION).doc(caseData.id).set({
    ...caseData,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function getCase(caseId: string): Promise<Case | null> {
  const db = getAdminDb();
  const caseSnap = await db.collection(CASES_COLLECTION).doc(caseId).get();

  if (!caseSnap.exists) {
    return null;
  }

  const data = caseSnap.data()!;
  return {
    ...data,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(),
  } as Case;
}

export async function updateCase(
  caseId: string,
  updates: Partial<Omit<Case, "id" | "createdAt" | "updatedAt">>
): Promise<void> {
  const db = getAdminDb();
  await db.collection(CASES_COLLECTION).doc(caseId).update({
    ...updates,
    updatedAt: FieldValue.serverTimestamp(),
  });
}
