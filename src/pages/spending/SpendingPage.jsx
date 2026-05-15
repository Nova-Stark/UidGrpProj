import { transactions, monthlyData, formatCurrency } from '../../data/mockData'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import './SpendingPage.css'

const COLORS = ['#10b981', '#8b5cf6', '#f59e0b', '#3b82f6', '#ec4899', '#f97316', '#06b6d4', '#a78bfa']

function getCategoryBreakdown() {
  const map = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    if (!map[t.categoryLabel]) map[t.categoryLabel] = { name: t.categoryLabel, value: 0, color: t.categoryColor }
    map[t.categoryLabel].value += t.amount
  })
  return Object.values(map).sort((a, b) => b.value - a.value)
}

const categoryData   = getCategoryBreakdown()
const totalSpending  = categoryData.reduce((s, c) => s + c.value, 0)
const expenseData    = monthlyData.map(m => ({ month: m.month, expense: m.expense }))

export default function SpendingPage() {
  return (
    <div className="spending-page">
      <div className="spending-card spending-donut-card">
        <div className="spending-card-header"><h3>Spending by Category</h3></div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
              dataKey="value" paddingAngle={3}>
              {categoryData.map((entry, i) => (
                <Cell key={i} fill={entry.color || COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#1c1c28', border: '1px solid #2a2a3a', borderRadius: 8, fontSize: 12 }}
              formatter={v => [formatCurrency(v)]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="spending-card spending-list-card">
        <div className="spending-card-header"><h3>Category Breakdown</h3></div>
        <div className="spending-category-list">
          {categoryData.map((c, i) => (
            <div key={c.name} className="spending-category-row">
              <div className="spending-cat-left">
                <span className="spending-rank">#{i + 1}</span>
                <span className="spending-cat-dot" style={{ background: c.color || COLORS[i % COLORS.length] }} />
                <span className="spending-cat-name">{c.name}</span>
              </div>
              <div className="spending-cat-right">
                <span className="spending-cat-amount">{formatCurrency(c.value)}</span>
                <span className="spending-cat-pct">{((c.value / totalSpending) * 100).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="spending-card spending-trend-card">
        <div className="spending-card-header"><h3>Monthly Spending Trend</h3></div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={expenseData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <XAxis dataKey="month" tick={{ fill: '#55556a', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: '#1c1c28', border: '1px solid #2a2a3a', borderRadius: 8, fontSize: 12 }}
              formatter={v => [formatCurrency(v), 'Expense']}
            />
            <Bar dataKey="expense" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
