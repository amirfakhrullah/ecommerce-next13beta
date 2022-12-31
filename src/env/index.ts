import { getEnvSafely } from "./config";

// Next Auth
const GITHUB_CLIENT_ID = getEnvSafely("GITHUB_CLIENT_ID");
const GITHUB_CLIENT_SECRET = getEnvSafely("GITHUB_CLIENT_SECRET");

const env = {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
};

export default env;
