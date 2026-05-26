import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Calendar, TrendingUp, ChevronRight, X } from 'lucide-react'
import Card from '../../components/Card'

const mockEvaluations = [
  { id: 3, date: '15 de marzo, 2026', riskLevel: 'Medio', percentage: 35 },
  { id: 2, date: '20 de septiembre, 2025', riskLevel: 'Bajo', percentage: 22 },
  { id: 1, date: '15 de marzo, 2025', riskLevel: 'Bajo', percentage: 18 },
]

const getRiskColor = (level: string) => {
  switch (level) {
    case 'Bajo': return 'text-risk-low bg-risk-low/10'
    case 'Medio': return 'text-risk-medium bg-risk-medium/10'
    case 'Alto': return 'text-risk-high bg-risk-high/10'
    default: return 'text-muted-foreground bg-muted'
  }
}

export default function History() {
  const [selected, setSelected] = useState<typeof mockEvaluations[0] | null>(null)

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-heading font-bold">Mi historial</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de evaluaciones</p>
              <p className="text-2xl font-bold">{mockEvaluations.length}</p>
            </div>
          </div>
        </Card>
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tendencia general</p>
              <p className="font-semibold text-success">Estable</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {mockEvaluations.map((ev, i) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Card
              hover
              onClick={() => setSelected(ev)}
              className="cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#F5F0ED" strokeWidth="4" />
                  <circle
                    cx="24" cy="24" r="20" fill="none"
                    stroke="#B8715E" strokeWidth="4"
                    strokeDasharray={`${(ev.percentage / 100) * 125.6} 125.6`}
                    transform="rotate(-90 24 24)"
                  />
                  <text x="24" y="24" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold" fill="#2D2926">
                    {ev.percentage}%
                  </text>
                </svg>
                <div>
                  <p className="font-semibold">Evaluación #{ev.id}</p>
                  <time dateTime="2026-03-15" className="text-sm text-muted-foreground">{ev.date}</time>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-0.5 rounded-full text-sm font-medium ${getRiskColor(ev.riskLevel)}`}>
                  {ev.riskLevel}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="max-w-md w-full p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 id="dialog-title" className="text-xl font-heading font-bold">
                    Evaluación #{selected.id}
                  </h2>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-1 hover:bg-muted rounded-lg transition-colors cursor-pointer"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha</span>
                    <time dateTime="2026-03-15" className="font-medium">{selected.date}</time>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Riesgo</span>
                    <span className={`px-3 py-0.5 rounded-full text-sm font-medium ${getRiskColor(selected.riskLevel)}`}>
                      {selected.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Probabilidad</span>
                    <span className="font-bold">{selected.percentage}%</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
