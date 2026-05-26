import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  type?: 'button' | 'submit'
  fullWidth?: boolean
  disabled?: boolean
  ariaLabel?: string
  icon?: ReactNode
}

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
  secondary: 'bg-secondary text-foreground hover:bg-secondary/80',
  outline: 'border-2 border-primary text-primary hover:bg-primary/5',
  ghost: 'text-foreground hover:bg-muted',
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  fullWidth = false,
  disabled = false,
  ariaLabel,
  icon,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-primary/40 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </motion.button>
  )
}
