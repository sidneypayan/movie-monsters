'use client'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const shareLinks = {
    x: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  }

  return (
    <div className="flex gap-3">
      <a
        href={shareLinks.x}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-5 py-2.5 bg-black/40 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-black/60 hover:border-accent-red/50 transition-all duration-300 font-light uppercase tracking-wider text-sm"
        aria-label="Share on X"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>X</span>
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-5 py-2.5 bg-[#1877F2]/20 backdrop-blur-sm border border-[#1877F2]/30 text-white rounded-lg hover:bg-[#1877F2]/40 hover:border-[#1877F2]/60 transition-all duration-300 font-light uppercase tracking-wider text-sm"
        aria-label="Share on Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
        <span>Facebook</span>
      </a>
    </div>
  )
}
