import React, { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, ArrowRight, Sparkles, Award, Trophy } from 'lucide-react'
import Card from './Card'
import Button from './Button'
import ProgressBar from './ProgressBar'

const CONFETTI_COLORS = ['#453FC2', '#7C3AED', '#F59E0B', '#16A34A', '#FB7A3C']

function Confetti() {
  const pieces = Array.from({ length: 24 })
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((_, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${(i * 97) % 100}%`,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            animationDelay: `${(i % 8) * 0.06}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function QuizRunner({ questions, meta, onFinish, primaryColor = 'indigo' }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const q = questions[index]
  const total = questions.length

  function choose(optIdx) {
    if (selected !== null) return
    setSelected(optIdx)
  }

  function next() {
    const isCorrect = selected === q.answer
    const updated = [...answers, isCorrect]
    setAnswers(updated)
    if (index + 1 < total) {
      setIndex(index + 1)
      setSelected(null)
    } else {
      setShowResult(true)
    }
  }

  if (showResult) {
    const correctCount = answers.filter(Boolean).length
    const scorePercent = Math.round((correctCount / total) * 100)
    const xpEarned = Math.round(meta.points * (scorePercent / 100)) + 20
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60

    return (
      <div className="relative max-w-lg mx-auto">
        <Confetti />
        <Card className="p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/15 text-gold-500 flex items-center justify-center animate-popIn">
            <Trophy size={30} />
          </div>
          <h2 className="font-display text-xl font-semibold mt-4">🎉 Challenge Complete!</h2>
          <p className="text-3xl font-display font-bold mt-3 text-indigo-700">{scorePercent}%</p>
          <p className="text-sm text-ink/45 mt-1">{correctCount} of {total} correct · {minutes}m {secs}s</p>

          <div className="grid grid-cols-2 gap-3 mt-6 text-left">
            <div className="bg-gold-500/10 rounded-xl p-3">
              <p className="text-xs text-ink/45 flex items-center gap-1"><Sparkles size={12} /> XP earned</p>
              <p className="font-semibold mt-1">+{xpEarned} XP</p>
            </div>
            <div className="bg-violet-600/10 rounded-xl p-3">
              <p className="text-xs text-ink/45 flex items-center gap-1"><Award size={12} /> Badge</p>
              <p className="font-semibold mt-1">{scorePercent >= 70 ? (meta.badgeName || 'New Badge!') : '—'}</p>
            </div>
          </div>

          <Button
            className="w-full mt-6"
            onClick={() => onFinish({ scorePercent, xpEarned, correctCount, total, badgeId: scorePercent >= 70 ? meta.badgeId : null, badgeName: meta.badgeName })}
          >
            Continue <ArrowRight size={16} />
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card className="p-6 md:p-8">
        <div className="flex items-center justify-between text-sm text-ink/45 mb-3">
          <span>Question {index + 1} of {total}</span>
          <span className="font-mono">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</span>
        </div>
        <ProgressBar value={Math.round(((index) / total) * 100)} showPercent={false} className="mb-6" />

        <h3 className="font-display text-lg font-semibold leading-snug">{q.q}</h3>

        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, i) => {
            const isSelected = selected === i
            const isCorrectOpt = selected !== null && i === q.answer
            const isWrongSelected = selected !== null && isSelected && i !== q.answer
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={selected !== null}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium flex items-center justify-between transition
                  ${isCorrectOpt ? 'border-leaf-500 bg-leaf-500/10 text-leaf-700' : ''}
                  ${isWrongSelected ? 'border-red-400 bg-red-50 text-red-700' : ''}
                  ${selected === null ? 'border-black/10 hover:border-indigo-400 hover:bg-indigo-50/50' : ''}
                  ${selected !== null && !isCorrectOpt && !isWrongSelected ? 'border-black/5 opacity-50' : ''}
                `}
              >
                <span>{opt}</span>
                {isCorrectOpt && <CheckCircle2 size={17} className="text-leaf-600" />}
                {isWrongSelected && <XCircle size={17} className="text-red-500" />}
              </button>
            )
          })}
        </div>

        <Button className="w-full mt-6" disabled={selected === null} onClick={next}>
          {index + 1 === total ? 'Finish' : 'Next'} <ArrowRight size={16} />
        </Button>
      </Card>
    </div>
  )
}
