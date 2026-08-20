import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowLeft, Sparkles, Clock } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Button from '../../components/Button'
import GamePicker from '../../components/games/GamePicker'
import ProgressBar from '../../components/ProgressBar'
import { useApp } from '../../context/AppContext'
import { questionBank, categoryToSubject, categoryToGame } from '../../lib/mockData'

const topicMap = {
  Technology: ['Artificial Intelligence', 'Internet Safety', 'Digital Literacy'],
  Mathematics: ['Number sense', 'Patterns', 'Basic algebra'],
  Science: ['Living world', 'Space & planets', 'Simple machines'],
  'General Knowledge': ['Geography', 'Current affairs', 'History'],
  English: ['Vocabulary', 'Grammar', 'Reading comprehension'],
}

export default function CandidateTasks() {
  const location = useLocation()
  const { candidateCategories, completeCandidateTask } = useApp()
  const [category, setCategory] = useState(location.state?.category || candidateCategories?.[0] || null)
  const [active, setActive] = useState(false)
  const [result, setResult] = useState(null)

  const categories = candidateCategories || []
  const subject = category ? categoryToSubject(category) : null
  const questions = subject ? (questionBank[subject] || questionBank['General Knowledge']) : []
  const gameType = category ? categoryToGame(category) : 'quiz'

  function handleFinish(res) {
    completeCandidateTask(category, res)
    setResult(res)
    setActive(false)
  }

  if (active && category) {
    return (
      <div>
        <Navbar title={`${category} Challenge`} subtitle="AI-personalized task" name="Candidate" />
        <main className="p-4 md:p-8">
          <button onClick={() => setActive(false)} className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-6">
            <ArrowLeft size={15} /> Back
          </button>
          <GamePicker
            gameType={gameType}
            questions={questions}
            meta={{ points: 100, badgeId: 'knowledge-hunter', badgeName: 'Knowledge Hunter' }}
            onFinish={handleFinish}
          />
        </main>
      </div>
    )
  }

  return (
    <div>
      <Navbar title="AI-Personalized Tasks" subtitle="Pick a category to begin" name="Candidate" />
      <main className="p-4 md:p-8 grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 p-4 h-fit">
          <p className="text-xs font-medium text-ink/45 px-2 mb-2">Categories</p>
          <div className="space-y-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => { setCategory(c); setResult(null) }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition ${category === c ? 'bg-indigo-700 text-white' : 'hover:bg-black/5 text-ink/70'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2">
          {category ? (
            <Card className="p-6">
              <div className="flex items-center gap-2 text-xs font-medium text-violet-600 bg-violet-600/10 w-fit px-2.5 py-1 rounded-full">
                <Sparkles size={12} /> AI Personalized
              </div>
              <h2 className="font-display text-xl font-semibold mt-3">{category} Challenge</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-ink/50">
                <span>Difficulty: Intermediate</span>
                <span className="inline-flex items-center gap-1"><Clock size={13} /> ~10 min</span>
                <span className="text-gold-500 font-medium">+100 XP</span>
              </div>
              <div className="mt-2 text-xs font-medium text-violet-600 bg-violet-600/10 w-fit px-2.5 py-1 rounded-full">
                {gameType === 'bubble' && '🎈 Bubble Pop Math Game'}
                {gameType === 'word' && '🧩 Word Puzzle Game'}
                {gameType === 'quiz' && '📝 Quick Quiz'}
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-ink/70 mb-2">You'll learn about:</p>
                <ul className="flex flex-wrap gap-2">
                  {(topicMap[subject] || ['Core concepts', 'Applied examples', 'Quick review']).map((t) => (
                    <li key={t} className="text-xs bg-indigo-700/5 text-indigo-700 px-2.5 py-1 rounded-full">{t}</li>
                  ))}
                </ul>
              </div>

              {result && (
                <div className="mt-5 bg-leaf-500/10 rounded-xl p-4 text-sm">
                  <p className="font-medium text-leaf-700">Last attempt: {result.scorePercent}% · +{result.xpEarned} XP</p>
                  <p className="text-ink/50 mt-1">Recommendation: keep practicing {category.toLowerCase()} a little each day to build mastery.</p>
                </div>
              )}

              <Button className="mt-6" onClick={() => setActive(true)}>Start Task</Button>
            </Card>
          ) : (
            <Card className="p-6"><p className="text-sm text-ink/50">Select a category to see AI-personalized tasks.</p></Card>
          )}
        </div>
      </main>
    </div>
  )
}
