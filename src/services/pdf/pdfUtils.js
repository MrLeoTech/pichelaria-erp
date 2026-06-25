export const COLORS = {
  primary: [30, 58, 95],
  accent: [59, 130, 246],
  text: [30, 41, 59],
  muted: [100, 116, 139],
  border: [226, 232, 240],
  headerBg: [30, 58, 95],
  headerText: [255, 255, 255],
  headerSub: [150, 180, 220],
  rowEven: [248, 250, 252],
  rowHeader: [240, 245, 250],
}

export function setFont(doc, type = 'normal', size = 9) {
  doc.setFontSize(size)
  doc.setFont('helvetica', type)
}

export function setTextColor(doc, colorKey) {
  const c = COLORS[colorKey] || COLORS.text
  doc.setTextColor(c[0], c[1], c[2])
}

export function drawLine(doc, y, x1 = 15, x2 = 195, color = 'border') {
  const c = COLORS[color] || COLORS.border
  doc.setDrawColor(c[0], c[1], c[2])
  doc.setLineWidth(0.5)
  doc.line(x1, y, x2, y)
}

export function fillRect(doc, x, y, w, h, colorKey) {
  const c = COLORS[colorKey] || COLORS.rowEven
  doc.setFillColor(c[0], c[1], c[2])
  doc.rect(x, y, w, h, 'F')
}

export function addSectionTitle(doc, y, title) {
  setFont(doc, 'bold', 11)
  setTextColor(doc, 'primary')
  doc.text(title, 15, y)
  drawLine(doc, y + 2, 15, 195, 'accent')
  return y + 8
}

export function addLabelValue(doc, y, label, value, x = 15, maxWidth = 90) {
  setFont(doc, 'bold', 9)
  setTextColor(doc, 'muted')
  doc.text(`${label}:`, x, y)

  const labelWidth = doc.getTextWidth(`${label}:`)
  const text = String(value || '—')
  const lines = doc.splitTextToSize(text, maxWidth - labelWidth - 2)

  setFont(doc, 'normal', 9)
  setTextColor(doc, 'text')
  doc.text(lines, x + labelWidth + 2, y)

  return lines.length > 1 ? y + 4 * (lines.length - 1) : y
}

export function fmtMoney(value) {
  return `${Number(value || 0).toFixed(2)} €`
}

export function fmtPercent(value) {
  return `${Number(value || 0).toFixed(1)}%`
}
