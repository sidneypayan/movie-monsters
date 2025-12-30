import HomePage from '@/components/HomePage'

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'fr' }>
}) {
  const { locale } = await params
  return <HomePage locale={locale} />
}
