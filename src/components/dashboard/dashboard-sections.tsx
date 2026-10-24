import {
  Activity,
  AlertTriangle,
  CalendarClock,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  PackageCheck,
  Pill,
  ReceiptText,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  formatInvoiceDueDate,
  formatNepalIsoDate,
  formatNpr,
  formatTaskDueDate,
  getNepalDateOffsetIso,
  type ActivityRecord,
  type AppointmentRecord,
  type AppointmentStatus,
  type DashboardOverviewData,
  type ExpiringMedicine,
  type InventoryItem,
  type InvoiceRecord,
  type TaskRecord,
} from "@/lib/dashboard-data";

interface SectionTitleProps {
  title: string;
  eyebrow?: string;
  href?: string;
  linkLabel?: string;
}

function SectionTitle({ title, eyebrow, href, linkLabel }: SectionTitleProps) {
  return (
    <div className="dashboard-section-title">
      <div>
        {eyebrow ? <p className="dashboard-section-eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {href && linkLabel ? <Link className="dashboard-section-link" href={href}>{linkLabel}<span aria-hidden="true">→</span></Link> : null}
    </div>
  );
}

const appointmentStatus: Record<AppointmentStatus, { label: string; variant: "default" | "success" | "warning" | "muted" }> = {
  scheduled: { label: "Scheduled", variant: "muted" },
  checked_in: { label: "Checked in", variant: "success" },
  in_progress: { label: "In progress", variant: "default" },
  completed: { label: "Completed", variant: "muted" },
  cancelled: { label: "Cancelled", variant: "muted" },
};

function AppointmentRow({ appointment }: { appointment: AppointmentRecord }) {
  const status = appointmentStatus[appointment.status];
  return (
    <tr>
      <td className="dashboard-time">{appointment.time}</td>
      <td className="dashboard-patient-cell"><strong>{appointment.patientName}</strong><span>{appointment.species}</span></td>
      <td className="dashboard-owner-cell">{appointment.ownerName}</td>
      <td className="dashboard-reason-cell">{appointment.reason}</td>
      <td className="dashboard-vet-cell">{appointment.veterinarian}</td>
      <td><Badge variant={status.variant}>{status.label}</Badge></td>
    </tr>
  );
}

export function AppointmentsSection({ data }: { data: DashboardOverviewData }) {
  return (
    <section className="dashboard-panel appointments-panel" aria-labelledby="appointments-heading">
      <SectionTitle title="Today's appointments" eyebrow="Clinic schedule" href="/appointments" linkLabel="View all" />
      <p className="panel-summary">{data.completedAppointmentCount} completed <span aria-hidden="true">·</span> {data.remainingAppointmentCount} remaining</p>
      {data.appointments.length > 0 ? (
        <div className="dashboard-table-scroll" role="region" aria-label="Today's appointments table" tabIndex={0}>
          <table className="dashboard-table appointment-table">
            <caption className="sr-only">Today&apos;s fictional appointments at Northside Veterinary Clinic</caption>
            <thead><tr><th scope="col">Time</th><th scope="col">Patient</th><th scope="col">Owner</th><th scope="col">Visit</th><th scope="col">Veterinarian</th><th scope="col">Status</th></tr></thead>
            <tbody>{data.appointments.map((appointment) => <AppointmentRow key={appointment.id} appointment={appointment} />)}</tbody>
          </table>
        </div>
      ) : (
        <div className="dashboard-inline-empty"><CalendarDays aria-hidden="true" /><p>No appointments today. The schedule is clear.</p></div>
      )}
    </section>
  );
}

function TaskItem({ task, referenceDate }: { task: TaskRecord; referenceDate: Date }) {
  const overdue = task.dueOffsetDays < 0;
  const statusLabel = task.status === "in_progress" ? "In progress" : "Open";
  const statusClass = task.status === "in_progress" ? "task-state task-state-active" : "task-state";
  const priorityLabel = task.priority === "high" ? "High priority" : task.priority === "low" ? "Low priority" : "Standard priority";
  return (
    <li className={`dashboard-task${overdue ? " is-overdue" : ""}`}>
      <span className={`task-status-mark${overdue ? " is-overdue" : ""}`} aria-hidden="true">{overdue ? <AlertTriangle /> : task.status === "in_progress" ? <Clock3 /> : <Check />}</span>
      <div className="task-copy">
        <p className="task-title">{task.title}</p>
        <div className="task-meta"><span><UserRound aria-hidden="true" />{task.assignee}</span><span className={`task-priority priority-${task.priority}`}>{priorityLabel}</span><span className={overdue ? "task-due is-overdue" : "task-due"}><Clock3 aria-hidden="true" />{formatTaskDueDate(task.dueOffsetDays, task.dueTime, referenceDate)}</span></div>
      </div>
      <span className={statusClass}>{overdue ? "Overdue" : statusLabel}</span>
    </li>
  );
}

export function TasksSection({ data, referenceDate }: { data: DashboardOverviewData; referenceDate: Date }) {
  return (
    <section className="dashboard-panel tasks-panel" aria-labelledby="tasks-heading">
      <SectionTitle title="Needs attention" eyebrow="Open tasks" href="/tasks" linkLabel="View tasks" />
      <p className="panel-summary">{data.overdueTaskCount > 0 ? <><span className="overdue-summary">{data.overdueTaskCount} overdue</span><span aria-hidden="true"> · </span></> : null}{data.openTaskCount} open across the team</p>
      {data.tasks.length > 0 ? <ul className="dashboard-task-list">{data.tasks.map((task) => <TaskItem key={task.id} task={task} referenceDate={referenceDate} />)}</ul> : <div className="dashboard-inline-empty"><Check aria-hidden="true" /><p>No open tasks. The team is up to date.</p></div>}
    </section>
  );
}

function LowStockItem({ item }: { item: InventoryItem }) {
  const reorderQuantity = item.minimumStock - item.currentStock;
  return (
    <li className="inventory-alert-row">
      <span className="inventory-item-icon" aria-hidden="true"><PackageCheck /></span>
      <span className="inventory-item-copy"><strong>{item.name}</strong><small>{item.currentStock} {item.unit} on hand <span aria-hidden="true">·</span> minimum {item.minimumStock}</small></span>
      <span className="inventory-attention"><strong>Restock</strong><small>{reorderQuantity} {item.unit}</small></span>
    </li>
  );
}

function ExpiryItem({ medicine, referenceDate }: { medicine: ExpiringMedicine; referenceDate: Date }) {
  const expiryIso = formatNepalIsoDate(getNepalDateOffsetIso(referenceDate, medicine.expiresInDays), { day: "numeric", month: "short", year: "numeric" });
  return (
    <li className={`inventory-alert-row${medicine.expiresInDays <= 7 ? " expiry-soon" : ""}`}>
      <span className="inventory-item-icon is-medicine" aria-hidden="true"><Pill /></span>
      <span className="inventory-item-copy"><strong>{medicine.name}</strong><small>Batch {medicine.batch} <span aria-hidden="true">·</span> expires {expiryIso}</small></span>
      <span className="inventory-attention"><strong>{medicine.expiresInDays} days</strong><small>remaining</small></span>
    </li>
  );
}

export function InventorySection({ data, referenceDate }: { data: DashboardOverviewData; referenceDate: Date }) {
  return (
    <section className="dashboard-panel inventory-panel" aria-labelledby="inventory-heading">
      <SectionTitle title="Inventory attention" eyebrow="Stock & expiry" href="/inventory" linkLabel="Open inventory" />
      <div className="inventory-subsection">
        <h3><PackageCheck aria-hidden="true" />Low stock <span>{data.lowStockItems.length}</span></h3>
        {data.lowStockItems.length > 0 ? <ul className="inventory-alert-list">{data.lowStockItems.map((item) => <LowStockItem key={item.id} item={item} />)}</ul> : <p className="inventory-clear">All monitored items are above minimum stock.</p>}
      </div>
      <div className="inventory-subsection">
        <h3><CalendarClock aria-hidden="true" />Nearing expiry <span>{data.expiringMedicines.length}</span></h3>
        {data.expiringMedicines.length > 0 ? <ul className="inventory-alert-list">{data.expiringMedicines.map((medicine) => <ExpiryItem key={medicine.id} medicine={medicine} referenceDate={referenceDate} />)}</ul> : <p className="inventory-clear">No medicines are nearing expiry.</p>}
      </div>
    </section>
  );
}

function InvoiceRow({ invoice, referenceDate }: { invoice: InvoiceRecord; referenceDate: Date }) {
  const overdue = invoice.dueOffsetDays < 0;
  return (
    <tr>
      <td><strong className="invoice-id">{invoice.id}</strong><span className="invoice-customer">{invoice.customerName}</span></td>
      <td className="invoice-amount">{formatNpr(invoice.outstandingNpr)}</td>
      <td><span className={overdue ? "invoice-due is-overdue" : "invoice-due"}>{formatInvoiceDueDate(invoice.dueOffsetDays, referenceDate)}</span></td>
    </tr>
  );
}

export function FinancialSection({ data, referenceDate }: { data: DashboardOverviewData; referenceDate: Date }) {
  return (
    <section className="dashboard-panel financial-panel" aria-labelledby="financial-heading">
      <SectionTitle title="Outstanding invoices" eyebrow="Financial attention" href="/billing" linkLabel="View billing" />
      <div className="financial-total"><span>Total outstanding</span><strong>{formatNpr(data.outstandingDuesNpr)}</strong><small>{data.invoices.length} invoices with an unpaid balance</small></div>
      {data.invoices.length > 0 ? (
        <div className="dashboard-table-scroll invoice-table-scroll">
          <table className="dashboard-table invoice-table">
            <caption className="sr-only">Fictional outstanding invoices for the demo clinic</caption>
            <thead><tr><th scope="col">Invoice & customer</th><th scope="col">Balance</th><th scope="col">Due</th></tr></thead>
            <tbody>{data.invoices.map((invoice) => <InvoiceRow key={invoice.id} invoice={invoice} referenceDate={referenceDate} />)}</tbody>
          </table>
        </div>
      ) : <div className="dashboard-inline-empty"><CreditCard aria-hidden="true" /><p>No outstanding invoices.</p></div>}
    </section>
  );
}

const activityIcon = {
  payment: CreditCard,
  appointment: CalendarDays,
  invoice: ReceiptText,
  task: Activity,
};

function ActivityItem({ activity }: { activity: ActivityRecord }) {
  const Icon = activityIcon[activity.kind];
  return (
    <li className="activity-item">
      <span className="activity-icon" aria-hidden="true"><Icon /></span>
      <span className="activity-copy"><strong>{activity.description}{activity.amountNpr ? <span className="activity-amount">{formatNpr(activity.amountNpr)}</span> : null}</strong><small>{activity.detail}</small></span>
      <time className="activity-time">{activity.time}</time>
    </li>
  );
}

export function RecentActivitySection({ activities }: { activities: readonly ActivityRecord[] }) {
  return (
    <section className="dashboard-panel activity-panel" aria-labelledby="activity-heading">
      <SectionTitle title="Recent activity" eyebrow="Earlier today" />
      {activities.length > 0 ? <ul className="activity-list">{activities.map((activity) => <ActivityItem key={activity.id} activity={activity} />)}</ul> : <div className="dashboard-inline-empty"><Activity aria-hidden="true" /><p>No recent clinic activity.</p></div>}
    </section>
  );
}
