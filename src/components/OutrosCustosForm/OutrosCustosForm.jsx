import Card from '../Card/Card.jsx'
import { Truck, Droplets, MoreHorizontal } from 'lucide-react'

export default function OutrosCustosForm({ form, updateField }) {
  const fields = [
    { label: 'Deslocação (€)', key: 'custoDeslocacao', icon: Truck },
    { label: 'Consumíveis (€)', key: 'custoConsumiveis', icon: Droplets },
    { label: 'Outros (€)', key: 'custoOutros', icon: MoreHorizontal },
  ]

  return (
    <Card title="Outros Custos" icon={MoreHorizontal}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {fields.map((f) => {
          const Icon = f.icon
          return (
            <div key={f.key}>
              <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
                <Icon size={14} className="text-accent" />
                {f.label}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form[f.key]}
                onChange={e => updateField(f.key, Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>
          )
        })}
      </div>
    </Card>
  )
}
