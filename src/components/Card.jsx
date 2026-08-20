import React from 'react'

export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-surface rounded-2xl border border-black/5 shadow-soft ${hover ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
