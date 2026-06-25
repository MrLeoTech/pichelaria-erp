import StatusBadge from '../StatusBadge/StatusBadge.jsx'
import EmptyState from '../EmptyState/EmptyState.jsx'
import { Eye, Pencil, Copy, Trash2 } from 'lucide-react'

export default function ServiceTable({ servicos, onView, onEdit, onDuplicate, onDelete }) {
  if (servicos.length === 0) {
    return <EmptyState message="Nenhum serviço encontrado." />
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-bg/50">
            <th className="text-left px-4 py-3 font-medium text-text-muted text-xs uppercase tracking-wide">Nº</th>
            <th className="text-left px-4 py-3 font-medium text-text-muted text-xs uppercase tracking-wide">Data</th>
            <th className="text-left px-4 py-3 font-medium text-text-muted text-xs uppercase tracking-wide">Cliente</th>
            <th className="text-left px-4 py-3 font-medium text-text-muted text-xs uppercase hidden md:table-cell">Telefone</th>
            <th className="text-left px-4 py-3 font-medium text-text-muted text-xs uppercase tracking-wide">Estado</th>
            <th className="text-right px-4 py-3 font-medium text-text-muted text-xs uppercase tracking-wide">Total</th>
            <th className="text-right px-4 py-3 font-medium text-text-muted text-xs uppercase hidden sm:table-cell">Lucro</th>
            <th className="text-center px-4 py-3 font-medium text-text-muted text-xs uppercase tracking-wide">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {servicos.map(s => (
            <tr key={s.id} className="hover:bg-bg/50 transition-colors">
              <td className="px-4 py-3 font-medium text-text">{s.numero}</td>
              <td className="px-4 py-3 text-text-muted">{s.data}</td>
              <td className="px-4 py-3">
                <p className="font-medium text-text">{s.clienteNome}</p>
              </td>
              <td className="px-4 py-3 text-text-muted hidden md:table-cell">{s.clienteTelefone || '—'}</td>
              <td className="px-4 py-3">
                <StatusBadge estado={s.estado} />
              </td>
              <td className="px-4 py-3 text-right font-medium text-text">{Number(s.totalCliente).toFixed(2)} €</td>
              <td className={`px-4 py-3 text-right font-medium hidden sm:table-cell ${s.lucro >= 0 ? 'text-success' : 'text-danger'}`}>
                {Number(s.lucro).toFixed(2)} €
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-1">
                  <button onClick={() => onView(s)} className="p-1.5 hover:bg-accent/10 rounded-lg text-text-muted hover:text-accent transition-colors" title="Visualizar" aria-label="Visualizar serviço">
                    <Eye size={15} />
                  </button>
                  <button onClick={() => onEdit(s)} className="p-1.5 hover:bg-accent/10 rounded-lg text-text-muted hover:text-accent transition-colors" title="Editar" aria-label="Editar serviço">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => onDuplicate(s)} className="p-1.5 hover:bg-accent/10 rounded-lg text-text-muted hover:text-accent transition-colors" title="Duplicar" aria-label="Duplicar serviço">
                    <Copy size={15} />
                  </button>
                  <button onClick={() => onDelete(s)} className="p-1.5 hover:bg-danger/10 rounded-lg text-text-muted hover:text-danger transition-colors" title="Eliminar" aria-label="Eliminar serviço">
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
