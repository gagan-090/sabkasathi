import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit as fbLimit,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db } from "@/lib/firebase";
import { ProjectType } from "@/lib/project";

/**
 * RecentProject is a FULLY INDEPENDENT entity from Project. It lives in its
 * own Firestore collection ("recentProjects"), has its own id, and its own
 * lifecycle. Creating/editing/deleting a Project never touches a
 * RecentProject and vice-versa. If an admin wants a project to also show up
 * in the homepage "Recent Projects" carousel, they add a separate
 * RecentProject entry for it (optionally pre-filling the form from an
 * existing project as a starting point — see the "import" helper on the
 * add page — but after that the two records are unrelated).
 */
export interface RecentProject {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  type: ProjectType;
  accentColor: string;
  year: string;
  /** Left-to-right position within the Recent Projects carousel. */
  position: number;
  active: boolean;
  /**
   * Optional static showcase image (Firebase Storage download URL).
   * When present, the homepage card shows this image instead of a live
   * iframe preview of `url`.
   */
  imageUrl?: string;
  /** Storage path for the uploaded image, kept so we can clean it up later. */
  imagePath?: string;
  createdAt: string;
  updatedAt: string;
}

const COLLECTION = "recentProjects";
const STORAGE_FOLDER = "recent-projects";

/**
 * ADMIN ONLY. Returns every recent-project entry regardless of `active`
 * status, ordered by position.
 */
export async function fetchAllRecentProjects(): Promise<RecentProject[]> {
  const q = query(collection(db, COLLECTION), orderBy("position", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<RecentProject, "id">) }));
}

/**
 * PUBLIC. Returns active recent-project entries, ordered for display on the
 * homepage carousel. Fully independent of the `projects` collection.
 */
export async function fetchRecentProjects(count = 12): Promise<RecentProject[]> {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("active", "==", true),
      orderBy("position", "asc"),
      fbLimit(count)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<RecentProject, "id">) }));
  } catch (err) {
    console.warn("Composite index query failed for fetchRecentProjects, attempting fallback query:", err);
    try {
      const fallbackQuery = query(
        collection(db, COLLECTION),
        where("active", "==", true)
      );
      const snap = await getDocs(fallbackQuery);
      const items = snap.docs
        .map((d) => ({ id: d.id, ...(d.data() as Omit<RecentProject, "id">) }))
        .sort((a, b) => (a.position || 0) - (b.position || 0))
        .slice(0, count);
      return items;
    } catch (fallbackErr) {
      console.error("Fallback query also failed in fetchRecentProjects:", fallbackErr);
      return [];
    }
  }
}

export async function fetchRecentProjectById(id: string): Promise<RecentProject | null> {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<RecentProject, "id">) };
}

export async function createRecentProject(
  data: Omit<RecentProject, "id" | "createdAt" | "updatedAt">
) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function updateRecentProject(id: string, data: Partial<RecentProject>) {
  const ref = doc(db, COLLECTION, id);
  return updateDoc(ref, { ...data, updatedAt: new Date().toISOString() });
}

/** Permanently deletes the recent-project entry. Does NOT touch `projects`. */
export async function deleteRecentProject(id: string) {
  const ref = doc(db, COLLECTION, id);
  return deleteDoc(ref);
}

// ---------------------------------------------------------------------
// Image upload helpers (Firebase Storage)
// ---------------------------------------------------------------------

/**
 * Uploads a showcase image for a recent project and returns both the
 * public download URL and the storage path (so it can be deleted later).
 * Call this before create/update, then pass `imageUrl` + `imagePath`
 * into the Firestore document.
 */
export async function uploadRecentProjectImage(
  file: File
): Promise<{ imageUrl: string; imagePath: string }> {
  const storage = getStorage();
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const path = `${STORAGE_FOLDER}/${Date.now()}-${safeName}`;
  const ref = storageRef(storage, path);
  await uploadBytes(ref, file);
  const imageUrl = await getDownloadURL(ref);
  return { imageUrl, imagePath: path };
}

/** Deletes a previously uploaded showcase image from Storage, if any. */
export async function deleteRecentProjectImage(imagePath: string) {
  const storage = getStorage();
  const ref = storageRef(storage, imagePath);
  try {
    await deleteObject(ref);
  } catch (err) {
    // Non-fatal — the file may already be gone.
    console.warn("Failed to delete recent project image", err);
  }
}