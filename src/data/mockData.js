import appData from './appData.json'

export const { accounts: accountsList, categories, budgets, investments, insights, profile: userProfile } = appData

const categoryIds = ['food', 'rent', 'travel', 'entertainment', 'health', 'shopping', 'utilities', 'education']

const expenseNames = {
  food:          ['Swiggy Order', 'Zomato Delivery', 'Starbucks', 'Cafe Coffee Day', 'BigBasket Groceries', 'Restaurant Bill'],
  rent:          ['Monthly Rent', 'Maintenance Charge', 'Society Fee'],
  travel:        ['Uber Ride', 'Ola Cab', 'Flight Ticket', 'Train Ticket', 'Metro Card Recharge', 'Bus Pass'],
  entertainment: ['Netflix', 'Spotify', 'BookMyShow', 'Amazon Prime', 'Steam Game', 'YouTube Premium'],
  health:        ['Apollo Pharmacy', 'Gym Membership', 'Doctor Visit', 'Lab Test', 'Dental Checkup'],
  shopping:      ['Myntra Order', 'Amazon Purchase', 'Flipkart', 'Ajio', 'Nykaa'],
  utilities:     ['Electricity Bill', 'Internet Bill', 'Mobile Recharge', 'DTH Recharge', 'Gas Bill'],
  education:     ['Udemy Course', 'Coursera', 'Book Purchase', 'Workshop Fee', 'Tuition Fee'],
}

const accountNames = ['HDFC Bank', 'SBI Savings', 'Cash Wallet', 'ICICI Credit', 'Crypto Wallet']

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function dateAgo(daysAgo) {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString()
}

// Generate transactions spread across 160 days, newest first.
// Realistic mix: ~20% income events, ~80% expenses — interspersed by date.
const incomeCategories = ['salary', 'freelance']
const allTxns = Array.from({ length: 80 }, (_, i) => {
  // Scatter income roughly every 5th entry, based on day offset
  const daysAgo   = i * 2
  const isIncome  = (i % 5 === 0) || (i % 13 === 0)
  const category  = isIncome
    ? incomeCategories[i % incomeCategories.length]
    : categoryIds[i % categoryIds.length]
  const cat       = categories.find(c => c.id === category)
  const names     = isIncome
    ? (category === 'salary'
        ? ['Monthly Salary', 'Salary Credit', 'Salary Deposit']
        : ['Freelance Payment', 'Client Invoice', 'Project Payment', 'Consulting Fee'])
    : expenseNames[category]
  return {
    id:            `txn-${i + 1}`,
    name:          names[i % names.length],
    amount:        isIncome ? randomBetween(18000, 85000) : randomBetween(150, 8500),
    type:          isIncome ? 'income' : 'expense',
    category,
    categoryLabel: cat?.label || category,
    categoryColor: cat?.color || '#888',
    account:       accountNames[i % accountNames.length],
    date:          dateAgo(daysAgo),
  }
})

// Sort by date descending so latest transactions appear first
export const transactions = allTxns.sort((a, b) => new Date(b.date) - new Date(a.date))

export const incomeEntries = Array.from({ length: 30 }, (_, i) => {
  const sources  = ['Salary', 'Freelance', 'Investments', 'Other']
  const source   = sources[i % sources.length]
  const amounts  = { Salary: randomBetween(60000, 85000), Freelance: randomBetween(8000, 35000), Investments: randomBetween(1000, 12000), Other: randomBetween(500, 5000) }
  return {
    id:     `inc-${i + 1}`,
    source,
    amount: amounts[source],
    date:   dateAgo(i * 5),
  }
})

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const now = new Date()

export const monthlyData = Array.from({ length: 12 }, (_, i) => {
  const monthIndex = (now.getMonth() - 11 + i + 12) % 12
  const income     = randomBetween(55000, 95000)
  const expense    = randomBetween(25000, 65000)
  return { month: monthNames[monthIndex], income, expense, savings: income - expense }
})

export const activityData = appData.activityData

export function getSummary() {
  const totalBalance   = accountsList.reduce((s, a) => s + a.balance, 0)
  const n              = new Date()
  const thisMonth      = transactions.filter(t => {
    const d = new Date(t.date)
    return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
  })
  const monthlyIncome  = thisMonth.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const monthlyExpense = thisMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const monthlySavings = monthlyIncome - monthlyExpense
  const totalInvested  = investments.reduce((s, i) => s + i.invested, 0)
  const currentValue   = investments.reduce((s, i) => s + i.currentValue, 0)
  return { totalBalance, monthlyIncome, monthlyExpense, monthlySavings, totalInvested, currentValue }
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}
