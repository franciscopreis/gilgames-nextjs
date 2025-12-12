'use client'

import { useTheme } from 'next-themes'
import { ReactNode } from 'react'
import { Moon, Sun } from 'lucide-react'

interface ThemeWrapperProps {
  children: ReactNode
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme } = useTheme()

  // Enquanto o cliente não tiver hidratação, mostrar um placeholder circular
  if (typeof window === 'undefined') {
    return <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
  }

  // Se o theme ainda não foi definido, mostra um círculo neutro
  if (!theme) {
    return (
      <div className="h-9 w-9 rounded-full bg-muted animate-pulse flex items-center justify-center">
        <Sun className="h-5 w-5 text-gray-400" />
      </div>
    )
  }

  // Quando o tema já existe, renderiza os filhos
  return <>{children}</>
}
