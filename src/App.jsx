import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'

import LoginPage      from './pages/login/LoginPage'
import SignupPage     from './pages/signup/SignupPage'
import DashboardPage  from './pages/dashboard/DashboardPage'
import AccountsPage   from './pages/accounts/AccountsPage'
import TransactionsPage from './pages/transactions/TransactionsPage'
import SpendingPage   from './pages/spending/SpendingPage'
import IncomePage     from './pages/income/IncomePage'
import InvestmentsPage from './pages/investments/InvestmentsPage'
import BudgetsPage    from './pages/budgets/BudgetsPage'
import InsightsPage   from './pages/insights/InsightsPage'
import ProfilePage    from './pages/profile/ProfilePage'
import SettingsPage   from './pages/settings/SettingsPage'
import PublicLayout from './components/layout/PublicLayout'
import HomePage     from './pages/home/HomePage'
import AboutPage    from './pages/about/AboutPage'
import ContactPage  from './pages/contact/ContactPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"       element={<PublicLayout><HomePage  /></PublicLayout>} />
          <Route path="/about"  element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
          <Route path="/login"  element={<AuthLayout><LoginPage  /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout><SignupPage /></AuthLayout>} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard"    element={<DashboardPage   />} />
              <Route path="/accounts"     element={<AccountsPage    />} />

              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/spending"     element={<SpendingPage    />} />
              <Route path="/income"       element={<IncomePage      />} />
              <Route path="/investments"  element={<InvestmentsPage />} />
              <Route path="/budgets"      element={<BudgetsPage     />} />
              <Route path="/insights"     element={<InsightsPage    />} />
              <Route path="/profile"      element={<ProfilePage     />} />
              <Route path="/settings"     element={<SettingsPage    />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
