import React from 'react'

export default function ProgressBar({ value, tone = '', label, showPercent = true, className = '' }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className={className}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-1.5 text-sm">
          {label && <span className="text-ink/70 font-medium">{label}</span>}
          {showPercent && <span className="font-mono text-xs text-ink/50">{pct}%</span>}
        </div>
      )}
      <div className="quest-track">
        <div className={`quest-track-fill ${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
