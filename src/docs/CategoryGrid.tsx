import * as React from "react";

import { Card, CardHeader, CardTitle, CardDescription } from "../components/patterns/card";

export type CategoryGridItem = {
  /** Storybook doc entry id, e.g. "atoms-button--docs" (see index.json). */
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean | "true" | "false" }>;
};

export function CategoryGrid({ items }: { items: CategoryGridItem[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1rem",
        margin: "1.5rem 0",
      }}
    >
      {items.map(({ id, name, description, icon: Icon }) => (
        // MDX docs render inside the Storybook preview iframe: an href relative to
        // "?path=…" would navigate that iframe, not the manager UI. An absolute
        // path + target="_top" breaks out to the top-level Storybook window.
        <a
          key={id}
          href={`/?path=/docs/${id}`}
          target="_top"
          className="t40-doc-card-link"
          style={{ textDecoration: "none", color: "inherit", display: "block" }}
        >
          <Card className="t40-doc-card" style={{ height: "100%", transition: "border-color 0.15s ease" }}>
            <CardHeader>
              <Icon size={22} aria-hidden="true" />
              <CardTitle style={{ fontSize: "1rem", marginTop: "0.5rem" }}>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        </a>
      ))}
      <style>{`
        .t40-doc-card-link:hover .t40-doc-card,
        .t40-doc-card-link:focus-visible .t40-doc-card {
          border-color: var(--primary);
        }
      `}</style>
    </div>
  );
}
