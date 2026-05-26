import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'
import type { PredictionInput } from '../../services/api'

const socioeconomicLevels = [
  { value: 'bajo', label: 'Bajo' },
  { value: 'medio-bajo', label: 'Medio-bajo' },
  { value: 'medio', label: 'Medio' },
  { value: 'medio-alto', label: 'Medio-alto' },
  { value: 'alto', label: 'Alto' },
]

const alcoholOptions = [
  { value: 'nunca', label: 'Nunca' },
  { value: 'ocasional', label: 'Ocasional' },
  { value: 'moderado', label: 'Moderado' },
  { value: 'frecuente', label: 'Frecuente' },
]

const familyOptions = [
  { value: 'ninguno', label: 'Ninguno' },
  { value: 'segundo-grado', label: 'Segundo grado (abuelas, tías)' },
  { value: 'primer-grado', label: 'Primer grado (madre, hermanas, hijas)' },
]

const estados = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
  'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato',
  'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México', 'Michoacán', 'Morelos',
  'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
  'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
  'Veracruz', 'Yucatán', 'Zacatecas',
]

const steps = [
  { title: 'Datos generales', description: 'Información básica' },
  { title: 'Salud personal', description: 'Tu estado de salud' },
  { title: 'Biomarcadores', description: 'Resultados de laboratorio' },
]

interface FormData {
  edad: string
  estado: string
  nivelSocioeconomico: string
  peso: string
  altura: string
  edadMenarquia: string
  alcohol: string
  antecedentesFamiliares: string
  enfermedadesPrevias: string
  glucose: string
  insulin: string
  homa: string
  leptin: string
  adiponectin: string
  resistin: string
  mcp1: string
}

const initialForm: FormData = {
  edad: '', estado: '', nivelSocioeconomico: '',
  peso: '', altura: '', edadMenarquia: '', alcohol: '',
  antecedentesFamiliares: '', enfermedadesPrevias: '',
  glucose: '', insulin: '', homa: '', leptin: '', adiponectin: '', resistin: '', mcp1: '',
}

