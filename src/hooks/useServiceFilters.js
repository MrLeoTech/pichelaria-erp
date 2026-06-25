import { useState, useMemo, useCallback } from 'react'

const defaultFilters = {
  search: '',
  estado: 'Todos',
  dataInicio: '',
  dataFim: '',
  valorMin: '',
  valorMax: '',
  ordenacao: 'recente',
}

export function useServiceFilters(servicos) {
  const [filters, setFilters] = useState(defaultFilters)

  const filtered = useMemo(() => {
    let result = [...servicos]

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      result = result.filter(s =>
        (s.clienteNome || '').toLowerCase().includes(q) ||
        (s.clienteTelefone || '').toLowerCase().includes(q) ||
        (s.numero || '').toLowerCase().includes(q) ||
        (s.clienteMorada || '').toLowerCase().includes(q)
      )
    }

    // Estado
    if (filters.estado && filters.estado !== 'Todos') {
      result = result.filter(s => s.estado === filters.estado)
    }

    // Data range
    if (filters.dataInicio) {
      result = result.filter(s => s.data >= filters.dataInicio)
    }
    if (filters.dataFim) {
      result = result.filter(s => s.data <= filters.dataFim)
    }

    // Valor range
    if (filters.valorMin) {
      result = result.filter(s => (s.totalCliente || 0) >= Number(filters.valorMin))
    }
    if (filters.valorMax) {
      result = result.filter(s => (s.totalCliente || 0) <= Number(filters.valorMax))
    }

    // Sort
    switch (filters.ordenacao) {
      case 'recente':
        result.sort((a, b) => new Date(b.data) - new Date(a.data))
        break
      case 'antigo':
        result.sort((a, b) => new Date(a.data) - new Date(b.data))
        break
      case 'maior_valor':
        result.sort((a, b) => (b.totalCliente || 0) - (a.totalCliente || 0))
        break
      case 'menor_valor':
        result.sort((a, b) => (a.totalCliente || 0) - (b.totalCliente || 0))
        break
      case 'maior_lucro':
        result.sort((a, b) => (b.lucro || 0) - (a.lucro || 0))
        break
      case 'nome':
        result.sort((a, b) => (a.clienteNome || '').localeCompare(b.clienteNome || ''))
        break
    }

    return result
  }, [servicos, filters])

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  return { filters, setFilters, filtered, resetFilters }
}
