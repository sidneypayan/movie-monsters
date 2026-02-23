import BooksPage from '@/components/BooksPage'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

export default async function FrontendBooksPage() {
  return <BooksPage />
}
