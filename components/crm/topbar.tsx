"use client";

import { useState } from "react";
import { Bell, Menu, PanelLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { GradientAvatar } from "./visuals";

const tabs = ["Companies", "Deals", "Forecast"];

export function Topbar({ nav, collapsed, onToggleSidebar, onSearch }: {
  nav: React.ReactNode;
  collapsed: boolean;
  onToggleSidebar: () => void;
  onSearch: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="rise [--base:80ms] shrink-0 border-b border-border px-3 sm:px-4">
      <div className="flex h-[54px] items-center gap-2.5">
        <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:bg-wash-strong lg:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}>
          <Menu className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden size-7 text-muted-foreground hover:bg-wash-strong hover:text-foreground lg:inline-flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          title="Toggle sidebar (Ctrl/⌘ B)"
          onClick={onToggleSidebar}
        >
          <PanelLeft className="size-3.5" />
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-[240px] gap-0 border-border bg-card p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            {nav}
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2.5">
          <h1 className="text-[15px] font-medium leading-5">Companies</h1>
          <span className="inline-flex h-5 items-center gap-1.5 rounded-full bg-raised pl-1.5 pr-2 text-xs leading-none">
            <span className="size-[9px] rounded-full bg-[#5dc59f]" /> Active
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="surface-btn size-7 rounded-full" aria-label="Search" title="Search (Ctrl/⌘ K)" onClick={onSearch}><Search className="size-3.5" /></Button>
          <Button variant="ghost" size="icon" className="surface-btn size-7 rounded-full" aria-label="Notifications"><Bell className="size-3.5" /></Button>
          <div className="surface-btn hidden h-7 items-center gap-1.5 rounded-full pl-1 pr-3 sm:flex">
            <GradientAvatar name="Jensen Ackles" />
            <span className="text-xs leading-none">Jensen Ackles</span>
          </div>
        </div>
      </div>
      <div role="tablist" className="flex gap-4 overflow-x-auto [scrollbar-width:none]">
        {tabs.map((t, i) => (
          <button
            key={t}
            role="tab"
            aria-selected={i === 0}
            className={cn(
              "-mb-px flex h-[42px] items-center border-b-2 border-transparent text-xs text-fg-subtle transition-colors hover:text-foreground",
              i === 0 && "border-foreground text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </header>
  );
}
