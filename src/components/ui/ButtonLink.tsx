import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ children, className = "", variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link className={`button button--${variant} ${className}`} {...props}>
      {children}
    </Link>
  );
}
