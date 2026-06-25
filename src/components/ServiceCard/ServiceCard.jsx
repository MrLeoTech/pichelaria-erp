import StatusBadge from '../StatusBadge/StatusBadge.jsx'
import { Eye, Pencil, Copy, Trash2 } from 'lucide-react'

export default function ServiceCard({ servico, onView, onEdit, onDuplicate, onDelete }) {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-text">{servico.numero}</p>
          <p className="text-xs text-text-muted">{servico.data}</p>
        </div>
        <StatusBadge estado={servico.estado} />
      </div>

      <div>
        <p className="text-sm font-medium text-text">{servico.clienteNome}</p>
        <p className="text-xs text-text-muted">{servico.clienteTelefone || '—'}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="text-xs space-y-0.5">
          <p className="text-text-muted">Total: <strong className="text-text">{Number(servico.totalCliente).toFixed(2)} €</strong></p>
          <p className="text-text-muted">Lucro: <strong className={servico.lucro >= 0 ? 'text-success' : 'text-danger'}>{Number(servico.lucro).toFixed(2)} €</strong></p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => onView(servico)} className="p-2 hover:bg-accent/10 rounded-lg text-text-muted hover:text-accent transition-colors" title="Visualizar">
            <Eye size={16} />
          </button>
          <button onClick={() => onEdit(servico)} className="p-2 hover:bg-accent/10 rounded-lg text-text-muted hover:text-accent transition-colors" title="Editar">
            <Pencil size={16} />
          </button>
          <button onClick={() => onDuplicate(servico)} className="p-2 hover:bg-accent/10 rounded-lg text-text-muted hover:text-accent transition-colors" title="Duplicar">
            <Copy size={16} />
          </button>
          <button onClick={() => onDelete(servico)} className="p-2 hover:bg-danger/10 rounded-lg text-text-muted hover:text-danger transition-colors" title="Eliminar">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
