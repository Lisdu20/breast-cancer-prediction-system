const API_BASE = 'http://localhost:8000'

export interface PredictionInput {
  Age: number
  BMI: number
  Glucose: number
  Insulin: number
  HOMA: number
  Leptin: number
  Adiponectin: number
  Resistin: number
  'MCP.1': number
}

export interface PredictionResult {
  risk_probability: number
  risk_percentage: number
  risk_level: string
  prediction: number
}

export async function predictRisk(data: PredictionInput): Promise<PredictionResult> {
  const response = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Error al obtener la predicción')
  return response.json()
}

export async function healthCheck(): Promise<{ status: string; model_loaded: boolean }> {
  const response = await fetch(`${API_BASE}/health`)
  return response.json()
}
