import { transactions, accountsList, monthlyData, insights, getSummary, formatCurrency } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'
import CategoryIcon from '../../components/ui/CategoryIcon'
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { TrendingUp, TrendingDown, Wallet, PiggyBank, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './DashboardPage.css'

const DONUT_COLORS = ['#10b981', '#8b5cf6', '#f59e0b', '#3b82f6', '#ec4899']

function spendingByCategory() {
  const map = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.categoryLabel] = (map[t.categoryLabel] || 0) + t.amount
  })
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }))
}

const spendingData  = spendingByCategory()
const recentTxns    = transactions.slice(0, 6)
const summary       = getSummary()

function getTimeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export default function DashboardPage() {
  const { user }  = useAuth()
  const navigate  = useNavigate()

  return (
    <div className="dashboard-page">
      <div className="dashboard-greeting">
        <h2>Good {getTimeOfDay()}, {user?.name?.split(' ')[0] || 'there'}</h2>
        <p>Here's your financial overview for today.</p>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards-row">
        <div className="stat-card stat-card--balance">
          <div className="stat-card-label"><Wallet size={15} /> Total Balance</div>
          <div className="stat-card-value">{formatCurrency(summary.totalBalance)}</div>
          <div className="stat-card-sub positive"><TrendingUp size={13} /> +2.4% this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label"><TrendingUp size={15} /> Monthly Income</div>
          <div className="stat-card-value income">{formatCurrency(summary.monthlyIncome)}</div>
          <div className="stat-card-sub positive"><TrendingUp size={13} /> +5.1%</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label"><TrendingDown size={15} /> Monthly Expense</div>
          <div className="stat-card-value expense">{formatCurrency(summary.monthlyExpense)}</div>
          <div className="stat-card-sub negative"><TrendingDown size={13} /> +11.3%</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label"><PiggyBank size={15} /> Net Savings</div>
          <div className="stat-card-value savings">{formatCurrency(summary.monthlySavings)}</div>
          <div className="stat-card-sub positive"><TrendingUp size={13} /> On track</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="dashboard-charts-row">
        <div className="dash-card cash-flow-card">
          <div className="dash-card-header">
            <span className="dash-card-title">Cash Flow</span>
            <span className="dash-card-sub-label">Last 12 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#55556a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: '#1c1c28', border: '1px solid #2a2a3a', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#f1f1f4' }}
                formatter={v => [formatCurrency(v)]}
              />
              <Area type="monotone" dataKey="income"  stroke="#10b981" fill="url(#incomeGrad)"  strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="expense" stroke="#8b5cf6" fill="url(#expenseGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            <span className="legend-dot" style={{ background: '#10b981' }} /> Income
            <span className="legend-dot" style={{ background: '#8b5cf6', marginLeft: 16 }} /> Expense
          </div>
        </div>

        <div className="dash-card spending-donut-card">
          <div className="dash-card-header">
            <span className="dash-card-title">Top Spending</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={spendingData} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
                dataKey="value" paddingAngle={3}>
                {spendingData.map((_, i) => <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1c1c28', border: '1px solid #2a2a3a', borderRadius: 8, fontSize: 12 }}
                formatter={v => [formatCurrency(v)]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-legend">
            {spendingData.map((d, i) => (
              <div key={d.name} className="donut-legend-item">
                <span className="legend-dot" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="dashboard-bottom-row">
        <div className="dash-card recent-txns-card">
          <div className="dash-card-header">
            <span className="dash-card-title">Recent Transactions</span>
            <button className="dash-view-all" onClick={() => navigate('/transactions')}>
              View all <ArrowRight size={13} />
            </button>
          </div>
          <div className="recent-txns-list">
            {recentTxns.map(t => (
              <div key={t.id} className="recent-txn-row">
                <span className={`txn-icon-wrap txn-icon-wrap--${t.type}`}>
                  {t.type === 'income'
                    ? <TrendingUp size={14} />
                    : <CategoryIcon category={t.category} size={14} />}
                </span>
                <div className="txn-info">
                  <span className="txn-name">{t.name}</span>
                  <span className="txn-date">{fmtDate(t.date)}</span>
                </div>
                <span className={`txn-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card insights-card">
          <div className="dash-card-header">
            <span className="dash-card-title">Insights</span>
            <button className="dash-view-all" onClick={() => navigate('/insights')}>
              View all <ArrowRight size={13} />
            </button>
          </div>
          <div className="insight-list">
            {insights.slice(0, 4).map(ins => (
              <div key={ins.id} className={`insight-item insight-item--${ins.type}`}>
                <span className="insight-icon-wrap">
                  <CategoryIcon category={ins.iconKey} size={14} />
                </span>
                <div>
                  <p className="insight-title">{ins.title}</p>
                  <p className="insight-msg">{ins.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
