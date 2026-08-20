import React from 'react'
import { Inbox } from 'lucide-react'

export default function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="p-4 rounded-2xl bg-indigo-700/5 text-indigo-700/60 mb-4">
        <Icon size={28} />
      </div>
      <h4 className="font-display font-semibold text-ink/80">{title}</h4>
      {description && <p className="text-sm text-ink/45 mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
