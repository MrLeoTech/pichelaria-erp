export const CHART_COLORS = {
  primary: '#1e3a5f',
  accent: '#3b82f6',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  purple: '#8b5cf6',
  teal: '#14b8a6',
  orange: '#f97316',
  pink: '#ec4899',
  slate: '#64748b',
}

export const STATUS_COLORS = {
  'Orçamento': '#64748b',
  'Em execução': '#f59e0b',
  'Concluído': '#3b82f6',
  'Pago': '#22c55e',
}

export const PIE_COLORS = [
  '#1e3a5f', '#3b82f6', '#22c55e', '#f59e0b', '#ef4444',
  '#8b5cf6', '#14b8a6', '#f97316', '#ec4899', '#64748b',
]

export function formatMonthLabel(monthStr) {
  if (!monthStr || monthStr === '—') return '—'
  const [year, month] = monthStr.split('-')
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  return `${meses[parseInt(month) - 1]} ${year}`
}
