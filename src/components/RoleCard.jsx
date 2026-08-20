import React from 'react'

export default function RoleCard({ icon: Icon, title, description, tone, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group text-left w-full bg-surface rounded-2xl border border-black/5 shadow-soft p-6 card-hover focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <div className={`inline-flex p-3 rounded-xl ${tone} mb-4 group-hover:scale-105 transition-transform`}>
        <Icon size={24} strokeWidth={2.25} />
      </div>
      <h3 className="font-display font-semibold text-lg">{title}</h3>
      <p className="text-sm text-ink/50 mt-1.5 leading-relaxed">{description}</p>
      <span className="inline-block mt-4 text-sm font-medium text-indigo-700 group-hover:translate-x-0.5 transition-transform">
        Continue →
      </span>
    </button>
  )
}
