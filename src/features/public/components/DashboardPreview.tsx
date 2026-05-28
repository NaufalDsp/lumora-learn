import { CirclePlay } from "lucide-react";
import { featuredCourses } from "@/src/domain/course/mock-courses";

export function DashboardPreview() {
  return (
    <aside className="dashboard-preview" aria-label="Preview dashboard Lumora Learn">
      <div className="dashboard-preview__chrome">
        <span />
        <span />
        <span />
      </div>
      <div className="dashboard-preview__video">
        <CirclePlay size={58} />
        <strong>Learning Room</strong>
      </div>
      <div className="dashboard-preview__stack">
        {featuredCourses.map((course, index) => (
          <div className="mini-course" key={course.slug}>
            <div className={`mini-course__thumb mini-course__thumb--${course.accent}`} />
            <div>
              <strong>{course.title}</strong>
              <div className="progress">
                <span style={{ width: `${72 - index * 18}%` }} />
              </div>
            </div>
            <small>{72 - index * 18}%</small>
          </div>
        ))}
      </div>
    </aside>
  );
}
