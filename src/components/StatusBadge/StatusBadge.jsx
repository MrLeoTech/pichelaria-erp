export default function StatusBadge({ estado }) {
  const map = {
    'Orçamento': 'bg-text-muted/10 text-text-muted',
    'Em execução': 'bg-warning/10 text-warning',
    'Concluído': 'bg-accent/10 text-accent',
    'Pago': 'bg-success/10 text-success',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${map[estado] || map['Orçamento']}`}
      role="status" aria-label={`Estado: ${estado}`}>
      {estado}
    </span>
  )
}
