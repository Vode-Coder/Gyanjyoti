import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import TaskCard from '../../components/TaskCard'
import EmptyState from '../../components/EmptyState'
import Card from '../../components/Card'
import { useApp } from '../../context/AppContext'

export default function StudentTaskList() {
  const { tasks, completedTasks } = useApp()
  const navigate = useNavigate()
  const doneIds = new Set(completedTasks.map((c) => c.taskId))
  const active = tasks.filter((t) => t.status === 'Active')

  return (
    <div>
      <Navbar title="Your Tasks" subtitle={`${active.length} tasks available`} name="Student" />
      <main className="p-4 md:p-8">
        {active.length === 0 ? (
          <Card><EmptyState title="No tasks found" description="Check back soon — your school will assign new tasks shortly." /></Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map((t) => (
              <TaskCard key={t.id} task={t} done={doneIds.has(t.id)} onStart={() => navigate(`/student/task/${t.id}`)} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
