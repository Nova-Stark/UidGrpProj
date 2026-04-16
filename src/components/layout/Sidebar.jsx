import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Wallet, ArrowLeftRight, PieChart,
  TrendingUp, BarChart3, Target, Lightbulb, User, Settings, LogOut, X
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './Sidebar.css'

const navItems = [
  { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/accounts',     icon: Wallet,          label: 'Accounts' },
  { to: '/transactions', icon: ArrowLeftRight,  label: 'Transactions' },
  { to: '/spending',     icon: PieChart,        label: 'Spending' },
  { to: '/income',       icon: TrendingUp,      label: 'Income' },
  { to: '/investments',  icon: BarChart3,       label: 'Investments' },
  { to: '/budgets',      icon: Target,          label: 'Budgets' },
  { to: '/insights',     icon: Lightbulb,       label: 'Insights' },
]

const bottomItems = [
  { to: '/profile',  icon: User,     label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar({ isOpen, closeMenu }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    closeMenu()
    navigate('/login')
  }

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-left">
          <span className="sidebar-logo">⬡</span>
          <span className="sidebar-name">Finio</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeMenu} aria-label="Close menu">
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink to={to} onClick={closeMenu} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-bottom">
        <ul className="sidebar-nav-list">
          {bottomItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink to={to} onClick={closeMenu} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button className="sidebar-link sidebar-logout" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}
