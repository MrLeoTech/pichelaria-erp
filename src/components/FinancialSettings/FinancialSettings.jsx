import Card from '../Card/Card.jsx'
import { Euro } from 'lucide-react'

const fields = [
  { label: 'IVA Padrão (%)', key: 'ivaPercentagem', type: 'number', min: 0, max: 100, step: 0.01 },
  { label: 'Preço Hora Padrão (€)', key: 'precoHoraPadrao', type: 'number', min: 0, step: 0.01 },
  { label: 'Moeda', key: 'moeda' },
  { label: 'Símbolo', key: 'simboloMoeda' },
  { label: 'Casas Decimais', key: 'casasDecimais', type: 'number', min: 0, max: 4, step: 1 },
]

export default function FinancialSettings({ settings, onChange }) {
  return (
    <Card title="Configuração Financeira" icon={Euro}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-text mb-1.5">{f.label}</label>
            <input
              type={f.type || 'text'}
              min={f.min}
              max={f.max}
              step={f.step}
              value={settings[f.key]}
              onChange={e => onChange(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
                focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
