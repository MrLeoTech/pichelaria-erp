import Toast from './Toast.jsx'
import { useMobile } from '../../hooks/useMobile.js'

export default function ToastContainer({ toasts, onRemove }) {
  const isMobile = useMobile()

  return (
    <div
      className={`fixed z-50 flex flex-col gap-2 pointer-events-none
        ${isMobile ? 'top-4 inset-x-4' : 'top-4 right-4 max-w-sm'}`}
      role="region"
      aria-label="Notificações"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast {...t} onRemove={onRemove} />
        </div>
      ))}
    </div>
  )
}
