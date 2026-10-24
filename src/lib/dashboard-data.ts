const NEPAL_TIME_ZONE = "Asia/Kathmandu";

export type AppointmentStatus = "scheduled" | "checked_in" | "in_progress" | "completed" | "cancelled";
export type TaskStatus = "open" | "in_progress" | "done";
export type TaskPriority = "high" | "normal" | "low";

export interface AppointmentRecord {
  id: string;
  time: string;
  patientName: string;
  species: "Dog" | "Cat";
  ownerName: string;
  reason: string;
  veterinarian: string;
  status: AppointmentStatus;
}

export interface TaskRecord {
  id: string;
  title: string;
  assignee: string;
  dueOffsetDays: number;
  dueTime: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  minimumStock: number;
  unit: string;
}

export interface ExpiringMedicine {
  id: string;
  name: string;
  batch: string;
  expiresInDays: number;
}

export interface InvoiceRecord {
  id: string;
  customerName: string;
  outstandingNpr: number;
  dueOffsetDays: number;
}

export interface ActivityRecord {
  id: string;
  description: string;
  detail: string;
  time: string;
  kind: "payment" | "appointment" | "invoice" | "task";
  amountNpr?: number;
}

export interface DashboardOverviewData {
  dateIso: string;
  dateLabel: string;
  appointments: readonly AppointmentRecord[];
  appointmentCount: number;
  completedAppointmentCount: number;
  remainingAppointmentCount: number;
  revenueTodayNpr: number;
  paymentCount: number;
  invoices: readonly InvoiceRecord[];
  outstandingDuesNpr: number;
  tasks: readonly TaskRecord[];
  openTaskCount: number;
  overdueTaskCount: number;
  lowStockItems: readonly InventoryItem[];
  expiringMedicines: readonly ExpiringMedicine[];
  recentActivity: readonly ActivityRecord[];
}

const demoAppointments: readonly AppointmentRecord[] = [
  { id: "apt-0830", time: "08:30 AM", patientName: "Bruno", species: "Dog", ownerName: "Maya Bhandari", reason: "Annual vaccination", veterinarian: "Dr. Karki", status: "completed" },
  { id: "apt-0915", time: "09:15 AM", patientName: "Mochi", species: "Cat", ownerName: "Rina Shrestha", reason: "Post-treatment follow-up", veterinarian: "Dr. Bista", status: "checked_in" },
  { id: "apt-0945", time: "09:45 AM", patientName: "Piku", species: "Dog", ownerName: "Suman Rai", reason: "Skin consultation", veterinarian: "Dr. Karki", status: "in_progress" },
  { id: "apt-1030", time: "10:30 AM", patientName: "Miso", species: "Cat", ownerName: "Tashi Gurung", reason: "Wellness examination", veterinarian: "Dr. Bista", status: "scheduled" },
  { id: "apt-1130", time: "11:30 AM", patientName: "Koko", species: "Dog", ownerName: "Nisha Adhikari", reason: "Booster vaccination", veterinarian: "Dr. Karki", status: "scheduled" },
  { id: "apt-1200", time: "12:00 PM", patientName: "Lulu", species: "Cat", ownerName: "Prabin Khadka", reason: "Nail trim", veterinarian: "Dr. Bista", status: "cancelled" },
];

const demoTasks: readonly TaskRecord[] = [
  { id: "task-1", title: "Follow up with Nima about Tofu’s recommended revisit", assignee: "Anika P.", dueOffsetDays: -1, dueTime: "By 4:00 PM", priority: "high", status: "open" },
  { id: "task-2", title: "Confirm refrigerated vaccine delivery", assignee: "Sandeep M.", dueOffsetDays: 0, dueTime: "11:00 AM", priority: "normal", status: "in_progress" },
  { id: "task-3", title: "Review the balance on Bruno’s last visit", assignee: "Aarav S.", dueOffsetDays: 0, dueTime: "03:00 PM", priority: "normal", status: "open" },
  { id: "task-4", title: "Prepare notes for the weekly clinic huddle", assignee: "Anika P.", dueOffsetDays: 3, dueTime: "09:30 AM", priority: "low", status: "open" },
  { id: "task-5", title: "Call the supplier about the pending order", assignee: "Sandeep M.", dueOffsetDays: 1, dueTime: "02:00 PM", priority: "normal", status: "open" },
];

const demoLowStockItems: readonly InventoryItem[] = [
  { id: "stock-1", name: "Nitrile examination gloves · M", currentStock: 6, minimumStock: 10, unit: "boxes" },
  { id: "stock-2", name: "Flea & tick topical · 10–20 kg", currentStock: 3, minimumStock: 8, unit: "doses" },
];

