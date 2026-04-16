import { insights } from '../../data/mockData'
import CategoryIcon from '../../components/ui/CategoryIcon'
import './InsightsPage.css'

const typeConfig = {
  success: { border: '#10b981', bg: 'rgba(16,185,129,0.07)'  },
  warning: { border: '#f59e0b', bg: 'rgba(245,158,11,0.07)'  },
  alert:   { border: '#ef4444', bg: 'rgba(239,68,68,0.07)'   },
  info:    { border: '#8b5cf6', bg: 'rgba(139,92,246,0.07)'  },
}

export default function InsightsPage() {
  return (
    <div className="insights-page">
      <p className="insights-subtitle">
        Rule-based insights generated from your spending and income patterns.
      </p>
      <div className="insights-list">
        {insights.map(ins => {
          const config = typeConfig[ins.type] || typeConfig.info
          return (
            <div
              key={ins.id}
              className="insight-card"
              style={{ borderLeft: `3px solid ${config.border}`, background: config.bg }}
            >
              <span className="insight-card-icon" style={{ color: config.border }}>
                <CategoryIcon category={ins.iconKey} size={18} />
              </span>
              <div className="insight-card-body">
                <p className="insight-card-title">{ins.title}</p>
                <p className="insight-card-msg">{ins.message}</p>
              </div>
              <span className="insight-type-badge" style={{ color: config.border }}>
                {ins.type}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
