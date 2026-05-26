import { useId, type SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
}

export default function Select({
  label,
  error,
  options,
  id: externalId,
  required,
  ...props
}: SelectProps) {
  const generatedId = useId()
  const selectId = externalId || generatedId
  const errorId = error ? `${selectId}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-foreground">
          {label}
          {required && <span aria-label="campo obligatorio" className="text-destructive ml-0.5">*</span>}
        </label>
      )}
      <select
        id={selectId}
        required={required}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={`w-full px-4 py-2.5 rounded-xl border bg-card text-foreground transition-colors focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/50 ${
          error ? 'border-destructive' : 'border-border'
        }`}
        {...props}
      >
        <option value="">Seleccionar...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  )
}
