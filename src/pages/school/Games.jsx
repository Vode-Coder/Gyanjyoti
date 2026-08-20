import React, { useState } from 'react'
import { Plus, Trash2, Gamepad2, Sparkles, Timer, Award } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { Field, Input, Select } from '../../components/Input'
import { useApp } from '../../context/AppContext'
import { DIFFICULTIES } from '../../lib/mockData'

const emptyForm = { title: '', description: '', difficulty: DIFFICULTIES[0], points: 80, badge: '', timeLimit: 5, xp: 60 }

export default function SchoolGames() {
  const { games, createGame, deleteGame } = useApp()
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    createGame(form)
    setForm(emptyForm)
    setModalOpen(false)
  }

  return (
    <div>
      <Navbar title="Game Management" subtitle="Configure gamified learning experiences" name="School Admin" />
      <main className="p-4 md:p-8 space-y-5">
        <div className="flex justify-end">
          <Button icon={Plus} onClick={() => setModalOpen(true)}>Add Game</Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map((g) => (
            <Card key={g.id} className="p-5 flex flex-col" hover>
              <div className="p-3 rounded-xl bg-violet-600/10 text-violet-600 w-fit mb-3">
                <Gamepad2 size={20} />
              </div>
              <h4 className="font-display font-semibold">{g.title}</h4>
              <p className="text-sm text-ink/50 mt-1 flex-1">{g.description}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-ink/50">
                <span className="inline-flex items-center gap-1"><Timer size={12} /> {g.timeLimit} min</span>
                <span className="inline-flex items-center gap-1 text-gold-500"><Sparkles size={12} /> +{g.xp} XP</span>
                {g.badge && <span className="inline-flex items-center gap-1"><Award size={12} /> {g.badge}</span>}
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-black/5">{g.difficulty}</span>
                <button aria-label={`Delete ${g.title}`} onClick={() => deleteGame(g.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-ink/40 hover:text-red-600">
                  <Trash2 size={15} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Game" size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Game title" required>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Math Sprint" required />
          </Field>
          <Field label="Description">
            <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What does this game teach?" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Difficulty">
              <Select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
                {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
              </Select>
            </Field>
            <Field label="Badge reward">
              <Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. Math Master" />
            </Field>
            <Field label="Time limit (min)">
              <Input type="number" min="1" value={form.timeLimit} onChange={(e) => setForm({ ...form, timeLimit: Number(e.target.value) })} />
            </Field>
            <Field label="Points">
              <Input type="number" min="1" value={form.points} onChange={(e) => setForm({ ...form, points: Number(e.target.value) })} />
            </Field>
            <Field label="XP reward">
              <Input type="number" min="1" value={form.xp} onChange={(e) => setForm({ ...form, xp: Number(e.target.value) })} />
            </Field>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">Add Game</Button>
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
