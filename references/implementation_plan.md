# Finance Dashboard — React Web App Implementation Plan

## Reference Analysis

````carousel
**Ref 1 (Mobile Kit)** — Dark theme, green accent, donut chart, card-style balance UI, transaction list with category icons
<!-- slide -->
**Ref 2 (Dompet)** — Light sidebar, colorful stat cards (orange/green/blue), pie chart, bar chart, quick transfer widget
<!-- slide -->
**Ref 3 (BANK)** — Dark purple theme, teal/pink accents, area chart, donut spending stats, credit card carousel, transaction history
<!-- slide -->
**Ref 4 (AI Financial)** — Dark teal landing page, geometric shapes, dashboard preview, feature cards, SaaS marketing layout
<!-- slide -->
**Ref 5 (Lumari)** — Dark + gold/cream landing, floating card UIs, CTA hero, partner logos, feature numbered list
<!-- slide -->
**Ref 6 (Dashboard)** — Dark with warm orange accent, sidebar sectioned nav, stat cards, bar chart, transaction table, credit card, spending limit bars
````

### Design Direction (Distilled)

| Aspect | Decision |
|---|---|
| **Theme** | Dark primary (inspired by ref 3, 4, 6) |
| **Primary accent** | Emerald green `#10b981` (ref 1, 4) |
| **Secondary accent** | Soft purple `#8b5cf6` |
| **Tertiary** | Warm amber `#f59e0b` (for warnings/alerts) |
| **Cards** | Subtle border (`1px solid rgba(255,255,255,0.06)`), solid dark backgrounds — **no glass/blur effects** |
| **Typography** | Inter (Google Fonts) — clean, modern, excellent for numbers |
| **Radius** | `12px` on cards, `8px` on inputs/buttons |
| **Shadows** | Minimal — only for elevation on modals/dropdowns |
| **Charts** | Recharts library — lightweight, React-native, composable |
| **Animations** | Light CSS transitions only (`transition: 0.2s ease`) — **no Framer Motion** |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (via Vite) |
| Routing | React Router v6 |
| Styling | CSS Modules + CSS Variables (dark theme tokens) |
| Charts | Recharts |
| Animations | CSS transitions only (no external animation library) |
| Icons | Lucide React |
| Fonts | Inter (Google Fonts) |
| Mock Data | `/src/data/mockData.js` — runtime generated |

> [!IMPORTANT]
> **No Tailwind CSS** — using vanilla CSS with CSS Variables as the user specified React only. CSS Modules for scoped styles per component.

> [!NOTE]
> **Build approach: Layer by layer.** Structure first (HTML/JSX skeleton) → Add elements/data → Develop styling. No glass effects anywhere. If background images are needed for auth or landing pages, we'll pause and ask before generating.

---

## 0. Global Design System

### CSS Variables (`/src/index.css`)

```css
:root {
  /* Background */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: #16161f;
  --bg-card-hover: #1c1c28;
  --bg-sidebar: #0e0e15;
  
  /* Accent */
  --accent-green: #10b981;
  --accent-green-dim: rgba(16, 185, 129, 0.15);
  --accent-purple: #8b5cf6;
  --accent-purple-dim: rgba(139, 92, 246, 0.15);
  --accent-amber: #f59e0b;
  --accent-red: #ef4444;
  
  /* Text */
  --text-primary: #f1f1f4;
  --text-secondary: #8a8a9a;
  --text-muted: #55556a;
  
  /* Border */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-hover: rgba(255, 255, 255, 0.12);
  
  /* Spacing (8px grid system) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  
  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  
  /* Font */
  --font-family: 'Inter', -apple-system, sans-serif;
}
```

### Global Layout Components

| Component | Purpose |
|---|---|
| `AppLayout` | Wraps authenticated pages — sidebar + topbar + content area |
| `AuthLayout` | Wraps login/signup — centered card with background effects |
| `Sidebar` | Fixed left nav, collapsible, icon + label, active state highlight |
| `Topbar` | Page title, search bar, notification bell, user avatar (links to profile) |
| `PageContainer` | Main content wrapper with consistent padding and max-width |

### Shared UI Components

