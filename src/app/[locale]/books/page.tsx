import BooksPage from '@/components/BooksPage'

export default async function LocaleBooksPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'fr' }>
}) {
  const { locale } = await params
  return <BooksPage locale={locale} />
}
