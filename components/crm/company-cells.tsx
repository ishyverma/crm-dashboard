// Server Components: rendered to HTML on the server, no JavaScript shipped for them.
import { CalendarDays, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Company, usd } from "@/lib/companies";
import { cn } from "@/lib/utils";
import { SHOW } from "./company-columns";
import { GradientAvatar, MoreTag, Sparkline, Tag, WinMeter } from "./visuals";

const TD = "border-t border-border pr-3 text-[13px]";

/** Table cells (everything except the checkbox column, which is interactive). */
export function CompanyCells({ c }: { c: Company }) {
  return (
    <>
      <td className={cn(TD, "truncate", SHOW.name)}>{c.name}</td>
      <td className={cn(TD, SHOW.stage)}>
        <div className="flex items-center gap-1.5">
          {c.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          {c.extra ? <MoreTag n={c.extra} /> : null}
        </div>
      </td>
      <td className={cn(TD, SHOW.owner)}>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <GradientAvatar name={c.owner} />
          {c.owner}
        </div>
      </td>
      <td className={cn(TD, "tabular-nums", SHOW.deals)}>{c.deals}</td>
      <td className={cn(TD, "whitespace-nowrap tabular-nums", SHOW.value)}>{usd(c.value)}</td>
      <td className={cn(TD, SHOW.win)}><WinMeter value={c.prob} /></td>
      <td className={cn(TD, SHOW.trend)}><Sparkline seed={c.name} /></td>
      <td className={cn(TD, SHOW.last)}>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <CalendarDays className="size-3 text-fg-dim" strokeWidth={1.75} />
          {c.date}
          <span className="h-3 w-px bg-white/15" />
          {c.type}
        </div>
      </td>
      <td className={cn(TD, SHOW.actions)}>
        <Button variant="ghost" size="icon" className="size-6 text-muted-foreground" aria-label={`Actions for ${c.name}`}>
          <MoreHorizontal className="size-3.5" />
        </Button>
      </td>
    </>
  );
}

/** Mobile card body (the checkbox lives in the client wrapper). */
export function CompanyCardBody({ c }: { c: Company }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <p className="truncate text-[15px] font-medium">{c.name}</p>
        <p className="shrink-0 text-[15px] tabular-nums">{usd(c.value)}</p>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {c.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        {c.extra ? <MoreTag n={c.extra} /> : null}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-[13px] text-muted-foreground">
          <GradientAvatar name={c.owner} className="size-5" />
          <span className="truncate">{c.owner}</span>
        </div>
        <WinMeter value={c.prob} />
      </div>
      <p className="mt-2.5 flex flex-wrap items-center gap-x-1.5 text-xs text-muted-foreground">
        <CalendarDays className="size-3" strokeWidth={1.75} />
        {c.date} · {c.type} · {c.deals} open deals
      </p>
    </>
  );
}
