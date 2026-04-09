import { getEnv } from "../utils/get-env";

export const env = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "3001"),
  BASE_URL: getEnv("BASE_URL"),
  MONGO_URI: getEnv("MONGO_URI"),
  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
};
