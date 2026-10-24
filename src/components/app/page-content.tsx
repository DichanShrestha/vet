import type { ReactNode } from "react";
import { ClipboardList } from "lucide-react";

export interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <header className={`app-page-header${className ? ` ${className}` : ""}`}>
      <div>
        <p className="page-eyebrow">Clinic workspace</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </header>
  );
}

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <section className="app-empty-state" aria-labelledby="empty-state-title">
      <span className="empty-state-icon" aria-hidden="true">{icon ?? <ClipboardList />}</span>
      <h2 id="empty-state-title">{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export interface PlaceholderPageProps {
  title: string;
  description: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function PlaceholderPage({ title, description, emptyTitle = `${title} will live here`, emptyDescription = "This workspace is ready for the next product step. No clinic data is connected in this preview." }: PlaceholderPageProps) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <div className="app-page-content">
      <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    </>
  );
}
