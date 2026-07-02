import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FilePlus, ClipboardList, Users, BarChart3, Settings, X
} from 'lucide-react'
import { useIndustry } from '../../hooks/useIndustry.js'
import { useApp } from '../../context/AppContext.jsx'

export default function Sidebar({ isOpen, onClose, isMobile }) {
  const location = useLocation()
  const { appName, labels, profile } = useIndustry()
  const { settings } = useApp()

  const menuItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/novo-servico', label: labels.newService, icon: FilePlus },
    { to: '/servicos', label: labels.services, icon: ClipboardList },
    { to: '/clientes', label: 'Clientes', icon: Users },
    { to: '/relatorios', label: 'Relatórios', icon: BarChart3 },
    { to: '/definicoes', label: 'Definições', icon: Settings },
  ]

  const sidebarClasses = `
    fixed lg:static inset-y-0 left-0 z-40
    w-64 bg-primary text-white flex flex-col safe-top
    transition-transform duration-300 ease-in-out
    ${isOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'}
  `

  const logoLetter = appName.charAt(0).toUpperCase()

  return (
    <aside className={sidebarClasses} aria-label="Menu lateral">
      <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {settings.empresaLogo ? (
            <img src={settings.empresaLogo} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm" aria-hidden="true">{logoLetter}</span>
            </div>
          )}
          <div className="min-w-0">
            <span className="font-semibold text-base tracking-tight block truncate">{appName}</span>
            <span className="text-[10px] text-slate-400 block truncate">{profile.tagline}</span>
          </div>
        </div>
        {isMobile && (
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Fechar menu">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto" role="navigation" aria-label="Navegação principal">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => isMobile && onClose()}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium
                transition-colors duration-200 min-h-[44px]
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

      <div className="px-5 py-4 border-t border-white/10 shrink-0 safe-bottom">
        <p className="text-xs text-slate-400">v2.0.0 — Multi-Área</p>
        <p className="text-xs text-slate-500 mt-0.5">Dados locais · Offline</p>
      </div>
    </aside>
  )
}
