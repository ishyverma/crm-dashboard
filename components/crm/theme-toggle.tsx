"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Button
      variant="ghost"
      size={collapsed ? "icon" : "default"}
      className={cn(
        "h-[28.5px] rounded-[7px] text-[13px] font-normal leading-5 text-fg-dim hover:bg-wash hover:text-foreground",
        collapsed ? "mx-auto flex w-9 justify-center" : "w-full justify-start gap-1.5 px-2",
      )}
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => toggleTheme()}
    >
      {/* Icon swap is pure CSS (reads the .dark class), so it can never lag behind the wipe */}
      <Sun className="hidden size-[13px] shrink-0 dark:block" strokeWidth={1.75} />
      <Moon className="size-[13px] shrink-0 dark:hidden" strokeWidth={1.75} />
      {!collapsed && <span className="truncate">Theme</span>}
    </Button>
  );
}
