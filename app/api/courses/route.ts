import { created, ok, unauthorized } from "@/src/server/http/responses";
import { getCurrentSession } from "@/src/server/auth/session";
import { hasRole } from "@/src/server/services/access-control";
import { createCourse, listPublishedCourses } from "@/src/server/repositories/course-repository";

export async function GET() {
  const courses = await listPublishedCourses();
  return ok(courses);
}

export async function POST(request: Request) {
  const session = await getCurrentSession();

  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) {
    return unauthorized();
  }

  const body = await request.json();
  const course = await createCourse({
    instructorId: session.user.id,
    categoryId: Number(body.categoryId),
    title: String(body.title),
    slug: String(body.slug),
    description: String(body.description),
    level: body.level,
    status: body.status ?? "draft"
  });

  return created(course);
}
