import { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.email) newErrors.email = 'El correo es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Formato de correo inválido'
    if (!form.password) newErrors.password = 'La contraseña es obligatoria'
    else if (form.password.length < 8) newErrors.password = 'Mínimo 8 caracteres'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const clearError = (field: string) => {
    if (errors[field]) {
      const next = { ...errors }
      delete next[field]
      setErrors(next)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate('/welcome')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer"
          aria-label="Volver"
        >
          <ArrowLeft className="w-5 h-5" /> Volver
        </button>
        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
          <h1 className="text-3xl font-heading font-bold mb-2">Iniciar sesión</h1>
          <p className="text-muted-foreground mb-8">Accede a tu cuenta para continuar</p>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Input
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              value={form.email}
              error={errors.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); clearError('email') }}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              error={errors.password}
              onChange={(e) => { setForm({ ...form, password: e.target.value }); clearError('password') }}
              required
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="rounded border-border"
                />
                Recordarme
              </label>
              <button type="button" className="text-sm text-primary hover:underline cursor-pointer">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <Button type="submit" fullWidth>
              Iniciar sesión
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <button onClick={() => navigate('/register')} className="text-primary hover:underline font-medium cursor-pointer">
              Regístrate
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
