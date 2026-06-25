import Card from '../Card/Card.jsx'
import { User } from 'lucide-react'

export default function ClienteForm({ form, updateField }) {
  const fields = [
    { label: 'Nome', key: 'clienteNome', type: 'text', required: true },
    { label: 'Telefone', key: 'clienteTelefone', type: 'tel' },
    { label: 'Email', key: 'clienteEmail', type: 'email' },
    { label: 'Morada', key: 'clienteMorada', type: 'text' },
    { label: 'Código Postal', key: 'clienteCodigoPostal', type: 'text' },
    { label: 'Cidade', key: 'clienteCidade', type: 'text' },
    { label: 'NIF (Opcional)', key: 'clienteNif', type: 'text' },
  ]

  return (
    <Card title="Dados do Cliente" icon={User}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className={f.key === 'clienteNome' ? 'md:col-span-2' : ''}>
            <label className="block text-sm font-medium text-text mb-1.5">
              {f.label} {f.required && <span className="text-danger">*</span>}
            </label>
            <input
              type={f.type}
              value={form[f.key] || ''}
              onChange={e => updateField(f.key, e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
                focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                transition-all"
              placeholder={f.label}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
