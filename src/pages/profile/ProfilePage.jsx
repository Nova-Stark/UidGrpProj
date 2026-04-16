import { activityData, formatCurrency } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'
import { getSummary } from '../../data/mockData'
import { CheckCircle, XCircle, Clock, Mail, Calendar, TrendingUp, TrendingDown } from 'lucide-react'
import './ProfilePage.css'

const summary = getSummary()

function StatusIcon({ status }) {
  if (status === 'success') return <CheckCircle size={14} className="status-icon status-icon--success" />
  if (status === 'failed')  return <XCircle     size={14} className="status-icon status-icon--failed"  />
  return                           <Clock       size={14} className="status-icon status-icon--pending" />
}

function fmtDateTime(iso) {
  const d = new Date(iso)
  return {
    date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  }
}

export default function ProfilePage() {
  const { user }   = useAuth()
  const name       = user?.name  || 'Alex Morgan'
  const email      = user?.email || 'alex@example.com'
  const joinDate   = user?.joinDate
    ? new Date(user.joinDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : 'January 2024'
  const initials   = name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-avatar-large">{initials}</div>
        <div className="profile-header-info">
          <h2 className="profile-name">{name}</h2>
          <div className="profile-meta">
            <span><Mail size={13} /> {email}</span>
            <span><Calendar size={13} /> Member since {joinDate}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats-row">
        <div className="profile-stat-card">
          <p className="profile-stat-label">Total Balance</p>
          <p className="profile-stat-value">{formatCurrency(summary.totalBalance)}</p>
        </div>
        <div className="profile-stat-card">
          <p className="profile-stat-label">Monthly Income</p>
          <p className="profile-stat-value income">{formatCurrency(summary.monthlyIncome)}</p>
        </div>
        <div className="profile-stat-card">
          <p className="profile-stat-label">Monthly Expenses</p>
          <p className="profile-stat-value expense">{formatCurrency(summary.monthlyExpense)}</p>
        </div>
        <div className="profile-stat-card">
          <p className="profile-stat-label">Net Savings</p>
          <p className="profile-stat-value savings">{formatCurrency(summary.monthlySavings)}</p>
        </div>
      </div>

      {/* Activity */}
      <div className="profile-activity-card">
        <h3 className="profile-section-title">Recent Activity</h3>
        <div className="activity-table-header">
          <span>Date &amp; Time</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        <div className="profile-activity-list">
          {activityData.map((entry, i) => {
            const { date, time } = fmtDateTime(entry.time)
            const isCredit = entry.amount > 0
            return (
              <div key={i} className="activity-row">
                <div className="activity-row-datetime">
                  <span className="activity-row-date">{date}</span>
                  <span className="activity-row-time">{time}</span>
                </div>

                <div className="activity-row-amount-wrap">
                  <span className={`activity-dir-icon activity-dir-icon--${isCredit ? 'credit' : 'debit'}`}>
                    {isCredit ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  </span>
                  <span className={`activity-amount ${isCredit ? 'income' : 'expense'}`}>
                    {isCredit ? '+' : ''}{formatCurrency(entry.amount)}
                  </span>
                </div>

                <div className="activity-status-cell">
                  <StatusIcon status={entry.status} />
                  <span className={`activity-status activity-status--${entry.status}`}>
                    {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
