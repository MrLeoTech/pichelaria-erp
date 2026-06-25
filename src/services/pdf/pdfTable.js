import { addSectionTitle, setFont, setTextColor, fillRect, fmtMoney } from './pdfUtils.js'

const HEADERS = ['Peça', 'Qtd', 'Compra (€)', 'Venda (€)', 'Total (€)']
const COL_X = [15, 90, 110, 140, 170]

function drawTableHeader(doc, y) {
  fillRect(doc, 15, y - 5, 180, 8, 'rowHeader')
  setFont(doc, 'bold', 8)
  setTextColor(doc, 'primary')
  HEADERS.forEach((h, i) => doc.text(h, COL_X[i], y))
}

function drawTableRow(doc, y, peca, index) {
  if (index % 2 === 1) {
    fillRect(doc, 15, y - 5, 180, 7, 'rowEven')
  }
  setFont(doc, 'normal', 8)
  setTextColor(doc, 'text')

  doc.text(peca.nome || '—', COL_X[0], y)
  doc.text(String(peca.quantidade || 0), COL_X[1], y)
  doc.text(fmtMoney(peca.precoCompra), COL_X[2], y)
  doc.text(fmtMoney(peca.precoVenda), COL_X[3], y)
  const total = (Number(peca.quantidade) || 0) * (Number(peca.precoVenda) || 0)
  doc.text(fmtMoney(total), COL_X[4], y)
}

export function addPartsTable(doc, y, pecas) {
  y = addSectionTitle(doc, y, 'Peças')

  if (!pecas || pecas.length === 0) {
    setFont(doc, 'normal', 9)
    setTextColor(doc, 'muted')
    doc.text('Nenhuma peça registada.', 15, y)
    return y + 8
  }

  drawTableHeader(doc, y)
  let rowY = y + 8

  pecas.forEach((p, i) => {
    if (rowY > 270) {
      doc.addPage()
      rowY = 20
      drawTableHeader(doc, rowY)
      rowY += 8
    }
    drawTableRow(doc, rowY, p, i)
    rowY += 7
  })

  return rowY + 4
}
