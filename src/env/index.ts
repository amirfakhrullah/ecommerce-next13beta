import { getEnvSafely } from "./config";

/**
 * For server-used only
 */
const GITHUB_CLIENT_ID = getEnvSafely("GITHUB_CLIENT_ID");
const GITHUB_CLIENT_SECRET = getEnvSafely("GITHUB_CLIENT_SECRET");
const TWITCH_CLIENT_ID = getEnvSafely("TWITCH_CLIENT_ID");
const TWITCH_CLIENT_SECRET = getEnvSafely("TWITCH_CLIENT_SECRET");

const STRIPE_API_KEY = getEnvSafely("STRIPE_API_KEY");
const STRIPE_WEBHOOK_SECRET = getEnvSafely("STRIPE_WEBHOOK_SECRET");
const CRON_API_KEY = getEnvSafely("CRON_API_KEY");

const env = {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET,
  STRIPE_API_KEY,
  STRIPE_WEBHOOK_SECRET,
  CRON_API_KEY,
};

export default env;
