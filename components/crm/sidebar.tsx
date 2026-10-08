import {
  Building2, ClipboardList, BarChart3, ListChecks, ContactRound, Mail,
  Target, Crosshair, Users, PieChart, TriangleAlert, UserPlus, CircleHelp, Folder, Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const main = [
  { label: "Companies", icon: Building2, count: 241, active: true },
  { label: "Deals Board", icon: ClipboardList },
  { label: "Forecast", icon: BarChart3, count: 9 },
  { label: "Activities", icon: ListChecks },
  { label: "Contacts", icon: ContactRound, count: 38 },
  { label: "Email Sequences", icon: Mail },
];
const team = [
  { label: "Strategic AEs", icon: Target },
  { label: "Mid Market", icon: Crosshair },
  { label: "SDR Team", icon: Users },
];
const reporting = [
  { label: "Q1 Forecast", icon: PieChart },
  { label: "Slipping Deals", icon: TriangleAlert },
];
const pipelines = [
  { label: "North America", dot: "bg-[#f5c518]" },
  { label: "EMEA Enterprise", dot: "bg-[#ec4899]" },
  { label: "APAC Expansion", dot: "bg-[#8b5cf6]" },
];

type ItemProps = {
  label: string; icon?: React.ElementType; count?: number; active?: boolean; dot?: string; collapsed?: boolean;
};

function Item({ label, icon: Icon, count, active, dot, collapsed }: ItemProps) {
  return (
    <a
      href="#"
      title={collapsed ? label : undefined}
      aria-label={collapsed ? label : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex h-[28.5px] min-w-0 items-center rounded-[7px] border border-transparent text-[13px] leading-5 text-fg-dim outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
        collapsed ? "mx-auto w-9 justify-center" : "gap-1.5 px-2",
        active ? "nav-active text-foreground" : "hover:bg-wash",
      )}
    >
      {Icon ? (
        <Icon className="size-[13px] shrink-0" strokeWidth={1.75} />
      ) : (
        <span className="grid size-[13px] shrink-0 place-items-center"><span className={cn("size-1.5 rounded-full", dot)} /></span>
      )}
      {!collapsed && <span className="min-w-0 flex-1 truncate">{label}</span>}
      {!collapsed && count !== undefined && (
        <span className="grid h-5 min-w-6 shrink-0 place-items-center rounded-full bg-raised px-1.5 text-[11.5px] tabular-nums text-fg-soft group-aria-[current=page]:bg-raised-strong">{count}</span>
      )}
    </a>
  );
}

function Group({ title, items, collapsed }: { title?: string; items: ItemProps[]; collapsed: boolean }) {
  return (
    <nav
      aria-label={title ?? "Main"}
      className={cn("pb-2.5", collapsed ? "px-2.5" : "px-3", title ? "border-t border-border pt-2" : "pt-3")}
    >
      {title && !collapsed && (
        <p className="flex h-5 items-center truncate text-[11px] leading-4 uppercase tracking-[0.06em] text-fg-faint">{title}</p>
      )}
      <ul>{items.map((i) => <li key={i.label} className="min-w-0"><Item {...i} collapsed={collapsed} /></li>)}</ul>
    </nav>
  );
}

export function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  return (
    // @container/sb: children adapt to the sidebar's own width (resize, rail, mobile drawer)
    <div className="@container/sb flex h-full min-w-0 flex-col">
      <div className={cn("flex h-[54px] shrink-0 items-center border-b border-border", collapsed ? "justify-center" : "gap-3.5 px-3")}>
        <Command className="size-6 shrink-0" strokeWidth={1.4} />
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium leading-4">Sales CRM</p>
            <p className="truncate text-[11.5px] leading-[14px] text-muted-foreground">Company pipeline</p>
          </div>
        )}
      </div>

      <div
        className={cn(
          "min-h-0 flex-1 overflow-y-auto overflow-x-hidden",
          collapsed
            ? "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "[scrollbar-color:var(--scroll)_transparent] [scrollbar-width:thin]",
        )}
      >
        <Group items={main} collapsed={collapsed} />
        <Group title="Team" items={team} collapsed={collapsed} />
        <Group title="Reporting" items={reporting} collapsed={collapsed} />
        <Group title="Pipelines" items={pipelines} collapsed={collapsed} />
      </div>

      <div className={cn("shrink-0 pb-2.5", collapsed ? "px-2.5" : "px-3")}>
        <Item label="Invite teammates" icon={UserPlus} collapsed={collapsed} />
        <Item label="Help" icon={CircleHelp} collapsed={collapsed} />
        <ThemeToggle collapsed={collapsed} />
      </div>

      <div className={cn("flex h-[62px] shrink-0 items-center border-t border-border", collapsed ? "justify-center" : "justify-between gap-2 pl-3.5 pr-2.5")}>
        {collapsed ? (
          <Button variant="ghost" size="icon" className="surface-btn-hi size-7 rounded-full" aria-label="Add Billings" title="Add Billings">
            <Folder className="size-[13px]" strokeWidth={1.75} />
          </Button>
        ) : (
          <>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium leading-4">14 Days</p>
              <p className="truncate text-[11.5px] leading-[14px] text-muted-foreground">Left on trials</p>
            </div>
            <Button
              variant="ghost"
              aria-label="Add Billings"
              className="surface-btn-hi h-7 shrink-0 gap-1.5 rounded-full px-2.5 text-[13px] font-medium @[14rem]/sb:px-3"
            >
              <Folder className="size-[13px]" strokeWidth={1.75} />
              <span className="hidden @[14rem]/sb:inline">Add Billings</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
