import { useState, useMemo, useCallback } from 'react'
import { useApp } from '../context/AppContext.jsx'
import {
  getDateRange, filterByDate, getMonthlyData, getStatusData,
  getTopClients, getTopSuppliers, getPurchaseVsSales, getStats, getTopPiece
} from '../utils/reportUtils.js'

export function useReports() {
  const { servicos, clientes } = useApp()
  const [periodFilter, setPeriodFilter] = useState('ano')
  const [customStart, setCustomStart] = useState('')
  const [customEnd, setCustomEnd] = useState('')

  const dateRange = useMemo(() => {
    if (periodFilter === 'personalizado') {
      return customStart && customEnd ? { start: customStart, end: customEnd } : null
    }
    return getDateRange(periodFilter)
  }, [periodFilter, customStart, customEnd])

  const filteredServicos = useMemo(() => {
    return dateRange ? filterByDate(servicos, dateRange.start, dateRange.end) : servicos
  }, [servicos, dateRange])

  const stats = useMemo(() => getStats(filteredServicos), [filteredServicos])
  const monthlyData = useMemo(() => getMonthlyData(filteredServicos), [filteredServicos])
  const statusData = useMemo(() => getStatusData(filteredServicos), [filteredServicos])
  const topClients = useMemo(() => getTopClients(filteredServicos), [filteredServicos])
  const topSuppliers = useMemo(() => getTopSuppliers(filteredServicos), [filteredServicos])
  const purchaseVsSales = useMemo(() => getPurchaseVsSales(filteredServicos), [filteredServicos])
  const topPiece = useMemo(() => getTopPiece(filteredServicos), [filteredServicos])

  const topClient = useMemo(() => {
    return topClients[0] || null
  }, [topClients])

  const topSupplier = useMemo(() => {
    return topSuppliers[0] || null
  }, [topSuppliers])

  return {
    periodFilter, setPeriodFilter,
    customStart, setCustomStart,
    customEnd, setCustomEnd,
    dateRange,
    filteredServicos,
    stats,
    monthlyData,
    statusData,
    topClients,
    topSuppliers,
    purchaseVsSales,
    topPiece,
    topClient,
    topSupplier,
    totalClientes: clientes.length,
  }
}
