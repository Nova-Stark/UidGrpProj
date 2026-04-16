import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './LoginPage.css'

export default function LoginPage() {
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]     = useState('')
  const { login }  = useAuth()
  const navigate   = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const ok = login(email, password)
    if (ok) navigate('/dashboard')
    else setError('Please enter valid credentials.')
  }

  return (
    <div className="auth-card">
      <h2 className="auth-heading">Welcome back</h2>
      <p className="auth-sub">Sign in to your account</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="login-email">Email</label>
          <div className="input-wrapper">
            <Mail size={16} className="input-icon" />
            <input id="login-email" type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="login-password">Password</label>
          <div className="input-wrapper">
            <Lock size={16} className="input-icon" />
            <input id="login-password" type={showPass ? 'text' : 'password'}
              placeholder="••••••••" value={password}
              onChange={e => setPassword(e.target.value)} required />
            <button type="button" className="input-toggle"
              onClick={() => setShowPass(!showPass)} aria-label="Toggle password visibility">
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-submit-btn">Sign In</button>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </form>
    </div>
  )
}
