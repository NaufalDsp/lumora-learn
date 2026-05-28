import { ok, unauthorized } from "@/src/server/http/responses";
import { getCurrentSession } from "@/src/server/auth/session";
import { listInstructorCourses } from "@/src/server/repositories/course-repository";
import { hasRole } from "@/src/server/services/access-control";

export async function GET() {
  const session = await getCurrentSession();

  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) {
    return unauthorized();
  }

  const courses = await listInstructorCourses(session.user.id);
  return ok(courses);
}
