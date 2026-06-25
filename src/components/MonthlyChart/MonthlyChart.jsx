import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart
} from 'recharts'
import { formatMonthLabel } from '../../utils/chartUtils.js'

export default function MonthlyChart({ data }) {
  const formatted = data.map(d => ({ ...d, label: formatMonthLabel(d.month) }))

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} width={60} />
          <Tooltip formatter={(v) => `${Number(v).toFixed(2)} €`} />
          <Legend />
          <Bar dataKey="receita" name="Receita" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Line type="monotone" dataKey="lucro" name="Lucro" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
