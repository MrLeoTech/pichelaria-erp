export function createBackup(clientes, servicos, settings) {
  const backup = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    clientes,
    servicos,
    settings,
  }
  return JSON.stringify(backup, null, 2)
}

export function downloadBackup(clientes, servicos, settings) {
  const data = createBackup(clientes, servicos, settings)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pichelaria_backup_${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function parseBackup(fileContent) {
  try {
    const data = JSON.parse(fileContent)
    if (!data.clientes || !data.servicos || !data.settings) {
      throw new Error('Estrutura de backup inválida')
    }
    return data
  } catch (e) {
    throw new Error('Ficheiro de backup inválido: ' + e.message)
  }
}

export function getStorageStats(clientes, servicos) {
  const totalClientes = clientes.length
  const totalServicos = servicos.length
  const totalPecas = servicos.reduce((s, sv) => s + (sv.pecas?.length || 0), 0)
  const totalFaturado = servicos.reduce((s, sv) => s + (sv.totalCliente || 0), 0)
  const lucroTotal = servicos.reduce((s, sv) => s + (sv.lucro || 0), 0)

  const clientesJSON = JSON.stringify(clientes)
  const servicosJSON = JSON.stringify(servicos)
  const spaceUsed = ((clientesJSON.length + servicosJSON.length) / 1024).toFixed(2)

  return { totalClientes, totalServicos, totalPecas, totalFaturado, lucroTotal, spaceUsed }
}
