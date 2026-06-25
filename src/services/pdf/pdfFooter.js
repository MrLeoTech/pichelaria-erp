import { setFont, setTextColor, drawLine } from './pdfUtils.js'

export function addFooter(doc, config) {
  const pages = doc.getNumberOfPages()
  const now = new Date().toLocaleDateString('pt-PT')

  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    drawLine(doc, 282)

    setFont(doc, 'normal', 8)
    setTextColor(doc, 'muted')
    doc.text(`Emitido em: ${now}`, 15, 288)

    setTextColor(doc, 'primary')
    setFont(doc, 'bold', 8)
    doc.text(config.pdfRodape || 'Obrigado pela preferência!', 105, 288, { align: 'center' })

    setTextColor(doc, 'muted')
    setFont(doc, 'normal', 8)
    doc.text(`Página ${i} de ${pages}`, 195, 288, { align: 'right' })
  }
}
