import Card from '../Card/Card.jsx'
import { Hammer } from 'lucide-react'

export default function MaoObraForm({ form, updateField, laborLabel = 'Mão de Obra' }) {
  const isFixo = form.maoObraModo === 'fixo'

  return (
    <Card title={laborLabel} icon={Hammer}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => updateField('maoObraModo', 'fixo')}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
              ${isFixo
                ? 'bg-primary text-white shadow-sm'
                : 'bg-bg border border-border text-text-muted hover:border-accent'
              }`}
          >
            Preço Fixo
          </button>
          <button
            type="button"
            onClick={() => updateField('maoObraModo', 'horas')}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
              ${!isFixo
                ? 'bg-primary text-white shadow-sm'
                : 'bg-bg border border-border text-text-muted hover:border-accent'
              }`}
          >
            Horas × Valor Hora
          </button>
        </div>

        {isFixo ? (
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Preço Fixo (€)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.maoObraValor}
              onChange={e => updateField('maoObraValor', Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
                focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Horas</label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={form.maoObraHoras}
                onChange={e => updateField('maoObraHoras', Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Preço/Hora (€)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.maoObraPrecoHora}
                onChange={e => updateField('maoObraPrecoHora', Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
