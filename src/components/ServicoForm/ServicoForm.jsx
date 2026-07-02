import Card from '../Card/Card.jsx'
import { FileText } from 'lucide-react'

const estados = ['Orçamento', 'Em execução', 'Concluído', 'Pago']

export default function ServicoForm({ form, updateField, descPlaceholder = 'Descrição do serviço...' }) {
  return (
    <Card title="Dados do Serviço" icon={FileText}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Número</label>
          <input
            type="text"
            value={form.numero}
            readOnly
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm text-text-muted"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Data</label>
          <input
            type="date"
            value={form.data}
            onChange={e => updateField('data', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
              focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text mb-1.5">Descrição</label>
          <textarea
            rows={2}
            value={form.descricao}
            onChange={e => updateField('descricao', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
              focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
            placeholder={descPlaceholder}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text mb-1.5">Observações</label>
          <textarea
            rows={2}
            value={form.observacoes}
            onChange={e => updateField('observacoes', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
              focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
            placeholder="Observações adicionais..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text mb-1.5">Estado</label>
          <div className="flex flex-wrap gap-2">
            {estados.map((est) => (
              <button
                key={est}
                type="button"
                onClick={() => updateField('estado', est)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${form.estado === est
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-bg border border-border text-text-muted hover:border-accent hover:text-accent'
                  }`}
              >
                {est}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
