import { AlertTriangle, X } from 'lucide-react'

export default function DeleteClientModal({ isOpen, cliente, hasServices, onConfirm, onCancel }) {
  if (!isOpen || !cliente) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-surface rounded-2xl border border-border shadow-2xl p-6 max-w-sm w-full animate-in zoom-in-95 fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center">
            <AlertTriangle size={20} className="text-danger" />
          </div>
          <h3 className="text-lg font-semibold text-text">Eliminar Cliente?</h3>
        </div>

        {hasServices ? (
          <>
            <p className="text-sm text-text-muted mb-1">
              O cliente <strong className="text-text">{cliente.clienteNome}</strong> possui serviços associados.
            </p>
            <p className="text-sm text-danger mb-6">
              Não é possível eliminar clientes com serviços registados.
            </p>
            <button
              onClick={onCancel}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-sm font-medium text-text hover:bg-slate-100 transition-colors"
            >
              Entendido
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-text-muted mb-6">
              Tens a certeza que queres eliminar <strong className="text-text">{cliente.clienteNome}</strong>?
            </p>
            <div className="flex gap-3">
              <button onClick={onCancel}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-bg text-sm font-medium text-text hover:bg-slate-100 transition-colors">
                Cancelar
              </button>
              <button onClick={onConfirm}
                className="flex-1 px-4 py-2.5 rounded-lg bg-danger text-white text-sm font-semibold hover:bg-red-600 transition-colors shadow-sm">
                Eliminar
              </button>
            </div>
          </>
        )}

        <button onClick={onCancel} className="absolute top-4 right-4 p-1 hover:bg-bg rounded-lg text-text-muted">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
