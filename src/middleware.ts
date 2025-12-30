import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n/request'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Never use a prefix for the default locale
  localePrefix: 'always',
})

export const config = {
  // Match only internationalized pathnames
  // Don't match admin routes or api routes
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
}
