import { Link } from 'react-router-dom'
import { LineChart, PieChart, Wallet, ArrowUpRight, TrendingUp } from 'lucide-react'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Take Control of Your <span className="highlight">Financial Future</span>
            </h1>
            <p className="hero-subtitle">
              The ultimate dashboard for managing your accounts, budgets, and investments in one sleek, AI-powered platform.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="cta-button primary">Start Now - It's Free</Link>
              <Link to="/about" className="cta-button secondary">Learn More</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="abstract-dashboard">
              <div className="hero-mock-card card-1">
                <div className="card-header">
                  <span>Total Balance</span>
                  <TrendingUp size={16} className="text-green" />
                </div>
                <div className="card-value">$24,500.00</div>
                <div className="mock-chart">
                  <div className="chart-bar" style={{height: '40%'}}></div>
                  <div className="chart-bar" style={{height: '70%'}}></div>
                  <div className="chart-bar" style={{height: '50%'}}></div>
                  <div className="chart-bar" style={{height: '90%'}}></div>
                  <div className="chart-bar" style={{height: '60%'}}></div>
                </div>
              </div>
              <div className="hero-mock-card card-2">
                <div className="card-header">
                  <span>Analytics</span>
                  <PieChart size={16} />
                </div>
                <div className="mock-lines">
                  <div className="mock-line-item">
                    <div className="line-label">Housing</div>
                    <div className="line-bar"><div className="line-fill" style={{width: '45%'}}></div></div>
                  </div>
                  <div className="mock-line-item">
                    <div className="line-label">Food</div>
                    <div className="line-bar"><div className="line-fill" style={{width: '25%'}}></div></div>
                  </div>
                </div>
              </div>
              <div className="hero-mock-card card-3">
                <div className="card-header">
                  <Wallet size={16} />
                  <span>Recent</span>
                </div>
                <div className="transaction-item">
                  <div className="tx-info">
                    <div className="tx-name">Apple Store</div>
                    <div className="tx-date">Today</div>
                  </div>
                  <div className="tx-amount negative">-$199</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-grid">
        <div className="grid-container">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Dashboards</h3>
            <p>Get a bird's-eye view of your entire financial health with interactive real-time charts.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure Transactions</h3>
            <p>Track every penny with categorized transactions and automated monthly reports.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>AI Insights</h3>
            <p>Personalized investment recommendations and budget optimization tips powered by AI.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
