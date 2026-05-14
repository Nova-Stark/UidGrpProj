import { useState } from 'react'
import { transactions, formatCurrency } from '../../data/mockData'
import { Search, TrendingUp, TrendingDown } from 'lucide-react'
import './TransactionsPage.css'

export default function TransactionsPage() {
  const [search, setSearch]           = useState('')
  const [typeFilter, setTypeFilter]   = useState('all')

  const filtered = transactions.filter(t => {
    const matchSearch   = t.name.toLowerCase().includes(search.toLowerCase())
    const matchType     = typeFilter === 'all' || t.type === typeFilter
    return matchSearch && matchType
  })

  return (
    <div className="transactions-page">
      <div className="transactions-filters">
        <div className="txn-search">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="txn-filter-group">
          <select id="type-filter" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

        </div>
      </div>

      <p className="txn-count">{filtered.length} transactions</p>

      <div className="txn-list">
        {filtered.length === 0 ? (
          <div className="txn-empty"><p>No transactions match your filters.</p></div>
        ) : filtered.map(t => (
          <div key={t.id} className="txn-row">
            <span className={`txn-icon-wrap txn-icon-wrap--${t.type}`}>
              {t.type === 'income'
                ? <TrendingUp size={14} />
                : <TrendingDown size={14} />}
            </span>

            <div className="txn-info">
              <span className="txn-name">{t.name}</span>
              <span className="txn-date">
                {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>

            <div className="txn-meta">
              <span className="txn-account">{t.account}</span>
            </div>

            <span className={`txn-amount ${t.type}`}>
              {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}