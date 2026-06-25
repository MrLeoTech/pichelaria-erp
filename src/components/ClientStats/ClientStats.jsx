import StatCard from '../StatCard/StatCard.jsx'
import { Users, UserCheck, Crown } from 'lucide-react'

export default function ClientStats({ clientes, servicos }) {
  const totalClientes = clientes.length
  const clientesAtivos = clientes.filter(c => (c.numServicos || 0) > 0).length
  const topCliente = [...clientes].sort((a, b) => (b.totalFaturado || 0) - (a.totalFaturado || 0))[0]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard title="Clientes Totais" value={totalClientes} icon={Users} color="accent" />
      <StatCard title="Clientes Ativos" value={clientesAtivos} icon={UserCheck} color="success" />
      <StatCard
        title="Maior Faturação"
        value={topCliente ? `${topCliente.clienteNome} — ${Number(topCliente.totalFaturado || 0).toFixed(2)} €` : '—'}
        icon={Crown}
        color="warning"
      />
    </div>
  )
}
