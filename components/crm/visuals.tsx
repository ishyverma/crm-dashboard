import { cn } from "@/lib/utils";

const TONES: Record<string, string> = {
  Enterprise: "bg-[#eff6ff] text-[#2563eb] ring-[#bfdbfe] dark:bg-[#1f2b3c] dark:text-[#ccdaf4] dark:ring-[#2d3f5a]",
  Upsell: "bg-[#f5f3ff] text-[#7c3aed] ring-[#ddd6fe] dark:bg-[#221e3a] dark:text-[#bcb5e0] dark:ring-[#43386a]",
  "New Logo": "bg-[#ecfdf5] text-[#047857] ring-[#a7f3d0] dark:bg-[#25392d] dark:text-[#cae4d5] dark:ring-[#355241]",
  Renewal: "bg-[#ecfdf5] text-[#047857] ring-[#a7f3d0] dark:bg-[#27362f] dark:text-[#c4e6d3] dark:ring-[#36493d]",
  Expansion: "bg-[#f0fdf4] text-[#15803d] ring-[#bbf7d0] dark:bg-[#25392d] dark:text-[#c9e7d3] dark:ring-[#355241]",
  "Mid-Market": "bg-[#f0fdf4] text-[#15803d] ring-[#bbf7d0] dark:bg-[#2b4422] dark:text-[#c3edcb] dark:ring-[#3f6232]",
  "Land & Expand": "bg-[#f0fdfa] text-[#0f766e] ring-[#99f6e4] dark:bg-[#17292a] dark:text-[#65b281] dark:ring-[#2a4a3c]",
  Pilot: "bg-[#fff7ed] text-[#c2410c] ring-[#fed7aa] dark:bg-[#3c2a1e] dark:text-[#e2bea2] dark:ring-[#5a3e2b]",
  "Co-Sell": "bg-[#fffbeb] text-[#b45309] ring-[#fde68a] dark:bg-[#2f231d] dark:text-[#f5dcc2] dark:ring-[#4c3a2e]",
  Strategic: "bg-[#fef2f2] text-[#b91c1c] ring-[#fecaca] dark:bg-[#391f1f] dark:text-[#efcacc] dark:ring-[#5a2f2f]",
  SMB: "bg-[#fefce8] text-[#a16207] ring-[#fef08a] dark:bg-[#332f1e] dark:text-[#fdfad6] dark:ring-[#4d4529]",
};

export function Tag({ children }: { children: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center whitespace-nowrap rounded-full px-2 text-[13px] leading-none ring-1 ring-inset",
        TONES[children] ?? "bg-raised text-fg-soft ring-line-strong dark:ring-[#3a3a3a]",
      )}
    >
      {children}
    </span>
  );
}

export function MoreTag({ n }: { n: number }) {
  return (
    <span className="inline-flex h-5 items-center rounded-full bg-raised px-1.5 text-[13px] leading-none text-fg-soft ring-1 ring-inset ring-line-strong dark:ring-[#3a3a3a]">
      +{n}
    </span>
  );
}

const TICKS = 17;
const RED = "#e07b73";
const YELLOW = "#ebc054";
const GREEN = "#5fb870";

export function WinMeter({ value }: { value: number }) {
  const filled = Math.min(TICKS, Math.ceil((value / 100) * TICKS) + 1);
  const red = filled >= 12 ? 4 : Math.round(filled * 0.31);
  const yellow = filled >= 12 ? 5 : Math.round(filled * 0.38);
  const color = (i: number) => (i >= filled ? "#3a3a3a" : i < red ? RED : i < red + yellow ? YELLOW : GREEN);
  return (
    <div className="flex items-center gap-[9px]">
      <div
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="flex h-[14px] shrink-0 items-center gap-[2px] rounded-[4px] bg-meter-box px-[2px]"
      >
        {Array.from({ length: TICKS }, (_, i) => (
          <span key={i} className="h-[10px] w-[2px] rounded-full" style={{ background: color(i) }} />
        ))}
      </div>
      <span className="w-8 text-[13px] tabular-nums">{value}%</span>
    </div>
  );
}

// g = muted bar, G = bright bar (same positions in every row of the design)
const KINDS = "gGGgGGgGgGgGGg";
const PATTERNS = [
  [3.9, 3.9, 9.6, 4.8, 2, 6.6, 10.5, 6.8, 10.5, 6.8, 10.5, 6.8, 6.8, 13.4],
  [3.9, 3.9, 4.8, 4.8, 2, 6.8, 10.5, 6.8, 4.8, 6.8, 4.8, 2.7, 6.8, 13.4],
  [3.8, 3.9, 4.8, 11.2, 4.8, 6.4, 10.5, 2.7, 10.5, 2.7, 10.5, 2.7, 6.8, 13.4],
  [4.2, 4.2, 9.8, 2.8, 2, 4.2, 7, 4.2, 10.5, 4.2, 10.5, 7, 4.2, 13.4],
];
const BAR_W = 4;
const BAR_GAP = 1.4;
const SPARK_H = 14;

export function Sparkline({ seed }: { seed: string }) {
  const hash = [...seed].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 7);
  const heights = PATTERNS[hash % PATTERNS.length];
  const width = heights.length * BAR_W + (heights.length - 1) * BAR_GAP;
  return (
    <svg width={width} height={SPARK_H} viewBox={`0 0 ${width} ${SPARK_H}`} aria-hidden className="shrink-0">
      {heights.map((h, i) => {
        const x = i * (BAR_W + BAR_GAP);
        const y = SPARK_H - h;
        const r = Math.min(1, h / 2);
        return (
          <path
            key={i}
            d={`M${x} ${SPARK_H}V${y + r}Q${x} ${y} ${x + r} ${y}H${x + BAR_W - r}Q${x + BAR_W} ${y} ${x + BAR_W} ${y + r}V${SPARK_H}Z`}
            fill={KINDS[i] === "G" ? "#52b46b" : "#435c4e"}
          />
        );
      })}
    </svg>
  );
}

const GRADS = [
  ["#e8b77a", "#c2704a"], ["#8fb4e8", "#5a6fd6"], ["#8ed1b2", "#3f9c8a"], ["#d9a0d6", "#8f6bd1"],
  ["#f0a3a3", "#cf6277"], ["#b6c97a", "#6f9a4f"], ["#9ec9d9", "#5b8fb0"], ["#e6c48a", "#b98a52"],
  ["#c4a3e8", "#7a6bd6"], ["#e9a98d", "#c4607a"],
];

export function GradientAvatar({ name, className }: { name: string; className?: string }) {
  const h = [...name].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 7);
  const [a, b] = GRADS[h % GRADS.length];
  return (
    <span
      aria-hidden
      className={cn("inline-block size-5 shrink-0 rounded-full ring-1 ring-inset ring-white/15", className)}
      style={{ backgroundImage: `linear-gradient(135deg, ${a}, ${b})` }}
    />
  );
}
