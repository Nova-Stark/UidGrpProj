import { useState } from 'react'
import { categories } from '../../data/mockData'
import './SettingsPage.css'

export default function SettingsPage() {
  const [currency, setCurrency]         = useState('INR')
  const [notifications, setNotifications] = useState(true)
  const [weekStart, setWeekStart]       = useState('monday')

  return (
    <div className="settings-page">
      <section className="settings-section">
        <h3 className="settings-section-title">Preferences</h3>

        <div className="settings-row">
          <div className="settings-row-info">
            <p className="settings-row-label">Currency</p>
            <p className="settings-row-desc">Default currency for display</p>
          </div>
          <select id="currency-select" className="settings-select"
            value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="INR">₹ Indian Rupee (INR)</option>
            <option value="USD">$ US Dollar (USD)</option>
            <option value="EUR">€ Euro (EUR)</option>
            <option value="GBP">£ British Pound (GBP)</option>
          </select>
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <p className="settings-row-label">Week starts on</p>
            <p className="settings-row-desc">Used in weekly reports</p>
          </div>
          <select id="week-start-select" className="settings-select"
            value={weekStart} onChange={e => setWeekStart(e.target.value)}>
            <option value="monday">Monday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>

        <div className="settings-row">
          <div className="settings-row-info">
            <p className="settings-row-label">Notifications</p>
            <p className="settings-row-desc">Budget alerts and insights</p>
          </div>
          <button id="notifications-toggle"
            className={`settings-toggle ${notifications ? 'on' : 'off'}`}
            onClick={() => setNotifications(!notifications)}
            aria-label="Toggle notifications">
            <span className="settings-toggle-knob" />
          </button>
        </div>
      </section>

      <section className="settings-section">
        <h3 className="settings-section-title">Categories</h3>
        <div className="settings-categories-grid">
          {categories.map(c => (
            <div key={c.id} className="settings-category-item">
              <span className="settings-cat-dot" style={{ background: c.color }} />
              <span className="settings-cat-label">{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h3 className="settings-section-title">About</h3>
        <div className="settings-about">
          <p><strong>Finio</strong> — Personal Finance Dashboard</p>
          <p className="settings-about-sub">Version 1.0.0 · Frontend only · Data is local and not persisted.</p>
        </div>
      </section>
    </div>
  )
}
