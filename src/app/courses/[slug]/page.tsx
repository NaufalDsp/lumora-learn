import type { Metadata } from "next";
import { PublicShell } from "@/src/components/public/PublicShell";
import { CourseDetailPage } from "@/src/features/public/CourseDetailPage";
import { getCourseBySlug } from "@/src/domain/course/mock-courses";
import { getPublicCourseBySlug } from "@/src/server/queries/ui-queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = (await getPublicCourseBySlug(slug)) ?? getCourseBySlug(slug);

  return {
    title: course ? `${course.title} | Lumora Learn` : "Course | Lumora Learn"
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getPublicCourseBySlug(slug);

  return (
    <PublicShell>
      <CourseDetailPage course={course} slug={slug} />
    </PublicShell>
  );
}
