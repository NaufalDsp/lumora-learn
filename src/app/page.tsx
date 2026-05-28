import { PublicShell } from "@/src/components/public/PublicShell";
import { LandingPage } from "@/src/features/public/LandingPage";
import { getPublicCourseCards } from "@/src/server/queries/ui-queries";

export default async function Page() {
  const courses = await getPublicCourseCards();
  return (
    <PublicShell>
      <LandingPage courses={courses} />
    </PublicShell>
  );
}
