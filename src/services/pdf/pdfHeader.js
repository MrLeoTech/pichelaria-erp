import { setFont, setTextColor } from './pdfUtils.js'

export function addHeader(doc, config) {
  const c = [30, 58, 95]
  doc.setFillColor(...c)
  doc.rect(0, 0, 210, 35, 'F')

  setTextColor(doc, 'headerText')
  setFont(doc, 'bold', 18)
  doc.text(config.empresaNome || 'Pichelaria', 15, 18)

  setFont(doc, 'normal', 9)
  const info = []
  if (config.empresaMorada) info.push(config.empresaMorada)
  if (config.empresaNif) info.push(`NIF: ${config.empresaNif}`)
  if (config.empresaTelefone) info.push(`Tel: ${config.empresaTelefone}`)
  if (config.empresaEmail) info.push(config.empresaEmail)
  doc.text(info.join('  |  '), 15, 26)

  setTextColor(doc, 'headerSub')
  setFont(doc, 'normal', 8)
  doc.text(config.pdfMensagem || 'Documento gerado automaticamente', 15, 32)
}
