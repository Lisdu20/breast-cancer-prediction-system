import { useId, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export default function Input({
  label,
  error,
  helperText,
  id: externalId,
  required,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = externalId || generatedId
  const errorId = error ? `${inputId}-error` : undefined
  const helperId = helperText && !error ? `${inputId}-helper` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
          {required && <span aria-label="campo obligatorio" className="text-destructive ml-0.5">*</span>}
        </label>
      )}
      <input
        id={inputId}
        required={required}
        aria-invalid={!!error}
        aria-describedby={errorId || helperId}
        className={`w-full px-4 py-2.5 rounded-xl border bg-card text-foreground transition-colors focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/50 ${
          error ? 'border-destructive' : 'border-border'
        }`}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className="text-sm text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  )
}
