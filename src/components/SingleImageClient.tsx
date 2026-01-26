'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'

interface SingleImageClientProps {
  url: string
  alt: string
  caption?: string
  width: number
  height: number
  widthClass: string
}

export default function SingleImageClient({
  url,
  alt,
  caption,
  width,
  height,
  widthClass,
}: SingleImageClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if we're in the Payload admin context
    setIsAdmin(window.location.pathname.startsWith('/admin'))
  }, [])

  return (
    <>
      <div className={`my-10 ${widthClass}`}>
        <button
          onClick={() => {
            // Don't open lightbox in admin context to prevent modal closing issues
            if (!isAdmin) setLightboxOpen(true)
          }}
          className="relative overflow-hidden rounded-lg border border-accent-red/20 hover:border-accent-red/40 transition-all duration-300 group w-full cursor-pointer"
          type="button"
        >
          <Image
            src={url}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
        </button>
        {caption && (
          <p className="text-sm text-text-secondary text-center mt-3 font-light italic">
            {caption}
          </p>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[{ src: url }]}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </>
  )
}
