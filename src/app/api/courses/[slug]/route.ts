import { getCourseDetailBySlug } from "@/src/server/repositories/course-repository";
import { notFound, ok } from "@/src/server/http/responses";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { slug } = await context.params;
  const course = await getCourseDetailBySlug(slug);

  if (!course) {
    return notFound("Course not found");
  }

  return ok(course);
}
