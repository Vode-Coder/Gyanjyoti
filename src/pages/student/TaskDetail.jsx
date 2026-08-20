import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import GamePicker from '../../components/games/GamePicker'
import Card from '../../components/Card'
import EmptyState from '../../components/EmptyState'
import { useApp } from '../../context/AppContext'
import { questionBank, taskTypeToGame } from '../../lib/mockData'

export default function StudentTaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tasks, completeTask } = useApp()
  const task = tasks.find((t) => t.id === id)

  if (!task) {
    return (
      <div>
        <Navbar title="Task not found" name="Student" />
        <main className="p-8"><Card><EmptyState title="We couldn't find that task" description="It may have been removed by your school." /></Card></main>
      </div>
    )
  }

  const questions = questionBank[task.subject] || questionBank['General Knowledge']
  const gameType = taskTypeToGame(task.type)
  const badgeMap = { Mathematics: ['math-master', 'Math Master'], Science: ['science-explorer', 'Science Explorer'], English: ['fast-learner', 'Fast Learner'] }
  const [badgeId, badgeName] = badgeMap[task.subject] || ['knowledge-hunter', 'Knowledge Hunter']

  function handleFinish(result) {
    completeTask(task.id, result)
    navigate('/student/dashboard')
  }

  return (
    <div>
      <Navbar title={task.title} subtitle={`${task.subject} · ${task.difficulty}`} name="Student" />
      <main className="p-4 md:p-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-6">
          <ArrowLeft size={15} /> Back
        </button>
        <GamePicker gameType={gameType} questions={questions} meta={{ points: task.points, badgeId, badgeName }} onFinish={handleFinish} />
      </main>
    </div>
  )
}
