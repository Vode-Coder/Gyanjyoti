import React, { useState } from 'react'
import { Plus, Trash2, FileQuestion } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import EmptyState from '../../components/EmptyState'
import { Field, Input, Select } from '../../components/Input'
import { useApp } from '../../context/AppContext'
import { SUBJECTS, CLASSES } from '../../lib/mockData'

const statusTone = {
  Live: 'bg-leaf-500/10 text-leaf-600',
  Scheduled: 'bg-gold-500/15 text-gold-500',
  Completed: 'bg-black/5 text-ink/45',
}

const emptyForm = { name: '', subject: SUBJECTS[0], class: CLASSES[0], questions: 10, duration: 30, assigned: 0 }

export default function SchoolTests() {
  const { tests, createTest, deleteTest } = useApp()
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    createTest(form)
    setForm(emptyForm)
    setModalOpen(false)
  }

  return (
    <div>
      <Navbar title="Test Management" subtitle={`${tests.length} tests configured`} name="School Admin" />
      <main className="p-4 md:p-8 space-y-5">
        <div className="flex justify-end">
          <Button icon={Plus} onClick={() => setModalOpen(true)}>Create Test</Button>
        </div>

        {tests.length === 0 ? (
          <Card><EmptyState icon={FileQuestion} title="No tests yet" description="Create your first test to assign it to a class." /></Card>
        ) : (
          <Card className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-ink/45 border-b border-black/5">
                  <th className="px-5 py-3 font-medium">Test name</th>
                  <th className="px-5 py-3 font-medium">Subject</th>
                  <th className="px-5 py-3 font-medium">Class</th>
                  <th className="px-5 py-3 font-medium">Questions</th>
                  <th className="px-5 py-3 font-medium">Duration</th>
                  <th className="px-5 py-3 font-medium">Assigned</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {tests.map((t) => (
                  <tr key={t.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.015]">
                    <td className="px-5 py-3.5 font-medium">{t.name}</td>
                    <td className="px-5 py-3.5 text-ink/60">{t.subject}</td>
                    <td className="px-5 py-3.5 text-ink/60">{t.class}</td>
                    <td className="px-5 py-3.5 text-ink/60">{t.questions}</td>
                    <td className="px-5 py-3.5 text-ink/60">{t.duration} min</td>
                    <td className="px-5 py-3.5 text-ink/60">{t.assigned}</td>
                    <td className="px-5 py-3.5"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusTone[t.status]}`}>{t.status}</span></td>
                    <td className="px-5 py-3.5 text-right">
                      <button aria-label={`Delete ${t.name}`} onClick={() => setDeleteTarget(t)} className="p-1.5 rounded-lg hover:bg-red-50 text-ink/40 hover:text-red-600">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </main>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Test" size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Test name" required>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Mid-Term Mathematics" required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Subject">
              <Select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </Select>
            </Field>
            <Field label="Class">
              <Select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })}>
                {CLASSES.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="No. of questions">
              <Input type="number" min="1" value={form.questions} onChange={(e) => setForm({ ...form, questions: Number(e.target.value) })} />
            </Field>
            <Field label="Duration (min)">
              <Input type="number" min="5" value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })} />
            </Field>
          </div>
          <p className="text-xs text-ink/40">Questions and correct answers can be added after the test is created.</p>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">Create Test</Button>
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete test?" size="sm">
        <p className="text-sm text-ink/60">This will permanently remove <strong>{deleteTarget?.name}</strong>.</p>
        <div className="flex gap-3 mt-5">
          <Button variant="danger" className="flex-1" onClick={() => { deleteTest(deleteTarget.id); setDeleteTarget(null) }}>Delete</Button>
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  )
}
