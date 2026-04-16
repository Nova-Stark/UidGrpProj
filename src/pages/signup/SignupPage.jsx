import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './SignupPage.css'

export default function SignupPage() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const { signup } = useAuth()
  const navigate   = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 6)  { setError('Password must be at least 6 characters.'); return }
    const ok = signup(name, email, password)
    if (ok) navigate('/dashboard')
    else setError('Signup failed. Please try again.')
  }

  return (
    <div className="auth-card">
      <h2 className="auth-heading">Create account</h2>
      <p className="auth-sub">Start managing your finances</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="signup-name">Full Name</label>
          <div className="input-wrapper">
            <User size={16} className="input-icon" />
            <input id="signup-name" type="text" placeholder="Alex Morgan"
              value={name} onChange={e => setName(e.target.value)} required />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="signup-email">Email</label>
          <div className="input-wrapper">
            <Mail size={16} className="input-icon" />
            <input id="signup-email" type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="signup-password">Password</label>
          <div className="input-wrapper">
            <Lock size={16} className="input-icon" />
            <input id="signup-password" type={showPass ? 'text' : 'password'}
              placeholder="Min. 6 characters" value={password}
              onChange={e => setPassword(e.target.value)} required />
            <button type="button" className="input-toggle"
              onClick={() => setShowPass(!showPass)} aria-label="Toggle password visibility">
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="signup-confirm">Confirm Password</label>
          <div className="input-wrapper">
            <Lock size={16} className="input-icon" />
            <input id="signup-confirm" type="password" placeholder="Repeat password"
              value={confirm} onChange={e => setConfirm(e.target.value)} required />
          </div>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-submit-btn">Create Account</button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  )
}
