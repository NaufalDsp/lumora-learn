import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { materials } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const body = await readJsonBody<{ fileName: string; fileUrl: string; fileType: string; fileSize: number }>(request);
  const [material] = await db
    .update(materials)
    .set({
      ...(body.fileName ? { fileName: String(body.fileName) } : {}),
      ...(body.fileUrl ? { fileUrl: String(body.fileUrl) } : {}),
      ...(body.fileType ? { fileType: String(body.fileType) } : {}),
      ...(body.fileSize !== undefined ? { fileSize: Number(body.fileSize) } : {})
    })
    .where(eq(materials.id, Number(id)))
    .returning();
  return ok(material);
}

export async function DELETE(_: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const [material] = await db.delete(materials).where(eq(materials.id, Number(id))).returning();
  return ok(material);
}
