import React from 'react'

export function Field({ label, hint, error, children, required }) {
  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-medium text-ink/80 mb-1.5">
          {label}{required && <span className="text-ember-500"> *</span>}
        </span>
      )}
      {children}
      {hint && !error && <span className="block text-xs text-ink/45 mt-1">{hint}</span>}
      {error && <span className="block text-xs text-red-600 mt-1">{error}</span>}
    </label>
  )
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm placeholder:text-ink/35 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition ${className}`}
      {...props}
    />
  )
}

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm placeholder:text-ink/35 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition min-h-[96px] ${className}`}
      {...props}
    />
  )
}

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
