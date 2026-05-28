import { db } from "@/src/server/db/client";
import { categories } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { created, ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

export async function GET() {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin"])) return unauthorized();
  return ok(await db.select().from(categories));
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin"])) return unauthorized();
  const body = await readJsonBody<{ name: string; slug: string; description: string }>(request);
  const [category] = await db
    .insert(categories)
    .values({
      name: String(body.name ?? ""),
      slug: String(body.slug ?? ""),
      description: body.description ? String(body.description) : null
    })
    .returning();
  return created(category);
}
