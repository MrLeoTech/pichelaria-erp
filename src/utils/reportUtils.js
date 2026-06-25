export function getDateRange(filter) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let start = new Date(today)
  let end = new Date(today)
  end.setHours(23, 59, 59, 999)

  switch (filter) {
    case 'hoje':
      break
    case 'ontem':
      start.setDate(start.getDate() - 1)
      end.setDate(end.getDate() - 1)
      break
    case 'semana':
      start.setDate(start.getDate() - start.getDay())
      break
    case '30dias':
      start.setDate(start.getDate() - 30)
      break
    case 'mes':
      start.setDate(1)
      break
    case 'ano':
      start.setMonth(0, 1)
      break
    default:
      return null
  }
  return { start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] }
}

export function filterByDate(servicos, start, end) {
  if (!start || !end) return servicos
  return servicos.filter(s => s.data >= start && s.data <= end)
}

export function getMonthlyData(servicos) {
  const map = {}
  servicos.forEach(s => {
    const month = s.data?.slice(0, 7) || '—'
    if (!map[month]) map[month] = { month, receita: 0, lucro: 0, servicos: 0 }
    map[month].receita += s.totalCliente || 0
    map[month].lucro += s.lucro || 0
    map[month].servicos += 1
  })
  return Object.values(map).sort((a, b) => a.month.localeCompare(b.month))
}

export function getStatusData(servicos) {
  const map = {}
  servicos.forEach(s => {
    map[s.estado] = (map[s.estado] || 0) + 1
  })
  return Object.entries(map).map(([name, value]) => ({ name, value }))
}

export function getTopClients(servicos, limit = 10) {
  const map = {}
  servicos.forEach(s => {
    const n = s.clienteNome || 'Cliente'
    if (!map[n]) map[n] = { name: n, faturado: 0, servicos: 0 }
    map[n].faturado += s.totalCliente || 0
    map[n].servicos += 1
  })
  return Object.values(map).sort((a, b) => b.faturado - a.faturado).slice(0, limit)
}

export function getTopSuppliers(servicos, limit = 10) {
  const map = {}
  servicos.forEach(s => {
    (s.pecas || []).forEach(p => {
      const f = p.fornecedor || 'Desconhecido'
      if (!map[f]) map[f] = { name: f, usos: 0, total: 0 }
      map[f].usos += Number(p.quantidade) || 0
      map[f].total += (Number(p.quantidade) || 0) * (Number(p.precoCompra) || 0)
    })
  })
  return Object.values(map).sort((a, b) => b.usos - a.usos).slice(0, limit)
}

export function getPurchaseVsSales(servicos) {
  return servicos.map(s => ({
    data: s.data,
    compras: (s.totalCompraPecas || 0) + (s.custoDeslocacao || 0) + (s.custoConsumiveis || 0) + (s.custoOutros || 0),
    vendas: s.totalVendaPecas || 0,
  })).sort((a, b) => a.data.localeCompare(b.data))
}

export function getStats(servicos) {
  const total = servicos.length
  const receita = servicos.reduce((s, sv) => s + (sv.totalCliente || 0), 0)
  const compras = servicos.reduce((s, sv) => s + (sv.totalCompraPecas || 0) + (sv.custoDeslocacao || 0) + (sv.custoConsumiveis || 0) + (sv.custoOutros || 0), 0)
  const lucro = servicos.reduce((s, sv) => s + (sv.lucro || 0), 0)
  const margem = receita > 0 ? (lucro / receita) * 100 : 0
  const ticketMedio = total > 0 ? receita / total : 0

  const lucros = servicos.map(s => s.lucro || 0)
  const maiorLucro = lucros.length > 0 ? Math.max(...lucros) : 0
  const menorLucro = lucros.length > 0 ? Math.min(...lucros) : 0
  const mediaLucro = total > 0 ? lucro / total : 0

  return { total, receita, compras, lucro, margem, ticketMedio, maiorLucro, menorLucro, mediaLucro }
}

export function getTopPiece(servicos) {
  const map = {}
  servicos.forEach(s => {
    (s.pecas || []).forEach(p => {
      const n = p.nome || 'Desconhecido'
      if (!map[n]) map[n] = { name: n, qtd: 0 }
      map[n].qtd += Number(p.quantidade) || 0
    })
  })
  const all = Object.values(map).sort((a, b) => b.qtd - a.qtd)
  return all[0] || null
}
