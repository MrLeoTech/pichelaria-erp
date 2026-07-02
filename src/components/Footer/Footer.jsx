import { useIndustry } from '../../hooks/useIndustry.js'

export default function Footer() {
  const { fullName } = useIndustry()

  return (
    <footer className="h-10 bg-surface border-t border-border flex items-center justify-center px-4 shrink-0 no-print">
      <p className="text-xs text-text-muted" aria-label="Versão da aplicação">
        {fullName} — v2.0.0 Multi-Área
      </p>
    </footer>
  )
}
