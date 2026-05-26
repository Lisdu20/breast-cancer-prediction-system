import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Heart, Shield, Activity } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const features = [
  { icon: Heart, title: 'Evaluación personalizada', desc: 'Basada en tus factores de riesgo' },
  { icon: Shield, title: 'Datos seguros', desc: 'Tu información está protegida' },
  { icon: Activity, title: 'Monitoreo continuo', desc: 'Seguimiento de tu salud' },
]

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-heading font-bold leading-tight">
              Bienvenida a tu sistema de predicción
            </h1>
            <div className="space-y-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <Card className="p-8 space-y-6">
            <h2 className="text-2xl font-heading font-bold text-center">Accede a tu cuenta</h2>
            <div className="space-y-4">
              <Button fullWidth onClick={() => navigate('/login')}>
                Iniciar sesión
              </Button>
              <Button fullWidth variant="outline" onClick={() => navigate('/register')}>
                Crear cuenta
              </Button>
            </div>
            <div className="bg-warning/10 border border-warning/30 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">
                Esta herramienta no sustituye el diagnóstico médico profesional.
              </p>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
