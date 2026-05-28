import { created, ok, unauthorized } from "@/src/server/http/responses";
import { getCurrentSession } from "@/src/server/auth/session";
import {
  createEnrollment,
  listStudentEnrollments
} from "@/src/server/repositories/learning-repository";

export async function GET() {
  const session = await getCurrentSession();

  if (!session) {
    return unauthorized();
  }

  const enrollments = await listStudentEnrollments(session.user.id);
  return ok(enrollments);
}

export async function POST(request: Request) {
  const session = await getCurrentSession();

  if (!session) {
    return unauthorized();
  }

  const body = await request.json();
  const enrollment = await createEnrollment(session.user.id, Number(body.courseId));

  return created(enrollment);
}
