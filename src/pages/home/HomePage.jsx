import { Link } from 'react-router-dom'
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
              <div className="dash-card card-1"></div>
              <div className="dash-card card-2"></div>
              <div className="dash-card card-3"></div>
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
