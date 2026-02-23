import HomePage from '@/components/HomePage'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

export default async function FrontendHomePage() {
  return <HomePage />
}
