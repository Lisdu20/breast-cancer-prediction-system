import { useNavigate } from 'react-router-dom'
import { Shield, Calendar, ClipboardList, BookOpen, ArrowRight } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'

const mockCurrentRisk = { level: 'Bajo', color: 'text-risk-low bg-risk-low/10' }
const mockLastEval = { date: '15 de marzo, 2026', score: 35 }
const mockTotalEvals = 3

export default function DashboardHome() {
  const navigate = useNavigate()

  return (
    <div className="max-w-5xl space-y-8">
      <h1 className="text-3xl font-heading font-bold">Panel de control</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nivel de riesgo actual</p>
              <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-sm font-medium ${mockCurrentRisk.color}`}>
                {mockCurrentRisk.level}
              </span>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Última evaluación</p>
              <p className="font-semibold text-sm">{mockLastEval.date}</p>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Evaluaciones totales</p>
              <p className="text-2xl font-bold">{mockTotalEvals}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <ClipboardList className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Nueva evaluación</h2>
            <p className="text-sm text-muted-foreground">Completa una nueva evaluación de riesgo</p>
          </div>
          <Button onClick={() => navigate('/dashboard/assessment')}>
            Comenzar <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>

        <Card className="flex flex-col items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Recomendaciones para ti</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground" role="list">
              <li>Mantén una alimentación balanceada</li>
              <li>Realiza actividad física regular</li>
              <li>Consulta a tu médico periódicamente</li>
            </ul>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard/recommendations')}>
            Ver todas <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <p className="text-sm text-muted-foreground">
          Recuerda: la detección temprana salva vidas. Realiza tus evaluaciones periódicamente y consulta a un especialista ante cualquier duda.
        </p>
      </Card>
    </div>
  )
}
