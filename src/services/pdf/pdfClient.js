import { addSectionTitle, addLabelValue } from './pdfUtils.js'

export function addClientSection(doc, y, servico) {
  y = addSectionTitle(doc, y, 'Dados do Cliente')

  const col1 = [
    ['Nome', servico.clienteNome],
    ['Telefone', servico.clienteTelefone],
    ['Email', servico.clienteEmail],
  ]
  const col2 = [
    ['Morada', servico.clienteMorada],
    ['Código Postal', servico.clienteCodigoPostal],
    ['Cidade', servico.clienteCidade],
    ['NIF', servico.clienteNif],
  ]

  let y1 = y, y2 = y
  for (const [label, value] of col1) {
    y1 = addLabelValue(doc, y1, label, value, 15, 85)
    y1 += 5
  }
  for (const [label, value] of col2) {
    y2 = addLabelValue(doc, y2, label, value, 105, 85)
    y2 += 5
  }

  return Math.max(y1, y2) + 4
}

export function addServiceSection(doc, y, servico) {
  y = addSectionTitle(doc, y, 'Dados do Serviço')

  const col1 = [
    ['Número', servico.numero],
    ['Data', servico.data],
    ['Estado', servico.estado],
  ]
  const col2 = [
    ['Descrição', servico.descricao],
    ['Observações', servico.observacoes],
  ]

  let y1 = y, y2 = y
  for (const [label, value] of col1) {
    y1 = addLabelValue(doc, y1, label, value, 15, 85)
    y1 += 5
  }
  for (const [label, value] of col2) {
    y2 = addLabelValue(doc, y2, label, value, 105, 85)
    y2 += 5
  }

  return Math.max(y1, y2) + 4
}
