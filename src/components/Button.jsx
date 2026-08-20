import React from 'react'

const variants = {
  primary: 'bg-indigo-700 text-white hover:bg-indigo-800 shadow-soft',
  secondary: 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50',
  ghost: 'bg-transparent text-ink/70 hover:bg-black/5',
  danger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50',
  gold: 'bg-gold-500 text-white hover:bg-gold-400 shadow-soft',
}

const sizes = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-6 py-3',
}

export default function Button({ variant = 'primary', size = 'md', className = '', children, icon: Icon, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2.25} />}
      {children}
    </button>
  )
}
