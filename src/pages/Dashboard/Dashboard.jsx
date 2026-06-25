import { useMemo } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import Card from '../../components/Card/Card.jsx'
import StatCard from '../../components/StatCard/StatCard.jsx'
import MonthlyChart from '../../components/MonthlyChart/MonthlyChart.jsx'
import PieStatusChart from '../../components/PieStatusChart/PieStatusChart.jsx'
import { getClientStats } from '../../utils/clientUtils.js'
import { getMonthlyData, getStatusData } from '../../utils/reportUtils.js'
import {
  Wrench, ShoppingCart, Euro, TrendingUp, Clock, CheckCircle, Users, UserCheck, Crown
} from 'lucide-react'

export default function Dashboard() {
  const { servicos, clientes } = useApp()

  const totalServicos = servicos.length
  const totalPendentes = servicos.filter(s => s.estado === 'Em execução').length
  const totalPagos = servicos.filter(s => s.estado === 'Pago').length

  const totalCompras = servicos.reduce((sum, s) => sum + (s.totalCompra || 0), 0)
  const totalVendas = servicos.reduce((sum, s) => sum + (s.totalVenda || 0), 0)
  const lucroTotal = totalVendas - totalCompras

  const enrichedClientes = useMemo(() => clientes.map(c => getClientStats(c, servicos)), [clientes, servicos])
  const clientesAtivos = enrichedClientes.filter(c => c.numServicos > 0).length
  const topCliente = useMemo(() => [...enrichedClientes].sort((a, b) => b.totalFaturado - a.totalFaturado)[0], [enrichedClientes])

  const monthlyData = useMemo(() => getMonthlyData(servicos), [servicos])
  const statusData = useMemo(() => getStatusData(servicos), [servicos])

  const servicosRecentes = useMemo(() => [...servicos]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 5), [servicos])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-sm text-text-muted mt-1">Visão geral do negócio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Serviços" value={totalServicos} icon={Wrench} color="accent" />
        <StatCard title="Compras" value={`${totalCompras.toFixed(2)} €`} icon={ShoppingCart} color="danger" />
        <StatCard title="Vendas" value={`${totalVendas.toFixed(2)} €`} icon={Euro} color="success" />
        <StatCard title="Lucro Total" value={`${lucroTotal.toFixed(2)} €`} icon={TrendingUp} color={lucroTotal >= 0 ? 'success' : 'danger'} />
        <StatCard title="Pendentes" value={totalPendentes} icon={Clock} color="warning" />
        <StatCard title="Pagos" value={totalPagos} icon={CheckCircle} color="success" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Clientes Totais" value={clientes.length} icon={Users} color="accent" />
        <StatCard title="Clientes Ativos" value={clientesAtivos} icon={UserCheck} color="success" />
        <StatCard title="Maior Faturação" value={topCliente ? `${topCliente.clienteNome} — ${topCliente.totalFaturado.toFixed(2)} €` : '—'} icon={Crown} color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Receita & Lucro por Mês" icon={TrendingUp}>
          <MonthlyChart data={monthlyData} />
        </Card>
        <Card title="Estado dos Serviços" icon={Clock}>
          <PieStatusChart data={statusData} />
        </Card>
      </div>

      <Card title="Últimos Serviços" icon={Wrench}>
        <div className="space-y-3">
          {servicosRecentes.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-4">Nenhum serviço registado.</p>
          ) : (
            servicosRecentes.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-text">{s.clienteNome || 'Cliente'}</p>
                  <p className="text-xs text-text-muted">{s.descricao?.slice(0, 30)}...</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  s.estado === 'Pago' ? 'bg-success/10 text-success' :
                  s.estado === 'Concluído' ? 'bg-accent/10 text-accent' :
                  s.estado === 'Em execução' ? 'bg-warning/10 text-warning' :
                  'bg-text-muted/10 text-text-muted'
                }`}>{s.estado}</span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
