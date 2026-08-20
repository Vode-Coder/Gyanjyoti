import React, { useState } from 'react'
import { Crown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Avatar from '../../components/Avatar'
import { useApp } from '../../context/AppContext'

const tabs = ['Daily', 'Weekly', 'Monthly']

export default function StudentLeaderboard() {
  const { students, loggedInUser } = useApp()
  const [tab, setTab] = useState('Weekly')
  const ranked = [...students].sort((a, b) => a.rank - b.rank)
  const currentName = loggedInUser?.name

  return (
    <div>
      <Navbar title="Leaderboard" subtitle="See how you rank against your peers" name="Student" />
      <main className="p-4 md:p-8">
        <div className="inline-flex bg-black/5 rounded-xl p-1 mb-5">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${tab === t ? 'bg-surface shadow-soft text-indigo-700' : 'text-ink/50'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-ink/45 border-b border-black/5">
                <th className="px-5 py-3 font-medium">Rank</th>
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">XP</th>
                <th className="px-5 py-3 font-medium">Tasks</th>
                <th className="px-5 py-3 font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((s) => {
                const isMe = s.name === currentName
                return (
                  <tr key={s.id} className={`border-b border-black/5 last:border-0 ${isMe ? 'bg-indigo-700/5' : ''}`}>
                    <td className="px-5 py-3.5 font-mono">
                      {s.rank <= 3 ? <Crown size={15} className="inline text-gold-500 mr-1" /> : null}#{s.rank}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={s.name} size="sm" />
                        <span className={`font-medium ${isMe ? 'text-indigo-700' : ''}`}>{s.name}{isMe && ' (You)'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-ink/60">{s.xp} XP</td>
                    <td className="px-5 py-3.5 text-ink/60">{s.tasksCompleted}</td>
                    <td className="px-5 py-3.5 text-ink/60">{s.avgScore}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  )
}
