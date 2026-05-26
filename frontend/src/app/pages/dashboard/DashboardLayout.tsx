import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Home, ClipboardList, History, BookOpen, Info, User, LogOut } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Inicio', end: true },
  { to: '/dashboard/assessment', icon: ClipboardList, label: 'Evaluar riesgo' },
  { to: '/dashboard/history', icon: History, label: 'Mi historial' },
  { to: '/dashboard/recommendations', icon: BookOpen, label: 'Recomendaciones' },
  { to: '/dashboard/information', icon: Info, label: 'Información' },
  { to: '/dashboard/profile', icon: User, label: 'Perfil' },
]

export default function DashboardLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex">
      <aside className="w-72 bg-sidebar border-r border-border flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-heading font-bold text-foreground">
            Sistema de Predicción
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-1" role="navigation" aria-label="Navegación principal">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sidebar-hover text-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-hover hover:text-foreground'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-sidebar-hover hover:text-foreground transition-colors w-full cursor-pointer"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto bg-background">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}
