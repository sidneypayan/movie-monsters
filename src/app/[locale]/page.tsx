import HomePage from '@/components/HomePage'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'fr' }>
}) {
  const { locale } = await params
  return <HomePage locale={locale} />
}
