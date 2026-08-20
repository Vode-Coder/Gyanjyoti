import React from 'react'

const palette = ['bg-indigo-700', 'bg-violet-600', 'bg-ember-500', 'bg-leaf-600', 'bg-gold-500']

function hashIndex(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % palette.length
  return h
}

export default function Avatar({ name = '?', size = 'md' }) {
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' }
  const color = palette[hashIndex(name)]
  return (
    <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}>
      {initials}
    </div>
  )
}
