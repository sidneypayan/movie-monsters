import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/request'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Creepster } from 'next/font/google'
import '@/app/globals.css'

const creepster = Creepster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-creepster',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} className={creepster.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navigation locale={locale as 'en' | 'fr'} />
          {children}
          <Footer locale={locale as 'en' | 'fr'} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
