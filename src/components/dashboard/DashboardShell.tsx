import Link from "next/link";
import type { ReactNode } from "react";
import {
  Bell,
  BookOpen,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Library,
  LineChart,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound
} from "lucide-react";
import { BrandLogo } from "@/src/components/ui/BrandLogo";

type DashboardShellProps = {
  role: "student" | "instructor" | "admin";
  title: string;
  children: ReactNode;
};

const navByRole = {
  student: [
    { label: "Dashboard", href: "/student", icon: LayoutDashboard },
    { label: "Katalog", href: "/student/courses", icon: Library },
    { label: "My Learning", href: "/student/my-learning", icon: BookOpen },
    { label: "Progress", href: "/student/progress", icon: LineChart },
    { label: "Profile", href: "/student/profile", icon: UserRound }
  ],
  instructor: [
    { label: "Dashboard", href: "/instructor", icon: LayoutDashboard },
    { label: "My Courses", href: "/instructor/courses", icon: BookOpen },
    { label: "Create Course", href: "/instructor/courses/create", icon: GraduationCap },
    { label: "Progress", href: "/instructor/students", icon: UsersRound },
    { label: "Materials", href: "/instructor/materials", icon: FileText }
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: UsersRound },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Categories", href: "/admin/categories", icon: Library },
    { label: "Reports", href: "/admin/reports", icon: LineChart },
    { label: "Settings", href: "/admin/settings", icon: Settings }
  ]
};

export function DashboardShell({ role, title, children }: DashboardShellProps) {
  const navItems = navByRole[role];

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <BrandLogo />
        <nav aria-label={`${role} navigation`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link className="dashboard-nav-item" href={item.href} key={item.href}>
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="dashboard-sidebar-card">
          <ShieldCheck size={18} />
          <strong>{role.toUpperCase()} AREA</strong>
          <p>Role-based UI siap disambungkan ke Better Auth session.</p>
        </div>
      </aside>
      <section className="dashboard-workspace">
        <header className="dashboard-topbar">
          <div>
            <span className="eyebrow">Lumora Learn</span>
            <h1>{title}</h1>
          </div>
          <label className="search-field dashboard-search">
            <Search size={18} />
            <input placeholder="Cari data..." />
          </label>
          <button className="icon-button" aria-label="Notifikasi">
            <Bell size={19} />
          </button>
        </header>
        <div className="dashboard-content">{children}</div>
      </section>
    </main>
  );
}
