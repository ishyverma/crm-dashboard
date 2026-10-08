/** Matches the toolbar + rows layout, so nothing jumps if the table ever suspends. */
export function TableSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col" aria-hidden>
      <div className="flex gap-2 overflow-hidden border-b border-border px-3 py-3 sm:px-4 md:py-4">
        {[132, 118, 96, 128].map((w, i) => (
          <div key={i} style={{ width: w }} className="h-8 shrink-0 rounded-full bg-surface md:h-7" />
        ))}
      </div>
      <div className="flex-1 overflow-hidden">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            style={{ animationDelay: `${i * 60}ms` }}
            className="h-10 animate-pulse border-t border-border bg-white/1.5"
          />
        ))}
      </div>
    </div>
  );
}
