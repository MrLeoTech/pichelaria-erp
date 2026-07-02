export function getClientStats(cliente, servicos) {
  const clientServicos = servicos.filter(s => s.clienteNome === cliente.clienteNome)
  const totalFaturado = clientServicos.reduce((s, sv) => s + (sv.totalCliente || 0), 0)
  const lucroTotal = clientServicos.reduce((s, sv) => s + (sv.lucro || 0), 0)
  const margemMedia = clientServicos.length > 0
    ? clientServicos.reduce((s, sv) => s + (sv.margem || 0), 0) / clientServicos.length
    : 0
  const ultimoServico = clientServicos.length > 0
    ? [...clientServicos].sort((a, b) => new Date(b.data) - new Date(a.data))[0]
    : null

  return {
    numServicos: clientServicos.length,
    totalFaturado,
    lucroTotal,
    margemMedia,
    ultimoServico,
    ultimaData: ultimoServico?.data || '—',
  }
}

export function findClientByName(clientes, nome) {
  return clientes.find(c => c.clienteNome.toLowerCase().trim() === nome.toLowerCase().trim())
}

export function createClientFromService(serviceData) {
  return {
    id: crypto.randomUUID(),
    clienteNome: serviceData.clienteNome?.trim() || 'Cliente sem nome',
    clienteTelefone: serviceData.clienteTelefone || '',
    clienteEmail: serviceData.clienteEmail || '',
    clienteMorada: serviceData.clienteMorada || '',
    clienteCodigoPostal: serviceData.clienteCodigoPostal || '',
    clienteCidade: serviceData.clienteCidade || '',
    clienteNif: serviceData.clienteNif || '',
    observacoes: '',
    dataCriacao: new Date().toISOString().split('T')[0],
  }
}

export function emptyClient() {
  return {
    id: '',
    clienteNome: '',
    clienteTelefone: '',
    clienteEmail: '',
    clienteMorada: '',
    clienteCodigoPostal: '',
    clienteCidade: '',
    clienteNif: '',
    observacoes: '',
  }
}
