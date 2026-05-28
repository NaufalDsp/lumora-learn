import type { ReactNode } from "react";
import { DashboardShell } from "@/src/components/dashboard/DashboardShell";

export default function InstructorLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell role="instructor" title="Instructor Dashboard">
      {children}
    </DashboardShell>
  );
}
