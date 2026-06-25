import { FileDown, Printer, Download } from 'lucide-react'
import { generateServicePDF, downloadServicePDF, printServicePDF } from '../../services/pdf/pdfService.js'

export default function PdfActions({ servico, config }) {
  const handleView = () => {
    const doc = generateServicePDF(servico, config)
    const blob = doc.output('blob')
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  const handleDownload = () => downloadServicePDF(servico, config)
  const handlePrint = () => printServicePDF(servico, config)

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={handleView}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white
          text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
        <FileDown size={16} /> Gerar PDF
      </button>
      <button onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface
          text-sm font-medium text-text hover:bg-bg transition-colors">
        <Printer size={16} /> Imprimir
      </button>
      <button onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface
          text-sm font-medium text-text hover:bg-bg transition-colors">
        <Download size={16} /> Guardar PDF
      </button>
    </div>
  )
}
