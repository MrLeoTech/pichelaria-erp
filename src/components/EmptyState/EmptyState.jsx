import { Inbox } from 'lucide-react'

export default function EmptyState({ message = 'Nenhum dado encontrado.', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center mb-3">
        <Inbox size={20} className="text-text-muted" />
      </div>
      <p className="text-sm text-text-muted">{message}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
