import AboutPage from '@/components/AboutPage'

export default async function LocaleAboutPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'fr' }>
}) {
  const { locale } = await params
  return <AboutPage locale={locale} />
}
