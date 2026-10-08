export type Company = {
  name: string;
  tags: string[];
  extra?: number;
  owner: string;
  deals: number;
  value: number;
  prob: number;
  date: string;
  type: string;
  /** days since last activity (placeholder data, replace with real values) */
  activeDays: number;
};

const r = (
  name: string, tags: string[], extra: number, owner: string,
  deals: number, value: number, prob: number, date: string, type: string, activeDays: number,
): Company => ({ name, tags, extra: extra || undefined, owner, deals, value, prob, date, type, activeDays });

export const companies: Company[] = [
  r("LVMH", ["Enterprise", "Upsell"], 2, "Sarah Nguyen", 7, 420000, 70, "Feb 21", "QBR Call", 12),
  r("Disney", ["Enterprise", "New Logo"], 0, "James Taylor", 4, 311242, 51, "Feb 22", "Demo", 4),
  r("Paypal", ["Enterprise"], 0, "Maria Keller", 5, 124232, 22, "Mar 12", "Security", 45),
  r("United Airlines", ["Renewal"], 0, "Nia Jameson", 2, 221231, 77, "Mar 17", "Legal", 8),
  r("Apple", ["Pilot"], 0, "Alex Santos", 6, 530111, 82, "Mar 12", "Exec", 21),
  r("Microsoft", ["Strategic", "Expansion"], 0, "Mark Darnalds", 8, 320222, 86, "Mar 15", "Pilot", 3),
  r("Airbnb", ["Upsell", "Expansion"], 2, "Drew Nash", 3, 122230, 51, "Mar 18", "Pricing", 60),
  r("Intercom", ["Enterprise", "Mid-Market"], 0, "Lina Wong", 5, 230112, 61, "Mar 28", "Product", 18),
  r("Attio", ["Mid-Market", "Upsell"], 2, "Jamie Fox", 2, 420222, 38, "Jun 14", "Pricing", 75),
  r("Google", ["SMB", "Enterprise"], 2, "Kate Chen", 8, 112277, 24, "Jun 7", "Renewal", 33),
  r("Netflix", ["Mid-Market"], 0, "Ricky Brown", 3, 221221, 72, "Jun 18", "Pilot", 9),
  r("Spotify", ["Land & Expand"], 2, "Hannah Mills", 5, 170991, 55, "Jul 1", "Expansion", 52),
  r("Shopify", ["Co-Sell", "Expansion"], 0, "Emma Green", 9, 139007, 45, "Jul 18", "Renewal", 27),
  r("Zoom", ["Expansion"], 2, "Oliver Chan", 8, 289921, 38, "Aug 8", "Partner", 85),
  r("Slack", ["Mid-Market", "Co-Sell"], 0, "Ava Brooks", 4, 333221, 23, "Aug 12", "Discovery", 14),
  r("Stripe", ["Expansion", "SMB"], 2, "Noah Lee", 3, 442231, 44, "Sept 09", "Demo", 6),
  r("Snowflake", ["Enterprise", "Mid-Market"], 0, "Grace Miller", 6, 520000, 24, "Sept 11", "Pricing", 41),
  r("Hubspot", ["Expansion", "Co-Sell"], 2, "Chloe Park", 2, 210123, 52, "Sept 18", "QBR Call", 2),
];

export const usd = (n: number) => `$ ${n.toLocaleString("en-US")}`;
