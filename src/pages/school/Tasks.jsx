import React, { useMemo, useState } from 'react'
import { Plus, Search, Pencil, Trash2, Clock, Sparkles } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'
import { Field, Input, Select, Textarea } from '../../components/Input'
import { useApp } from '../../context/AppContext'
import { SUBJECTS, DIFFICULTIES, TASK_TYPES, CLASSES } from '../../lib/mockData'

const emptyForm = {
  title: '', description: '', subject: SUBJECTS[0], difficulty: DIFFICULTIES[0], class: CLASSES[0],
  estTime: 10, points: 50, dueDate: '', assignTo: CLASSES[0], type: TASK_TYPES[0],
}

export default function SchoolTasks() {
  const { tasks, createTask, updateTask, deleteTask } = useApp()
  const [query, setQuery] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = useMemo(() => tasks.filter((t) => {
    const matchesQuery = t.title.toLowerCase().includes(query.toLowerCase())
    const matchesSubject = subjectFilter === 'All' || t.subject === subjectFilter
    return matchesQuery && matchesSubject
  }), [tasks, query, subjectFilter])

  function openCreate() {
    setForm(emptyForm)
    setEditingId(null)
    setModalOpen(true)
  }
  function openEdit(task) {
    setForm(task)
    setEditingId(task.id)
    setModalOpen(true)
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    if (editingId) {
      updateTask(editingId, form)
    } else {
      createTask(form)
    }
    setModalOpen(false)
  }

  return (
    <div>
      <Navbar title="Task Management" subtitle={`${tasks.length} tasks in total`} name="School Admin" />
      <main className="p-4 md:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks..." className="pl-9" />
            </div>
            <Select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="sm:w-48">
              <option>All</option>
              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </Select>
          </div>
          <Button icon={Plus} onClick={openCreate}>Create Task</Button>
        </div>

        {filtered.length === 0 ? (
          <Card><EmptyState title="No tasks found" description="Try a different search term or create a new task." action={<Button icon={Plus} onClick={openCreate}>Create Task</Button>} /></Card>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((task) => (
              <Card key={task.id} className="p-5" hover>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-medium text-indigo-700 bg-indigo-700/10 px-2.5 py-1 rounded-full">{task.subject}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${task.status === 'Active' ? 'bg-leaf-500/10 text-leaf-600' : 'bg-black/5 text-ink/45'}`}>{task.status}</span>
                </div>
                <h4 className="font-display font-semibold mt-3">{task.title}</h4>
                <p className="text-sm text-ink/50 mt-1 line-clamp-2">{task.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-ink/45">
                  <span className="inline-flex items-center gap-1"><Clock size={13} /> {task.estTime} min</span>
                  <span className="inline-flex items-center gap-1 text-gold-500 font-medium"><Sparkles size={13} /> {task.points} pts</span>
                  <span>{task.class}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="secondary" icon={Pencil} className="flex-1" onClick={() => openEdit(task)}>Edit</Button>
                  <Button size="sm" variant="danger" icon={Trash2} onClick={() => setDeleteTarget(task)}>Delete</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Task' : 'Create Task'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Task title" required>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Mathematics Challenge" required />
          </Field>
          <Field label="Description">
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Briefly describe the task..." />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Subject">
              <Select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </Select>
            </Field>
            <Field label="Difficulty">
              <Select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
                {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
              </Select>
            </Field>
            <Field label="Class / Grade">
              <Select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })}>
                {CLASSES.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="Task type">
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {TASK_TYPES.map((t) => <option key={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Estimated time (min)">
              <Input type="number" min="1" value={form.estTime} onChange={(e) => setForm({ ...form, estTime: Number(e.target.value) })} />
            </Field>
            <Field label="Points">
              <Input type="number" min="1" value={form.points} onChange={(e) => setForm({ ...form, points: Number(e.target.value) })} />
            </Field>
            <Field label="Due date">
              <Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </Field>
            <Field label="Assign to">
              <Select value={form.assignTo} onChange={(e) => setForm({ ...form, assignTo: e.target.value })}>
                {CLASSES.map((c) => <option key={c}>{c}</option>)}
                <option>All Students</option>
              </Select>
            </Field>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">{editingId ? 'Save Changes' : 'Create Task'}</Button>
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete task?" size="sm">
        <p className="text-sm text-ink/60">
          This will permanently remove <strong>{deleteTarget?.title}</strong> from the task list.
        </p>
        <div className="flex gap-3 mt-5">
          <Button variant="danger" className="flex-1" onClick={() => { deleteTask(deleteTarget.id); setDeleteTarget(null) }}>Delete</Button>
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  )
}
