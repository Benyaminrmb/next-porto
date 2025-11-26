'use client'
import React from 'react'
import {Button, buttonVariants} from '@/components/ui/button'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {ModeToggle} from '@/components/main/mode-toggle'
import HeaderItems from '@/components/main/header/items'
import {useAppStore} from '@/store/app'
import {LanguageSwitcher} from '@/components/ui/language-switcher'
import {Github, Linkedin} from 'lucide-react'

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }
  const {headerLinks, setDrawerStatus} = useAppStore((state) => state)
  return (
    <header className="border-grid sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="app-container p-2 gap-2">
        <div className="flex gap-2">
          <div className="flex md:hidden">
            <HeaderItems />
          </div>
          {/* Logo or Name */}
          <Link
            href="/"
            className={buttonVariants({
              variant: isActive('/') ? 'secondary' : 'ghost',
            })}>
            BenyaminRmb
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2 flex-1">
          {headerLinks.map((link, index) => (
            <Link
              key={index}
              className={buttonVariants({
                variant: isActive(link.url) ? 'secondary' : 'ghost',
                size: 'sm',
              })}
              href={link.url}>
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Social Links with lucide-react icons */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://github.com/benyaminrmb"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://linkedin.com/in/benyaminrmb"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
