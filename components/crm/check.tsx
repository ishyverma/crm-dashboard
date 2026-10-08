"use client";

import { cn } from "@/lib/utils";

export function Check({ checked, onChange, label }: {
  checked: boolean | "indeterminate";
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked === "indeterminate" ? "mixed" : checked}
      aria-label={label}
      onClick={() => onChange(checked !== true)}
      className={cn(
        "grid size-[13px] place-items-center rounded-[3px] border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
        checked
          ? "border-[#FDDB4A] bg-[#FDDB4A] text-black"
          : "border-check-line bg-background hover:border-check-hover",
      )}
    >
      {checked === true && (
        <svg viewBox="0 0 12 12" className="size-[9px]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2.5 6.5 5 9l4.5-5.5" />
        </svg>
      )}
      {checked === "indeterminate" && <span className="h-[1.5px] w-[7px] rounded-full bg-black" />}
    </button>
  );
}
