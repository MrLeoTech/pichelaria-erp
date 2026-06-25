import Toast from './Toast.jsx'

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2" role="region" aria-label="Notificações">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onRemove={onRemove} />
      ))}
    </div>
  )
}
