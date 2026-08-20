import React, { useMemo, useState, useEffect } from 'react'
import { Trophy, Sparkles, Award, ArrowRight, Delete, CheckCircle2, XCircle } from 'lucide-react'
import Card from '../Card'
import Button from '../Button'
import ProgressBar from '../ProgressBar'
import { wordPuzzleBank } from '../../lib/mockData'

const ROUNDS = 5

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function scrambleLetters(word) {
  let letters
  do {
    letters = shuffle(word.split(''))
  } while (letters.join('') === word && word.length > 1)
  return letters.map((ch, i) => ({ id: `${ch}-${i}-${Math.random().toString(36).slice(2, 6)}`, ch }))
}

export default function WordPuzzleGame({ meta, onFinish }) {
  const rounds = useMemo(() => shuffle(wordPuzzleBank).slice(0, ROUNDS), [])
  const [roundIndex, setRoundIndex] = useState(0)
  const [tiles, setTiles] = useState(() => scrambleLetters(rounds[0].word))
  const [built, setBuilt] = useState([])
  const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong' | null
  const [results, setResults] = useState([])
  const [showResult, setShowResult] = useState(false)

  const round = rounds[roundIndex]

  useEffect(() => {
    setTiles(scrambleLetters(rounds[roundIndex].word))
    setBuilt([])
    setFeedback(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIndex])

  function pickTile(tile) {
    if (feedback) return
    setBuilt((b) => [...b, tile])
    setTiles((t) => t.filter((x) => x.id !== tile.id))
  }

  function removeLast() {
    if (feedback || built.length === 0) return
    const last = built[built.length - 1]
    setBuilt((b) => b.slice(0, -1))
    setTiles((t) => [...t, last])
  }

  function submit() {
    if (feedback || built.length !== round.word.length) return
    const attempt = built.map((t) => t.ch).join('')
    const correct = attempt === round.word
    setFeedback(correct ? 'correct' : 'wrong')
    setTimeout(() => {
      setResults((prev) => [...prev, correct])
      if (roundIndex + 1 < rounds.length) {
        setRoundIndex((i) => i + 1)
      } else {
        setShowResult(true)
      }
    }, 1000)
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
        <h2 className="font-display text-xl font-semibold mt-4">🧩 Word Puzzle Complete!</h2>
        <p className="text-3xl font-display font-bold mt-3 text-indigo-700">{scorePercent}%</p>
        <p className="text-sm text-ink/45 mt-1">{correctCount} of {rounds.length} words solved</p>
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
    <Card className="max-w-lg mx-auto p-6 md:p-8">
      <div className="flex items-center justify-between text-sm text-ink/45 mb-3">
        <span>Word {roundIndex + 1} of {rounds.length}</span>
      </div>
      <ProgressBar value={Math.round((roundIndex / rounds.length) * 100)} showPercent={false} className="mb-6" />

      <p className="text-center text-sm text-ink/50">Unscramble the word</p>
      <p className="text-center text-xs text-violet-600 font-medium mt-1 mb-6">Hint: {round.hint}</p>

      {/* answer slots */}
      <div className="flex flex-wrap justify-center gap-2 min-h-[52px]">
        {built.map((t, i) => (
          <div
            key={t.id}
            className={`tile-in w-11 h-11 rounded-xl flex items-center justify-center font-display font-semibold text-lg border-2
              ${feedback === 'correct' ? 'border-leaf-500 bg-leaf-500/10 text-leaf-700' : ''}
              ${feedback === 'wrong' ? 'border-red-400 bg-red-50 text-red-600' : ''}
              ${!feedback ? 'border-indigo-500 bg-indigo-700/5 text-indigo-700' : ''}`}
          >
            {t.ch}
          </div>
        ))}
        {Array.from({ length: round.word.length - built.length }).map((_, i) => (
          <div key={`empty-${i}`} className="w-11 h-11 rounded-xl border-2 border-dashed border-black/10" />
        ))}
      </div>

      {feedback && (
        <p className={`text-center text-sm font-medium mt-3 flex items-center justify-center gap-1.5 ${feedback === 'correct' ? 'text-leaf-600' : 'text-red-600'}`}>
          {feedback === 'correct' ? <><CheckCircle2 size={16} /> Correct!</> : <><XCircle size={16} /> The word was {round.word}</>}
        </p>
      )}

      {/* letter bank */}
      <div className="flex flex-wrap justify-center gap-2 mt-8">
        {tiles.map((t) => (
          <button
            key={t.id}
            onClick={() => pickTile(t)}
            disabled={!!feedback}
            className="tile-in w-11 h-11 rounded-xl bg-white border border-black/10 shadow-soft font-display font-semibold text-lg text-ink/80 hover:border-indigo-400 hover:-translate-y-0.5 transition"
          >
            {t.ch}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mt-8">
        <Button variant="secondary" icon={Delete} onClick={removeLast} disabled={!!feedback || built.length === 0}>
          Remove
        </Button>
        <Button className="flex-1" onClick={submit} disabled={!!feedback || built.length !== round.word.length}>
          Check word
        </Button>
      </div>
    </Card>
  )
}
