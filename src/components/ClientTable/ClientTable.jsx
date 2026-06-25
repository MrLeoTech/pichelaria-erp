import EmptyState from '../EmptyState/EmptyState.jsx'
import { Eye, Pencil, Trash2 } from 'lucide-react'

export default function ClientTable({ clientes, onView, onEdit, onDelete }) {
  if (clientes.length === 0) {
    return <EmptyState message="Nenhum cliente encontrado." />
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-bg/50">
            <th className="text-left px-4 py-3 font-medium text-text-muted text-xs uppercase">Nome</th>
            <th className="text-left px-4 py-3 font-medium text-text-muted text-xs uppercase hidden sm:table-cell">Telefone</th>
            <th className="text-left px-4 py-3 font-medium text-text-muted text-xs uppercase hidden lg:table-cell">Email</th>
            <th className="text-left px-4 py-3 font-medium text-text-muted text-xs uppercase hidden md:table-cell">Cidade</th>
            <th className="text-left px-4 py-3 font-medium text-text-muted text-xs uppercase hidden md:table-cell">NIF</th>
            <th className="text-right px-4 py-3 font-medium text-text-muted text-xs uppercase">Serviços</th>
            <th className="text-right px-4 py-3 font-medium text-text-muted text-xs uppercase hidden sm:table-cell">Faturado</th>
            <th className="text-center px-4 py-3 font-medium text-text-muted text-xs uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {clientes.map(c => (
            <tr key={c.id} className="hover:bg-bg/50 transition-colors">
              <td className="px-4 py-3 font-medium text-text">{c.clienteNome}</td>
              <td className="px-4 py-3 text-text-muted hidden sm:table-cell">{c.clienteTelefone || '—'}</td>
              <td className="px-4 py-3 text-text-muted hidden lg:table-cell">{c.clienteEmail || '—'}</td>
              <td className="px-4 py-3 text-text-muted hidden md:table-cell">{c.clienteCidade || '—'}</td>
              <td className="px-4 py-3 text-text-muted hidden md:table-cell">{c.clienteNif || '—'}</td>
              <td className="px-4 py-3 text-right font-medium text-text">{c.numServicos || 0}</td>
              <td className="px-4 py-3 text-right font-medium text-text hidden sm:table-cell">{Number(c.totalFaturado || 0).toFixed(2)} €</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-1">
                  <button onClick={() => onView(c)} className="p-1.5 hover:bg-accent/10 rounded-lg text-text-muted hover:text-accent transition-colors" title="Visualizar" aria-label="Visualizar cliente">
                    <Eye size={15} />
                  </button>
                  <button onClick={() => onEdit(c)} className="p-1.5 hover:bg-accent/10 rounded-lg text-text-muted hover:text-accent transition-colors" title="Editar" aria-label="Editar cliente">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => onDelete(c)} className="p-1.5 hover:bg-danger/10 rounded-lg text-text-muted hover:text-danger transition-colors" title="Eliminar" aria-label="Eliminar cliente">
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
