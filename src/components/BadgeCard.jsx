import React from 'react'
import * as Icons from 'lucide-react'
import { Lock } from 'lucide-react'

export default function BadgeCard({ badge, unlocked, dateEarned }) {
  const Icon = Icons[badge.icon] || Icons.Award
  return (
    <div
      className={`rounded-2xl border p-5 text-center transition ${
        unlocked
          ? 'bg-gradient-to-b from-gold-400/10 to-surface border-gold-400/30 shadow-soft'
          : 'bg-black/[0.02] border-black/5 grayscale opacity-60'
      }`}
    >
      <div className={`mx-auto mb-3 w-14 h-14 rounded-full flex items-center justify-center ${unlocked ? 'bg-gold-500/15 text-gold-500' : 'bg-black/5 text-ink/30'}`}>
        {unlocked ? <Icon size={26} /> : <Lock size={22} />}
      </div>
      <p className="font-display font-semibold text-sm">{badge.name}</p>
      <p className="text-xs text-ink/45 mt-1 leading-snug">{badge.description}</p>
      {unlocked && dateEarned && (
        <p className="text-[11px] font-mono text-gold-500 mt-2">Earned {dateEarned}</p>
      )}
    </div>
  )
}
