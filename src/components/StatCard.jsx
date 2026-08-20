import React from 'react'
import Card from './Card'

const tones = {
  indigo: 'bg-indigo-700/10 text-indigo-700',
  violet: 'bg-violet-600/10 text-violet-600',
  gold: 'bg-gold-500/15 text-gold-500',
  leaf: 'bg-leaf-500/10 text-leaf-600',
  ember: 'bg-ember-500/10 text-ember-600',
}

export default function StatCard({ icon: Icon, label, value, sub, tone = 'indigo' }) {
  return (
    <Card className="p-5" hover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink/50 font-medium">{label}</p>
          <p className="text-2xl font-display font-semibold mt-1">{value}</p>
          {sub && <p className="text-xs text-ink/45 mt-1">{sub}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${tones[tone]}`}>
            <Icon size={20} strokeWidth={2.25} />
          </div>
        )}
      </div>
    </Card>
  )
}
