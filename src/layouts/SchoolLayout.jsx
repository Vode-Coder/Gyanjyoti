import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, ListChecks, FileQuestion, Gamepad2, BarChart3, Settings } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useApp } from '../context/AppContext'

const items = [
  { to: '/school/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/school/students', label: 'Students', icon: Users },
  { to: '/school/tasks', label: 'Tasks', icon: ListChecks },
  { to: '/school/tests', label: 'Tests', icon: FileQuestion },
  { to: '/school/games', label: 'Games', icon: Gamepad2 },
  { to: '/school/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/school/settings', label: 'Settings', icon: Settings },
]

export default function SchoolLayout() {
  const { logout } = useApp()
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar items={items} roleLabel="School Admin" roleTone="bg-indigo-700" onLogout={() => { logout(); navigate('/roles') }} />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}
