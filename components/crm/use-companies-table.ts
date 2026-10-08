"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Company } from "@/lib/companies";
import { TABLE_EVENT, type TableCommand } from "@/lib/table-events";

export const SORTS: Record<string, { key: "value" | "prob" | "deals" | "name"; desc: boolean }> = {
  "Pipeline Value": { key: "value", desc: true },
  "Win Probability": { key: "prob", desc: true },
  "Open Deals": { key: "deals", desc: true },
  Company: { key: "name", desc: false },
};
export const RANGES: Record<string, number> = { "7 Days": 7, "30 Days": 30, "90 Days": 90 };

export const DEFAULTS = { sort: "Pipeline Value", owner: "All Owners", stage: "Any", range: "90 Days" } as const;

export type FilterState = { sort: string; owner: string; stage: string; range: string };
export type FilterKey = keyof FilterState;
export type FilterOptions = Record<FilterKey, string[]>;

// Plain React on purpose: it has no timing calls, so it prerenders cleanly under Cache Components
// (TanStack Table's internal memo() calls Date.now(), which Next rejects during prerender).
export function useCompaniesTable(data: Company[]) {
  // sortKey === null keeps the design's original row order until the user picks a sort
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [owner, setOwner] = useState<string>(DEFAULTS.owner);
  const [stage, setStage] = useState<string>(DEFAULTS.stage);
  const [range, setRange] = useState<string>(DEFAULTS.range);
  const [selected, setSelected] = useState<ReadonlySet<string>>(() => new Set(["Microsoft"]));
  const [flash, setFlash] = useState<string | null>(null);

  // Commands coming from the search palette
  useEffect(() => {
    const onCommand = (e: Event) => {
      const d = (e as CustomEvent<TableCommand>).detail;
      if (d.type === "reset") {
        setOwner(DEFAULTS.owner); setStage(DEFAULTS.stage); setRange(DEFAULTS.range); setSortKey(null);
      } else if (d.type === "owner") {
        setOwner(d.owner);
      } else {
        setOwner(DEFAULTS.owner); setStage(DEFAULTS.stage); setRange(DEFAULTS.range);
        setSelected(new Set([d.name]));
        setFlash(d.name);
      }
    };
    window.addEventListener(TABLE_EVENT, onCommand);
    return () => window.removeEventListener(TABLE_EVENT, onCommand);
  }, []);

  useEffect(() => {
    if (!flash) return;
    const el = [...document.querySelectorAll(`[data-row="${CSS.escape(flash)}"]`)].find((n) => n.getClientRects().length);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
    const t = setTimeout(() => setFlash(null), 1800);
    return () => clearTimeout(t);
  }, [flash]);

  const rows = useMemo(() => {
    const maxDays = RANGES[range];
    const filtered = data.filter(
      (c) =>
        c.activeDays <= maxDays &&
        (owner === DEFAULTS.owner || c.owner === owner) &&
        (stage === DEFAULTS.stage || c.tags.includes(stage)),
    );
    if (!sortKey) return filtered;
    const { key, desc } = SORTS[sortKey];
    const dir = desc ? -1 : 1;
    // Array.prototype.sort is stable, so ties keep their original order
    return [...filtered].sort((a, b) =>
      key === "name" ? dir * a.name.localeCompare(b.name) : dir * (a[key] - b[key]),
    );
  }, [data, sortKey, owner, stage, range]);

  const selectedCount = rows.reduce((n, c) => n + (selected.has(c.name) ? 1 : 0), 0);
  const allSelected = rows.length > 0 && selectedCount === rows.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const toggleRow = useCallback((name: string, on: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (on) next.add(name); else next.delete(name);
      return next;
    });
  }, []);

  // Like the header checkbox in any table: affects the rows currently shown, keeps hidden selections
  const toggleAll = useCallback((on: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const c of rows) {
        if (on) next.add(c.name); else next.delete(c.name);
      }
      return next;
    });
  }, [rows]);

  const setFilter = useCallback((key: FilterKey, value: string) => {
    ({ sort: setSortKey, owner: setOwner, stage: setStage, range: setRange })[key](value);
  }, []);

  const options = useMemo<FilterOptions>(
    () => ({
      sort: Object.keys(SORTS),
      owner: [DEFAULTS.owner, ...Array.from(new Set(data.map((d) => d.owner)))],
      stage: [DEFAULTS.stage, ...Array.from(new Set(data.flatMap((d) => d.tags))).sort()],
      range: Object.keys(RANGES),
    }),
    [data],
  );

  const filters: FilterState = { sort: sortKey ?? DEFAULTS.sort, owner, stage, range };
  return { rows, selected, allSelected, someSelected, toggleRow, toggleAll, filters, setFilter, options, flash };
}
