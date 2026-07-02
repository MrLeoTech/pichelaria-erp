import Card from '../Card/Card.jsx'
import { Palette, Sun, Moon } from 'lucide-react'

export default function ThemeSettings({ settings, onChange }) {
  return (
    <Card title="Personalização" icon={Palette}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Cor Principal</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.corPrincipal}
                onChange={e => onChange('corPrincipal', e.target.value)}
                className="w-12 h-12 rounded-lg border border-border cursor-pointer"
              />
              <span className="text-sm text-text-muted font-mono">{settings.corPrincipal}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Cor Secundária</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.corSecundaria}
                onChange={e => onChange('corSecundaria', e.target.value)}
                className="w-12 h-12 rounded-lg border border-border cursor-pointer"
              />
              <span className="text-sm text-text-muted font-mono">{settings.corSecundaria}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Tema</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange('temaEscuro', false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px]
                ${!settings.temaEscuro ? 'bg-primary text-white' : 'bg-bg border border-border text-text-muted hover:border-accent'}`}
            >
              <Sun size={16} /> Claro
            </button>
            <button
              type="button"
              onClick={() => onChange('temaEscuro', true)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px]
                ${settings.temaEscuro ? 'bg-primary text-white' : 'bg-bg border border-border text-text-muted hover:border-accent'}`}
            >
              <Moon size={16} /> Escuro
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}
