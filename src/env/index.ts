import { getEnvSafely } from "./config";

/**
 * For server-used only
 */
// Next Auth
const GITHUB_CLIENT_ID = getEnvSafely("GITHUB_CLIENT_ID");
const GITHUB_CLIENT_SECRET = getEnvSafely("GITHUB_CLIENT_SECRET");
const STRIPE_API_KEY = getEnvSafely("STRIPE_API_KEY");
const STRIPE_WEBHOOK_SECRET = getEnvSafely("STRIPE_WEBHOOK_SECRET");

const env = {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  STRIPE_API_KEY,
  STRIPE_WEBHOOK_SECRET,
};

export default env;
