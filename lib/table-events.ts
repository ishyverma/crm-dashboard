export type TableCommand =
  | { type: "focus"; name: string }
  | { type: "owner"; owner: string }
  | { type: "reset" };

export const TABLE_EVENT = "crm:table";

export const emitTable = (detail: TableCommand) =>
  window.dispatchEvent(new CustomEvent<TableCommand>(TABLE_EVENT, { detail }));
