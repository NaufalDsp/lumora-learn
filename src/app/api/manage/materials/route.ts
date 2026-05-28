import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { materials } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { created, ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

export async function GET(request: Request) {
  const session = await getCurrentSession();
  if (!session) return unauthorized();
  const lessonId = Number(new URL(request.url).searchParams.get("lessonId"));
  return ok(await db.select().from(materials).where(eq(materials.lessonId, lessonId)));
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const body = await readJsonBody<{ lessonId: number; fileName: string; fileUrl: string; fileType: string; fileSize: number }>(request);
  const [material] = await db
    .insert(materials)
    .values({
      lessonId: Number(body.lessonId),
      fileName: String(body.fileName ?? ""),
      fileUrl: String(body.fileUrl ?? ""),
      fileType: String(body.fileType ?? ""),
      fileSize: Number(body.fileSize ?? 0)
    })
    .returning();
  return created(material);
}
