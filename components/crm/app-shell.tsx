"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { Company } from "@/lib/companies";
import { SIDEBAR, clampWidth } from "@/lib/sidebar";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./sidebar";
import { Topbar } from "./topbar";

// Loaded on demand: keeps cmdk + dialog out of the initial bundle.
const CommandMenu = dynamic(() => import("./command-menu").then((m) => m.CommandMenu), { ssr: false });


function getSidebarSnapshot() {
  try {
    return localStorage.getItem(SIDEBAR.storage);
  } catch {
    return null;
  }
}

// The server and first hydration render use defaults; React then reads browser storage.
const getServerSidebarSnapshot = () => undefined;

export function AppShell({ companies, children }: { companies: Company[]; children: React.ReactNode }) {
  const [widthOverride, setWidth] = useState<number | null>(null);
  const [collapsedOverride, setCollapsed] = useState<boolean | null>(null);
  const subscribeSidebar = useCallback((onChange: () => void) => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== SIDEBAR.storage && event.key !== null) return;
      setWidth(null);
      setCollapsed(null);
      onChange();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const saved = useSyncExternalStore(subscribeSidebar, getSidebarSnapshot, getServerSidebarSnapshot);
  const restored = useMemo(() => {
    try {
      const value = JSON.parse(saved ?? "null");
      return { width: clampWidth(Number(value?.w) || SIDEBAR.def), collapsed: Boolean(value?.c) };
    } catch {
      return { width: SIDEBAR.def, collapsed: false };
    }
  }, [saved]);
  const width = widthOverride ?? restored.width;
  const collapsed = collapsedOverride ?? restored.collapsed;
  const ready = saved !== undefined;
  const [dragging, setDragging] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false);
  const asideRef = useRef<HTMLElement>(null);


  // Mirror state to <html> (CSS reads it) and persist.
  useLayoutEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.style.setProperty("--sb-w", `${width}px`);
    root.dataset.sidebar = collapsed ? "collapsed" : "expanded";
    root.dataset.ready = "1";
    if (dragging) return;
    try {
      localStorage.setItem(SIDEBAR.storage, JSON.stringify({ w: width, c: collapsed }));
    } catch {}
  }, [ready, width, collapsed, dragging]);

  // Warm the search chunk once the page is idle so the first ⌘K is instant.
  useEffect(() => {
    const t = setTimeout(() => void import("./command-menu"), 1500);
    return () => clearTimeout(t);
  }, []);

  const toggle = useCallback(() => {
    setDragging(false);
    setCollapsed((c) => !(c ?? restored.collapsed));
  }, [restored.collapsed]);
  const openSearch = useCallback(() => {
    setSearchLoaded(true);
    setSearchOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const k = e.key.toLowerCase();
      if (k === "b") { e.preventDefault(); toggle(); }
      if (k === "k") { e.preventDefault(); setSearchLoaded(true); setSearchOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !asideRef.current) return;
    const raw = e.clientX - asideRef.current.getBoundingClientRect().left;
    if (raw < SIDEBAR.min - 60) {
      setCollapsed(true);
      setDragging(false);
      return;
    }
    setWidth(clampWidth(raw));
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); setWidth((w) => clampWidth((w ?? restored.width) - 16)); }
    if (e.key === "ArrowRight") { e.preventDefault(); setWidth((w) => clampWidth((w ?? restored.width) + 16)); }
  };

  return (
    <div className={cn("flex h-dvh overflow-hidden lg:p-2", dragging && "cursor-col-resize select-none")}>
      <div className="flex min-w-0 flex-1 overflow-hidden bg-background lg:rounded-[10px] lg:border lg:border-line-strong">
        <aside
          ref={asideRef}
          className={cn(
            "sb-enter relative hidden w-[var(--sb-w,240px)] shrink-0 border-r border-border bg-card lg:block [html[data-sidebar=collapsed]_&]:w-14",
            !dragging && "transition-[width] duration-200 ease-out motion-reduce:transition-none",
          )}
        >
          <div className="sb-inner h-full overflow-hidden">
            <SidebarContent collapsed={collapsed} />
          </div>
          {!collapsed && (
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize sidebar"
              aria-valuenow={width}
              aria-valuemin={SIDEBAR.min}
              aria-valuemax={SIDEBAR.max}
              tabIndex={0}
              data-active={dragging}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onLostPointerCapture={() => setDragging(false)}
              onKeyDown={onKeyDown}
              onDoubleClick={() => setWidth(SIDEBAR.def)}
              className="absolute inset-y-0 -right-[3px] z-20 w-[6px] cursor-col-resize touch-none outline-none after:absolute after:inset-y-0 after:left-[2px] after:w-[2px] after:rounded-full after:bg-transparent after:transition-colors hover:after:bg-handle focus-visible:after:bg-handle-focus data-[active=true]:after:bg-handle-active"
            />
          )}
        </aside>
        <main className="flex min-w-0 flex-1 flex-col">
          <Topbar nav={<SidebarContent />} collapsed={collapsed} onToggleSidebar={toggle} onSearch={openSearch} />
          {children}
        </main>
        {searchLoaded && (
          <CommandMenu open={searchOpen} onOpenChange={setSearchOpen} companies={companies} onToggleSidebar={toggle} />
        )}
      </div>
    </div>
  );
}
