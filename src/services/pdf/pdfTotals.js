import { addSectionTitle, setFont, setTextColor, fillRect, drawLine, fmtMoney, fmtPercent } from './pdfUtils.js'

export function addSummary(doc, y, servico, config) {
  y = addSectionTitle(doc, y, 'Resumo Financeiro')

  const items = [
    ['Total Compra Peças', fmtMoney(servico.totalCompraPecas), false],
    ['Mão de Obra', fmtMoney(servico.maoObra), false],
    ['Deslocação', fmtMoney(servico.custoDeslocacao), false],
    ['Consumíveis', fmtMoney(servico.custoConsumiveis), false],
    ['Outros Custos', fmtMoney(servico.custoOutros), false],
    ['Subtotal', fmtMoney(servico.subtotal), false],
    [`IVA (${config.ivaPercentagem}%)`, fmtMoney(servico.ivaValor), false],
    ['Total Cliente', fmtMoney(servico.totalCliente), true],
    ['Lucro', fmtMoney(servico.lucro), true],
    ['Margem %', fmtPercent(servico.margem), true],
  ]

  let rowY = y
  items.forEach(([label, value, isBold], i) => {
    if (label === 'Total Cliente' || label === 'Lucro') {
      drawLine(doc, rowY - 3, 105, 195)
    }
    if (i % 2 === 0 && !isBold) {
      fillRect(doc, 105, rowY - 5, 90, 7, 'rowEven')
    }

    setFont(doc, isBold ? 'bold' : 'normal', 9)
    setTextColor(doc, isBold ? 'primary' : 'text')
    doc.text(label, 110, rowY)
    doc.text(value, 192, rowY, { align: 'right' })
    rowY += 7
  })

  return rowY + 4
}
