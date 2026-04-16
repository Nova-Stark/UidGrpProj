# Finio Dashboard - Developer Documentation

This document provides a technical overview of the React architecture and outlines the role of each `.jsx` file in the project. It serves as a guide for developers looking to understand, maintain, or extend the Finio frontend application.

## 🏗️ Architecture Overview

The application is built using **React 18** and **Vite**. It follows a standard client-side routing architecture using `react-router-dom`. 

- **Styling**: Vanilla CSS, scoped per-component using modular imports (e.g., `import './Component.css'`).
- **State Management**: React Context (`AuthContext`) for global authentication state, and local `useState` for component-level interaction.
- **Icons**: SVG icons provided by the `lucide-react` library.
- **Data Layer**: Static mock data is served locally from `src/data/appData.json` and transformed via `src/data/mockData.js`. There is no persistent backend; state resets on refresh.

---

## 📂 Core Entry Points

### `src/main.jsx`
The absolute entry point of the React application. It binds the React tree to the domestic `index.html` DOM, wraps the application in the generic `<BrowserRouter>`, and applies the global CSS (`index.css`).

### `src/App.jsx`
The central routing definitions. It dictates Which URL paths render which UI components. It organizes routes into two main groups:
1. Public Routes (Wrapped in `AuthLayout`): `/login`, `/signup`.
2. Protected Routes (Wrapped in `ProtectedRoute` and `AppLayout`): Everything else.

---

## 🔒 Context & Security

### `src/context/AuthContext.jsx`
A React Context provider that manages the global authentication state. 
- **Roles**: Tracks the currently logged-in user, and provides the `login`, `signup`, and `logout` handler functions used globally.
- **Usage**: Any component can consume this via `const { user, logout } = useAuth()`.

### `src/components/layout/ProtectedRoute.jsx`
A wrapper component used in `App.jsx`. It checks the `AuthContext` to see if a valid user exists. If yes, it renders its child components. If no, it intercepts the routing and redirects the user safely back to `/login`.

---

## 🧩 Layout & Global Components

### `src/components/layout/AppLayout.jsx`
The primary authenticated layout wrapper. 
- **Structure**: It integrates the `Sidebar` and `Topbar` components alongside a central `<main>` `<Outlet />` area where the actual page content is rendered.
- **Responsiveness**: It manages the state (`mobileMenuOpen`) for toggling the mobile off-canvas sidebar and rendering the dark background overlay.

### `src/components/layout/AuthLayout.jsx`
The layout wrapper specifically for the login and signup pages. It applies the global cinematic background image (`background.jpg`) and provides a centered, focus-driven card layout to house the authentication forms.

### `src/components/layout/Sidebar.jsx`
The primary navigation menu. Maps over a predefined list of route objects to render `NavLink` components. Contains responsive logic to listen to the `isOpen` prop for sliding out of the canvas on mobile devices.

### `src/components/layout/Topbar.jsx`
The top header seen across all authenticated pages. 
- **Roles**: Dynamically updates its title based on the current `react-router` location. Contains a purely visual global search bar, a notification bell, and a user avatar.
- **Mobile**: Exposes a Hamburger `<Menu />` button on narrow screens that triggers the mobile Sidebar to open.

### `src/components/ui/CategoryIcon.jsx`
A crucial, centralized helper component for rendering categorised expense icons.
- **Roles**: Maps a string input (e.g., `food`, `rent`, `subscription`) to a specific `lucide-react` SVG icon component. Ensures visual consistency by replacing messy, hardcoded emojis across the application.

---

## 📄 Pages (Features)
Every page folder contains a single `.jsx` UI component and its tightly coupled `.css` stylesheet.

### Auth Pages
- **`src/pages/login/LoginPage.jsx`**: Handles user authentication. Updates local component state for email/password and fires the global `login()` context method. Unsuccessful attempts trigger inline error messages.
- **`src/pages/signup/SignupPage.jsx`**: Collects new user registration data. Contains local validation to ensure "password" matches "confirm password" before firing the global `signup()` context method.

### Primary Dashboard
- **`src/pages/dashboard/DashboardPage.jsx`**: The command center. Aggregates data from `mockData.js` to render four top-level stat cards, Recharts-based Cash Flow (AreaChart) and Top Spending (PieChart) components, and truncated lists of Recent Transactions and rule-based Insights. 

### Finance Modules
- **`src/pages/accounts/AccountsPage.jsx`**: Renders all linked bank accounts and crypto wallets in colored gradient cards. Below the cards, it renders an intelligent list that sorts and filters the global `transactions` array to show recent activity *specifically tied to each individual account*.
- **`src/pages/transactions/TransactionsPage.jsx`**: A searchable, filterable master ledger. Relies heavily on local `useState` to immediately filter transaction rows by string-matching account names, or filtering dropdowns by 'income/expense' and 'category'.
- **`src/pages/spending/SpendingPage.jsx`**: Provides a deep visual dive into expenses. Uses Recharts to render a categorized Donut chart alongside a ranked leaderboard and a historical bar chart of month-to-month outgoing cash.
- **`src/pages/income/IncomePage.jsx`**: Focuses entirely on inbound cashflow. Renders calculated summary cards per-income-source alongside an ordered historical list and a bar chart comparison of incoming monthly revenues.
- **`src/pages/investments/InvestmentsPage.jsx`**: Displays a breakdown of the user's investment portfolio. Calculates and renders absolute `$ Gain/Loss` and `% Gain` metrics mathematically on runtime based on original investment vs. current value data.
- **`src/pages/budgets/BudgetsPage.jsx`**: Renders visual progress bars indicating how close a user is to hitting their monthly thresholds. Contains dynamic JavaScript logic to change the color of the progress bar (green -> orange -> red) as it approaches 100% saturation.

### User Data & Assistance
- **`src/pages/insights/InsightsPage.jsx`**: Maps over `appData.json` generated alerts to give human-readable guidance. Alters the color, background badge, and left-border color of the cards dynamically based on the priority level (success, info, warning, alert).
- **`src/pages/profile/ProfilePage.jsx`**: Displays the user's initials, generated avatar, and join date alongside a highly-detailed, 3-column chronological "Activity" log simulating a real 160-day historical banking feed.
- **`src/pages/settings/SettingsPage.jsx`**: A mocked configuration panel managing user preferences like default application currency variants, week-start dates, notification toggles, and dynamic styling dots.
