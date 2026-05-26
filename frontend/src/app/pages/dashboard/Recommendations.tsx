import { motion } from 'motion/react'
import { Stethoscope, Activity, Apple, Heart, Calendar, BookOpen } from 'lucide-react'
import Card from '../../components/Card'

const categories = [
  {
    icon: Stethoscope, title: 'Consultas médicas regulares',
    items: ['Visita a tu ginecólogo al menos una vez al año', 'Realiza tu mastografía anual después de los 40', 'Lleva un registro de tus chequeos médicos'],
  },
  {
    icon: Activity, title: 'Actividad física',
    items: ['30 minutos de ejercicio moderado al día', 'Incluye ejercicios de cardio y fuerza', 'Camina al menos 10,000 pasos diarios'],
  },
  {
    icon: Apple, title: 'Alimentación saludable',
    items: ['Consume 5 porciones de frutas y verduras al día', 'Reduce el consumo de alimentos procesados', 'Mantén una hidratación adecuada'],
  },
  {
    icon: Heart, title: 'Peso saludable',
    items: ['Mantén un IMC entre 18.5 y 24.9', 'Evita el sobrepeso y la obesidad', 'Consulta a un nutriólogo si es necesario'],
  },
  {
    icon: Calendar, title: 'Autoexamen mensual',
    items: ['Realiza el autoexamen 3-5 días después de tu periodo', 'Familiarízate con la textura normal de tus senos', 'Reporta cualquier cambio a tu médico'],
  },
  {
    icon: BookOpen, title: 'Educación y prevención',
    items: ['Infórmate sobre factores de riesgo', 'Conoce los síntomas de alerta', 'Comparte información con tus familiares'],
  },
]

const habits = [
  'Evitar el consumo de alcohol en exceso',
  'No fumar ni consumir tabaco',
  'Dormir al menos 7-8 horas diarias',
  'Reducir el consumo de cafeína',
]

export default function Recommendations() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-heading font-bold">Recomendaciones</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card hover className="h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <cat.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-3">{cat.title}</h3>
              <ul className="space-y-2" role="list">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <h2 className="text-xl font-heading font-semibold mb-6">Hábitos adicionales recomendados</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {habits.map((habit) => (
            <div key={habit} className="flex items-center gap-3 bg-muted rounded-xl p-4">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-sm">{habit}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
