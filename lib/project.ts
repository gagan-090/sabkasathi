import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type ProjectType = "desktop" | "mobile";

export interface Project {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  type: ProjectType;
  accentColor: string; // used by mobile phone card
  year: string; // used by desktop browser card
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const COLLECTION = "projects";

/**
 * ADMIN ONLY. Returns every project regardless of `active` status.
 * Requires the caller to be signed in via Firebase Auth as one of the
 * admin emails in firestore.rules — this is NOT safe to call from public
 * pages, the rule will reject it for anonymous users.
 */
export async function fetchAllProjects(): Promise<Project[]> {
  const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, "id">) }));
}

/**
 * PUBLIC. Returns active projects of a given type, ordered for display.
 * The where("active","==",true) clause is required here — Firestore's list
 * rule (`resource.data.active == true`) can only be satisfied if the query
 * itself is constrained this way; it can't be filtered client-side after
 * the fact for unauthenticated reads.
 */
export async function fetchProjectsByType(type: ProjectType): Promise<Project[]> {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("type", "==", type),
      where("active", "==", true),
      orderBy("order", "asc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, "id">) }));
  } catch (err) {
    console.warn("Composite index query failed for fetchProjectsByType, attempting fallback query:", err);
    try {
      const fallbackQuery = query(
        collection(db, COLLECTION),
        where("active", "==", true)
      );
      const snap = await getDocs(fallbackQuery);
      const items = snap.docs
        .map((d) => ({ id: d.id, ...(d.data() as Omit<Project, "id">) }))
        .filter((p) => p.type === type)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      return items;
    } catch (fallbackErr) {
      console.error("Fallback query also failed in fetchProjectsByType:", fallbackErr);
      return [];
    }
  }
}

/**
 * Works for both admin and public callers — "get" (single doc) rules are
 * evaluated against the actual document data directly, so no query-shape
 * constraint applies here the way it does for "list".
 */
export async function fetchProjectById(id: string): Promise<Project | null> {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<Project, "id">) };
}

export async function createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function updateProject(id: string, data: Partial<Project>) {
  const ref = doc(db, COLLECTION, id);
  return updateDoc(ref, { ...data, updatedAt: new Date().toISOString() });
}

export async function deleteProject(id: string) {
  const ref = doc(db, COLLECTION, id);
  return deleteDoc(ref);
}