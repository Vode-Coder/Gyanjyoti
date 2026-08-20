import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, LogOut, Sprout } from 'lucide-react'

export default function Sidebar({ items, roleLabel, roleTone = 'bg-indigo-700', onLogout }) {
  const [open, setOpen] = useState(false)

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className={`p-2 rounded-xl ${roleTone} text-white`}>
          <Sprout size={20} />
        </div>
        <div>
          <p className="font-display font-semibold leading-tight">Gyanjyoti</p>
          <p className="text-xs text-ink/45">{roleLabel}</p>
        </div>
      </div>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto" aria-label="Primary">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive ? 'bg-indigo-700 text-white shadow-soft' : 'text-ink/60 hover:bg-black/5'
              }`
            }
          >
            <Icon size={18} strokeWidth={2.25} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-black/5">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink/60 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut size={18} strokeWidth={2.25} />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col shrink-0 bg-surface border-r border-black/5 sticky top-0 h-screen">
        {content}
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-surface border-b border-black/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${roleTone} text-white`}><Sprout size={16} /></div>
          <span className="font-display font-semibold text-sm">Gyanjyoti</span>
        </div>
        <button aria-label="Open menu" onClick={() => setOpen(true)} className="p-2 rounded-lg hover:bg-black/5">
          <Menu size={20} />
        </button>
      </div>
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
          <div className="relative w-72 bg-surface h-full shadow-pop animate-popIn">
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-black/5">
              <X size={18} />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  )
}
