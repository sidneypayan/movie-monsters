import AboutPage from '@/components/AboutPage'

// Revalidate every 60 seconds - ISR for dynamic content
export const revalidate = 60

export default async function FrontendAboutPage() {
  return <AboutPage />
}
