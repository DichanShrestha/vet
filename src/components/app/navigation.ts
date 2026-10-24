import {
  CalendarDays,
  ChartNoAxesColumn,
  ClipboardPlus,
  LayoutDashboard,
  ListTodo,
  Package,
  PawPrint,
  ReceiptText,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export const navigationGroups: NavigationGroup[] = [
  { label: "Workspace", items: [{ label: "Overview", href: "/dashboard", icon: LayoutDashboard }] },
  {
    label: "Clinical",
    items: [
      { label: "Appointments", href: "/appointments", icon: CalendarDays },
      { label: "Patients & Owners", href: "/patients", icon: PawPrint },
      { label: "Medical Records", href: "/medical-records", icon: ClipboardPlus },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Billing & Dues", href: "/billing", icon: ReceiptText },
      { label: "Inventory", href: "/inventory", icon: Package },
      { label: "Tasks & Meetings", href: "/tasks", icon: ListTodo },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Reports", href: "/reports", icon: ChartNoAxesColumn },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export const allNavigationItems = navigationGroups.flatMap((group) => group.items);
