import { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'

const estados = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
  'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato',
  'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México', 'Michoacán', 'Morelos',
  'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
  'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
  'Veracruz', 'Yucatán', 'Zacatecas',
]

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '', edad: '', estado: '', email: '', password: '', confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.nombre) newErrors.nombre = 'El nombre es obligatorio'
    if (!form.edad) newErrors.edad = 'La edad es obligatoria'
    else if (Number(form.edad) < 18) newErrors.edad = 'Debes ser mayor de 18 años'
    else if (Number(form.edad) > 100) newErrors.edad = 'Edad máxima 100 años'
    if (!form.estado) newErrors.estado = 'Selecciona un estado'
    if (!form.email) newErrors.email = 'El correo es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Formato de correo inválido'
    if (!form.password) newErrors.password = 'La contraseña es obligatoria'
    else if (form.password.length < 8) newErrors.password = 'Mínimo 8 caracteres'
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden'
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

  const update = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
    clearError(field)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <button
          onClick={() => navigate('/welcome')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer"
          aria-label="Volver"
        >
          <ArrowLeft className="w-5 h-5" /> Volver
        </button>
        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
          <h1 className="text-3xl font-heading font-bold mb-2">Crear cuenta</h1>
          <p className="text-muted-foreground mb-8">Regístrate para comenzar tu evaluación</p>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Nombre completo"
                placeholder="María Pérez"
                value={form.nombre}
                error={errors.nombre}
                onChange={(e) => update('nombre', e.target.value)}
                required
              />
              <Input
                label="Edad"
                type="number"
                min={18}
                max={100}
                placeholder="25"
                value={form.edad}
                error={errors.edad}
                onChange={(e) => update('edad', e.target.value)}
                required
              />
            </div>
            <Select
              label="Estado"
              options={estados.map((e) => ({ value: e, label: e }))}
              value={form.estado}
              error={errors.estado}
              onChange={(e) => update('estado', e.target.value)}
              required
            />
            <Input
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              value={form.email}
              error={errors.email}
              onChange={(e) => update('email', e.target.value)}
              required
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Contraseña"
                type="password"
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                error={errors.password}
                onChange={(e) => update('password', e.target.value)}
                helperText="Debe tener al menos 8 caracteres"
                required
              />
              <Input
                label="Confirmar contraseña"
                type="password"
                autoComplete="new-password"
                placeholder="Repite la contraseña"
                value={form.confirmPassword}
                error={errors.confirmPassword}
                onChange={(e) => update('confirmPassword', e.target.value)}
                required
              />
            </div>
            <Button type="submit" fullWidth>
              Crear cuenta
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <button onClick={() => navigate('/login')} className="text-primary hover:underline font-medium cursor-pointer">
              Inicia sesión
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
