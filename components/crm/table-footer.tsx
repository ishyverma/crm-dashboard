import { Plus } from "lucide-react";

const CALCS = ["Sum of pipeline", "Avg win probability", "Add Calculation"];

export function TableFooter({ count }: { count: number }) {
  return (
    <footer className="grid shrink-0 grid-cols-2 border-t border-border text-xs leading-none text-fg-subtle md:grid-cols-4">
      <p className="flex h-[38px] items-center gap-2 px-4 md:h-[34px]">
        <span className="tabular-nums text-foreground">{count}</span>Companies in view
      </p>
      {CALCS.map((l) => (
        <button key={l} className="flex h-[38px] items-center gap-2 border-l border-border px-4 text-left transition-colors hover:text-foreground md:h-[34px]">
          <Plus className="size-3 shrink-0" /> <span className="truncate">{l}</span>
        </button>
      ))}
    </footer>
  );
}
