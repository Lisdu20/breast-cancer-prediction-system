import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AlertCircle, Target, TrendingUp, Users, Shield, Clock, Plus, Minus } from 'lucide-react'
import Card from '../../components/Card'

const sections = [
  {
    icon: AlertCircle, title: '¿Qué es el cáncer de mama?',
    content: 'El cáncer de mama es una enfermedad en la que las células de la mama se multiplican sin control. Existen diferentes tipos de cáncer de mama, y los más comunes son el carcinoma ductal y el carcinoma lobulillar. La detección temprana es fundamental para un tratamiento exitoso.',
  },
  {
    icon: Target, title: 'Importancia de la detección temprana',
    content: 'Cuando se detecta a tiempo, el cáncer de mama tiene una tasa de supervivencia del 98% a 5 años. La detección temprana permite opciones de tratamiento menos agresivas y mayores probabilidades de éxito. La mastografía es la herramienta más efectiva para la detección temprana.',
  },
  {
    icon: TrendingUp, title: 'Factores de riesgo',
    content: 'Los principales factores de riesgo incluyen: edad avanzada, antecedentes familiares de cáncer de mama, mutaciones genéticas (BRCA1 y BRCA2), exposición prolongada a estrógenos, obesidad, consumo de alcohol, y falta de actividad física. Tener factores de riesgo no significa que desarrollarás la enfermedad.',
  },
  {
    icon: AlertCircle, title: 'Señales de alerta',
    content: 'Las señales de alerta incluyen: bulto o engrosamiento en el seno o axila, cambios en el tamaño o forma del seno, hoyuelos en la piel, secreción del pezón, enrojecimiento o descamación de la piel. Si notas alguno de estos signos, consulta a tu médico de inmediato.',
  },
  {
    icon: Users, title: 'Estadísticas en México',
    content: 'En México, se diagnostican aproximadamente 29,000 nuevos casos de cáncer de mama al año. Es la primera causa de muerte por cáncer en mujeres mexicanas. La mayoría de los casos se diagnostican en etapas tardías, lo que resalta la importancia de la detección temprana.',
  },
  {
    icon: Shield, title: 'Prevención',
    content: 'La prevención incluye: mantener un peso saludable, realizar actividad física regular, limitar el consumo de alcohol, evitar el tabaquismo, realizar autoexploración mensual a partir de los 20 años, y realizarse mastografía anual a partir de los 40 años (o antes si hay factores de riesgo).',
  },
  {
    icon: Clock, title: '¿Cuándo consultar al médico?',
    content: 'Debes consultar a tu médico si: notas algún cambio en tus senos, tienes antecedentes familiares de cáncer de mama, cumples 40 años o más (para mastografía anual), o si tienes dudas sobre tu salud mamaria. No esperes a tener síntomas para realizar una consulta.',
  },
]

export default function Information() {
  const [openSection, setOpenSection] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-heading font-bold">Información educativa</h1>

      <div className="space-y-3">
        {sections.map((section, i) => (
          <Card key={section.title} className="overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === i ? null : i)}
              className="flex items-center justify-between w-full text-left cursor-pointer"
              aria-expanded={openSection === i}
              aria-controls={`section-${i}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold">{section.title}</h3>
              </div>
              {openSection === i ? <Minus className="w-5 h-5 text-muted-foreground" /> : <Plus className="w-5 h-5 text-muted-foreground" />}
            </button>
            <AnimatePresence>
              {openSection === i && (
                <motion.div
                  id={`section-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 text-muted-foreground leading-relaxed">{section.content}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <h2 className="text-lg font-heading font-semibold mb-2">Fuentes y recursos</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          La información proporcionada en esta plataforma está basada en guías y recomendaciones de la Organización Mundial de la Salud (OMS), la Secretaría de Salud de México, y el Instituto Nacional de Cancerología (INCan). Para obtener información más detallada, consulta a tu médico o visita los sitios oficiales de estas instituciones.
        </p>
      </Card>
    </div>
  )
}
