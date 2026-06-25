import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const colors = {
  success: 'bg-success/10 text-success border-success/20',
  error: 'bg-danger/10 text-danger border-danger/20',
  info: 'bg-accent/10 text-accent border-accent/20',
}

export default function Toast({ id, type = 'info', message, onRemove }) {
  const Icon = icons[type] || Info

  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), 3500)
    return () => clearTimeout(timer)
  }, [id, onRemove])

  return (
    <div role="alert" aria-live="polite"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg
        min-w-[280px] max-w-[400px] animate-in slide-in-from-right fade-in
        ${colors[type]}`}>
      <Icon size={18} aria-hidden="true" />
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={() => onRemove(id)} className="opacity-60 hover:opacity-100" aria-label="Fechar notificação">
        <X size={14} />
      </button>
    </div>
  )
}
