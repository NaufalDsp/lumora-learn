import type { Metadata } from "next";
import { CourseDetailPage } from "@/src/features/public/CourseDetailPage";
import { getCourseBySlug } from "@/src/domain/course/mock-courses";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  return {
    title: course ? `${course.title} | Lumora Learn` : "Course | Lumora Learn"
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;

  return <CourseDetailPage slug={slug} />;
}
