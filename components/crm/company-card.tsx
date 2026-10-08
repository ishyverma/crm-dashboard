"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { Check } from "./check";

/** Mobile layout wrapper: selection + the server-rendered card body. */
export function CompanyCard({ name, selected: on, onSelect, flashing, variants, children }: {
  name: string;
  selected: boolean;
  onSelect: (name: string, on: boolean) => void;
  flashing: boolean;
  variants: Variants; // enter/settled states, driven by the parent <motion.ul>
  children: ReactNode;
}) {
  return (
    <motion.li
      // No `initial`/`animate` here: see CompanyRow.
      variants={variants}
      data-row={name}
      data-flash={flashing}
      data-state={on ? "selected" : undefined}
      className="company-motion rounded-lg border border-border bg-card p-3 transition-colors duration-500 data-[state=selected]:bg-row-selected data-[flash=true]:border-[#FDDB4A]/40"
    >
      <div className="flex items-start gap-3">
        <div className="pt-[3px]">
          <Check label={`Select ${name}`} checked={on} onChange={(v) => onSelect(name, v)} />
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </motion.li>
  );
}
