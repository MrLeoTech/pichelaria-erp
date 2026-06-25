export default function Skeleton({ rows = 3, cols = 4 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-3">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-10 bg-slate-200 rounded-lg flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}
