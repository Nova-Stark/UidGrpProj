import { incomeEntries, monthlyData, formatCurrency } from '../../data/mockData'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'
import './IncomePage.css'

const sourceSummary = () => {
  const map = {}
  incomeEntries.forEach(e => { map[e.source] = (map[e.source] || 0) + e.amount })
  return Object.entries(map).map(([source, total]) => ({ source, total }))
}

const sources      = sourceSummary()
const totalIncome  = sources.reduce((s, c) => s + c.total, 0)
const sourceColors = { Salary: '#10b981', Freelance: '#34d399', Investments: '#8b5cf6', Other: '#f59e0b' }
const incomeMonthly = monthlyData.map(m => ({ month: m.month, income: m.income }))

export default function IncomePage() {
  return (
    <div className="income-page">
      <div className="income-sources-row">
        {sources.map(s => (
          <div key={s.source} className="income-source-card"
            style={{ borderTop: `2px solid ${sourceColors[s.source] || '#10b981'}` }}>
            <p className="income-source-label">{s.source}</p>
            <p className="income-source-value" style={{ color: sourceColors[s.source] || '#10b981' }}>
              {formatCurrency(s.total)}
            </p>
            <p className="income-source-pct">{((s.total / totalIncome) * 100).toFixed(1)}% of total</p>
          </div>
        ))}
      </div>

      <div className="income-card">
        <div className="income-card-header"><h3>Monthly Income</h3></div>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={incomeMonthly} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <XAxis dataKey="month" tick={{ fill: '#55556a', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: '#1c1c28', border: '1px solid #2a2a3a', borderRadius: 8, fontSize: 12 }}
              formatter={v => [formatCurrency(v), 'Income']}
            />
            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="income-card">
        <div className="income-card-header"><h3>Recent Income</h3></div>
        <div className="income-list">
          {incomeEntries.slice(0, 15).map(e => (
            <div key={e.id} className="income-row">
              <div className="income-row-left">
                <span className="income-row-icon" style={{ color: sourceColors[e.source] || '#10b981' }}>
                  <TrendingUp size={16} />
                </span>
                <div>
                  <p className="income-row-source">{e.source}</p>
                  <p className="income-row-date">
                    {new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <span className="income-row-amount">{formatCurrency(e.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
