import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import { env } from "../config/env.config";
import { hashVal, verifyVal } from "../utils/bcrypt";
import { openAPI, jwt } from "better-auth/plugins";

export const getAuth = () => {
  if (!mongoose.connection.db) {
    throw new Error("Database connection is not established");
  }

  return betterAuth({
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.FRONTEND_ORIGIN],
    database: mongodbAdapter(mongoose.connection.db, {
      client: mongoose.connection.getClient(),
    }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
      password: {
        hash: hashVal,
        verify: verifyVal,
      },
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
    advanced: {
      database: {
        generateId: false,
      },
      cookiePrefix: "printify",
      cookies: {
        session_token: {
          name: "printify_session_token",
        },
      },
    },
    plugins: [openAPI(), jwt()],
  });
};
