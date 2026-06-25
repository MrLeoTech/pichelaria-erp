import { Menu, Bell } from 'lucide-react'

export default function Header({ onMenuToggle }) {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 hover:bg-bg rounded-lg text-text-muted"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-text hidden sm:block">Pichelaria ERP</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-bg rounded-lg text-text-muted relative" aria-label="Notificações">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" aria-hidden="true" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium" aria-label="Utilizador">
          P
        </div>
      </div>
    </header>
  )
}
