"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import type { Company } from "@/lib/companies";
import { Check } from "./check";
import { CompanyCard } from "./company-card";
import { COLUMNS, SHOW } from "./company-columns";
import { CompanyRow } from "./company-row";
import { TableFooter } from "./table-footer";
import { createTableEntrance } from "./table-motion";
import { Toolbar } from "./toolbar";
import { useCompaniesTable } from "./use-companies-table";

const TH = "h-[34px] whitespace-nowrap pr-3 text-left text-xs font-normal text-fg-subtle";

function EmptyState() {
  return <div className="grid h-48 place-items-center px-4 text-center text-[13px] text-muted-foreground">No companies match these filters.</div>;
}

export function CompaniesTable({ data, cells, cards }: {
  data: Company[];
  cells: Record<string, React.ReactNode>; // server-rendered <td>s, keyed by company name
  cards: Record<string, React.ReactNode>; // server-rendered mobile card bodies
}) {
  const { rows, selected, allSelected, someSelected, toggleRow, toggleAll, filters, setFilter, options, flash } = useCompaniesTable(data);
  const [intro, setIntro] = useState(true);
  const reducedMotion = Boolean(useReducedMotion());
  const entrance = useMemo(() => createTableEntrance(reducedMotion), [reducedMotion]);
  const finishIntro = (definition: unknown) => {
    if (definition === "visible") setIntro(false);
  };

  return (
    <section
      className="flex min-h-0 flex-1 flex-col"
      onPointerDownCapture={() => setIntro(false)}
      onKeyDownCapture={() => setIntro(false)}
    >
      <Toolbar filters={filters} options={options} onChange={setFilter} />

      {/* @container: layout reacts to this area's width, not the screen's */}
      <div className="@container min-h-0 flex-1 overflow-auto">
        {rows.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <motion.ul
              className="grid gap-2 p-3 @3xl:hidden"
              variants={entrance.container}
              initial={intro ? "hidden" : false}
              animate={intro ? "visible" : "settled"}
              onAnimationComplete={finishIntro}
            >
              {rows.map((c) => <CompanyCard key={c.name} name={c.name} selected={selected.has(c.name)} onSelect={toggleRow} flashing={flash === c.name} variants={entrance.item}>{cards[c.name]}</CompanyCard>)}
            </motion.ul>

            <table className="hidden w-full table-fixed border-separate border-spacing-0 @3xl:table">
              <colgroup>
                {COLUMNS.map((c) => <col key={c.id} style={{ width: c.width }} className={c.col} />)}
              </colgroup>
              <thead className="sticky top-0 z-10 bg-background">
                <tr>
                  {COLUMNS.map((c) =>
                    c.id === "select" ? (
                      <th key={c.id} className={`${TH} pl-[11px] ${SHOW.select}`}>
                        <Check
                          label="Select all"
                          checked={allSelected ? true : someSelected ? "indeterminate" : false}
                          onChange={toggleAll}
                        />
                      </th>
                    ) : (
                      <th key={c.id} className={`${TH} ${c.cell}`}>
                        {c.header || <span className="sr-only">Actions</span>}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <motion.tbody
                variants={entrance.container}
                initial={intro ? "hidden" : false}
                animate={intro ? "visible" : "settled"}
                onAnimationComplete={finishIntro}
              >
                {rows.map((c) => <CompanyRow key={c.name} name={c.name} selected={selected.has(c.name)} onSelect={toggleRow} flashing={flash === c.name} variants={entrance.item}>{cells[c.name]}</CompanyRow>)}
              </motion.tbody>
            </table>
          </>
        )}
      </div>

      <TableFooter count={rows.length} />
    </section>
  );
}
