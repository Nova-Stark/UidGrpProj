import { investments, formatCurrency } from '../../data/mockData'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'
import './InvestmentsPage.css'

const COLORS = ['#10b981', '#8b5cf6', '#f59e0b', '#3b82f6', '#ec4899', '#06b6d4']

const totalInvested   = investments.reduce((s, i) => s + i.invested, 0)
const totalCurrentVal = investments.reduce((s, i) => s + i.currentValue, 0)
const totalGainLoss   = totalCurrentVal - totalInvested
const gainPct         = ((totalGainLoss / totalInvested) * 100).toFixed(2)
const allocationData  = investments.map(i => ({ name: i.asset, value: i.allocation }))

export default function InvestmentsPage() {
  return (
    <div className="investments-page">
      <div className="portfolio-summary-row">
        <div className="portfolio-card portfolio-card--main">
          <p className="portfolio-label">Total Invested</p>
          <p className="portfolio-value">{formatCurrency(totalInvested)}</p>
        </div>
        <div className="portfolio-card">
          <p className="portfolio-label">Current Value</p>
          <p className="portfolio-value">{formatCurrency(totalCurrentVal)}</p>
        </div>
        <div className={`portfolio-card ${totalGainLoss >= 0 ? 'gain' : 'loss'}`}>
          <p className="portfolio-label">Total {totalGainLoss >= 0 ? 'Gain' : 'Loss'}</p>
          <p className="portfolio-value portfolio-gainloss">
            {totalGainLoss >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            {formatCurrency(Math.abs(totalGainLoss))}
            <span className="portfolio-pct">({gainPct}%)</span>
          </p>
        </div>
      </div>

      <div className="investments-row">
        <div className="investments-card investments-list-card">
          <h3 className="investments-card-title">Portfolio Holdings</h3>
          <div className="asset-list">
            {investments.map((inv, i) => {
              const gl      = inv.currentValue - inv.invested
              const pct     = ((gl / inv.invested) * 100).toFixed(2)
              const positive = gl >= 0
              return (
                <div key={inv.id} className="asset-row">
                  <div className="asset-dot" style={{ background: COLORS[i % COLORS.length] }} />
                  <div className="asset-info">
                    <p className="asset-name">{inv.asset}</p>
                    <p className="asset-type">{inv.type}</p>
                  </div>
                  <div className="asset-financials">
                    <p className="asset-current">{formatCurrency(inv.currentValue)}</p>
                    <p className={`asset-gl ${positive ? 'positive' : 'negative'}`}>
                      {positive ? '+' : ''}{formatCurrency(gl)} ({pct}%)
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="investments-card investments-allocation-card">
          <h3 className="investments-card-title">Asset Allocation</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                dataKey="value" paddingAngle={3}>
                {allocationData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1c1c28', border: '1px solid #2a2a3a', borderRadius: 8, fontSize: 12 }}
                formatter={v => [`${v}%`]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="allocation-legend">
            {investments.map((inv, i) => (
              <div key={inv.id} className="allocation-legend-item">
                <span className="legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
                <span>{inv.asset.split(' ')[0]} — {inv.allocation}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
