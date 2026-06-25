import { useReports } from '../../hooks/useReports.js'
import { useApp } from '../../context/AppContext.jsx'
import Card from '../../components/Card/Card.jsx'
import StatCard from '../../components/StatCard/StatCard.jsx'
import ReportsFilters from '../../components/ReportsFilters/ReportsFilters.jsx'
import ChartsSection from '../../components/ChartsSection/ChartsSection.jsx'
import ExportButtons from '../../components/ExportButtons/ExportButtons.jsx'
import { Euro, ShoppingCart, TrendingUp, Percent, Wrench, Users, Receipt, Award, Package, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react'

export default function Relatorios() {
  const { config } = useApp()
  const {
    periodFilter, setPeriodFilter,
    customStart, setCustomStart,
    customEnd, setCustomEnd,
    dateRange,
    filteredServicos,
    stats,
    monthlyData,
    statusData,
    topClients,
    topSuppliers,
    topPiece,
    topClient,
    topSupplier,
    totalClientes,
  } = useReports()

  const periodLabel = dateRange
    ? `${dateRange.start} a ${dateRange.end}`
    : 'Todo o período'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Relatórios</h1>
        <p className="text-sm text-text-muted mt-1">Análise e estatísticas do negócio</p>
      </div>

      <ReportsFilters
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
        customStart={customStart}
        setCustomStart={setCustomStart}
        customEnd={customEnd}
        setCustomEnd={setCustomEnd}
      />

      <ExportButtons
        servicos={filteredServicos}
        stats={stats}
        periodLabel={periodLabel.replace(/ /g, '_')}
        config={config}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Receita Total" value={`${stats.receita.toFixed(2)} €`} icon={Euro} color="success" />
        <StatCard title="Compras Totais" value={`${stats.compras.toFixed(2)} €`} icon={ShoppingCart} color="danger" />
        <StatCard title="Lucro Total" value={`${stats.lucro.toFixed(2)} €`} icon={TrendingUp} color={stats.lucro >= 0 ? 'success' : 'danger'} />
        <StatCard title="Margem Média" value={`${stats.margem.toFixed(1)}%`} icon={Percent} color="accent" />
        <StatCard title="Nº Serviços" value={stats.total} icon={Wrench} color="accent" />
        <StatCard title="Nº Clientes" value={totalClientes} icon={Users} color="accent" />
        <StatCard title="Ticket Médio" value={`${stats.ticketMedio.toFixed(2)} €`} icon={Receipt} color="warning" />
        <StatCard title="Média Lucro/Serviço" value={`${stats.mediaLucro.toFixed(2)} €`} icon={BarChart3} color="accent" />
      </div>

      {/* Extra Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Cliente Top" icon={Award}>
          <p className="text-sm font-medium text-text">{topClient?.name || '—'}</p>
          <p className="text-xs text-text-muted">{topClient ? `${topClient.faturado.toFixed(2)} € — ${topClient.servicos} serviços` : ''}</p>
        </Card>
        <Card title="Fornecedor Top" icon={Truck}>
          <p className="text-sm font-medium text-text">{topSupplier?.name || '—'}</p>
          <p className="text-xs text-text-muted">{topSupplier ? `${topSupplier.usos} utilizações` : ''}</p>
        </Card>
        <Card title="Peça Mais Usada" icon={Package}>
          <p className="text-sm font-medium text-text">{topPiece?.name || '—'}</p>
          <p className="text-xs text-text-muted">{topPiece ? `${topPiece.qtd} unidades` : ''}</p>
        </Card>
        <Card title="Lucros Extremos" icon={BarChart3}>
          <div className="space-y-1 text-sm">
            <p className="flex justify-between"><span className="text-text-muted">Maior:</span><span className="text-success font-medium">{stats.maiorLucro.toFixed(2)} €</span></p>
            <p className="flex justify-between"><span className="text-text-muted">Menor:</span><span className="text-danger font-medium">{stats.menorLucro.toFixed(2)} €</span></p>
          </div>
        </Card>
      </div>

      <ChartsSection
        monthlyData={monthlyData}
        statusData={statusData}
        topClients={topClients}
        topSuppliers={topSuppliers}
      />
    </div>
  )
}
