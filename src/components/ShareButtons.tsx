'use client'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  }

  return (
    <div className="flex gap-4">
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition font-medium"
      >
        Twitter
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
      >
        Facebook
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition font-medium"
      >
        LinkedIn
      </a>
    </div>
  )
}
