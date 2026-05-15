import { Link } from 'react-router-dom'
import './PublicLayout.css'

const PublicLayout = ({ children }) => {
  return (
    <div className="public-layout">
      <header className="public-header">
        <div className="public-header-container">
          <Link to="/" className="public-logo">
            <span className="logo-icon">f</span>
            <span className="logo-text">finio</span>
          </Link>
          <nav className="public-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/login" className="nav-link login-btn">Login</Link>
            <Link to="/signup" className="nav-link signup-btn">Sign Up</Link>
          </nav>
        </div>
      </header>
      <main className="public-main">
        {children}
      </main>
      <footer className="public-footer">
        <div className="footer-container">
          <p>&copy; 2026 finio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
