import { Menu } from 'lucide-react'
import { useIndustry } from '../../hooks/useIndustry.js'
import { useApp } from '../../context/AppContext.jsx'

export default function Header({ onMenuToggle }) {
  const { fullName, appName } = useIndustry()
  const { settings } = useApp()
  const logoLetter = appName.charAt(0).toUpperCase()

  return (
    <header className="h-14 lg:h-16 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-6 shrink-0 safe-top">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2.5 hover:bg-bg rounded-xl text-text-muted min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-base lg:text-lg font-semibold text-text truncate">{fullName}</h1>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {settings.empresaLogo ? (
          <img src={settings.empresaLogo} alt="" className="w-9 h-9 rounded-full object-cover border border-border" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium" aria-label="Empresa">
            {logoLetter}
          </div>
        )}
      </div>
    </header>
  )
}
