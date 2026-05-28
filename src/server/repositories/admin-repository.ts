import { desc } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { activityLogs, categories, users } from "@/src/server/db/schema";

export async function listUsers() {
  return db.select().from(users).orderBy(desc(users.createdAt));
}

export async function listCategories() {
  return db.select().from(categories).orderBy(categories.name);
}

export async function listActivityLogs() {
  return db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(50);
}
