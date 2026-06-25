import { FileDown, FileSpreadsheet, Printer } from 'lucide-react'
import Papa from 'papaparse'
import { generateServicePDF } from '../../services/pdf/pdfService.js'

export default function ExportButtons({ servicos, stats, periodLabel, config }) {
  const handleCSV = () => {
    const data = servicos.map(s => ({
      Numero: s.numero,
      Data: s.data,
      Cliente: s.clienteNome,
      Estado: s.estado,
      Total: s.totalCliente,
      Lucro: s.lucro,
      Margem: s.margem,
    }))
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relatorio_${periodLabel}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleXLSX = () => {
    // Simple XLSX export using CSV with .xlsx extension for compatibility
    const data = servicos.map(s => ({
      Numero: s.numero,
      Data: s.data,
      Cliente: s.clienteNome,
      Estado: s.estado,
      Total: s.totalCliente,
      Lucro: s.lucro,
      Margem: s.margem,
    }))
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'application/vnd.ms-excel' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relatorio_${periodLabel}.xlsx`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handlePDF = () => {
    // Generate a summary report PDF
    const reportData = {
      numero: `REL-${periodLabel}`,
      data: new Date().toISOString().split('T')[0],
      clienteNome: 'Relatório Consolidado',
      descricao: `Relatório de ${periodLabel}`,
      observacoes: `Receita: ${stats.receita.toFixed(2)}€ | Lucro: ${stats.lucro.toFixed(2)}€ | Serviços: ${stats.total}`,
      estado: 'Concluído',
      pecas: [],
      totalCompraPecas: stats.compras,
      maoObra: 0,
      custoDeslocacao: 0,
      custoConsumiveis: 0,
      custoOutros: 0,
      subtotal: stats.receita,
      ivaValor: 0,
      totalCliente: stats.receita,
      lucro: stats.lucro,
      margem: stats.margem,
    }
    const doc = generateServicePDF(reportData, config)
    doc.save(`Relatorio_${periodLabel}.pdf`)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={handleCSV}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-sm font-medium text-text hover:bg-bg transition-colors">
        <FileDown size={14} /> CSV
      </button>
      <button onClick={handleXLSX}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-sm font-medium text-text hover:bg-bg transition-colors">
        <FileSpreadsheet size={14} /> Excel
      </button>
      <button onClick={handlePDF}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-sm font-medium text-text hover:bg-bg transition-colors">
        <FileDown size={14} /> PDF
      </button>
      <button onClick={handlePrint}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-sm font-medium text-text hover:bg-bg transition-colors">
        <Printer size={14} /> Imprimir
      </button>
    </div>
  )
}
