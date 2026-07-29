import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if configuration is valid/populated
const isConfigValid = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "AIzaSyA1B2C3D4E5F6G7H8I9J0K_L_M_N_O" &&
  !firebaseConfig.apiKey.startsWith("YOUR_");

if (typeof window !== "undefined" && !isConfigValid) {
  console.warn(
    "⚠️ Sabka Saathi Digital: Firebase is using placeholder keys. " +
    "Please populate your .env.local file with valid Firebase project credentials to enable database connectivity and auth panel features."
  );
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics: Analytics | null = null;

// Only initialize Analytics if key is valid/configured and running in browser
if (typeof window !== "undefined" && isConfigValid) {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((err) => {
      console.warn("Analytics initialization skipped:", err);
    });
}

export { app, auth, db, storage, analytics, isConfigValid };
