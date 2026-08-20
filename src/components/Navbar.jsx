import React from 'react'
import { Bell } from 'lucide-react'
import Avatar from './Avatar'

export default function Navbar({ title, name, subtitle }) {
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <header className="flex items-center justify-between gap-4 px-4 md:px-8 py-4 md:py-5 bg-canvas/80 backdrop-blur sticky top-0 md:top-0 z-30 border-b border-black/5">
      <div>
        <h1 className="font-display font-semibold text-lg md:text-xl">{title}</h1>
        {subtitle && <p className="text-xs md:text-sm text-ink/45">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 md:gap-5">
        <span className="hidden md:inline text-xs text-ink/40 font-mono">{today}</span>
        <button aria-label="Notifications" className="relative p-2 rounded-lg hover:bg-black/5">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-ember-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <Avatar name={name || 'User'} size="sm" />
          <span className="hidden sm:inline text-sm font-medium">{name}</span>
        </div>
      </div>
    </header>
  )
}
