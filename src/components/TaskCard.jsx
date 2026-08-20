import React from 'react'
import { Clock, Sparkles } from 'lucide-react'
import Button from './Button'
import { taskTypeToGame } from '../lib/mockData'

const gameLabel = { bubble: '🎈 Bubble Math', word: '🧩 Word Puzzle', quiz: '📝 Quiz' }

const diffTone = {
  Easy: 'bg-leaf-500/10 text-leaf-600',
  Medium: 'bg-gold-500/15 text-gold-500',
  Hard: 'bg-ember-500/10 text-ember-600',
}

export default function TaskCard({ task, onStart, done = false }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-surface p-5 shadow-soft card-hover flex flex-col h-full">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-indigo-700 bg-indigo-700/10 px-2.5 py-1 rounded-full">{task.subject}</span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${diffTone[task.difficulty] || diffTone.Easy}`}>{task.difficulty}</span>
      </div>
      <h4 className="font-display font-semibold mt-3">{task.title}</h4>
      <p className="text-sm text-ink/50 mt-1 leading-relaxed flex-1">{task.description}</p>
      <div className="flex items-center gap-4 mt-4 text-xs text-ink/45">
        <span className="inline-flex items-center gap-1"><Clock size={13} /> {task.estTime} min</span>
        <span className="inline-flex items-center gap-1 text-gold-500 font-medium"><Sparkles size={13} /> +{task.points} XP</span>
      </div>
      <span className="mt-2 w-fit text-[11px] font-medium text-violet-600 bg-violet-600/10 px-2 py-0.5 rounded-full">
        {gameLabel[taskTypeToGame(task.type)]}
      </span>
      <Button
        className="mt-4 w-full"
        variant={done ? 'secondary' : 'primary'}
        disabled={done}
        onClick={() => onStart?.(task)}
      >
        {done ? 'Completed' : 'Start Task'}
      </Button>
    </div>
  )
}