| Component | Usage |
|---|---|
| `Card` | Universal card wrapper with variants (default, stat) — solid bg, no glass |
| `SectionHeader` | Title + optional action button for card/section headers |
| `Badge` | Colored pill for categories, status |
| `Modal` | Overlay dialog for details/edit forms |
| `EmptyState` | Illustration + message when no data |
| `Loader` | Skeleton loader for async content simulation |
| `ChartWrapper` | Consistent chart container with title and legend |
| `Avatar` | User avatar with fallback initials |
| `Toggle` | Switch component for settings |
| `Dropdown` | Select-style dropdown |
| `ProgressBar` | Horizontal bar with color shifts |

### Background Elements

| Page | Background Treatment |
|---|---|
| **Auth (Login/Signup)** | Subtle gradient background (CSS `linear-gradient`) with soft color stops. Optionally a low-opacity background image — **will ask user before generating any images.** |
| **Dashboard & Inner Pages** | Solid `--bg-primary` with a very subtle noise texture overlay (`opacity: 0.03`). No video, no heavy effects — keeps focus on content. |

> [!TIP]
> No glass effects, no animated blobs. Auth backgrounds use simple CSS gradients. If a background image would improve the look, we'll generate one and confirm with you first.

---

## 1. Auth Pages — `/login` & `/signup`

### Layout
- Full-screen centered card on subtle gradient background
- Card: `max-width: 420px`, solid dark card bg (`--bg-card`), no blur/glass
- Minimal branding (app name + small tagline) above form

### Components

| Component | Details |
|---|---|
| `AuthLayout` | Full-screen wrapper with gradient blobs animation |
| `AuthCard` | Glass card containing the form |
| `InputField` | Styled input with floating label, icon prefix |
| `PasswordField` | InputField + toggle visibility button |
| `PrimaryButton` | Full-width CTA, green accent, hover glow |
| `AuthSwitchLink` | "Don't have an account? Sign up" / "Already have one? Log in" |

### Form Fields
- **Login**: Email, Password, "Forgot password?" link, Login button
- **Signup**: Full Name, Email, Password, Confirm Password, Signup button

### Styling Details
- Input fields: dark bg (`--bg-card`), subtle border, green focus ring
- Button: `background: var(--accent-green)`, subtle hover brightness shift
- Background: CSS gradient only, no animated blobs

### Auth Flow
- Frontend-only: store auth state in React Context
- On login/signup → redirect to `/dashboard`
- Protected routes redirect to `/login` if not authenticated

---

## 2. Dashboard — `/dashboard`

### Layout Grid (CSS Grid)
```
┌────────────────────────────┬──────────────┐
│      Balance Card          │  Stat Cards  │
│                            │  (3 cards)   │
├────────────────────────────┼──────────────┤
│   Cash Flow Chart          │  Spending    │
│   (Area/Bar Chart)         │  Donut       │
├────────────────────────────┼──────────────┤
│   Recent Transactions      │  Insights    │
│   (5 items)                │  (2-3 cards) │
└────────────────────────────┴──────────────┘
```

### Components

| Component | Details |
|---|---|
| `BalanceCard` | Large card — total balance, trend arrow, % change. Gradient border (green→purple). |
| `StatCard` | Income / Expense / Savings — icon, value, % change badge. Row of 3. |
| `CashFlowChart` | Area chart (Recharts) — Income vs Expense over 6 months. Toggle: weekly/monthly. |
| `SpendingDonut` | Donut chart — top 5 categories. Legend below. |
| `RecentTransactions` | List of 5 latest transactions — icon, name, date, amount (colored). "View All" link. |
| `InsightCard` | Alert-style card — icon + short insight message (e.g. "Spending up 12% this month"). |
| `QuickActions` | Row of icon buttons: Add Transaction, Transfer, Set Budget. |

### Styling
- Cards: `border: 1px solid var(--border-subtle)`, `border-radius: var(--radius-lg)`
- Balance card: subtle gradient border using `background: linear-gradient(...)` on a wrapper
- Charts: green/purple color scheme, soft glow on data points
- Hover on cards: `transform: translateY(-2px)`, `border-color: var(--border-hover)`

---

## 3. Accounts — `/accounts`

### Components

| Component | Details |
|---|---|
| `AccountCard` | Styled like a debit/bank card (ref 1, 3, 6) — gradient bg, card number dots, balance, bank name |
| `AccountList` | Grid of AccountCards (2-3 columns) |
| `AccountDetailsModal` | Modal with full account details + mini transaction list |

