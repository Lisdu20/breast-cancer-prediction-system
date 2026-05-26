import { motion } from 'motion/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TrendingDown, Activity, Calendar } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import type { PredictionResult } from '../../services/api'

const metrics = [
  { icon: TrendingDown, label: 'Factores protectores', color: 'bg-primary/5 text-primary' },
  { icon: Activity, label: 'Factores de riesgo', color: 'bg-info/5 text-info' },
  { icon: Calendar, label: 'Próxima evaluación', color: 'bg-success/5 text-success' },
]

const recommendationsByLevel: Record<string, string[]> = {
  Bajo: [
    'Continúa con tus hábitos saludables actuales',
    'Mantén tu peso corporal dentro del rango saludable',
    'Realiza actividad física regularmente',
    'Programa tu próxima evaluación en 6 meses',
  ],
  Medio: [
    'Consulta a tu médico para una evaluación completa',
    'Considera reducir el consumo de alcohol',
    'Aumenta tu actividad física a 30-45 minutos diarios',
    'Programa tu próxima evaluación en 3 meses',
  ],
  Alto: [
    'Busca atención médica especializada lo antes posible',
    'Solicita una mastografía diagnóstica',
    'Consulta con un genetista si hay antecedentes familiares',
    'Realiza autoexploración mamaria semanalmente',
  ],
}

function getRiskColor(level: string): string {
  switch (level) {
    case 'Bajo': return 'text-risk-low'
    case 'Medio': return 'text-risk-medium'
    case 'Alto': return 'text-risk-high'
    default: return 'text-muted-foreground'
  }
}

function getRiskBg(level: string): string {
  switch (level) {
    case 'Bajo': return 'bg-risk-low/10'
    case 'Medio': return 'bg-risk-medium/10'
    case 'Alto': return 'bg-risk-high/10'
    default: return 'bg-muted'
  }
}

function getMetricValue(level: string): string {
  switch (level) {
    case 'Bajo': return '4 identificados'
    case 'Medio': return '2 identificados'
    case 'Alto': return '1 identificado'
    default: return '—'
  }
}

const circumference = 502

export default function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = (location.state as { result?: PredictionResult })?.result

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 py-20">
        <h1 className="text-3xl font-heading font-bold">Sin resultados</h1>
        <p className="text-muted-foreground">No hay resultados de evaluación disponibles. Realiza una evaluación primero.</p>
        <Button onClick={() => navigate('/dashboard/assessment')}>
          Ir a evaluación
        </Button>
      </div>
    )
  }

  const { risk_percentage, risk_level } = result
  const offset = ((100 - risk_percentage) / 100) * circumference
  const recommendations = recommendationsByLevel[risk_level] || recommendationsByLevel.Bajo
  const metricValue = getMetricValue(risk_level)

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="sr-only" role="status" aria-live="polite">
        Evaluación completada. Nivel de riesgo: {risk_level}. Porcentaje: {risk_percentage}%.
      </div>

      <h1 className="text-3xl font-heading font-bold">Resultado de evaluación</h1>

      <Card className="text-center">
        <div className="flex justify-center mb-4">
          <svg width="192" height="192" viewBox="0 0 192 192" transform="rotate(-90)">
            <circle cx="96" cy="96" r="80" fill="none" stroke="#F5F0ED" strokeWidth="12" />
            <motion.circle
              cx="96" cy="96" r="80" fill="none"
              stroke="#B8715E"
              strokeWidth="12"
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${offset} ${circumference}` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
        </div>
        <div className={`inline-block px-4 py-1.5 rounded-full text-lg font-bold ${getRiskColor(risk_level)} ${getRiskBg(risk_level)}`}>
          Riesgo {risk_level}
        </div>
        <p className="mt-2 text-4xl font-bold font-heading">{risk_percentage}%</p>
        <p className="text-muted-foreground text-sm mt-1">de probabilidad estimada</p>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <Card key={m.label} hover>
            <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center mb-3`}>
              <m.icon className="w-5 h-5" />
            </div>
            <p className="text-sm text-muted-foreground">{m.label}</p>
            <p className="font-semibold">{metricValue}</p>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-xl font-heading font-semibold mb-4">Recomendaciones</h2>
        <ol className="space-y-3" role="list">
          {recommendations.map((r, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="w-7 h-7 rounded-full bg-success/10 text-success flex items-center justify-center text-sm font-bold flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-foreground/80">{r}</span>
            </li>
          ))}
        </ol>
      </Card>

      <div className="flex gap-4">
        <Button onClick={() => navigate('/dashboard')} variant="outline" fullWidth>
          Volver al inicio
        </Button>
        <Button onClick={() => navigate('/dashboard/assessment')} fullWidth>
          Nueva evaluación
        </Button>
      </div>
    </div>
  )
}
