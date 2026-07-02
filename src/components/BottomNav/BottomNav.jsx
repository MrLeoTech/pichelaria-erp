import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, ClipboardList, Users, BarChart3, FilePlus, Settings
} from 'lucide-react'
import { useIndustry } from '../../hooks/useIndustry.js'

const navItems = [
  { to: '/', label: 'Início', icon: LayoutDashboard },
  { to: '/servicos', label: 'Serviços', icon: ClipboardList, matchPrefix: true },
  { to: '/novo-servico', label: 'Novo', icon: FilePlus, isFab: true },
  { to: '/clientes', label: 'Clientes', icon: Users, matchPrefix: true },
  { to: '/definicoes', label: 'Mais', icon: Settings },
]

export default function BottomNav() {
  const location = useLocation()
  const { labels } = useIndustry()

  const isActive = (item) => {
    if (item.to === '/') return location.pathname === '/'
    if (item.matchPrefix) return location.pathname.startsWith(item.to)
    return location.pathname === item.to
  }

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-border safe-bottom"
      aria-label="Navegação inferior"
    >
      <div className="flex items-stretch justify-around px-1 pt-1 pb-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item)

          if (item.isFab) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center justify-center -mt-5 px-2"
                aria-label={labels.newService}
              >
                <span className="w-14 h-14 rounded-2xl bg-primary text-white shadow-lg flex items-center justify-center
                  hover:bg-primary-dark active:scale-95 transition-all">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span className="text-[10px] font-medium text-text-muted mt-1">{item.label}</span>
              </NavLink>
            )
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[52px] px-2 py-1.5 rounded-xl transition-colors
                ${active ? 'text-accent' : 'text-text-muted hover:text-text'}`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="text-[10px] font-medium leading-tight">
                {item.to === '/servicos' ? labels.services : item.label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
