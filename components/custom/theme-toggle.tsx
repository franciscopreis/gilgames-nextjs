'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const isDark = theme === 'dark'

  // Placeholder do mesmo tamanho
  if (!mounted) {
    return (
      <div className="relative h-9 w-9 rounded-full bg-muted flex items-center justify-center animate-pulse">
        <Sun className="absolute h-5 w-5 text-gray-400 opacity-100" />
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="cursor-pointer relative h-9 w-9"
    >
      <Sun
        className={`absolute h-5 w-5 transition-opacity ${isDark ? 'opacity-0' : 'opacity-100'}`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-opacity ${isDark ? 'opacity-100' : 'opacity-0'}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
