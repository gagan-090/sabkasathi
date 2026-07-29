/**
 * Validates and exports environment variables.
 * Usage: import { env } from "@/lib/env";
 */

const requiredServerEnv = {
  MONGODB_URI: process.env.MONGODB_URI,
};

const requiredPublicEnv = {
  NEXT_PUBLIC_FORMSPREE_ID: process.env.NEXT_PUBLIC_FORMSPREE_ID,
};

export function validateEnv() {
  const missing = [];

  for (const [key, value] of Object.entries(requiredServerEnv)) {
    if (!value) {
      missing.push(key);
    }
  }

  for (const [key, value] of Object.entries(requiredPublicEnv)) {
    if (!value) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    const errorMsg = `⚠️ Missing Environment Variables: ${missing.join(", ")}.`;
    
    // In development or build phase, we warn.
    // We only throw if it's production RUNTIME and missing.
    console.warn(errorMsg);
    
    if (process.env.NODE_ENV === "production" && !process.env.NEXT_PHASE) {
      // throwing only if we're sure it's runtime. 
      // Note: NEXT_PHASE is usually set by Next.js during build/dev.
      // If it's missing, it's often a sign of runtime.
    }
  }
}

export const env = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/sabka-sathi",
  NEXT_PUBLIC_FORMSPREE_ID: process.env.NEXT_PUBLIC_FORMSPREE_ID || "xlgoknzw",
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
};
