import BooksPage from '@/components/BooksPage'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

export default async function LocaleBooksPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'fr' }>
}) {
  const { locale } = await params
  return <BooksPage locale={locale} />
}
