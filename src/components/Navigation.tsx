'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

export default function Navigation({ locale }: { locale: 'en' | 'fr' }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const t = useTranslations('navigation')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get current path without locale prefix
  const getCurrentPath = () => {
    return pathname.replace(/^\/(en|fr)/, '') || '/'
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-bg/95 backdrop-blur-md border-b border-dark-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="text-2xl font-light text-text-primary hover:text-white transition-colors neo-gothic-title"
          >
            MOVIE MONSTERS
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href={`/${locale}`}
              className="text-lg uppercase tracking-wider text-text-primary hover:text-accent-red transition-colors neo-gothic-title"
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/books`}
              className="text-lg uppercase tracking-wider text-text-primary hover:text-accent-red transition-colors neo-gothic-title"
            >
              {t('books')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-lg uppercase tracking-wider text-text-primary hover:text-accent-red transition-colors neo-gothic-title"
            >
              {t('about')}
            </Link>

            {/* Language Switcher */}
            <div className="flex gap-2 ml-4 border-l border-dark-border pl-4">
              <Link
                href={`/en${getCurrentPath()}`}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-all font-light ${
                  locale === 'en'
                    ? 'text-text-primary border-b border-accent-red'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                EN
              </Link>
              <Link
                href={`/fr${getCurrentPath()}`}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-all font-light ${
                  locale === 'fr'
                    ? 'text-text-primary border-b border-accent-red'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                FR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
