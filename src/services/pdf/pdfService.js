import { jsPDF } from 'jspdf'
import { addHeader } from './pdfHeader.js'
import { addClientSection, addServiceSection } from './pdfClient.js'
import { addPartsTable } from './pdfTable.js'
import { addSummary } from './pdfTotals.js'
import { addFooter } from './pdfFooter.js'

export function generateServicePDF(servico, config) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  addHeader(doc, config)

  let y = 42
  y = addClientSection(doc, y, servico)
  y = addServiceSection(doc, y, servico)
  y = addPartsTable(doc, y, servico.pecas)
  y = addSummary(doc, y, servico, config)

  addFooter(doc, config)

  return doc
}

export function downloadServicePDF(servico, config) {
  const doc = generateServicePDF(servico, config)
  doc.save(`Servico_${servico.numero}.pdf`)
}

export function printServicePDF(servico, config) {
  const doc = generateServicePDF(servico, config)
  const blob = doc.output('blob')
  const url = URL.createObjectURL(blob)
  const printWindow = window.open(url, '_blank')
  if (printWindow) {
    printWindow.addEventListener('load', () => printWindow.print())
  }
}
