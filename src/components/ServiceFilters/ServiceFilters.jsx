import { Filter, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const estados = ['Todos', 'Orçamento', 'Em execução', 'Concluído', 'Pago']
const ordenacoes = [
  { value: 'recente', label: 'Mais recente' },
  { value: 'antigo', label: 'Mais antigo' },
  { value: 'maior_valor', label: 'Maior valor' },
  { value: 'menor_valor', label: 'Menor valor' },
  { value: 'maior_lucro', label: 'Maior lucro' },
  { value: 'nome', label: 'Nome cliente' },
]

export default function ServiceFilters({ filters, onChange }) {
  const [open, setOpen] = useState(false)

  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value })
  }

  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface
          text-sm font-medium text-text hover:bg-bg transition-colors"
      >
        <Filter size={16} />
        Filtros
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="p-4 rounded-xl border border-border bg-surface space-y-4">
          {/* Estado */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-2">Estado</label>
            <div className="flex flex-wrap gap-2">
              {estados.map(e => (
                <button
                  key={e}
                  onClick={() => handleChange('estado', e)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${filters.estado === e
                      ? 'bg-primary text-white'
                      : 'bg-bg border border-border text-text-muted hover:border-accent'
                    }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Datas */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Data inicial</label>
              <input
                type="date"
                value={filters.dataInicio}
                onChange={e => handleChange('dataInicio', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Data final</label>
              <input
                type="date"
                value={filters.dataFim}
                onChange={e => handleChange('dataFim', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>
          </div>

          {/* Valor */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Valor mínimo (€)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={filters.valorMin}
                onChange={e => handleChange('valorMin', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Valor máximo (€)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={filters.valorMax}
                onChange={e => handleChange('valorMax', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>
          </div>

          {/* Ordenação */}
          <div>
            <label className="block text-xs font-medium text-text-muted mb-2">Ordenar por</label>
            <div className="flex flex-wrap gap-2">
              {ordenacoes.map(o => (
                <button
                  key={o.value}
                  onClick={() => handleChange('ordenacao', o.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${filters.ordenacao === o.value
                      ? 'bg-accent text-white'
                      : 'bg-bg border border-border text-text-muted hover:border-accent'
                    }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
