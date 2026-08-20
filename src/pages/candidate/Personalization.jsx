import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Baby, GraduationCap, Briefcase, Wand2 } from 'lucide-react'
import Card from '../../components/Card'
import { useApp } from '../../context/AppContext'
import { ageGroups } from '../../lib/mockData'

const icons = { '5-12': Baby, '12-17': GraduationCap, '17+': Briefcase }

export default function CandidatePersonalization() {
  const navigate = useNavigate()
  const { setCandidateAgeGroup } = useApp()
  const [step, setStep] = useState('select') // select | generating
  const [chosen, setChosen] = useState(null)

  function choose(group) {
    setChosen(group)
    setStep('generating')
  }

  useEffect(() => {
    if (step === 'generating' && chosen) {
      const t = setTimeout(() => {
        setCandidateAgeGroup(chosen.id, chosen.categories)
        navigate('/candidate/dashboard')
      }, 2200)
      return () => clearTimeout(t)
    }
  }, [step, chosen, navigate, setCandidateAgeGroup])

  if (step === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-indigo-700 to-violet-600 flex flex-col items-center justify-center text-white px-6 text-center">
        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-6 animate-popIn relative">
          <Wand2 size={34} />
          <span className="absolute inset-0 rounded-2xl border-2 border-white/40 animate-pulseRing" />
        </div>
        <h2 className="font-display text-2xl font-semibold">AI is creating your personalized learning path…</h2>
        <p className="text-white/70 mt-2 max-w-sm">Analyzing your age group and interests to curate the right categories for you.</p>
        <div className="mt-8 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/80 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-white/80 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-white/80 animate-bounce" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center px-6 py-14">
      <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white mb-5">
        <Sparkles size={22} />
      </div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-center">Let's personalize your learning</h1>
      <p className="text-ink/50 mt-2 text-center">Choose the age group that fits you best</p>

      <div className="grid sm:grid-cols-3 gap-5 mt-10 w-full max-w-4xl">
        {ageGroups.map((g) => {
          const Icon = icons[g.id]
          return (
            <button key={g.id} onClick={() => choose(g)} className="text-left focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl">
              <Card className="p-6 h-full" hover>
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-violet-600/10 to-indigo-700/10 text-indigo-700 mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg">{g.label}</h3>
                <p className="text-xs font-mono text-violet-600 mt-1">Age {g.range}</p>
                <p className="text-sm text-ink/50 mt-2 leading-relaxed">{g.tagline}</p>
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}
