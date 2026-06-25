import Card from '../Card/Card.jsx'
import { BarChart3 } from 'lucide-react'
import { getStorageStats } from '../../utils/backupUtils.js'

export default function StatisticsPanel({ clientes, servicos }) {
  const stats = getStorageStats(clientes, servicos)

  const items = [
    { label: 'Espaço Utilizado', value: `${stats.spaceUsed} KB`, color: 'text-text' },
    { label: 'Clientes', value: stats.totalClientes, color: 'text-accent' },
    { label: 'Serviços', value: stats.totalServicos, color: 'text-accent' },
    { label: 'Peças', value: stats.totalPecas, color: 'text-accent' },
    { label: 'Total Faturado', value: `${stats.totalFaturado.toFixed(2)} €`, color: 'text-success' },
    { label: 'Lucro Total', value: `${stats.lucroTotal.toFixed(2)} €`, color: stats.lucroTotal >= 0 ? 'text-success' : 'text-danger' },
  ]

  return (
    <Card title="Estatísticas" icon={BarChart3}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.label} className="p-3 rounded-lg bg-bg border border-border">
            <p className="text-xs text-text-muted">{item.label}</p>
            <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
