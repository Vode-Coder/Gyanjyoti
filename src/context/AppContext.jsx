import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { loadJSON, saveJSON } from '../lib/storage'
import {
  initialStudents, initialTasks, initialTests, initialGames, badgeCatalog,
} from '../lib/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [selectedRole, setSelectedRoleState] = useState(() => loadJSON('selectedRole', null))
  const [loggedInUser, setLoggedInUserState] = useState(() => loadJSON('loggedInUser', null))

  const [students, setStudents] = useState(() => loadJSON('students', initialStudents))
  const [tasks, setTasks] = useState(() => loadJSON('tasks', initialTasks))
  const [tests, setTests] = useState(() => loadJSON('tests', initialTests))
  const [games, setGames] = useState(() => loadJSON('games', initialGames))
  const [completedTasks, setCompletedTasks] = useState(() => loadJSON('completedTasks', []))
  const [studentProgress, setStudentProgress] = useState(() => loadJSON('studentProgress', {
    xp: 1240, level: 7, xpToNext: 1500, streak: 7, rank: 8, badges: ['first-step', 'fast-learner', 'science-explorer'],
  }))
  const [candidateProfile, setCandidateProfile] = useState(() => loadJSON('candidateProfile', null))
  const [candidateCategories, setCandidateCategories] = useState(() => loadJSON('candidateCategories', null))
  const [candidateProgress, setCandidateProgress] = useState(() => loadJSON('candidateProgress', {}))

  useEffect(() => saveJSON('selectedRole', selectedRole), [selectedRole])
  useEffect(() => saveJSON('loggedInUser', loggedInUser), [loggedInUser])
  useEffect(() => saveJSON('students', students), [students])
  useEffect(() => saveJSON('tasks', tasks), [tasks])
  useEffect(() => saveJSON('tests', tests), [tests])
  useEffect(() => saveJSON('games', games), [games])
  useEffect(() => saveJSON('completedTasks', completedTasks), [completedTasks])
  useEffect(() => saveJSON('studentProgress', studentProgress), [studentProgress])
  useEffect(() => saveJSON('candidateProfile', candidateProfile), [candidateProfile])
  useEffect(() => saveJSON('candidateCategories', candidateCategories), [candidateCategories])
  useEffect(() => saveJSON('candidateProgress', candidateProgress), [candidateProgress])

  const setSelectedRole = useCallback((role) => setSelectedRoleState(role), [])

  const login = useCallback((role, user) => {
    setSelectedRoleState(role)
    setLoggedInUserState({ role, ...user })
  }, [])

  const logout = useCallback(() => {
    setLoggedInUserState(null)
    setSelectedRoleState(null)
  }, [])

  // ---- Task CRUD (School) ----
  const createTask = useCallback((task) => {
    const id = 'TSK' + String(Date.now()).slice(-6)
    setTasks((prev) => [{ id, status: 'Active', ...task }, ...prev])
    return id
  }, [])
  const updateTask = useCallback((id, patch) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }, [])
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // ---- Test CRUD ----
  const createTest = useCallback((test) => {
    const id = 'TST' + String(Date.now()).slice(-6)
    setTests((prev) => [{ id, status: 'Scheduled', ...test }, ...prev])
    return id
  }, [])
  const deleteTest = useCallback((id) => setTests((prev) => prev.filter((t) => t.id !== id)), [])

  // ---- Game CRUD ----
  const createGame = useCallback((game) => {
    const id = 'GAM' + String(Date.now()).slice(-6)
    setGames((prev) => [{ id, ...game }, ...prev])
    return id
  }, [])
  const deleteGame = useCallback((id) => setGames((prev) => prev.filter((g) => g.id !== id)), [])

  // ---- Student gamification ----
  const completeTask = useCallback((taskId, result) => {
    setCompletedTasks((prev) => [{ taskId, ...result, completedAt: new Date().toISOString() }, ...prev])
    setStudentProgress((prev) => {
      let xp = prev.xp + result.xpEarned
      let level = prev.level
      let xpToNext = prev.xpToNext
      while (xp >= xpToNext) {
        xp -= xpToNext
        level += 1
        xpToNext = Math.round(xpToNext * 1.15)
      }
      const newBadges = result.badgeId && !prev.badges.includes(result.badgeId)
        ? [...prev.badges, result.badgeId]
        : prev.badges
      const rank = Math.max(1, prev.rank - (result.scorePercent >= 80 ? 1 : 0))
      return { ...prev, xp, level, xpToNext, badges: newBadges, rank, streak: prev.streak }
    })
  }, [])

  // ---- Candidate ----
  const registerCandidate = useCallback((profile) => {
    setCandidateProfile({ id: 'CAND' + String(Date.now()).slice(-6), ...profile })
  }, [])
  const setCandidateAgeGroup = useCallback((group, categories) => {
    setCandidateProfile((prev) => ({ ...prev, ageGroupId: group }))
    setCandidateCategories(categories)
  }, [])
  const completeCandidateTask = useCallback((category, result) => {
    setCandidateProgress((prev) => ({
      ...prev,
      [category]: Math.min(100, (prev[category] || 40) + Math.round(result.scorePercent / 5)),
    }))
  }, [])

  const value = {
    selectedRole, setSelectedRole, loggedInUser, login, logout,
    students, setStudents,
    tasks, createTask, updateTask, deleteTask,
    tests, createTest, deleteTest,
    games, createGame, deleteGame,
    completedTasks, completeTask,
    studentProgress, badgeCatalog,
    candidateProfile, registerCandidate, setCandidateAgeGroup,
    candidateCategories, candidateProgress, completeCandidateTask,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
