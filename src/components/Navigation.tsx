'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import GoogleTranslate from '@/components/GoogleTranslate'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-bg/95 backdrop-blur-md border-b border-dark-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-light text-text-primary hover:text-white transition-colors neo-gothic-title"
          >
            MOVIE MONSTERS
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-lg uppercase tracking-wider text-text-primary hover:text-accent-red transition-colors neo-gothic-title"
            >
              Accueil
            </Link>
            <Link
              href="/dossiers"
              className="text-lg uppercase tracking-wider text-text-primary hover:text-accent-red transition-colors neo-gothic-title"
            >
              Dossiers
            </Link>
            <Link
              href="/books"
              className="text-lg uppercase tracking-wider text-text-primary hover:text-accent-red transition-colors neo-gothic-title"
            >
              Livres
            </Link>
            <Link
              href="/about"
              className="text-lg uppercase tracking-wider text-text-primary hover:text-accent-red transition-colors neo-gothic-title"
            >
              {"\u00C0 propos"}
            </Link>

            {/* Google Translate Widget */}
            <div className="ml-4 border-l border-dark-border pl-4">
              <GoogleTranslate />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
