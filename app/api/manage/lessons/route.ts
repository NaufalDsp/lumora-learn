import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { lessons } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { created, ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

export async function GET(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor", "student"])) return unauthorized();
  const moduleId = Number(new URL(request.url).searchParams.get("moduleId"));
  return ok(await db.select().from(lessons).where(eq(lessons.moduleId, moduleId)));
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const body = await readJsonBody<{ moduleId: number; title: string; content: string; videoUrl: string; duration: number; sortOrder: number }>(request);
  const [lesson] = await db
    .insert(lessons)
    .values({
      moduleId: Number(body.moduleId),
      title: String(body.title ?? ""),
      content: body.content ? String(body.content) : null,
      videoUrl: body.videoUrl ? String(body.videoUrl) : null,
      duration: Number(body.duration ?? 0),
      sortOrder: Number(body.sortOrder ?? 0)
    })
    .returning();
  return created(lesson);
}
