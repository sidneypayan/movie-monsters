import AboutPage from '@/components/AboutPage'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

export default async function LocaleAboutPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'fr' }>
}) {
  const { locale } = await params
  return <AboutPage locale={locale} />
}
