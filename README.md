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
| `npm run preview` | Preview production build locally |
