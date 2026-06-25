import Card from '../Card/Card.jsx'
import MonthlyChart from '../MonthlyChart/MonthlyChart.jsx'
import PieStatusChart from '../PieStatusChart/PieStatusChart.jsx'
import TopClients from '../TopClients/TopClients.jsx'
import TopSuppliers from '../TopSuppliers/TopSuppliers.jsx'
import { BarChart3, PieChart, Users, Truck } from 'lucide-react'

export default function ChartsSection({ monthlyData, statusData, topClients, topSuppliers }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Receita & Lucro por Mês" icon={BarChart3}>
        <MonthlyChart data={monthlyData} />
      </Card>
      <Card title="Estado dos Serviços" icon={PieChart}>
        <PieStatusChart data={statusData} />
      </Card>
      <Card title="Top 10 Clientes" icon={Users}>
        <TopClients data={topClients.slice(0, 10)} />
      </Card>
      <Card title="Top 10 Fornecedores" icon={Truck}>
        <TopSuppliers data={topSuppliers.slice(0, 10)} />
      </Card>
    </div>
  )
}
