import { Search } from 'lucide-react'

export default function ClientSearch({ value, onChange }) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Pesquisar por nome, telefone, email, cidade ou NIF..."
        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-bg text-sm
          focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
      />
    </div>
  )
}
