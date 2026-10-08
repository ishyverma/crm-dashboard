"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Check } from "./check";
import { SHOW } from "./company-columns";

export function CompanyRow({ name, selected: on, onSelect, flashing, variants, children }: {
  name: string;
  selected: boolean;
  onSelect: (name: string, on: boolean) => void;
  flashing: boolean;
  variants: Variants; // enter/settled states, driven by the parent <motion.tbody>
  children: ReactNode; // server-rendered cells
}) {
  return (
    <motion.tr
      // No `initial`/`animate` here: setting either makes a row control its own variants and stop
      // inheriting the parent's, which silently disables the stagger.
      variants={variants}
      data-row={name}
      data-flash={flashing}
      data-state={on ? "selected" : undefined}
      className="company-motion h-10 transition-colors duration-500 hover:bg-white/2 data-[state=selected]:bg-row-selected data-[flash=true]:data-[state=selected]:bg-row-flash"
    >
      <td className={cn("border-t border-border pl-2.75 pr-3", SHOW.select)}>
        <Check label={`Select ${name}`} checked={on} onChange={(v) => onSelect(name, v)} />
      </td>
      {children}
    </motion.tr>
  );
}
