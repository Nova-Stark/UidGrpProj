import { Link } from 'react-router-dom'
import './AuthLayout.css'

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="auth-bg" />
      <div className="auth-center">
        <div className="auth-brand">
          <span className="auth-logo">⬡</span>
          <span className="auth-name">Finio</span>
          <p className="auth-tagline">Your personal finance, simplified.</p>
        </div>
        {children}
      </div>
    </div>
  )
}
