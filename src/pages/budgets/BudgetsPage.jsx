import { budgets, formatCurrency } from '../../data/mockData'
import './BudgetsPage.css'

function getStatus(spent, limit) {
  const pct = (spent / limit) * 100
  if (pct >= 100) return 'over'
  if (pct >= 80)  return 'warning'
  return 'good'
}

function getBarColor(spent, limit) {
  const pct = (spent / limit) * 100
  if (pct >= 100) return '#ef4444'
  if (pct >= 80)  return '#f59e0b'
  return '#10b981'
}

export default function BudgetsPage() {
  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0)
  const totalSpent  = budgets.reduce((s, b) => s + b.spent, 0)

  return (
    <div className="budgets-page">
      <div className="budgets-summary-row">
        <div className="budget-summary-card">
          <p className="budget-summary-label">Total Budget</p>
          <p className="budget-summary-value">{formatCurrency(totalBudget)}</p>
        </div>
        <div className="budget-summary-card">
          <p className="budget-summary-label">Total Spent</p>
          <p className="budget-summary-value">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="budget-summary-card">
          <p className="budget-summary-label">Remaining</p>
          <p className="budget-summary-value" style={{ color: '#10b981' }}>
            {formatCurrency(Math.max(0, totalBudget - totalSpent))}
          </p>
        </div>
      </div>

      <div className="budgets-grid">
        {budgets.map(b => {
          const pct      = Math.min((b.spent / b.limit) * 100, 100)
          const status   = getStatus(b.spent, b.limit)
          const barColor = getBarColor(b.spent, b.limit)
          return (
            <div key={b.id} className="budget-card">
              <div className="budget-card-header">
                <div>
                  <p className="budget-cat-label">{b.label}</p>
                  <p className="budget-amounts">
                    <span style={{ color: barColor }}>{formatCurrency(b.spent)}</span>
                    <span className="budget-sep"> / </span>
                    <span>{formatCurrency(b.limit)}</span>
                  </p>
                </div>
                {status === 'over'    && <span className="budget-badge budget-badge--over">Over</span>}
                {status === 'warning' && <span className="budget-badge budget-badge--warning">Near limit</span>}
              </div>
              <div className="budget-progress-track">
                <div className="budget-progress-fill" style={{ width: `${pct}%`, background: barColor }} />
              </div>
              <p className="budget-remaining-text">
                {b.spent > b.limit
                  ? `Over by ${formatCurrency(b.spent - b.limit)}`
                  : `${formatCurrency(b.limit - b.spent)} remaining`}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
