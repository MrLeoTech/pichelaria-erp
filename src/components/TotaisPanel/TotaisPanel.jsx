import Card from '../Card/Card.jsx'
import { Calculator, Percent } from 'lucide-react'

export default function TotaisPanel({ totals, ivaAtivo, onToggleIva, config }) {
  const {
    totalCompraPecas, totalVendaPecas, maoObra, outrosCustos,
    subtotal, ivaValor, totalCliente, lucro, margem
  } = totals

  const rows = [
    { label: 'Total Compra Peças', value: totalCompraPecas, color: 'text-danger' },
    { label: 'Total Venda Peças', value: totalVendaPecas, color: 'text-text' },
    { label: 'Mão de Obra', value: maoObra, color: 'text-text' },
    { label: 'Outros Custos', value: outrosCustos, color: 'text-text' },
    { label: 'Subtotal', value: subtotal, color: 'text-text font-semibold', divider: true },
    { label: `IVA (${config.ivaPercentagem}%)`, value: ivaValor, color: 'text-text-muted', isIva: true },
    { label: 'Total Cliente', value: totalCliente, color: 'text-primary font-bold text-lg', divider: true },
    { label: 'Lucro', value: lucro, color: lucro >= 0 ? 'text-success font-bold' : 'text-danger font-bold' },
    { label: 'Margem %', value: `${margem.toFixed(1)}%`, color: margem >= 0 ? 'text-success' : 'text-danger', isPercent: true },
  ]

  return (
    <Card title="Totais" icon={Calculator}>
      <div className="space-y-2">
        {rows.map((row, idx) => (
          <div key={idx}>
            {row.divider && <div className="border-t border-border my-2" />}
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-text-muted">{row.label}</span>
              <span className={`text-sm ${row.color}`}>
                {row.isPercent ? row.value : `${Number(row.value).toFixed(2)} €`}
              </span>
            </div>
            {row.isIva && (
              <div className="flex items-center gap-2 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ivaAtivo}
                    onChange={onToggleIva}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span className="text-xs text-text-muted">Aplicar IVA</span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-bg border border-border">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Percent size={14} />
          <span>Margem calculada sobre o subtotal</span>
        </div>
      </div>
    </Card>
  )
}
