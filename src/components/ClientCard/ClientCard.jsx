import { Eye, Pencil, Trash2 } from 'lucide-react'

export default function ClientCard({ cliente, onView, onEdit, onDelete }) {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-text">{cliente.clienteNome}</p>
          <p className="text-xs text-text-muted">{cliente.clienteTelefone || '—'}</p>
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent">
          {cliente.numServicos || 0} serviço{cliente.numServicos !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="text-xs text-text-muted space-y-0.5">
        {cliente.clienteEmail && <p>{cliente.clienteEmail}</p>}
        {cliente.clienteCidade && <p>{cliente.clienteCidade}</p>}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <p className="text-xs text-text-muted">Faturado: <strong className="text-text">{Number(cliente.totalFaturado || 0).toFixed(2)} €</strong></p>
        <div className="flex items-center gap-1">
          <button onClick={() => onView(cliente)} className="p-2 hover:bg-accent/10 rounded-lg text-text-muted hover:text-accent transition-colors" title="Visualizar"><Eye size={16} /></button>
          <button onClick={() => onEdit(cliente)} className="p-2 hover:bg-accent/10 rounded-lg text-text-muted hover:text-accent transition-colors" title="Editar"><Pencil size={16} /></button>
          <button onClick={() => onDelete(cliente)} className="p-2 hover:bg-danger/10 rounded-lg text-text-muted hover:text-danger transition-colors" title="Eliminar"><Trash2 size={16} /></button>
        </div>
      </div>
    </div>
  )
}
