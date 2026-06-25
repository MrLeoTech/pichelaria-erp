export default function StatCard({ title, value, icon: Icon, trend, color = 'accent' }) {
  const colorMap = {
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    danger: 'bg-danger/10 text-danger',
    warning: 'bg-warning/10 text-warning',
  }

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-5" role="region" aria-label={title}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-muted font-medium">{title}</p>
          <p className="text-2xl font-bold text-text mt-1">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs mt-1 font-medium ${trend >= 0 ? 'text-success' : 'text-danger'}`}>
              {trend >= 0 ? '+' : ''}{trend}% vs mês anterior
            </p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`} aria-hidden="true">
          {Icon && <Icon size={20} />}
        </div>
      </div>
    </div>
  )
}
