import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import Card from '../../components/Card/Card.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'
import PdfActions from '../../components/PdfActions/PdfActions.jsx'
import {
  ArrowLeft, User, Phone, Mail, MapPin, FileText, Package, Hammer,
  Truck, Droplets, MoreHorizontal, Calculator, TrendingUp, StickyNote
} from 'lucide-react'

export default function ServicoDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { servicos, config } = useApp()

  const servico = servicos.find(s => s.id === id)

  if (!servico) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Serviço não encontrado.</p>
        <button onClick={() => navigate('/servicos')} className="mt-4 text-accent text-sm font-medium hover:underline">
          Voltar aos Serviços
        </button>
      </div>
    )
  }

  const pecas = servico.pecas || []
  const totalCompraPecas = pecas.reduce((s, p) => s + (Number(p.quantidade)||0)*(Number(p.precoCompra)||0), 0)
  const totalVendaPecas = pecas.reduce((s, p) => s + (Number(p.quantidade)||0)*(Number(p.precoVenda)||0), 0)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/servicos')}
        className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar aos Serviços
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">{servico.numero}</h1>
          <p className="text-sm text-text-muted mt-1">{servico.data}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge estado={servico.estado} />
        </div>
      </div>

      <PdfActions servico={servico} config={config} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Cliente" icon={User}>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-text text-base">{servico.clienteNome}</p>
            {servico.clienteTelefone && <p className="flex items-center gap-2 text-text-muted"><Phone size={14} /> {servico.clienteTelefone}</p>}
            {servico.clienteEmail && <p className="flex items-center gap-2 text-text-muted"><Mail size={14} /> {servico.clienteEmail}</p>}
            {servico.clienteMorada && <p className="flex items-center gap-2 text-text-muted"><MapPin size={14} /> {servico.clienteMorada}</p>}
            {servico.clienteNif && <p className="text-text-muted">NIF: {servico.clienteNif}</p>}
          </div>
        </Card>

        <Card title="Descrição" icon={FileText}>
          <p className="text-sm text-text">{servico.descricao || 'Sem descrição.'}</p>
        </Card>
      </div>

      <Card title="Peças" icon={Package}>
        {pecas.length === 0 ? (
          <p className="text-sm text-text-muted">Sem peças registadas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-muted text-xs">
                  <th className="text-left py-2">Nome</th>
                  <th className="text-left py-2">Fornecedor</th>
                  <th className="text-right py-2">Qtd</th>
                  <th className="text-right py-2">Compra</th>
                  <th className="text-right py-2">Venda</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pecas.map(p => (
                  <tr key={p.id}>
                    <td className="py-2 text-text">{p.nome || '—'}</td>
                    <td className="py-2 text-text-muted">{p.fornecedor || '—'}</td>
                    <td className="py-2 text-right text-text">{p.quantidade}</td>
                    <td className="py-2 text-right text-danger">{Number(p.precoCompra).toFixed(2)} €</td>
                    <td className="py-2 text-right text-success">{Number(p.precoVenda).toFixed(2)} €</td>
                    <td className="py-2 text-right font-medium text-text">{((Number(p.quantidade)||0)*(Number(p.precoVenda)||0)).toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border font-medium">
                  <td colSpan={5} className="py-2 text-right text-text-muted">Total Compra:</td>
                  <td className="py-2 text-right text-danger">{totalCompraPecas.toFixed(2)} €</td>
                </tr>
                <tr>
                  <td colSpan={5} className="py-2 text-right text-text-muted">Total Venda:</td>
                  <td className="py-2 text-right text-success">{totalVendaPecas.toFixed(2)} €</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Mão de Obra & Custos" icon={Hammer}>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-text-muted">Mão de Obra</span><span className="font-medium text-text">{Number(servico.maoObra||0).toFixed(2)} €</span></div>
            <div className="flex justify-between"><span className="text-text-muted flex items-center gap-1"><Truck size={14} /> Deslocação</span><span className="font-medium text-text">{Number(servico.custoDeslocacao||0).toFixed(2)} €</span></div>
            <div className="flex justify-between"><span className="text-text-muted flex items-center gap-1"><Droplets size={14} /> Consumíveis</span><span className="font-medium text-text">{Number(servico.custoConsumiveis||0).toFixed(2)} €</span></div>
            <div className="flex justify-between"><span className="text-text-muted flex items-center gap-1"><MoreHorizontal size={14} /> Outros</span><span className="font-medium text-text">{Number(servico.custoOutros||0).toFixed(2)} €</span></div>
          </div>
        </Card>

        <Card title="Totais & Lucro" icon={Calculator}>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-text-muted">Subtotal</span><span className="font-medium text-text">{Number(servico.subtotal||0).toFixed(2)} €</span></div>
            <div className="flex justify-between"><span className="text-text-muted">IVA</span><span className="font-medium text-text">{Number(servico.ivaValor||0).toFixed(2)} €</span></div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="text-text-muted font-medium">Total Cliente</span>
              <span className="font-bold text-text text-lg">{Number(servico.totalCliente||0).toFixed(2)} €</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-text-muted flex items-center gap-1"><TrendingUp size={14} /> Lucro</span>
              <span className={`font-bold ${(servico.lucro||0)>=0?'text-success':'text-danger'}`}>{Number(servico.lucro||0).toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Margem</span>
              <span className={`font-medium ${(servico.margem||0)>=0?'text-success':'text-danger'}`}>{Number(servico.margem||0).toFixed(1)}%</span>
            </div>
          </div>
        </Card>
      </div>

      {servico.observacoes && (
        <Card title="Observações" icon={StickyNote}>
          <p className="text-sm text-text">{servico.observacoes}</p>
        </Card>
      )}
    </div>
  )
}