export default function Assessment() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const clearError = (field: string) => {
    if (errors[field]) {
      const next = { ...errors }
      delete next[field]
      setErrors(next)
    }
  }

  const update = (field: keyof FormData, value: string) => {
    setForm({ ...form, [field]: value })
    clearError(field)
  }

  const computeBMI = (peso: string, altura: string): number | null => {
    const w = parseFloat(peso)
    const h = parseFloat(altura)
    if (!w || !h || h <= 0) return null
    return Math.round((w / ((h / 100) ** 2)) * 100) / 100
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (step === 0) {
      if (!form.edad) newErrors.edad = 'Obligatorio'
      else if (Number(form.edad) < 18) newErrors.edad = 'Mínimo 18 años'
      else if (Number(form.edad) > 100) newErrors.edad = 'Máximo 100 años'
      if (!form.estado) newErrors.estado = 'Selecciona un estado'
      if (!form.nivelSocioeconomico) newErrors.nivelSocioeconomico = 'Selecciona un nivel'
    } else if (step === 1) {
      if (!form.peso) newErrors.peso = 'Obligatorio'
      else if (Number(form.peso) < 30) newErrors.peso = 'Mínimo 30 kg'
      else if (Number(form.peso) > 200) newErrors.peso = 'Máximo 200 kg'
      if (!form.altura) newErrors.altura = 'Obligatorio'
      else if (Number(form.altura) < 100) newErrors.altura = 'Mínimo 100 cm'
      else if (Number(form.altura) > 250) newErrors.altura = 'Máximo 250 cm'
      if (!form.edadMenarquia) newErrors.edadMenarquia = 'Obligatorio'
      else if (Number(form.edadMenarquia) < 8) newErrors.edadMenarquia = 'Mínimo 8 años'
      else if (Number(form.edadMenarquia) > 20) newErrors.edadMenarquia = 'Máximo 20 años'
      if (!form.alcohol) newErrors.alcohol = 'Selecciona una opción'
    } else if (step === 2) {
      if (!form.antecedentesFamiliares) newErrors.antecedentesFamiliares = 'Selecciona una opción'
      if (!form.glucose) newErrors.glucose = 'Obligatorio'
      else if (Number(form.glucose) < 50) newErrors.glucose = 'Mínimo 50 mg/dL'
      else if (Number(form.glucose) > 300) newErrors.glucose = 'Máximo 300 mg/dL'
      if (!form.insulin) newErrors.insulin = 'Obligatorio'
      else if (Number(form.insulin) < 0) newErrors.insulin = 'No puede ser negativo'
      else if (Number(form.insulin) > 100) newErrors.insulin = 'Máximo 100 μU/mL'
      if (!form.homa) newErrors.homa = 'Obligatorio'
      else if (Number(form.homa) < 0) newErrors.homa = 'No puede ser negativo'
      else if (Number(form.homa) > 50) newErrors.homa = 'Máximo 50'
      if (!form.leptin) newErrors.leptin = 'Obligatorio'
      else if (Number(form.leptin) < 0) newErrors.leptin = 'No puede ser negativo'
      else if (Number(form.leptin) > 150) newErrors.leptin = 'Máximo 150 ng/mL'
      if (!form.adiponectin) newErrors.adiponectin = 'Obligatorio'
      else if (Number(form.adiponectin) < 0) newErrors.adiponectin = 'No puede ser negativo'
      else if (Number(form.adiponectin) > 60) newErrors.adiponectin = 'Máximo 60 μg/mL'
      if (!form.resistin) newErrors.resistin = 'Obligatorio'
      else if (Number(form.resistin) < 0) newErrors.resistin = 'No puede ser negativo'
      else if (Number(form.resistin) > 100) newErrors.resistin = 'Máximo 100 ng/mL'
      if (!form.mcp1) newErrors.mcp1 = 'Obligatorio'
      else if (Number(form.mcp1) < 0) newErrors.mcp1 = 'No puede ser negativo'
      else if (Number(form.mcp1) > 2000) newErrors.mcp1 = 'Máximo 2000 pg/mL'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    const bmi = computeBMI(form.peso, form.altura) || 0

    const payload: PredictionInput = {
      Age: parseFloat(form.edad),
      BMI: bmi,
      Glucose: parseFloat(form.glucose),
      Insulin: parseFloat(form.insulin),
      HOMA: parseFloat(form.homa),
      Leptin: parseFloat(form.leptin),
      Adiponectin: parseFloat(form.adiponectin),
      Resistin: parseFloat(form.resistin),
      'MCP.1': parseFloat(form.mcp1),
    }

    setSubmitting(true)
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Error en la predicción')
      const result = await response.json()
      navigate('/dashboard/result', { state: { result, form } })
    } catch {
      alert('Error al conectar con el servidor. Asegúrate de que el backend esté corriendo.')
    } finally {
      setSubmitting(false)
    }
  }

  const progress = ((step + 1) / 3) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-heading font-bold">Evaluación de riesgo</h1>

      <div className="space-y-4">
        <div className="flex justify-between">
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  i < step ? 'bg-primary text-primary-foreground' :
                  i === step ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                  'bg-muted text-muted-foreground'
                }`}
                aria-current={i === step ? 'step' : undefined}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className="text-xs mt-1 text-muted-foreground hidden sm:block">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-heading font-semibold">Datos generales</h2>
              <Input
                label="Edad"
                type="number"
                min={18}
                max={100}
                placeholder="Tu edad"
                value={form.edad}
                error={errors.edad}
                onChange={(e) => update('edad', e.target.value)}
                required
              />
              <Select
                label="Estado"
                options={estados.map((e) => ({ value: e, label: e }))}
                value={form.estado}
                error={errors.estado}
                onChange={(e) => update('estado', e.target.value)}
                required
              />
              <Select
                label="Nivel socioeconómico"
                options={socioeconomicLevels}
                value={form.nivelSocioeconomico}
                error={errors.nivelSocioeconomico}
                onChange={(e) => update('nivelSocioeconomico', e.target.value)}
                required
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-heading font-semibold">Salud personal</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  label="Peso (kg)"
                  type="number"
                  min={30}
                  max={200}
                  step={0.1}
                  placeholder="Ej: 65"
                  value={form.peso}
                  error={errors.peso}
                  onChange={(e) => update('peso', e.target.value)}
                  required
                />
                <Input
                  label="Altura (cm)"
                  type="number"
                  min={100}
                  max={250}
                  placeholder="Ej: 165"
                  value={form.altura}
                  error={errors.altura}
                  onChange={(e) => update('altura', e.target.value)}
                  required
                />
              </div>
              {form.peso && form.altura && computeBMI(form.peso, form.altura) && (
                <div className="bg-muted rounded-xl p-3 text-sm text-center text-muted-foreground">
                  Tu IMC calculado: <span className="font-bold text-foreground">{computeBMI(form.peso, form.altura)}</span>
                </div>
              )}
              <Input
                label="Edad de menarquia"
                type="number"
                min={8}
                max={20}
                placeholder="Ej: 12"
                value={form.edadMenarquia}
                error={errors.edadMenarquia}
                onChange={(e) => update('edadMenarquia', e.target.value)}
                helperText="Edad a la que tuviste tu primer periodo menstrual"
                required
              />
              <Select
                label="Consumo de alcohol"
                options={alcoholOptions}
                value={form.alcohol}
                error={errors.alcohol}
                onChange={(e) => update('alcohol', e.target.value)}
                required
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-heading font-semibold">Biomarcadores</h2>
              <p className="text-sm text-muted-foreground bg-info/5 rounded-xl p-3">
                Ingresa los valores de tus estudios de laboratorio más recientes.
              </p>
              <Select
                label="Antecedentes familiares de cáncer de mama"
                options={familyOptions}
                value={form.antecedentesFamiliares}
                error={errors.antecedentesFamiliares}
                onChange={(e) => update('antecedentesFamiliares', e.target.value)}
                required
              />
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  label="Glucosa (mg/dL)"
                  type="number"
                  min={50}
                  max={300}
                  step={0.1}
                  placeholder="Ej: 92"
                  value={form.glucose}
                  error={errors.glucose}
                  onChange={(e) => update('glucose', e.target.value)}
                  helperText="Nivel de glucosa en ayunas"
                  required
                />
                <Input
                  label="Insulina (μU/mL)"
                  type="number"
                  min={0}
                  max={100}
                  step={0.1}
                  placeholder="Ej: 5.9"
                  value={form.insulin}
                  error={errors.insulin}
                  onChange={(e) => update('insulin', e.target.value)}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  label="HOMA-IR"
                  type="number"
                  min={0}
                  max={50}
                  step={0.01}
                  placeholder="Ej: 1.38"
                  value={form.homa}
                  error={errors.homa}
                  onChange={(e) => update('homa', e.target.value)}
                  helperText="Índice de resistencia a la insulina"
                  required
                />
                <Input
                  label="Leptina (ng/mL)"
                  type="number"
                  min={0}
                  max={150}
                  step={0.1}
                  placeholder="Ej: 20.3"
                  value={form.leptin}
                  error={errors.leptin}
                  onChange={(e) => update('leptin', e.target.value)}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  label="Adiponectina (μg/mL)"
                  type="number"
                  min={0}
                  max={60}
                  step={0.01}
                  placeholder="Ej: 8.35"
                  value={form.adiponectin}
                  error={errors.adiponectin}
                  onChange={(e) => update('adiponectin', e.target.value)}
                  required
                />
                <Input
                  label="Resistina (ng/mL)"
                  type="number"
                  min={0}
                  max={100}
                  step={0.01}
                  placeholder="Ej: 10.8"
                  value={form.resistin}
                  error={errors.resistin}
                  onChange={(e) => update('resistin', e.target.value)}
                  required
                />
              </div>
              <Input
                label="MCP-1 (pg/mL)"
                type="number"
                min={0}
                max={2000}
                step={0.1}
                placeholder="Ej: 471.3"
                value={form.mcp1}
                error={errors.mcp1}
                onChange={(e) => update('mcp1', e.target.value)}
                helperText="Proteína quimioatrayente de monocitos"
                required
              />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="enfermedades" className="text-sm font-medium text-foreground">
                  Enfermedades previas
                </label>
                <textarea
                  id="enfermedades"
                  rows={3}
                  placeholder="Describe cualquier enfermedad relevante (opcional)"
                  value={form.enfermedadesPrevias}
                  onChange={(e) => update('enfermedadesPrevias', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground transition-colors focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/50 resize-none"
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between pt-4">
        <Button
          variant="ghost"
          disabled={step === 0}
          onClick={() => setStep(Math.max(step - 1, 0))}
        >
          Anterior
        </Button>
        {step < 2 ? (
          <Button onClick={() => { if (validateStep()) setStep(step + 1) }}>
            Siguiente
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Procesando...' : 'Finalizar'}
          </Button>
        )}
      </div>
    </div>
  )
}
