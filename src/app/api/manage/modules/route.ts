import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { modules } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { created, ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

export async function GET(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const courseId = Number(new URL(request.url).searchParams.get("courseId"));
  return ok(await db.select().from(modules).where(eq(modules.courseId, courseId)));
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const body = await readJsonBody<{ courseId: number; title: string; description: string; sortOrder: number }>(request);
  const [module] = await db
    .insert(modules)
    .values({
      courseId: Number(body.courseId),
      title: String(body.title ?? ""),
      description: body.description ? String(body.description) : null,
      sortOrder: Number(body.sortOrder ?? 0)
    })
    .returning();
  return created(module);
}
