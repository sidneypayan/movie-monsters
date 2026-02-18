'use client'

import { usePathname } from 'next/navigation'

export default function PreviewBanner() {
  const pathname = usePathname()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-accent-purple/90 backdrop-blur-sm text-white text-center py-2 px-4 text-sm font-light uppercase tracking-wider">
      <span>Mode prévisualisation / Preview mode</span>
      <span className="mx-3">—</span>
      <a
        href={`/api/exit-preview?redirect=${encodeURIComponent(pathname)}`}
        className="underline hover:text-gothic-crimson transition-colors"
      >
        Quitter / Exit preview
      </a>
    </div>
  )
}
