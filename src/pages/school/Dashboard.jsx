import React from 'react'
import { Users, ListChecks, CheckCircle2, TrendingUp, Star, Activity } from 'lucide-react'
import Navbar from '../../components/Navbar'
import StatCard from '../../components/StatCard'
import Card from '../../components/Card'
import { useApp } from '../../context/AppContext'
import { activityFeed } from '../../lib/mockData'

export default function SchoolDashboard() {
  const { loggedInUser, students, tasks } = useApp()
  const active = tasks.filter((t) => t.status === 'Active').length
  const completed = tasks.filter((t) => t.status === 'Completed').length
  const avgScore = Math.round(students.reduce((a, s) => a + s.avgScore, 0) / students.length)
  const avgCompletion = Math.round((completed / Math.max(1, tasks.length)) * 100) + 62 // demo blend

  return (
    <div>
      <Navbar title={loggedInUser?.name || 'Sunrise Rural School'} name={loggedInUser?.name} subtitle="School Dashboard" />
      <main className="p-4 md:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard icon={Users} label="Total Students" value={students.length + 42} tone="indigo" />
          <StatCard icon={ListChecks} label="Active Tasks" value={active} tone="violet" />
          <StatCard icon={CheckCircle2} label="Completed Tasks" value={completed + 118} tone="leaf" />
          <StatCard icon={TrendingUp} label="Avg. Completion" value={`${Math.min(avgCompletion, 96)}%`} tone="gold" />
          <StatCard icon={Star} label="Avg. Student Score" value={`${avgScore}%`} tone="ember" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <h3 className="font-display font-semibold mb-4">Top performing classes</h3>
            <div className="space-y-4">
              {['Class 7', 'Class 6', 'Class 5', 'Class 8', 'Class 4'].map((c, i) => (
                <div key={c}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-ink/70">{c}</span>
                    <span className="font-mono text-xs text-ink/45">{92 - i * 7}%</span>
                  </div>
                  <div className="quest-track">
                    <div className="quest-track-fill green" style={{ width: `${92 - i * 7}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Activity size={17} /> Recent Activity</h3>
            <ul className="space-y-4">
              {activityFeed.map((a) => (
                <li key={a.id} className="text-sm">
                  <p className="text-ink/75">{a.text}</p>
                  <p className="text-xs text-ink/40 mt-0.5">{a.time}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </main>
    </div>
  )
}
