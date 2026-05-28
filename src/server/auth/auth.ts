import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/src/server/db/client";
import { schema } from "@/src/server/db/schema";

export const auth = betterAuth({
  appName: "Lumora Learn",
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET ?? "lumora-learn-development-secret-change-me",
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      ...schema,
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications
    }
  }),
  emailAndPassword: {
    enabled: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
        defaultValue: "student"
      },
      status: {
        type: "string",
        input: false,
        defaultValue: "active"
      }
    }
  }
});
