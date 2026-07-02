import Card from '../Card/Card.jsx'
import { Briefcase } from 'lucide-react'
import { industryList } from '../../config/industryProfiles.js'

export default function IndustrySettings({ settings, onChange }) {
  return (
    <Card title="Área de Trabalho" icon={Briefcase}>
      <p className="text-sm text-text-muted mb-4">
        Selecione a área de atividade para adaptar a terminologia da aplicação.
        Pode mudar a qualquer momento sem perder dados.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {industryList.map((industry) => {
          const selected = settings.areaTrabalho === industry.id
          return (
            <button
              key={industry.id}
              type="button"
              onClick={() => onChange('areaTrabalho', industry.id)}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all
                min-h-[72px] active:scale-[0.98]
                ${selected
                  ? 'border-accent bg-accent/5 shadow-sm'
                  : 'border-border bg-bg hover:border-accent/40 hover:bg-surface'
                }`}
            >
              <span className="text-2xl shrink-0" aria-hidden="true">{industry.icon}</span>
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${selected ? 'text-accent' : 'text-text'}`}>
                  {industry.name}
                </p>
                <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{industry.tagline}</p>
              </div>
            </button>
          )
        })}
      </div>
    </Card>
  )
}
