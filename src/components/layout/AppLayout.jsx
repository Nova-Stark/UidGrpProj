import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import './AppLayout.css'

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar isOpen={mobileMenuOpen} closeMenu={() => setMobileMenuOpen(false)} />
      
      {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />}
      
      <div className="app-main">
        <Topbar toggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
