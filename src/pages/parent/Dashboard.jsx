import React from 'react'
import { Flame, Trophy, Sparkles, Lightbulb } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Avatar from '../../components/Avatar'
import ProgressBar from '../../components/ProgressBar'
import { useApp } from '../../context/AppContext'
import { parentInsights, activityFeed } from '../../lib/mockData'

export default function ParentDashboard() {
  const { loggedInUser, students } = useApp()
  const child = students.find((s) => s.name === loggedInUser?.meta?.child) || students[0]

  return (
    <div>
      <Navbar title="Child Progress" subtitle={`Monitoring ${child.name}'s learning journey`} name={loggedInUser?.name} />
      <main className="p-4 md:p-8 space-y-6">
        <Card className="p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <Avatar name={child.name} size="lg" />
          <div className="flex-1">
            <h2 className="font-display text-lg font-semibold">{child.name}</h2>
            <p className="text-sm text-ink/45">Age 11 · {child.class} · Level {child.level}</p>
          </div>
          <div className="flex gap-6 text-center">
            <div><p className="font-display font-semibold text-lg">{child.xp}</p><p className="text-xs text-ink/45">XP</p></div>
            <div><p className="font-display font-semibold text-lg">#{child.rank}</p><p className="text-xs text-ink/45">Rank</p></div>
            <div className="flex flex-col items-center"><p className="font-display font-semibold text-lg flex items-center gap-1"><Flame size={16} className="text-ember-500" />{child.streak}</p><p className="text-xs text-ink/45">Streak</p></div>
          </div>
        </Card>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5"><p className="text-sm text-ink/50">Tasks completed</p><p className="text-2xl font-display font-semibold mt-1">{child.tasksCompleted}</p></Card>
          <Card className="p-5"><p className="text-sm text-ink/50">Average score</p><p className="text-2xl font-display font-semibold mt-1">{child.avgScore}%</p></Card>
          <Card className="p-5"><p className="text-sm text-ink/50">Time spent learning</p><p className="text-2xl font-display font-semibold mt-1">6.2 hrs</p><p className="text-xs text-ink/40">this week</p></Card>
          <Card className="p-5"><p className="text-sm text-ink/50">Badges earned</p><p className="text-2xl font-display font-semibold mt-1 flex items-center gap-1.5"><Trophy size={18} className="text-gold-500" />4</p></Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-display font-semibold mb-4">Subject progress</h3>
            <div className="space-y-4">
              <ProgressBar label="Mathematics" value={85} tone="green" />
              <ProgressBar label="Science" value={72} />
              <ProgressBar label="English" value={80} tone="gold" />
              <ProgressBar label="General Knowledge" value={65} />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display font-semibold mb-4">Recent activity</h3>
            <ul className="space-y-4">
              {activityFeed.slice(0, 4).map((a) => (
                <li key={a.id} className="text-sm flex items-start gap-2">
                  <Sparkles size={14} className="text-violet-600 mt-0.5 shrink-0" />
                  <div><p className="text-ink/75">{a.text}</p><p className="text-xs text-ink/40">{a.time}</p></div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="p-6 bg-gradient-to-br from-leaf-600/5 to-transparent">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Lightbulb size={17} className="text-leaf-600" /> Learning insights</h3>
          <ul className="space-y-2.5">
            {parentInsights.map((insight, i) => (
              <li key={i} className="text-sm text-ink/70 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-leaf-500 mt-1.5 shrink-0" />
                {insight}
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </div>
  )
}
