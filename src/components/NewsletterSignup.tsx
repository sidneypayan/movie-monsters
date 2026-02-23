'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale: 'fr' }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Inscription r\u00E9ussie !')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Une erreur est survenue')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Une erreur est survenue')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre email"
        required
        className="flex-1 px-4 py-3 rounded border-2 border-vintage-cream focus:outline-none focus:border-white bg-white/10 text-white placeholder:text-white/60"
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-8 py-3 bg-vintage-sepia text-white rounded hover:bg-vintage-cream hover:text-vintage-gothic transition disabled:opacity-50 font-bold"
      >
        {status === 'loading' ? 'Envoi...' : "S'inscrire"}
      </button>

      {status === 'success' && (
        <p className="text-green-400 font-medium mt-2">{message}</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 font-medium mt-2">{message}</p>
      )}
    </form>
  )
}
