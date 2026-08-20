import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Sparkles } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useApp } from '../context/AppContext'

const items = [
  { to: '/candidate/dashboard', label: 'My Journey', icon: LayoutDashboard, end: true },
  { to: '/candidate/tasks', label: 'AI Tasks', icon: Sparkles },
]

export default function CandidateLayout() {
  const { logout } = useApp()
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar items={items} roleLabel="Candidate" roleTone="bg-gradient-to-br from-violet-600 to-indigo-700" onLogout={() => { logout(); navigate('/roles') }} />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}
