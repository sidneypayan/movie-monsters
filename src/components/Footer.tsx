'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Footer({ locale }: { locale: 'en' | 'fr' }) {
  const t = useTranslations('footer')

  return (
    <footer className="bg-dark-bg border-t border-dark-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4 text-text-primary font-light">
              {t('about')}
            </h3>
            <p className="text-text-secondary text-sm font-light leading-relaxed">
              {t('description')}
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4 text-text-primary font-light">
              {t('links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-text-secondary hover:text-text-primary transition text-sm font-light">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-text-secondary hover:text-text-primary transition text-sm font-light">
                  {t('aboutPage')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/books`} className="text-text-secondary hover:text-text-primary transition text-sm font-light">
                  {t('books')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4 text-text-primary font-light">
              {t('legal')}
            </h3>
            <p className="text-text-muted text-xs font-light">
              © {new Date().getFullYear()} {t('copyright')}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-border">
          <p className="text-center text-text-muted text-xs uppercase tracking-wider font-light">
            Movie Monsters
          </p>
        </div>
      </div>
    </footer>
  )
}
