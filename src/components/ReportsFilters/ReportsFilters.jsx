import { Calendar } from 'lucide-react'

const periods = [
  { value: 'hoje', label: 'Hoje' },
  { value: 'ontem', label: 'Ontem' },
  { value: 'semana', label: 'Esta Semana' },
  { value: '30dias', label: 'Últimos 30 dias' },
  { value: 'mes', label: 'Este Mês' },
  { value: 'ano', label: 'Ano Atual' },
  { value: 'personalizado', label: 'Personalizado' },
]

export default function ReportsFilters({ periodFilter, setPeriodFilter, customStart, setCustomStart, customEnd, setCustomEnd }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar size={18} className="text-accent" />
        <span className="text-sm font-semibold text-text">Período</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {periods.map(p => (
          <button key={p.value} onClick={() => setPeriodFilter(p.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${periodFilter === p.value ? 'bg-primary text-white' : 'bg-bg border border-border text-text-muted hover:border-accent'}`}>
            {p.label}
          </button>
        ))}
      </div>
      {periodFilter === 'personalizado' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Data Inicial</label>
            <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Data Final</label>
            <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
          </div>
        </div>
      )}
    </div>
  )
}
