"use client";

import { ChevronDown, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FilterKey, FilterOptions, FilterState } from "./use-companies-table";

const PILLS: { key: FilterKey; label: string }[] = [
  { key: "sort", label: "Sort by" },
  { key: "owner", label: "Filter" },
  { key: "stage", label: "Stage" },
  { key: "range", label: "Last Activity" },
];

function FilterPill({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="pill inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full pl-3 pr-2 text-xs leading-none outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring md:h-7">
        <span className="text-fg-subtle">{label}</span>
        <span className="ml-1.5 max-w-[9rem] truncate font-medium text-foreground">{value}</span>
        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-72">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map((o) => <DropdownMenuRadioItem key={o} value={o}>{o}</DropdownMenuRadioItem>)}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Toolbar({ filters, options, onChange }: {
  filters: FilterState;
  options: FilterOptions;
  onChange: (key: FilterKey, value: string) => void;
}) {
  return (
    <div className="rise [--base:140ms] flex shrink-0 flex-col gap-3 border-b border-border px-3 py-3 sm:px-4 md:flex-row md:items-center md:justify-between md:py-4">
      <div className="-mx-3 flex gap-2 overflow-x-auto px-3 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {PILLS.map((p) => (
          <FilterPill key={p.key} label={p.label} value={filters[p.key]} options={options[p.key]} onChange={(v) => onChange(p.key, v)} />
        ))}
      </div>
      <div className="grid shrink-0 grid-cols-2 gap-2 md:flex md:items-center md:gap-1.5">
        <Button variant="ghost" className="surface-btn h-8 gap-1.5 rounded-full px-3 text-xs font-medium md:h-7"><Download className="size-3.5" /> Export</Button>
        <Button variant="ghost" className="primary-btn h-8 gap-1.5 rounded-full px-3 text-xs font-medium hover:text-white md:h-7"><Plus className="size-3.5" /> New Company</Button>
      </div>
    </div>
  );
}
