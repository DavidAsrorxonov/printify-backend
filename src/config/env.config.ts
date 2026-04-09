import { getEnv } from "../utils/get-env";

export const env = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "3001"),
  BASE_URL: getEnv("BASE_URL"),
  MONGO_URI: getEnv("MONGO_URI"),
  BETTER_AUTH_URL: getEnv("BETTER_AUTH_URL"),
  BETTER_AUTH_SECRET: getEnv("BETTER_AUTH_SECRET"),
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
};
