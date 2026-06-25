import Card from '../Card/Card.jsx'
import { User } from 'lucide-react'

const fields = [
  { label: 'Nome', key: 'clienteNome', type: 'text', required: true },
  { label: 'Telefone', key: 'clienteTelefone', type: 'tel', required: true },
  { label: 'Email', key: 'clienteEmail', type: 'email' },
  { label: 'Morada', key: 'clienteMorada', type: 'text' },
  { label: 'Código Postal', key: 'clienteCodigoPostal', type: 'text' },
  { label: 'Cidade', key: 'clienteCidade', type: 'text' },
  { label: 'NIF', key: 'clienteNif', type: 'text' },
  { label: 'Observações', key: 'observacoes', type: 'textarea' },
]

export default function ClientForm({ form, onChange, onSubmit, onCancel, isEditing }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.clienteNome?.trim() || !form.clienteTelefone?.trim()) return
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card title={isEditing ? 'Editar Cliente' : 'Novo Cliente'} icon={User}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key} className={f.key === 'observacoes' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-text mb-1.5">
                {f.label} {f.required && <span className="text-danger">*</span>}
              </label>
              {f.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={form[f.key] || ''}
                  onChange={e => onChange(f.key, e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
                    focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                />
              ) : (
                <input
                  type={f.type}
                  value={form[f.key] || ''}
                  onChange={e => onChange(f.key, e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
                    focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder={f.label}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <button type="submit"
          className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
          {isEditing ? 'Guardar Alterações' : 'Guardar Cliente'}
        </button>
        <button type="button" onClick={onCancel}
          className="px-6 py-2.5 rounded-lg border border-border bg-bg text-sm font-medium text-text hover:bg-slate-100 transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  )
}
