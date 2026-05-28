export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type CurriculumLesson = {
  title: string;
  duration: string;
  isPreview: boolean;
};

export type Course = {
  slug: string;
  title: string;
  category: string;
  level: CourseLevel;
  instructor: string;
  lessonsCount: number;
  duration: string;
  rating: number;
  students: string;
  accent: "violet" | "cyan" | "green";
  summary: string;
  description: string;
  outcomes: string[];
  curriculum: CurriculumLesson[];
};
