"use client";

import { useMemo, type ReactNode } from "react";
import { Building2, Moon, PanelLeft, RotateCcw, Sun, UserRound } from "lucide-react";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
  CommandSeparator, CommandShortcut,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Company } from "@/lib/companies";
import { emitTable } from "@/lib/table-events";
import { toggleTheme } from "@/lib/theme";
import { GradientAvatar } from "./visuals";

// Some shadcn versions append an invisible check icon (ml-auto) to every item; it steals right-edge space.
const ITEM = "[&>svg:last-child]:hidden";

/** One aligned line: [icon] [label ........] [meta]. Same structure in every group. */
function Line({ icon, label, meta }: { icon: ReactNode; label: string; meta?: ReactNode }) {
  return (
    <div className="flex w-full min-w-0 items-center gap-2.5">
      <span className="grid size-4 shrink-0 place-items-center text-muted-foreground [&_svg]:size-4">{icon}</span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {meta}
    </div>
  );
}

export function CommandMenu({ open, onOpenChange, companies, onToggleSidebar }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companies: Company[];
  onToggleSidebar: () => void;
}) {
  const owners = useMemo(() => Array.from(new Set(companies.map((c) => c.owner))), [companies]);
  const run = (fn: () => void) => {
    onOpenChange(false);
    fn();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        // Pinned near the top (not centred) so the box never jumps while results change.
        // No open/close animation: a palette is used constantly (see emil-design-eng).
        className="top-[8dvh] translate-y-0 gap-0 overflow-hidden p-0 sm:top-[12dvh] sm:max-w-[560px] data-[state=open]:animate-none data-[state=closed]:animate-none data-open:animate-none data-closed:animate-none [&>button:last-child]:hidden"
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">Search companies, owners and actions</DialogDescription>
        <Command>
          <CommandInput placeholder="Search companies, owners, actions…" />
          {/* Fixed height: results filtering never resizes the dialog */}
          <CommandList className="h-72 max-h-[50dvh] [scrollbar-gutter:stable]">
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Companies">
              {companies.map((c) => (
                <CommandItem className={ITEM}
                  key={c.name}
                  value={c.name}
                  keywords={[c.owner, c.type, ...c.tags]}
                  onSelect={() => run(() => emitTable({ type: "focus", name: c.name }))}
                >
                  <Line
                    icon={<Building2 />}
                    label={c.name}
                    meta={
                      <span className="ml-auto hidden max-w-[45%] shrink-0 items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                        <GradientAvatar name={c.owner} className="size-4" />
                        <span className="min-w-0 truncate">{c.owner}</span>
                      </span>
                    }
                  />
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Filter by owner">
              {owners.map((o) => (
                <CommandItem className={ITEM}
                  key={o}
                  value={`Filter by ${o}`}
                  onSelect={() => run(() => emitTable({ type: "owner", owner: o }))}
                >
                  <Line icon={<UserRound />} label={o} />
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem className={ITEM} value="Toggle sidebar" onSelect={() => run(onToggleSidebar)}>
                <Line icon={<PanelLeft />} label="Toggle sidebar" meta={<CommandShortcut>⌘B</CommandShortcut>} />
              </CommandItem>
              <CommandItem
                className={ITEM}
                value="Toggle theme"
                keywords={["light", "dark", "mode", "appearance"]}
                onSelect={() => run(toggleTheme)}
              >
                <Line
                  icon={<><Sun className="hidden dark:block" /><Moon className="dark:hidden" /></>}
                  label="Toggle theme"
                />
              </CommandItem>
              <CommandItem className={ITEM} value="Reset filters" onSelect={() => run(() => emitTable({ type: "reset" }))}>
                <Line icon={<RotateCcw />} label="Reset filters" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
