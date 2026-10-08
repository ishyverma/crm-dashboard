export const SIDEBAR = { min: 220, max: 420, def: 240, rail: 56, storage: "crm-sidebar" } as const;

export const clampWidth = (n: number) => Math.min(SIDEBAR.max, Math.max(SIDEBAR.min, Math.round(n)));
