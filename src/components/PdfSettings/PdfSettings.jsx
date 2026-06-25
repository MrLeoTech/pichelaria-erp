import Card from '../Card/Card.jsx'
import { FileText } from 'lucide-react'

export default function PdfSettings({ settings, onChange }) {
  return (
    <Card title="Configuração dos Documentos" icon={FileText}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Texto do Rodapé</label>
          <input
            type="text"
            value={settings.pdfRodape}
            onChange={e => onChange('pdfRodape', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
              focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Mensagem de Agradecimento</label>
          <input
            type="text"
            value={settings.pdfMensagem}
            onChange={e => onChange('pdfMensagem', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
              focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Observações Padrão</label>
          <textarea
            rows={3}
            value={settings.pdfObservacoes}
            onChange={e => onChange('pdfObservacoes', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm
              focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
          />
        </div>
      </div>
    </Card>
  )
}
