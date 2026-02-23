'use client'

import { useEffect, useState } from 'react'

interface VisitorCounterProps {
  className?: string
}

export default function VisitorCounter({ className = '' }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const incrementAndFetch = async () => {
      try {
        // Increment the counter
        const response = await fetch('/api/visitor-count', {
          method: 'POST',
        })

        if (response.ok) {
          const data = await response.json()
          setCount(data.totalVisits)
        }
      } catch (error) {
        console.error('Failed to increment visitor count:', error)
        try {
          const response = await fetch('/api/visitor-count')
          if (response.ok) {
            const data = await response.json()
            setCount(data.totalVisits)
          }
        } catch (err) {
          console.error('Failed to fetch visitor count:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    incrementAndFetch()
  }, [])

  if (loading || count === null) {
    return null
  }

  return (
    <div className={`visitor-counter ${className}`}>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-lg border border-red-900/30">
        <svg
          className="w-5 h-5 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span className="text-white font-medium">{count.toLocaleString('fr-FR')} visites</span>
      </div>
    </div>
  )
}
