import { getEnvSafely } from "./config";

// Next Auth
export const GOOGLE_CLIENT_ID = getEnvSafely("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = getEnvSafely("GOOGLE_CLIENT_SECRET");
