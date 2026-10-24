import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { getDashboardOverviewData } from "@/lib/dashboard-data";
import { connection } from "next/server";

export default async function DashboardPage() {
  await connection();
  const referenceDate = new Date();
  const data = getDashboardOverviewData(referenceDate);
  return <DashboardOverview data={data} referenceDate={referenceDate} />;
}
