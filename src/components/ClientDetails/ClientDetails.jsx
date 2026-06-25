import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import { getClientStats } from '../../utils/clientUtils.js'
import Card from '../Card/Card.jsx'
import StatusBadge from '../StatusBadge/StatusBadge.jsx'
import { ArrowLeft, User, Phone, Mail, MapPin, FileText, TrendingUp, Calculator, Calendar } from 'lucide-react'

export default function ClientDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { clientes, servicos } = useApp()

  const cliente = clientes.find(c => c.id === id)
  if (!cliente) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Cliente não encontrado.</p>
        <button onClick={() => navigate('/clientes')} className="mt-4 text-accent text-sm font-medium hover:underline">Voltar aos Clientes</button>
      </div>
    )
  }

  const stats = getClientStats(cliente, servicos)
  const clientServicos = servicos.filter(s => s.clienteNome === cliente.clienteNome)
    .sort((a, b) => new Date(b.data) - new Date(a.data))

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button onClick={() => navigate('/clientes')} className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors">
        <ArrowLeft size={16} /> Voltar aos Clientes
      </button>

      <div>
        <h1 className="text-2xl font-bold text-text">{cliente.clienteNome}</h1>
        <p className="text-sm text-text-muted mt-1">Cliente desde {cliente.dataCriacao || '—'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Serviços" icon={FileText}><p className="text-2xl font-bold text-text">{stats.numServicos}</p></Card>
        <Card title="Faturado" icon={Calculator}><p className="text-2xl font-bold text-text">{stats.totalFaturado.toFixed(2)} €</p></Card>
        <Card title="Lucro" icon={TrendingUp}><p className={`text-2xl font-bold ${stats.lucroTotal >= 0 ? 'text-success' : 'text-danger'}`}>{stats.lucroTotal.toFixed(2)} €</p></Card>
        <Card title="Margem Média" icon={TrendingUp}><p className={`text-2xl font-bold ${stats.margemMedia >= 0 ? 'text-success' : 'text-danger'}`}>{stats.margemMedia.toFixed(1)}%</p></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Dados do Cliente" icon={User}>
          <div className="space-y-2 text-sm">
            {cliente.clienteTelefone && <p className="flex items-center gap-2 text-text-muted"><Phone size={14} /> {cliente.clienteTelefone}</p>}
            {cliente.clienteEmail && <p className="flex items-center gap-2 text-text-muted"><Mail size={14} /> {cliente.clienteEmail}</p>}
            {cliente.clienteMorada && <p className="flex items-center gap-2 text-text-muted"><MapPin size={14} /> {cliente.clienteMorada}</p>}
            {cliente.clienteCodigoPostal && <p className="text-text-muted">{cliente.clienteCodigoPostal} {cliente.clienteCidade}</p>}
            {cliente.clienteNif && <p className="text-text-muted">NIF: {cliente.clienteNif}</p>}
            {cliente.observacoes && <p className="text-text-muted pt-2 border-t border-border">{cliente.observacoes}</p>}
          </div>
        </Card>

        <Card title="Último Serviço" icon={Calendar}>
          {stats.ultimoServico ? (
            <div className="space-y-2 text-sm">
              <p className="font-medium text-text">{stats.ultimoServico.numero}</p>
              <p className="text-text-muted">{stats.ultimoServico.data}</p>
              <p className="text-text">{stats.ultimoServico.descricao || 'Sem descrição'}</p>
              <StatusBadge estado={stats.ultimoServico.estado} />
              <p className="text-text font-medium pt-2">{Number(stats.ultimoServico.totalCliente || 0).toFixed(2)} €</p>
            </div>
          ) : (
            <p className="text-sm text-text-muted">Sem serviços registados.</p>
          )}
        </Card>
      </div>

      <Card title="Histórico de Serviços" icon={FileText}>
        {clientServicos.length === 0 ? (
          <p className="text-sm text-text-muted">Este cliente ainda não tem serviços.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-muted text-xs">
                  <th className="text-left py-2">Nº</th>
                  <th className="text-left py-2">Data</th>
                  <th className="text-left py-2">Descrição</th>
                  <th className="text-left py-2">Estado</th>
                  <th className="text-right py-2">Total</th>
                  <th className="text-right py-2">Lucro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {clientServicos.map(s => (
                  <tr key={s.id} className="hover:bg-bg/50">
                    <td className="py-2 font-medium text-text">{s.numero}</td>
                    <td className="py-2 text-text-muted">{s.data}</td>
                    <td className="py-2 text-text">{s.descricao?.slice(0, 30) || '—'}...</td>
                    <td className="py-2"><StatusBadge estado={s.estado} /></td>
                    <td className="py-2 text-right font-medium text-text">{Number(s.totalCliente || 0).toFixed(2)} €</td>
                    <td className={`py-2 text-right font-medium ${(s.lucro || 0) >= 0 ? 'text-success' : 'text-danger'}`}>{Number(s.lucro || 0).toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
