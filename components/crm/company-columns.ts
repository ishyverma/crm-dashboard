// Single source of truth for the table's columns.
// Visibility is driven by the width of the table's own container (Tailwind container queries),
// so resizing or collapsing the sidebar re-flows the columns too.
// Class strings are written out in full so Tailwind can see them.
const ALWAYS = { cell: "", col: "" };
const AT_4XL = { cell: "hidden @4xl:table-cell", col: "hidden @4xl:table-column" };
const AT_5XL = { cell: "hidden @5xl:table-cell", col: "hidden @5xl:table-column" };
const AT_6XL = { cell: "hidden @6xl:table-cell", col: "hidden @6xl:table-column" };

export const COLUMNS = [
  { id: "select", header: "", width: 40, ...ALWAYS },
  { id: "name", header: "Companies", width: 130, ...ALWAYS },
  { id: "stage", header: "Segment & Stage", width: 200, ...ALWAYS },
  { id: "owner", header: "Account Owner", width: 134, ...AT_4XL },
  { id: "deals", header: "Open Deals", width: 85, ...AT_4XL },
  { id: "value", header: "Pipeline Value", width: 100, ...ALWAYS },
  { id: "win", header: "Win Probability", width: 129, ...ALWAYS },
  { id: "trend", header: "Activity Trend", width: 96, ...AT_5XL },
  { id: "last", header: "Last Interaction", width: 140, ...AT_6XL },
  { id: "actions", header: "", width: 40, ...ALWAYS },
] as const;

export type ColumnId = (typeof COLUMNS)[number]["id"];

export const SHOW = Object.fromEntries(COLUMNS.map((c) => [c.id, c.cell])) as Record<ColumnId, string>;
