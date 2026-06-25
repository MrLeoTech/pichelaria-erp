import Card from '../Card/Card.jsx'
import { Package, Plus, Copy, Trash2 } from 'lucide-react'

export default function PecasForm({ pecas, onAdd, onRemove, onDuplicate, onUpdate }) {
  return (
    <Card title="Peças" icon={Package}>
      <div className="space-y-3">
        {pecas.map((peca, idx) => {
          const totalCompra = (Number(peca.quantidade) || 0) * (Number(peca.precoCompra) || 0)
          const totalVenda = (Number(peca.quantidade) || 0) * (Number(peca.precoVenda) || 0)
          const lucro = totalVenda - totalCompra

          return (
            <div key={peca.id} className="p-4 rounded-xl border border-border bg-bg/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-accent">Peça #{idx + 1}</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => onDuplicate(peca.id)}
                    className="p-1.5 hover:bg-accent/10 rounded-lg text-text-muted hover:text-accent transition-colors"
                    title="Duplicar peça" aria-label="Duplicar peça">
                    <Copy size={14} />
                  </button>
                  {pecas.length > 1 && (
                    <button type="button" onClick={() => onRemove(peca.id)}
                      className="p-1.5 hover:bg-danger/10 rounded-lg text-text-muted hover:text-danger transition-colors"
                      title="Eliminar peça" aria-label="Eliminar peça">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-text-muted mb-1">Nome</label>
                  <input type="text" value={peca.nome}
                    onChange={e => onUpdate(peca.id, 'nome', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="Nome da peça" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">Fornecedor</label>
                  <input type="text" value={peca.fornecedor}
                    onChange={e => onUpdate(peca.id, 'fornecedor', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="Fornecedor" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">Qtd</label>
                  <input type="number" min="1" value={peca.quantidade}
                    onChange={e => onUpdate(peca.id, 'quantidade', Math.max(1, Number(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">Compra (€)</label>
                  <input type="number" step="0.01" min="0" value={peca.precoCompra}
                    onChange={e => onUpdate(peca.id, 'precoCompra', Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">Venda (€)</label>
                  <input type="number" step="0.01" min="0" value={peca.precoVenda}
                    onChange={e => onUpdate(peca.id, 'precoVenda', Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="text-text-muted">Total Compra: <strong className="text-danger">{totalCompra.toFixed(2)} €</strong></span>
                <span className="text-text-muted">Total Venda: <strong className="text-success">{totalVenda.toFixed(2)} €</strong></span>
                <span className="text-text-muted">Lucro: <strong className={lucro >= 0 ? 'text-success' : 'text-danger'}>{lucro.toFixed(2)} €</strong></span>
              </div>
            </div>
          )
        })}
      </div>

      <button type="button" onClick={onAdd}
        className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-accent/30
          text-accent text-sm font-medium hover:bg-accent/5 hover:border-accent/50 transition-all">
        <Plus size={16} />
        Adicionar Peça
      </button>
    </Card>
  )
}
