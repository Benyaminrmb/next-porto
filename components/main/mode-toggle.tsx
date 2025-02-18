'use client'

import * as React from 'react'
import {Moon, Sun} from 'lucide-react'
import {useTheme} from 'next-themes'

import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ModeToggle() {
  const {setTheme, theme} = useTheme()
  const toggleTheme = function () {
    let newTheme: string = 'dark'
    if (theme === 'dark') {
      newTheme = 'light'
    }
    setTheme(newTheme)
  }

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => toggleTheme()}>
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      </Button>
    </>
  )
}
