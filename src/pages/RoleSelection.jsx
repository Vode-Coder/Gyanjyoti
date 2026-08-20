import React from 'react'
import { useNavigate } from 'react-router-dom'
import { School, GraduationCap, Users, Sparkles, Sprout } from 'lucide-react'
import RoleCard from '../components/RoleCard'
import { useApp } from '../context/AppContext'

const roles = [
  {
    id: 'school', title: 'School', icon: School, tone: 'bg-indigo-700/10 text-indigo-700',
    description: 'Create and manage learning activities for students.', to: '/school/login',
  },
  {
    id: 'student', title: 'Student', icon: GraduationCap, tone: 'bg-violet-600/10 text-violet-600',
    description: 'Complete challenges, earn badges and climb the leaderboard.', to: '/student/login',
  },
  {
    id: 'parent', title: 'Parent', icon: Users, tone: 'bg-leaf-600/10 text-leaf-600',
    description: "Track your child's learning progress and achievements.", to: '/parent/login',
  },
  {
    id: 'candidate', title: 'Candidate', icon: Sparkles, tone: 'bg-ember-500/10 text-ember-600',
    description: 'Get personalized learning activities based on your age.', to: '/candidate/login',
  },
]

export default function RoleSelection() {
  const navigate = useNavigate()
  const { setSelectedRole } = useApp()

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center px-6 py-14">
      <div className="p-2.5 rounded-xl bg-indigo-700 text-white mb-5"><Sprout size={22} /></div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-center">How are you using Gyanjyoti?</h1>
      <p className="text-ink/50 mt-2 text-center">Choose your role to continue</p>

      <div className="grid sm:grid-cols-2 gap-5 mt-10 w-full max-w-2xl">
        {roles.map((r) => (
          <RoleCard
            key={r.id}
            icon={r.icon}
            title={r.title}
            description={r.description}
            tone={r.tone}
            onClick={() => { setSelectedRole(r.id); navigate(r.to) }}
          />
        ))}
      </div>
    </div>
  )
}
