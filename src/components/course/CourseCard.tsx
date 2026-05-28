import { BookOpen, ChevronRight, Star, UserRound } from "lucide-react";
import { ButtonLink } from "@/src/components/ui/ButtonLink";
import { Badge } from "@/src/components/ui/Badge";
import type { Course } from "@/src/domain/course/types";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="course-card">
      <div className={`course-card__visual course-card__visual--${course.accent}`}>
        <Badge>{course.category}</Badge>
        <BookOpen size={40} />
      </div>
      <div className="course-card__body">
        <div className="course-card__meta-row">
          <Badge>{course.level}</Badge>
          <span>{course.lessonsCount} lesson</span>
        </div>
        <h3>{course.title}</h3>
        <p>{course.summary}</p>
        <div className="course-card__meta">
          <span>
            <UserRound size={15} />
            {course.instructor}
          </span>
          <span>
            <Star size={15} />
            {course.rating}
          </span>
        </div>
        <ButtonLink href={`/courses/${course.slug}`} variant="secondary" className="button--full">
          Lihat Detail
          <ChevronRight size={17} />
        </ButtonLink>
      </div>
    </article>
  );
}
