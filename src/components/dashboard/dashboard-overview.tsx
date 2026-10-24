import { CalendarDays, CheckSquare2, CircleDollarSign, CreditCard, PawPrint, Plus, ReceiptText } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/app/page-content";
import { Button } from "@/components/ui/button";
import { formatNpr, type DashboardOverviewData } from "@/lib/dashboard-data";
import {
  AppointmentsSection,
  FinancialSection,
  InventorySection,
  RecentActivitySection,
  TasksSection,
} from "./dashboard-sections";

interface KpiSummary {
  label: string;
  value: string;
  detail: string;
  href: string;
  icon: typeof CalendarDays;
  attention?: boolean;
}

function KpiItem({ item }: { item: KpiSummary }) {
  const Icon = item.icon;
  return (
    <Link className={`dashboard-kpi${item.attention ? " is-attention" : ""}`} href={item.href} aria-label={`${item.label}: ${item.value}. ${item.detail}`}>
      <div className="kpi-topline"><span className="kpi-label">{item.label}</span><span className="kpi-icon" aria-hidden="true"><Icon /></span></div>
      <strong className="kpi-value">{item.value}</strong>
      <span className="kpi-detail">{item.detail}</span>
    </Link>
  );
}

export function DashboardOverview({ data, referenceDate }: { data: DashboardOverviewData; referenceDate: Date }) {
  const summary: KpiSummary[] = [
    {
      label: "Today's appointments",
      value: String(data.appointmentCount),
      detail: `${data.completedAppointmentCount} completed · ${data.remainingAppointmentCount} remaining`,
      href: "/appointments",
      icon: CalendarDays,
    },
    {
      label: "Revenue today",
      value: formatNpr(data.revenueTodayNpr),
      detail: `${data.paymentCount} payments recorded`,
      href: "/billing",
      icon: CircleDollarSign,
    },
    {
      label: "Outstanding dues",
      value: formatNpr(data.outstandingDuesNpr),
      detail: `${data.invoices.length} invoices with unpaid balances`,
      href: "/billing",
      icon: CreditCard,
    },
    {
      label: "Open tasks",
      value: String(data.openTaskCount),
      detail: `${data.overdueTaskCount} overdue · needs follow-up`,
      href: "/tasks",
      icon: CheckSquare2,
      attention: data.overdueTaskCount > 0,
    },
  ];

  return (
    <>
      <PageHeader
        className="dashboard-page-header"
        title="Overview"
        description="Operational summary for Northside Veterinary Clinic."
        actions={(
          <div className="dashboard-header-actions">
            <div className="dashboard-date-block">
              <time dateTime={data.dateIso}>{data.dateLabel}</time>
              <span>Nepal time <span aria-hidden="true">·</span> Fictional demo data</span>
            </div>
            <div className="dashboard-primary-actions" aria-label="Common clinic actions">
              <Button asChild size="sm"><Link href="/appointments"><Plus aria-hidden="true" />New appointment</Link></Button>
              <Button asChild variant="outline" size="sm"><Link href="/billing"><ReceiptText aria-hidden="true" />Create invoice</Link></Button>
              <Button asChild variant="outline" size="sm"><Link href="/patients"><PawPrint aria-hidden="true" />Add patient</Link></Button>
            </div>
          </div>
        )}
      />

      <section className="dashboard-kpi-grid" aria-label="Today's clinic summary">
        {summary.map((item) => <KpiItem key={item.label} item={item} />)}
      </section>

      <div className="dashboard-overview-grid">
        <AppointmentsSection data={data} />
        <TasksSection data={data} referenceDate={referenceDate} />
      </div>

      <div className="dashboard-lower-grid">
        <InventorySection data={data} referenceDate={referenceDate} />
        <FinancialSection data={data} referenceDate={referenceDate} />
      </div>

      <RecentActivitySection activities={data.recentActivity} />
    </>
  );
}
