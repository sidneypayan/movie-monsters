'use client'

import { useState, useEffect } from 'react'
import Lightbox from 'yet-another-react-lightbox'

interface ImageData {
  url: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

interface ImageGalleryClientProps {
  images: ImageData[]
  columns: '2' | '3' | '4'
}

export default function ImageGalleryClient({ images, columns }: ImageGalleryClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if we're in the Payload admin context
    setIsAdmin(window.location.pathname.startsWith('/admin'))
  }, [])

  // Map columns to proper Tailwind classes
  const gridClasses = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }

  const openLightbox = (index: number) => {
    // Don't open lightbox in admin context to prevent modal closing issues
    if (isAdmin) return
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Prepare slides for yet-another-react-lightbox
  const slides = images.map((img) => ({
    src: img.url,
  }))

  return (
    <>
      <div className={`grid ${gridClasses[columns]} gap-6 my-12`}>
        {images.map((img, index) => (
          <div key={index} className="group">
            <div
              onClick={() => openLightbox(index)}
              className="relative w-full aspect-video overflow-hidden rounded-lg border border-accent-red/20 hover:border-accent-red/50 transition-all duration-300 cursor-pointer"
              style={{ lineHeight: 0 }}
            >
              <img
                src={img.url}
                alt={img.alt || ''}
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ margin: 0, padding: 0, display: 'block', verticalAlign: 'top' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Zoom icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {img.caption && (
              <p className="text-sm text-text-secondary text-center font-light italic mt-3">
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </>
  )
}
