import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FilePlus, ClipboardList, Users, BarChart3, Settings, X
} from 'lucide-react'

const menuItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/novo-servico', label: 'Novo Serviço', icon: FilePlus },
  { to: '/servicos', label: 'Serviços', icon: ClipboardList },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/relatorios', label: 'Relatórios', icon: BarChart3 },
  { to: '/definicoes', label: 'Definições', icon: Settings },
]

export default function Sidebar({ isOpen, onClose, isMobile }) {
  const location = useLocation()

  const sidebarClasses = `
    fixed lg:static inset-y-0 left-0 z-40
    w-64 bg-primary text-white flex flex-col
    transition-transform duration-300 ease-in-out
    ${isOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'}
  `

  return (
    <aside className={sidebarClasses} aria-label="Menu lateral">
      <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm" aria-hidden="true">P</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">Pichelaria</span>
        </div>
        {isMobile && (
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg" aria-label="Fechar menu">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1" role="navigation" aria-label="Navegação principal">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => isMobile && onClose()}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-200
                ${isActive
                  ? 'bg-accent/20 text-accent-light'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-xs text-slate-400">v1.0.0 — Release</p>
        <p className="text-xs text-slate-500 mt-0.5">Local Storage</p>
      </div>
    </aside>
  )
}
