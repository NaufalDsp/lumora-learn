type Role = "admin" | "instructor" | "student";

export function hasRole(userRole: string | undefined, allowed: Role[]) {
  return allowed.includes(userRole as Role);
}
