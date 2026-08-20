import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'

import Loading from './pages/Loading'
import RoleSelection from './pages/RoleSelection'

import SchoolLayout from './layouts/SchoolLayout'
import SchoolLogin from './pages/school/Login'
import SchoolDashboard from './pages/school/Dashboard'
import SchoolTasks from './pages/school/Tasks'
import SchoolTests from './pages/school/Tests'
import SchoolGames from './pages/school/Games'
import SchoolStudents from './pages/school/Students'
import SchoolAnalytics from './pages/school/Analytics'
import SchoolSettings from './pages/school/Settings'

import StudentLayout from './layouts/StudentLayout'
import StudentLogin from './pages/student/Login'
import StudentDashboard from './pages/student/Dashboard'
import StudentTaskList from './pages/student/TaskList'
import StudentTaskDetail from './pages/student/TaskDetail'
import StudentBadges from './pages/student/Badges'
import StudentLeaderboard from './pages/student/Leaderboard'

import ParentLayout from './layouts/ParentLayout'
import ParentLogin from './pages/parent/Login'
import ParentDashboard from './pages/parent/Dashboard'
import ParentProgress from './pages/parent/Progress'

import CandidateLayout from './layouts/CandidateLayout'
import CandidateLogin from './pages/candidate/Login'
import CandidateRegister from './pages/candidate/Register'
import CandidatePersonalization from './pages/candidate/Personalization'
import CandidateDashboard from './pages/candidate/Dashboard'
import CandidateTasks from './pages/candidate/Tasks'

function ProtectedRole({ role, children }) {
  const { loggedInUser } = useApp()
  if (!loggedInUser || loggedInUser.role !== role) {
    return <Navigate to={`/${role}/login`} replace />
  }
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/roles" element={<RoleSelection />} />

      {/* School */}
      <Route path="/school/login" element={<SchoolLogin />} />
      <Route
        path="/school"
        element={<ProtectedRole role="school"><SchoolLayout /></ProtectedRole>}
      >
        <Route path="dashboard" element={<SchoolDashboard />} />
        <Route path="tasks" element={<SchoolTasks />} />
        <Route path="tests" element={<SchoolTests />} />
        <Route path="games" element={<SchoolGames />} />
        <Route path="students" element={<SchoolStudents />} />
        <Route path="analytics" element={<SchoolAnalytics />} />
        <Route path="settings" element={<SchoolSettings />} />
      </Route>

      {/* Student */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route
        path="/student"
        element={<ProtectedRole role="student"><StudentLayout /></ProtectedRole>}
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="tasks" element={<StudentTaskList />} />
        <Route path="task/:id" element={<StudentTaskDetail />} />
        <Route path="badges" element={<StudentBadges />} />
        <Route path="leaderboard" element={<StudentLeaderboard />} />
      </Route>

      {/* Parent */}
      <Route path="/parent/login" element={<ParentLogin />} />
      <Route
        path="/parent"
        element={<ProtectedRole role="parent"><ParentLayout /></ProtectedRole>}
      >
        <Route path="dashboard" element={<ParentDashboard />} />
        <Route path="progress" element={<ParentProgress />} />
      </Route>

      {/* Candidate */}
      <Route path="/candidate/login" element={<CandidateLogin />} />
      <Route path="/candidate/register" element={<CandidateRegister />} />
      <Route path="/candidate/personalization" element={<CandidatePersonalization />} />
      <Route
        path="/candidate"
        element={<ProtectedRole role="candidate"><CandidateLayout /></ProtectedRole>}
      >
        <Route path="dashboard" element={<CandidateDashboard />} />
        <Route path="tasks" element={<CandidateTasks />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
