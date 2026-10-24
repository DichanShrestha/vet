"use client";

import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardPlus,
  ChevronsUpDown,
  Menu,
  Search,
  Settings2,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DEMO_CLINIC_NAME, DEMO_USER_NAME, DEMO_USER_ROLE, PRODUCT_NAME } from "@/lib/site";
import { allNavigationItems, navigationGroups } from "./navigation";

function isItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function closeMenuOnFocusLeave(event: React.FocusEvent<HTMLDetailsElement>) {
  const nextTarget = event.relatedTarget;
  if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
    event.currentTarget.open = false;
  }
}

interface SidebarProps {
  pathname: string;
  collapsed: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
  mobile?: boolean;
}

function Sidebar({ pathname, collapsed, onToggleCollapse, onNavigate, mobile = false }: SidebarProps) {
  return (
    <aside className={`app-sidebar${collapsed ? " is-collapsed" : ""}${mobile ? " is-mobile" : ""}`}>
      <Link className="app-brand" href="/dashboard" aria-label={`${PRODUCT_NAME} overview`} onClick={onNavigate}>
        <span className="app-brand-mark" aria-hidden="true"><span /></span>
        {!collapsed ? <span className="app-brand-name">{PRODUCT_NAME}<span>.</span></span> : null}
      </Link>

      <div className="clinic-switcher">
        <span className="clinic-mark" title={DEMO_CLINIC_NAME} aria-hidden="true">N</span>
        {!collapsed ? <span className="clinic-switcher-copy"><strong>{DEMO_CLINIC_NAME}</strong><small>Clinic workspace</small></span> : null}
        {!collapsed ? <ChevronsUpDown className="clinic-switcher-chevron" aria-hidden="true" /> : null}
      </div>

      <nav className="app-primary-nav" aria-label="Primary navigation">
        {navigationGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            {!collapsed ? <p className="nav-group-label">{group.label}</p> : <span className="nav-group-divider" aria-hidden="true" />}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(pathname, item.href);
              return (
                <Link
                  className={`nav-link${active ? " is-active" : ""}`}
                  href={item.href}
                  key={item.href}
                  aria-current={active ? "page" : undefined}
                  title={collapsed ? item.label : undefined}
                  onClick={onNavigate}
                >
                  <Icon aria-hidden="true" />
                  {!collapsed ? <span>{item.label}</span> : <span className="sr-only">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {onToggleCollapse ? (
        <div className="sidebar-bottom">
          <Button className="sidebar-collapse-button" variant="ghost" size="sm" onClick={onToggleCollapse} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-expanded={!collapsed}>
            {collapsed ? <ChevronRight aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}
            {!collapsed ? <span>Collapse sidebar</span> : null}
          </Button>
          {!collapsed ? <p className="sidebar-version">Clinic operations · Nepal</p> : null}
        </div>
      ) : null}
    </aside>
  );
}

interface CommandPaletteProps {
  onNavigate: (href: string) => void;
}

function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return allNavigationItems;
    return allNavigationItems.filter((item) => item.label.toLocaleLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function chooseResult(href: string) {
    setOpen(false);
    setQuery("");
    onNavigate(href);
  }

  return (
    <>
      <Button className="command-trigger" variant="outline" onClick={() => setOpen(true)} aria-label="Search pages" aria-keyshortcuts="Control+K Meta+K">
        <Search aria-hidden="true" /><span>Search pages</span><kbd>Ctrl&nbsp;K</kbd>
      </Button>
      <dialog
        className="command-dialog"
        ref={dialogRef}
        aria-labelledby="command-title"
        onClose={() => { setOpen(false); setQuery(""); }}
        onClick={(event) => { if (event.target === dialogRef.current) setOpen(false); }}
      >
        <div className="command-panel">
          <h2 id="command-title" className="sr-only">Navigate to a page</h2>
          <div className="command-search-row">
            <Search aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              placeholder="Search pages and sections…"
              aria-label="Search navigation destinations"
              aria-controls="command-results"
              aria-activedescendant={results[activeIndex] ? `command-option-${results[activeIndex].href.replaceAll("/", "-")}` : undefined}
              onChange={(event) => {
                setQuery(event.currentTarget.value);
                setActiveIndex(0);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" && results.length > 0) {
                  event.preventDefault();
                  setActiveIndex((index) => (index + 1) % results.length);
                } else if (event.key === "ArrowUp" && results.length > 0) {
                  event.preventDefault();
                  setActiveIndex((index) => (index - 1 + results.length) % results.length);
                } else if (event.key === "Enter" && results[activeIndex]) {
                  event.preventDefault();
                  chooseResult(results[activeIndex].href);
                }
              }}
            />
            <kbd className="command-escape">ESC</kbd>
          </div>
          <p className="command-section-label">Go to</p>
          <ul className="command-results" id="command-results" role="listbox" aria-label="Navigation destinations">
            {results.map((item, index) => {
              const Icon = item.icon;
              const active = index === activeIndex;
              return (
                <li key={item.href} role="presentation">
                  <button
                    id={`command-option-${item.href.replaceAll("/", "-")}`}
                    className={`command-result${active ? " is-active" : ""}`}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => chooseResult(item.href)}
                  >
                    <Icon aria-hidden="true" /><span>{item.label}</span><span className="command-result-route">{item.href}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {results.length === 0 ? <p className="command-empty" role="status">No pages match “{query}”. Try another search.</p> : null}
          <div className="command-footer"><span>↑ ↓ to navigate</span><span>Enter to open</span><span>Esc to close</span></div>
        </div>
      </dialog>
    </>
  );
}

function NotificationMenu() {
  return (
    <details className="top-menu notification-menu" onBlur={closeMenuOnFocusLeave}>
      <summary aria-label="Notifications, 1 unread" title="Notifications"><Bell aria-hidden="true" /><span className="unread-dot" aria-hidden="true" /></summary>
      <section className="top-popover notification-popover" aria-label="Notifications">
        <div className="popover-heading"><div><strong>Notifications</strong><span>1 unread</span></div><Badge variant="default">Today</Badge></div>
        <ul className="notification-list">
          <li className="notification-item is-unread"><span className="notification-mark" aria-hidden="true"><CalendarDays aria-hidden="true" /></span><span><strong>Clinic opens soon</strong><small>Front desk checklist is ready for today.</small><time>8:15 AM</time></span><span className="notification-unread-indicator" aria-label="Unread" /></li>
          <li className="notification-item"><span className="notification-mark is-muted" aria-hidden="true"><ClipboardPlus aria-hidden="true" /></span><span><strong>Welcome to VetDesk</strong><small>Your clinic workspace is set up for a first look.</small><time>Yesterday</time></span></li>
        </ul>
        <p className="popover-footnote">Fictional notifications for the demo workspace.</p>
      </section>
    </details>
  );
}

function ProfileMenu() {
  return (
    <details className="top-menu profile-menu" onBlur={closeMenuOnFocusLeave}>
      <summary aria-label={`Profile menu for ${DEMO_USER_NAME}`}>
        <span className="user-avatar" aria-hidden="true">AS</span>
        <span className="profile-summary-copy"><strong>{DEMO_USER_NAME}</strong><small>{DEMO_USER_ROLE}</small></span>
        <ChevronsUpDown aria-hidden="true" />
      </summary>
      <div className="top-popover profile-popover">
        <div className="profile-popover-user"><span className="user-avatar" aria-hidden="true">AS</span><span><strong>{DEMO_USER_NAME}</strong><small>{DEMO_USER_ROLE}</small></span></div>
        <Link href="/settings" className="profile-link"><Settings2 aria-hidden="true" /> Profile & preferences</Link>
        <Link href="/settings" className="profile-link"><Settings2 aria-hidden="true" /> Clinic settings</Link>
        <p className="popover-footnote">Demo account · no sign-in connected</p>
      </div>
    </details>
  );
}

interface TopNavigationProps {
  pathname: string;
  onOpenMobileNavigation: () => void;
  onNavigate: (href: string) => void;
}

function TopNavigation({ pathname, onOpenMobileNavigation, onNavigate }: TopNavigationProps) {
  const currentItem = allNavigationItems.find((item) => isItemActive(pathname, item.href));
  return (
    <header className="app-topbar">
      <div className="topbar-start">
        <Button className="mobile-nav-trigger" variant="ghost" size="icon" onClick={onOpenMobileNavigation} aria-label="Open navigation menu"><Menu aria-hidden="true" /></Button>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          {pathname !== "/dashboard" ? <><Link href="/dashboard">Overview</Link><span aria-hidden="true">/</span></> : null}
          <span aria-current="page">{currentItem?.label ?? "Overview"}</span>
        </nav>
      </div>
      <div className="topbar-actions">
        <CommandPalette onNavigate={onNavigate} />
        <span className="topbar-action-divider" aria-hidden="true" />
        <NotificationMenu />
        <ProfileMenu />
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = mobileDialogRef.current;
    if (!dialog) return;
    if (mobileOpen && !dialog.open) dialog.showModal();
    else if (!mobileOpen && dialog.open) dialog.close();
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileDialogRef.current?.open) mobileDialogRef.current.close();
  }, [pathname]);

  const navigate = (href: string) => {
    router.push(href);
    setMobileOpen(false);
  };

  return (
    <div className={`app-shell${collapsed ? " sidebar-collapsed" : ""}`}>
      <Sidebar pathname={pathname} collapsed={collapsed} onToggleCollapse={() => setCollapsed((value) => !value)} />
      <div className="app-main">
        <TopNavigation pathname={pathname} onOpenMobileNavigation={() => setMobileOpen(true)} onNavigate={navigate} />
        <main className="app-content">{children}</main>
      </div>
      <dialog
        ref={mobileDialogRef}
        className="mobile-nav-dialog"
        aria-label="Main navigation"
        onClose={() => setMobileOpen(false)}
        onClick={(event) => { if (event.target === mobileDialogRef.current) setMobileOpen(false); }}
      >
        <div className="mobile-nav-dialog-head"><span className="sr-only">Main navigation</span><Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu"><X aria-hidden="true" /></Button></div>
        <Sidebar pathname={pathname} collapsed={false} onNavigate={() => setMobileOpen(false)} mobile />
      </dialog>
    </div>
  );
}
