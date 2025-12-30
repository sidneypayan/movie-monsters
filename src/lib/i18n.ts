import fr from '../i18n/messages/fr.json'
import en from '../i18n/messages/en.json'

const messages = { fr, en }

export type Locale = 'fr' | 'en'

export function getTranslations(locale: Locale) {
  return messages[locale] || messages.fr
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: any = messages[locale] || messages.fr

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
