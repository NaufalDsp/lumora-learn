import { listUsers } from "@/src/server/repositories/admin-repository";
import { ok, unauthorized } from "@/src/server/http/responses";
import { getCurrentSession } from "@/src/server/auth/session";
import { hasRole } from "@/src/server/services/access-control";

export async function GET() {
  const session = await getCurrentSession();

  if (!session || !hasRole(session.user.role, ["admin"])) {
    return unauthorized();
  }

  return ok(await listUsers());
}
