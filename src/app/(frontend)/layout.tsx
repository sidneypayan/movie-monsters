import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VintagePostersBackground from '@/components/VintagePostersBackground'
import { Analytics } from '@vercel/analytics/react'
import { Creepster } from 'next/font/google'
import '@/app/globals.css'
import 'yet-another-react-lightbox/styles.css'

const creepster = Creepster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-creepster',
})

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={creepster.variable}>
      <body>
        <Analytics />
        <VintagePostersBackground />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
