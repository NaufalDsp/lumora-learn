import { PublicShell } from "@/src/components/public/PublicShell";
import { CourseCatalogPage } from "@/src/features/public/CourseCatalogPage";
import { getPublicCourseCards } from "@/src/server/queries/ui-queries";

export default async function CoursesPage() {
  const courses = await getPublicCourseCards();
  return (
    <PublicShell>
      <CourseCatalogPage courses={courses} />
    </PublicShell>
  );
}
