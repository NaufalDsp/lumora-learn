import type { ReactNode } from "react";

type DataPanelProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function DataPanel({ title, eyebrow, children }: DataPanelProps) {
  return (
    <section className="data-panel">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {children}
    </section>
  );
}
