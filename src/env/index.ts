import { getEnvSafely } from "./config";

// Next Auth
const GITHUB_CLIENT_ID = getEnvSafely("GITHUB_CLIENT_ID");
const GITHUB_CLIENT_SECRET = getEnvSafely("GITHUB_CLIENT_SECRET");
const STRIPE_API_KEY = getEnvSafely("STRIPE_API_KEY");

const env = {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  STRIPE_API_KEY,
};

export default env;