### Account Types (Mock)
- Primary Bank Account (gradient: green → teal)
- Savings Account (gradient: purple → blue)
- Cash Wallet (gradient: amber → orange)
- Credit Card (gradient: dark gray → charcoal)

### Styling
- Cards: `border-radius: var(--radius-xl)`, gradient overlays, slight `box-shadow`
- Contactless icon, card dots pattern
- Hover: slight rotation (`transform: perspective(800px) rotateY(2deg)`)

---

## 4. Transactions — `/transactions`

### Components

| Component | Details |
|---|---|
| `TransactionTable` | Styled list/table — not a plain HTML table. Each row is a card-like element. |
| `TransactionRow` | Icon (category), name, date, account, amount (green for income, red for expense), category badge |
| `FilterBar` | Date range picker, category dropdown, account dropdown, type filter (income/expense/all) |
| `SearchInput` | Search by name/description |
| `TransactionModal` | Add/Edit transaction form |

### Styling
- Rows: `border-bottom: 1px solid var(--border-subtle)`, hover highlight
- Category badges: colored pills (food=amber, rent=purple, salary=green, etc.)
- Amount: `color: var(--accent-green)` for income, `color: var(--accent-red)` for expense
- Pagination or infinite scroll (simulated with mock data)

---

## 5. Spending Analytics — `/spending`

### Components

| Component | Details |
|---|---|
| `CategoryPieChart` | Pie/Donut chart — spending by category |
| `MonthlyTrendChart` | Line/Bar chart — monthly spending trend |
| `TopSpendingList` | Ranked list of top 5 expenses |
| `DateRangeSelector` | This Month / Last 3 Months / Custom |

### Styling
- Max 2-3 colors per chart (green, purple, amber)
- Smooth `animationBegin` on chart render
- Clean card layout, minimal clutter

---

## 6. Income — `/income`

### Components

| Component | Details |
|---|---|
| `IncomeSourceCard` | Card per source — Salary, Freelance, Investments, Other |
| `IncomeChart` | Bar chart — monthly income over time |
| `IncomeList` | Table of income entries |

### Styling
- Green-dominant color scheme (inverted from spending)
- Source cards with green gradient borders
- Growth indicator arrows

---

## 7. Investments — `/investments`

### Components

| Component | Details |
|---|---|
| `PortfolioCard` | Total invested, current value, total gain/loss |
| `AssetList` | List of assets — name, amount invested, current value, % change |
| `ProfitLossIndicator` | Green arrow up / Red arrow down with % |
| `AllocationChart` | Donut chart — asset allocation (stocks, bonds, crypto, etc.) |

### Styling
- Dark cards with highlight borders (green for gains, red for losses)
- Subtle pulse animation on value change (CSS `@keyframes pulse`)
- Portfolio card: large, prominent, gradient border

---

## 8. Budgets — `/budgets`

### Components

| Component | Details |
|---|---|
| `BudgetCard` | Category name, budget amount, spent amount, remaining |
| `ProgressBar` | Horizontal bar — color shifts: green (<50%) → yellow (50-80%) → red (>80%) |
| `BudgetList` | Grid/List of BudgetCards |

### Styling
- Progress bars with smooth width transition
- Color-coded alerts for overspending
- Clean, scannable layout

---

## 9. Insights — `/insights`

### Components

| Component | Details |
|---|---|
| `InsightCard` | Icon + title + short description. Types: info, warning, success |
| `InsightList` | Stacked list of InsightCards |

### Rule-Based Insights (Generated from Mock Data)
- "Your food spending increased by 23% this month"
- "You're on track to save ₹5,000 this month"
- "Rent is your highest expense category"
- "You might overspend your entertainment budget by month end"

### Styling
- Cards with colored left border (green=positive, amber=warning, red=alert)
- Icon + message layout, no heavy visuals

---

## 10. Settings — `/settings`

### Components

| Component | Details |
|---|---|
| `Toggle` | Theme switch (dark/light — only dark implemented initially) |
| `Dropdown` | Currency selector |
| `CategoryManager` | List of categories with edit/delete, add new |

### Styling
- Clean form-like layout
- Grouped sections with `SectionHeader`

---

## 11. Profile — `/profile`

### Components (Profile)

| Component | Details |
|---|---|
| `ProfileHeader` | Avatar (large), name, email, member since date, edit button |
| `ProfileStats` | Summary cards — total transactions, total income, total expenses, net savings |
| `ProfileActivity` | Recent activity feed — last 10 actions (transactions, budget changes, etc.) |

