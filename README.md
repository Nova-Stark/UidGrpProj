# Finio — Personal Finance Dashboard

A personal finance dashboard built with React and Vite. Track income, expenses, budgets, investments, and spending habits in one place.

## Tech Stack

- **React 18** with React Router v6
- **Recharts** for data visualisation
- **Lucide React** for icons
- **Vite** as the build tool
- **Vanilla CSS** for styling

## Pages

| Route | Description |
|---|---|
| `/dashboard` | Overview with stat cards, cash flow chart, and recent transactions |
| `/accounts` | Account cards with recent activity per account |
| `/transactions` | Full transaction list with search and type filter |
| `/spending` | Spending breakdown by category with pie chart |
| `/income` | Income history and source breakdown |
| `/investments` | Investment portfolio overview |
| `/budgets` | Budget tracking per category |
| `/insights` | Automated financial insights |
| `/profile` | User profile with recent activity |
| `/settings` | App settings and preferences |

## Project Structure

```
src/
├── components/
│   ├── layout/       # AppLayout, Sidebar, Topbar, AuthLayout, ProtectedRoute
│   └── ui/           # CategoryIcon and other shared UI components
├── context/
│   └── AuthContext.jsx
├── data/
│   ├── appData.json  # Static seed data
│   └── mockData.js   # Generated transaction and chart data
├── pages/            # One folder per page
└── index.css         # Global design tokens and base styles
```

## Screenshots

_Add your final website screenshots here. Examples below:_

- **Public Landing Page**
  ![Landing Page Placeholder](https://via.placeholder.com/1200x600?text=Finio+Landing+Page)
- **Main Dashboard**
  ![Dashboard Placeholder](https://via.placeholder.com/1200x600?text=Finio+Dashboard)
- **Accounts & Transactions**
  ![Transactions Placeholder](https://via.placeholder.com/1200x600?text=Finio+Transactions)

## Team Members

| Name | Role | Primary Responsibilities |
|---|---|---|
| **Member One** | Team Lead | Frontend Architecture & Dashboard implementation |
| **Member Two** | Logic Dev | Authentication flow, Context API & Data logic |
| **Member Three** | UI/UX Designer | Visual design, Branding & Interactive components |
| **Member Four** | QA & Docs | Documentation, testing & Feature verification |

## Contribution Breakdown

- **Member One**: Designed the core dashboard, integrated Recharts for cash flow analysis, and built the layout shell.
- **Member Two**: Developed the `AuthContext`, implemented protected routing, and managed the mock data structures.
- **Member Three**: Created the public landing/about pages, developed the dark-theme design system, and stylized UI components.
- **Member Four**: Authored the technical documentation, implemented the Insights and Settings modules, and performed cross-browser testing.

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally ||
