import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Flame, Star, Trophy, Zap } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import ProgressBar from '../../components/ProgressBar'
import TaskCard from '../../components/TaskCard'
import { useApp } from '../../context/AppContext'

export default function StudentDashboard() {
  const { loggedInUser, tasks, studentProgress, completedTasks } = useApp()
  const navigate = useNavigate()
  const name = loggedInUser?.name?.split(' ')[0] || 'Learner'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const doneIds = new Set(completedTasks.map((c) => c.taskId))
  const todaysTasks = tasks.filter((t) => t.status === 'Active').slice(0, 4)

  return (
    <div>
      <Navbar title={`${greeting}, ${name}! \ud83d\udc4b`} subtitle="Ready for today's learning adventure?" name={loggedInUser?.name} />
      <main className="p-4 md:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 bg-gradient-to-br from-indigo-700 to-violet-600 text-white border-0">
            <p className="text-xs text-white/70 font-medium">Level</p>
            <p className="text-2xl font-display font-semibold mt-1">Lv. {studentProgress.level}</p>
            <p className="text-xs text-white/60 mt-1 font-mono">{studentProgress.xp} / {studentProgress.xpToNext} XP</p>
          </Card>
          <Card className="p-5" hover>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-ink/50 font-medium">Rank</p><p className="text-2xl font-display font-semibold mt-1">#{studentProgress.rank}</p></div>
              <Trophy className="text-gold-500" size={22} />
            </div>
          </Card>
          <Card className="p-5" hover>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-ink/50 font-medium">Streak</p><p className="text-2xl font-display font-semibold mt-1">{studentProgress.streak} days</p></div>
              <Flame className="text-ember-500" size={22} />
            </div>
          </Card>
          <Card className="p-5" hover>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-ink/50 font-medium">Badges</p><p className="text-2xl font-display font-semibold mt-1">{studentProgress.badges.length}</p></div>
              <Star className="text-violet-600" size={22} />
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-indigo-700" />
            <h3 className="font-display font-semibold">Level {studentProgress.level} progress</h3>
          </div>
          <ProgressBar value={Math.round((studentProgress.xp / studentProgress.xpToNext) * 100)} label={`${studentProgress.xp} XP / ${studentProgress.xpToNext} XP`} />
        </Card>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-lg">Today's Tasks</h3>
            <button onClick={() => navigate('/student/tasks')} className="text-sm text-indigo-700 font-medium hover:underline">View all</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {todaysTasks.map((t) => (
              <TaskCard key={t.id} task={t} done={doneIds.has(t.id)} onStart={() => navigate(`/student/task/${t.id}`)} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