const demoExpiringMedicines: readonly ExpiringMedicine[] = [
  { id: "expiry-1", name: "Amoxicillin 250 mg capsules", batch: "AMX-24C", expiresInDays: 4 },
  { id: "expiry-2", name: "Rabies vaccine · 1 dose", batch: "RAB-011", expiresInDays: 12 },
];

const demoInvoices: readonly InvoiceRecord[] = [
  { id: "INV-2084", customerName: "Asha Bhandari", outstandingNpr: 4800, dueOffsetDays: -12 },
  { id: "INV-2088", customerName: "Hari Pradhan", outstandingNpr: 2650, dueOffsetDays: -2 },
  { id: "INV-2091", customerName: "Nima Rai", outstandingNpr: 1200, dueOffsetDays: 0 },
];

const demoRecentActivity: readonly ActivityRecord[] = [
  { id: "activity-1", description: "Payment recorded", detail: "INV-2081", time: "08:42 AM", kind: "payment", amountNpr: 10000 },
  { id: "activity-2", description: "Payment recorded", detail: "INV-2082", time: "08:36 AM", kind: "payment", amountNpr: 8500 },
  { id: "activity-3", description: "Payment recorded", detail: "INV-2083", time: "08:18 AM", kind: "payment", amountNpr: 6000 },
  { id: "activity-4", description: "Appointment completed", detail: "Bruno · Annual vaccination", time: "08:10 AM", kind: "appointment" },
];

function getNepalDateParts(date: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: NEPAL_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  return { year, month, day };
}

export function getNepalDateOffsetIso(date: Date, offsetDays: number): string {
  const { year, month, day } = getNepalDateParts(date);
  const utcDate = new Date(Date.UTC(year, month - 1, day + offsetDays));
  return [utcDate.getUTCFullYear(), String(utcDate.getUTCMonth() + 1).padStart(2, "0"), String(utcDate.getUTCDate()).padStart(2, "0")].join("-");
}

export function formatNepalIsoDate(isoDate: string, options: Intl.DateTimeFormatOptions): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 6, 15));
  return new Intl.DateTimeFormat("en-GB", { timeZone: NEPAL_TIME_ZONE, ...options }).format(date);
}

export function formatNpr(amount: number): string {
  return `NPR ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount)}`;
}

export function formatTaskDueDate(offsetDays: number, time: string, referenceDate: Date): string {
  if (offsetDays < 0) {
    const overdueDate = formatNepalIsoDate(getNepalDateOffsetIso(referenceDate, offsetDays), { day: "numeric", month: "short" });
    return `Overdue · ${overdueDate} · ${time}`;
  }
  if (offsetDays === 0) return `Today · ${time}`;
  const dueDate = getNepalDateOffsetIso(referenceDate, offsetDays);
  return `${formatNepalIsoDate(dueDate, { weekday: "short", day: "numeric", month: "short" })} · ${time}`;
}

export function formatInvoiceDueDate(offsetDays: number, referenceDate: Date): string {
  if (offsetDays < 0) return `${Math.abs(offsetDays)} ${Math.abs(offsetDays) === 1 ? "day" : "days"} overdue`;
  if (offsetDays === 0) return "Due today";
  return `Due ${formatNepalIsoDate(getNepalDateOffsetIso(referenceDate, offsetDays), { day: "numeric", month: "short" })}`;
}

export function getDashboardOverviewData(referenceDate = new Date()): DashboardOverviewData {
  const activeAppointments = demoAppointments.filter((appointment) => appointment.status !== "cancelled");
  const completedAppointmentCount = activeAppointments.filter((appointment) => appointment.status === "completed").length;
  const openTasks = demoTasks.filter((task) => task.status !== "done");
  const invoices = demoInvoices;
  const payments = demoRecentActivity.filter((activity) => activity.kind === "payment");
  const { year, month, day } = getNepalDateParts(referenceDate);
  const dateIso = [year, String(month).padStart(2, "0"), String(day).padStart(2, "0")].join("-");

  return {
    dateIso,
    dateLabel: formatNepalIsoDate(dateIso, { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    appointments: demoAppointments,
    appointmentCount: activeAppointments.length,
    completedAppointmentCount,
    remainingAppointmentCount: activeAppointments.length - completedAppointmentCount,
    revenueTodayNpr: payments.reduce((total, payment) => total + (payment.amountNpr ?? 0), 0),
    paymentCount: payments.length,
    invoices,
    outstandingDuesNpr: invoices.reduce((total, invoice) => total + invoice.outstandingNpr, 0),
    tasks: openTasks,
    openTaskCount: openTasks.length,
    overdueTaskCount: openTasks.filter((task) => task.dueOffsetDays < 0).length,
    lowStockItems: demoLowStockItems,
    expiringMedicines: [...demoExpiringMedicines].sort((a, b) => a.expiresInDays - b.expiresInDays),
    recentActivity: demoRecentActivity,
  };
}
