'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@heroui/react'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return (
      <Button isIconOnly variant="flat" radius="lg" size="sm" aria-label="Toggle color theme">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      isIconOnly
      variant="flat"
      radius="lg"
      size="sm"
      aria-label={theme === 'dark' ? 'Use light theme' : 'Use dark theme'}
      onPress={toggleTheme}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}
