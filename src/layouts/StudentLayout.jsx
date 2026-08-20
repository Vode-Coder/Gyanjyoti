import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Award, Trophy, ListChecks } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useApp } from '../context/AppContext'

const items = [
  { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/student/tasks', label: 'Tasks', icon: ListChecks },
  { to: '/student/badges', label: 'Badges', icon: Award },
  { to: '/student/leaderboard', label: 'Leaderboard', icon: Trophy },
]

export default function StudentLayout() {
  const { logout } = useApp()
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar items={items} roleLabel="Student" roleTone="bg-violet-600" onLogout={() => { logout(); navigate('/roles') }} />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}
