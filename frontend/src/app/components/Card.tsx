import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: (e: React.MouseEvent) => void
  role?: string
  ariaModal?: boolean
  ariaLabelledby?: string
}

export default function Card({
  children,
  className = '',
  hover = false,
  onClick,
  role,
  ariaModal,
  ariaLabelledby,
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      role={role}
      aria-modal={ariaModal}
      aria-labelledby={ariaLabelledby}
      whileHover={hover ? { y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.08)' } : {}}
      className={`bg-card rounded-2xl p-6 shadow-sm border border-border ${className}`}
    >
      {children}
    </motion.div>
  )
}
