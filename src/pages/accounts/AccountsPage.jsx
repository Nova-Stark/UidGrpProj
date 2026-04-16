import { accountsList, transactions, formatCurrency } from '../../data/mockData'
import CategoryIcon from '../../components/ui/CategoryIcon'
import { TrendingUp, TrendingDown } from 'lucide-react'
import './AccountsPage.css'

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const accentMap = {
  'acc-1': '#10b981',
  'acc-2': '#8b5cf6',
  'acc-3': '#f59e0b',
  'acc-4': '#6b7280',
  'acc-5': '#f97316',
}

export default function AccountsPage() {
  const totalBalance = accountsList.reduce((s, a) => s + a.balance, 0)

  return (
    <div className="accounts-page">
      <div className="accounts-summary">
        <p className="accounts-summary-label">Total Net Worth</p>
        <h2 className="accounts-summary-value">{formatCurrency(totalBalance)}</h2>
      </div>

      <div className="accounts-grid">
        {accountsList.map(account => (
          <div key={account.id} className="account-card" style={{ background: account.gradient }}>
            <div className="account-card-top">
              <div>
                <p className="account-card-type">{account.type}</p>
                <p className="account-card-name">{account.name}</p>
              </div>
              <span className="account-card-bank">{account.bank}</span>
            </div>
            <div className="account-card-balance">
              <p className="account-card-balance-label">Balance</p>
              <p className="account-card-balance-value">{formatCurrency(account.balance)}</p>
            </div>
            <div className="account-card-bottom">
              <span className="account-card-number">{account.cardNumber}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity per account — sorted by date descending */}
      <div className="accounts-recent-section">
        <h3 className="section-title">Recent Activity by Account</h3>
        {accountsList.map(account => {
          const acctTxns = transactions
            .filter(t => t.account === account.name)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 4)

          return (
            <div key={account.id} className="account-recent-block">
              <div className="account-recent-header">
                <span className="account-dot" style={{ background: accentMap[account.id] || '#6b7280' }} />
                <span className="account-recent-name">{account.name}</span>
                <span className="account-recent-type">{account.type}</span>
              </div>

              {acctTxns.length === 0 ? (
                <p className="account-no-txns">No recent transactions</p>
              ) : acctTxns.map(t => (
                <div key={t.id} className="account-txn-row">
                  <span className={`acct-txn-icon acct-txn-icon--${t.type}`}>
                    {t.type === 'income'
                      ? <TrendingUp size={13} />
                      : <CategoryIcon category={t.category} size={13} />}
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
          )
        })}
      </div>
    </div>
  )
}
