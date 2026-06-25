import Card from '../Card/Card.jsx'
import LogoUploader from '../LogoUploader/LogoUploader.jsx'
import { Building2 } from 'lucide-react'

const fields = [
  { label: 'Nome da Empresa', key: 'empresaNome', required: true },
  { label: 'Telefone', key: 'empresaTelefone' },
  { label: 'Telemóvel', key: 'empresaTelemovel' },
  { label: 'Email', key: 'empresaEmail', type: 'email' },
  { label: 'Website', key: 'empresaWebsite' },
  { label: 'NIF', key: 'empresaNif' },
  { label: 'Morada', key: 'empresaMorada' },
  { label: 'Código Postal', key: 'empresaCodigoPostal' },
  { label: 'Cidade', key: 'empresaCidade' },
  { label: 'País', key: 'empresaPais' },
]

export default function CompanyForm({ settings, onChange }) {
  return (
    <Card title="Dados da Empresa" icon={Building2}>
      <div className="space-y-4">
        <LogoUploader value={settings.empresaLogo} onChange={v => onChange('empresaLogo', v)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key} className={f.key === 'empresaMorada' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-text mb-1.5">
                {f.label} {f.required && <span className="text-danger">*</span>}
              </label>
              <input
                type={f.type || 'text'}
                value={settings[f.key] || ''}
                onChange={e => onChange(f.key, e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                placeholder={f.label}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
