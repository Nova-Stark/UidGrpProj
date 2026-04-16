import { useLocation } from 'react-router-dom'
import { Search, Bell, Menu } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Topbar.css'

const pageTitles = {
  '/dashboard':    'Dashboard',
  '/accounts':     'Accounts',
  '/transactions': 'Transactions',
  '/spending':     'Spending',
  '/income':       'Income',
  '/investments':  'Investments',
  '/budgets':      'Budgets',
  '/insights':     'Insights',
  '/profile':      'Profile',
  '/settings':     'Settings',
}

export default function Topbar({ toggleMenu }) {
  const location = useLocation()
  const { user } = useAuth()
  const navigate = useNavigate()
  const title = pageTitles[location.pathname] || 'Dashboard'

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U'

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-icon-btn mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
          <Menu size={18} />
        </button>
        <h1 className="topbar-title">{title}</h1>
      </div>

      <div className="topbar-actions">
        <div className="topbar-search">
          <Search size={15} />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="topbar-icon-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="notif-dot" />
        </button>

        <button
          className="topbar-avatar"
          onClick={() => navigate('/profile')}
          aria-label="Go to profile"
        >
          {initials}
        </button>
      </div>
    </header>
  )
}
