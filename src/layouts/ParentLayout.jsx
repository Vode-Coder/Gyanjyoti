import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, TrendingUp } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useApp } from '../context/AppContext'

const items = [
  { to: '/parent/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/parent/progress', label: 'Progress', icon: TrendingUp },
]

export default function ParentLayout() {
  const { logout } = useApp()
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar items={items} roleLabel="Parent" roleTone="bg-leaf-600" onLogout={() => { logout(); navigate('/roles') }} />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}