### Styling
- Clean centered layout
- Large avatar at top, name + email below
- Stat cards in a row below header
- Activity list as simple timeline

---

## 11. Project Structure

```
src/
├── index.css                    # Global theme tokens + resets
├── App.jsx                      # Router setup
├── main.jsx                     # Entry point
│
├── components/
│   ├── layout/
│   │   ├── AppLayout.jsx        # Sidebar + Topbar + Content
│   │   ├── AuthLayout.jsx       # Centered card + gradient bg
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   └── PageContainer.jsx
│   │
│   ├── ui/
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Modal.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Loader.jsx
│   │   ├── ChartWrapper.jsx
│   │   ├── Avatar.jsx
│   │   ├── Toggle.jsx
│   │   ├── Dropdown.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── InputField.jsx
│   │   ├── PasswordField.jsx
│   │   ├── PrimaryButton.jsx
│   │   └── SectionHeader.jsx
│   │
│   ├── auth/
│   │   ├── AuthCard.jsx
│   │   └── AuthSwitchLink.jsx
│   │
│   ├── dashboard/
│   │   ├── BalanceCard.jsx
│   │   ├── StatCard.jsx
│   │   ├── CashFlowChart.jsx
│   │   ├── SpendingDonut.jsx
│   │   ├── RecentTransactions.jsx
│   │   ├── InsightCard.jsx
│   │   └── QuickActions.jsx
│   │
│   ├── accounts/
│   │   ├── AccountCard.jsx
│   │   ├── AccountList.jsx
│   │   └── AccountDetailsModal.jsx
│   │
│   ├── transactions/
│   │   ├── TransactionTable.jsx
│   │   ├── TransactionRow.jsx
│   │   ├── FilterBar.jsx
│   │   ├── SearchInput.jsx
│   │   └── TransactionModal.jsx
│   │
│   ├── spending/
│   │   ├── CategoryPieChart.jsx
│   │   ├── MonthlyTrendChart.jsx
│   │   ├── TopSpendingList.jsx
│   │   └── DateRangeSelector.jsx
│   │
│   ├── income/
│   │   ├── IncomeSourceCard.jsx
│   │   ├── IncomeChart.jsx
│   │   └── IncomeList.jsx
│   │
│   ├── investments/
│   │   ├── PortfolioCard.jsx
│   │   ├── AssetList.jsx
│   │   ├── ProfitLossIndicator.jsx
│   │   └── AllocationChart.jsx
│   │
│   ├── budgets/
│   │   ├── BudgetCard.jsx
│   │   ├── ProgressBar.jsx (or reuse ui/ProgressBar)
│   │   └── BudgetList.jsx
│   │
│   ├── insights/
│   │   └── InsightList.jsx
│   │
│   ├── settings/
│   │   └── CategoryManager.jsx
│   │
│   └── profile/
│       ├── ProfileHeader.jsx
│       ├── ProfileStats.jsx
│       └── ProfileActivity.jsx
│
├── pages/
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── DashboardPage.jsx
│   ├── AccountsPage.jsx
│   ├── TransactionsPage.jsx
│   ├── SpendingPage.jsx
│   ├── IncomePage.jsx
│   ├── InvestmentsPage.jsx
│   ├── BudgetsPage.jsx
│   ├── InsightsPage.jsx
│   ├── SettingsPage.jsx
│   └── ProfilePage.jsx
│
├── context/
│   └── AuthContext.jsx           # Simple auth state (logged in / out)
│
├── data/
│   └── mockData.js               # All runtime-generated mock data
│
├── hooks/
│   └── useAuth.js                # Custom hook for auth context
│
└── styles/
    ├── auth.css
    ├── sidebar.css
    ├── topbar.css
    ├── dashboard.css
    ├── accounts.css
    ├── transactions.css
    ├── spending.css
    ├── income.css
    ├── investments.css
    ├── budgets.css
    ├── insights.css
    ├── settings.css
    └── profile.css
```

---

## 12. Routing Structure

