import { DataPanel } from "@/src/components/dashboard/DataPanel";
import { StatCard } from "@/src/components/dashboard/StatCard";
import { adminDashboard, instructorDashboard } from "@/src/domain/dashboard/mock-dashboard";

export function AdminDashboardPage() {
  return (
    <div className="dashboard-grid">
      {adminDashboard.stats.map((stat) => (
        <StatCard {...stat} key={stat.label} />
      ))}
      <DataPanel eyebrow="Reports" title="User growth">
        <div className="chart-bars">
          {[42, 58, 48, 76, 64, 88, 72, 96].map((height, index) => (
            <span style={{ height: `${height}%` }} key={index} />
          ))}
        </div>
      </DataPanel>
      <ActivityLogPage />
    </div>
  );
}

export function UserManagementPage() {
  return (
    <DataPanel eyebrow="User management" title="Kelola pengguna">
      <div className="stack-list">
        {adminDashboard.users.map((user) => (
          <div className="management-row" key={user.email}>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
            <b>{user.role}</b>
            <span>{user.status}</span>
            <button className="button button--secondary">Edit</button>
          </div>
        ))}
      </div>
    </DataPanel>
  );
}

export function AdminCourseManagementPage() {
  return (
    <DataPanel eyebrow="Course management" title="Moderasi kursus">
      <div className="stack-list">
        {instructorDashboard.courses.map((course) => (
          <div className="management-row" key={course.slug}>
            <div>
              <strong>{course.title}</strong>
              <span>{course.category}</span>
            </div>
            <b>{course.status}</b>
            <span>{course.studentsCount} siswa</span>
            <button className="button button--secondary">Review</button>
          </div>
        ))}
      </div>
    </DataPanel>
  );
}

export function CategoryManagementPage() {
  return (
    <DataPanel eyebrow="Category management" title="Kategori kursus">
      <div className="category-grid">
        {adminDashboard.categories.map((category) => (
          <div className="category-card" key={category}>
            <strong>{category}</strong>
            <span>Slug: {category.toLowerCase()}</span>
          </div>
        ))}
      </div>
    </DataPanel>
  );
}

export function ReportsPage() {
  return (
    <DataPanel eyebrow="Reports" title="Laporan pembelajaran">
      <div className="report-grid">
        {["Enrollment trend", "Completion rate", "Quiz performance", "Material downloads"].map((report) => (
          <div className="report-card" key={report}>
            <strong>{report}</strong>
            <div className="progress">
              <span style={{ width: "72%" }} />
            </div>
          </div>
        ))}
      </div>
    </DataPanel>
  );
}

export function ActivityLogPage() {
  return (
    <DataPanel eyebrow="Activity log" title="Aktivitas terbaru">
      <div className="stack-list">
        {adminDashboard.activities.map((activity) => (
          <div className="activity-row" key={activity}>
            <span />
            <p>{activity}</p>
          </div>
        ))}
      </div>
    </DataPanel>
  );
}

export function SystemSettingsPage() {
  return (
    <DataPanel eyebrow="System settings" title="Konfigurasi umum">
      <div className="form-stack">
        <label>
          Nama platform
          <input defaultValue="Lumora Learn" />
        </label>
        <label>
          Mode moderasi course
          <select defaultValue="enabled">
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </label>
        <button className="button button--primary">Simpan Settings</button>
      </div>
    </DataPanel>
  );
}
