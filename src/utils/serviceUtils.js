export function getNextServiceNumber(servicos, prefix = 'S') {
  const maxNum = servicos.reduce((max, s) => {
    const match = s.numero?.match(/(\d+)/)
    return match ? Math.max(max, parseInt(match[1], 10)) : max
  }, 0)
  return `${prefix}-${String(maxNum + 1).padStart(4, '0')}`
}
