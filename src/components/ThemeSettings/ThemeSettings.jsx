import Card from '../Card/Card.jsx'
import { Palette, Sun, Moon } from 'lucide-react'

export default function ThemeSettings({ settings, onChange }) {
  return (
    <Card title="Personalização" icon={Palette}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Cor Principal</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.corPrincipal}
                onChange={e => onChange('corPrincipal', e.target.value)}
                className="w-10 h-10 rounded-lg border border-border cursor-pointer"
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
                className="w-10 h-10 rounded-lg border border-border cursor-pointer"
              />
              <span className="text-sm text-text-muted font-mono">{settings.corSecundaria}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Tema</label>
          <div className="flex gap-2">
            <button
              onClick={() => onChange('temaEscuro', false)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${!settings.temaEscuro ? 'bg-primary text-white' : 'bg-bg border border-border text-text-muted hover:border-accent'}`}
            >
              <Sun size={16} /> Claro
            </button>
            <button
              onClick={() => onChange('temaEscuro', true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${settings.temaEscuro ? 'bg-primary text-white' : 'bg-bg border border-border text-text-muted hover:border-accent'}`}
            >
              <Moon size={16} /> Escuro
            </button>
          </div>
          {settings.temaEscuro && (
            <p className="text-xs text-warning mt-2">Tema escuro em preparação para futura versão.</p>
          )}
        </div>
      </div>
    </Card>
  )
}
