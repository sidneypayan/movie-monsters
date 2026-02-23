'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            includedLanguages: string
            layout: number
            autoDisplay: boolean
          },
          elementId: string,
        ) => void
      }
    }
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Avoid re-initializing if already loaded
    if (document.getElementById('google-translate-script')) return

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'fr',
            includedLanguages: 'fr,en,es,de,it,pt',
            layout: 1, // HORIZONTAL
            autoDisplay: false,
          },
          'google_translate_element',
        )
      }
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return <div id="google_translate_element" />
}
