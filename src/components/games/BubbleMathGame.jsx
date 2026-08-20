import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Trophy, Sparkles, Award, ArrowRight, Timer } from 'lucide-react'
import Card from '../Card'
import Button from '../Button'
import ProgressBar from '../ProgressBar'
import { mathBubbleBank } from '../../lib/mockData'

const ROUNDS = 6
const BUBBLE_RISE_MS = 4200
const BUBBLE_COLORS = ['bg-indigo-700', 'bg-violet-600', 'bg-ember-500', 'bg-leaf-600', 'bg-gold-500']

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildRound(source) {
  const options = shuffle([source.answer, ...source.distractors]).map((val, i) => ({
    id: `${source.question}-${i}-${Math.random().toString(36).slice(2, 7)}`,
    value: val,
    isCorrect: val === source.answer,
    left: 8 + Math.random() * 78,
    delay: Math.random() * 900,
    color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
  }))
  return { question: source.question, answer: source.answer, options }
}

export default function BubbleMathGame({ meta, onFinish }) {
  const rounds = useMemo(() => shuffle(mathBubbleBank).slice(0, ROUNDS).map(buildRound), [])
  const [roundIndex, setRoundIndex] = useState(0)
  const [poppedId, setPoppedId] = useState(null)
  const [results, setResults] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [missedShake, setMissedShake] = useState(false)
  const timeoutRef = useRef(null)

  const round = rounds[roundIndex]

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setPoppedId(null)
    timeoutRef.current = setTimeout(() => {
      handleAnswer(null) // time's up — bubbles escaped
    }, BUBBLE_RISE_MS + 300)
    return () => clearTimeout(timeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIndex])

  function handleAnswer(opt) {
    clearTimeout(timeoutRef.current)
    const correct = !!opt?.isCorrect
    if (opt) setPoppedId(opt.id)
    if (!correct) setMissedShake(true)
    setTimeout(() => {
      setMissedShake(false)
      setResults((prev) => [...prev, correct])
      if (roundIndex + 1 < rounds.length) {
        setRoundIndex((i) => i + 1)
      } else {
        setShowResult(true)
      }
    }, correct ? 380 : 420)
  }

  if (showResult) {
    const correctCount = results.filter(Boolean).length
    const scorePercent = Math.round((correctCount / rounds.length) * 100)
    const xpEarned = Math.round(meta.points * (scorePercent / 100)) + 20
    return (
      <Card className="p-8 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/15 text-gold-500 flex items-center justify-center animate-popIn">
          <Trophy size={30} />
        </div>
        <h2 className="font-display text-xl font-semibold mt-4">🎈 Bubble Pop Complete!</h2>
        <p className="text-3xl font-display font-bold mt-3 text-indigo-700">{scorePercent}%</p>
        <p className="text-sm text-ink/45 mt-1">{correctCount} of {rounds.length} popped correctly · {seconds}s</p>
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
          onClick={() => onFinish({ scorePercent, xpEarned, correctCount, total: rounds.length, badgeId: scorePercent >= 70 ? meta.badgeId : null, badgeName: meta.badgeName })}
        >
          Continue <ArrowRight size={16} />
        </Button>
      </Card>
    )
  }

  return (
    <Card className={`max-w-lg mx-auto p-6 md:p-8 ${missedShake ? 'shake' : ''}`}>
      <div className="flex items-center justify-between text-sm text-ink/45 mb-3">
        <span>Round {roundIndex + 1} of {rounds.length}</span>
        <span className="inline-flex items-center gap-1 font-mono"><Timer size={13} /> {seconds}s</span>
      </div>
      <ProgressBar value={Math.round((roundIndex / rounds.length) * 100)} showPercent={false} className="mb-5" />

      <p className="text-center text-sm text-ink/50 mb-1">Pop the bubble with the correct answer</p>
      <h3 className="font-display text-3xl font-bold text-center text-indigo-700 mb-2">{round.question} = ?</h3>

      <div className="relative mt-4 h-[300px] rounded-2xl bg-gradient-to-b from-indigo-700/5 to-violet-600/5 overflow-hidden border border-black/5">
        {round.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleAnswer(opt)}
            aria-label={`Answer option ${opt.value}`}
            disabled={poppedId !== null}
            className={`absolute bottom-0 w-14 h-14 rounded-full ${opt.color} text-white font-display font-semibold flex items-center justify-center shadow-pop
              ${poppedId === opt.id && opt.isCorrect ? 'bubble-pop' : ''}
              ${poppedId === opt.id && !opt.isCorrect ? 'ring-4 ring-red-400' : ''}
              hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:ring-white`}
            style={{
              left: `${opt.left}%`,
              animation: poppedId ? undefined : `bubbleRise ${BUBBLE_RISE_MS}ms linear ${opt.delay}ms forwards`,
            }}
          >
            {opt.value}
          </button>
        ))}
      </div>
      <p className="text-xs text-ink/35 text-center mt-3">Tap the bubble before it floats away!</p>
    </Card>
  )
}
