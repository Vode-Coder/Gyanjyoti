import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sprout } from 'lucide-react'

export default function Loading() {
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => navigate('/roles'), 1900)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800 via-indigo-700 to-violet-600 text-white px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-6 animate-popIn">
        <Sprout size={40} strokeWidth={2} />
      </div>
      <h1 className="font-display text-4xl font-semibold tracking-tight">Gyanjyoti</h1>
      <p className="mt-2 text-white/70">Learn. Play. Grow.</p>
      <div className="mt-10 flex items-center gap-2" role="status" aria-label="Loading">
        <span className="w-2 h-2 rounded-full bg-white/80 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-white/80 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-white/80 animate-bounce" />
      </div>
    </div>
  )
}