```jsx
<Routes>
  {/* Public */}
  <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
  <Route path="/signup" element={<AuthLayout><SignupPage /></AuthLayout>} />
  
  {/* Protected — wrapped in AppLayout */}
  <Route path="/" element={<AppLayout />}>
    <Route index element={<Navigate to="/dashboard" />} />
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="accounts" element={<AccountsPage />} />
    <Route path="transactions" element={<TransactionsPage />} />
    <Route path="spending" element={<SpendingPage />} />
    <Route path="income" element={<IncomePage />} />
    <Route path="investments" element={<InvestmentsPage />} />
    <Route path="budgets" element={<BudgetsPage />} />
    <Route path="insights" element={<InsightsPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="profile" element={<ProfilePage />} />
  </Route>
</Routes>
```

---

## 13. Dummy Data Strategy

**File**: `/src/data/mockData.js`

All data generated at runtime using `Array.from()` + `Math.random()`. Key datasets:

| Dataset | Shape |
|---|---|
| `transactions` | `{ id, name, amount, type, category, account, date, icon }` — 80 entries |
| `accounts` | `{ id, name, type, balance, cardNumber, bank, gradient }` — 4 entries |
| `categories` | `{ id, name, icon, color }` — 10 categories |
| `budgets` | `{ id, category, limit, spent }` — 8 entries |
| `incomeEntries` | `{ id, source, amount, date }` — 30 entries |
| `investments` | `{ id, asset, type, invested, currentValue, allocation }` — 6 entries |
| `monthlyData` | `{ month, income, expense, savings }` — 12 entries |
| `insights` | `{ id, type, title, message, icon }` — 6 entries |
| `userProfile` | `{ name, email, avatar, joinDate, preferences }` — 1 entry |

> [!NOTE]
> Data structure matches expected backend schema for future API integration. Categories, types, and amounts use realistic Indian Rupee (₹) values.

---

## 14. Background & Visual Elements

| Element | Type | Where Used |
|---|---|---|
| ~~Gradient blobs~~ | ~~Removed~~ | — |
| Noise texture | CSS (`background-image: url(data:...)`) with SVG noise | All pages (very subtle, `opacity: 0.03`) |
| Gradient borders | CSS (`background: linear-gradient`) on pseudo-element | Balance card, account cards |
| Chart glow | CSS `filter: drop-shadow` (subtle) | Dashboard charts |
| Card hover lift | CSS `transform + transition` | All interactive cards |

> [!TIP]
> **No video backgrounds recommended.** The reference images achieve their premium feel entirely through gradients, blurs, and subtle texture — videos would add loading time and visual noise that contradicts the "minimal" requirement.

---

## 15. Design Constraints (Enforced)

- [x] Max 3 primary colors: Emerald, Purple, Amber
- [x] Consistent 8px spacing grid
- [x] Minimal shadows (only modals/dropdowns)
- [x] Max 2 charts per page section
- [x] No clutter — generous whitespace
- [x] Dark theme only (initially)
- [x] No Tailwind — vanilla CSS with variables
- [x] Inter font throughout

---

## Dependencies to Install

```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "react-router-dom": "^6",
    "recharts": "^2",
    "lucide-react": "^0.400"
  }
}
```

---

## Verification Plan

### Automated
- `npm run build` — ensure clean build with no errors
- `npm run dev` — visual check in browser

### Manual (Browser)
1. Navigate through all 13 routes — confirm rendering
2. Login → Dashboard flow works
3. Sidebar navigation highlights active page
4. Charts render with mock data
5. Responsive: test at 1440px, 1024px, 768px widths
6. Auth pages: gradient animation runs smoothly
7. All interactive elements (hover, click) respond correctly

---

## Execution Order

### Layer 1 — Structure (Skeleton)
1. Scaffold Vite + React, install deps
2. Create all page files + route config (empty shells)
3. Build `AppLayout` (sidebar + topbar + outlet) — structure only
4. Build `AuthLayout` — structure only

### Layer 2 — Elements & Data
5. Create `mockData.js` with all datasets
6. Add HTML elements to every page (no styling yet) — headings, lists, cards, charts
7. Wire up auth context + protected routes

### Layer 3 — Styling & Polish
8. `index.css` — design tokens, resets, dark theme
9. Style layout shell (sidebar, topbar)
10. Style auth pages (login, signup)
11. Style dashboard components
12. Style remaining pages (accounts → transactions → spending → income → investments → budgets → insights → profile → settings)
13. Add light CSS transitions (hover states, card lifts)
14. Verify — build check, visual review

> [!IMPORTANT]
> **Pause point:** After Layer 1 structure is done, if background images are needed for auth pages, we'll stop and ask before generating.
