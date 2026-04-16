import {
  Utensils, Home, Plane, Film, Heart, ShoppingBag,
  Zap, BookOpen, Briefcase, Monitor, DollarSign,
  TrendingUp, AlertCircle, Target
} from 'lucide-react'

const iconMap = {
  food:          Utensils,
  rent:          Home,
  travel:        Plane,
  entertainment: Film,
  health:        Heart,
  shopping:      ShoppingBag,
  utilities:     Zap,
  education:     BookOpen,
  salary:        Briefcase,
  freelance:     Monitor,
  // insight icon keys
  'trending-up': TrendingUp,
  'alert-circle':AlertCircle,
  target:        Target,
  home:          Home,
  utensils:      Utensils,
  briefcase:     Briefcase,
}

export default function CategoryIcon({ category, size = 16, className }) {
  const Icon = iconMap[category] || DollarSign
  return <Icon size={size} className={className} />
}
