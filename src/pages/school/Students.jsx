import React, { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Avatar from '../../components/Avatar'
import ProgressBar from '../../components/ProgressBar'
import EmptyState from '../../components/EmptyState'
import Modal from '../../components/Modal'
import { Input, Select } from '../../components/Input'
import { useApp } from '../../context/AppContext'
import { CLASSES } from '../../lib/mockData'

export default function SchoolStudents() {
  const { students } = useApp()
  const [query, setQuery] = useState('')
  const [classFilter, setClassFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => students.filter((s) => {
    const q = s.name.toLowerCase().includes(query.toLowerCase())
    const c = classFilter === 'All' || s.class === classFilter
    return q && c
  }), [students, query, classFilter])

  return (
    <div>
      <Navbar title="Students" subtitle={`${students.length} students enrolled`} name="School Admin" />
      <main className="p-4 md:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students..." className="pl-9" />
          </div>
          <Select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="sm:w-48">
            <option>All</option>
            {CLASSES.map((c) => <option key={c}>{c}</option>)}
          </Select>
        </div>

        {filtered.length === 0 ? (
          <Card><EmptyState title="No students found" description="Try a different search term or class filter." /></Card>
        ) : (
          <Card className="overflow-x-auto">
            <table className="w-full text-sm min-w-[760px]">
              <thead>
                <tr className="text-left text-ink/45 border-b border-black/5">
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Class</th>
                  <th className="px-5 py-3 font-medium">Tasks done</th>
                  <th className="px-5 py-3 font-medium">Avg. score</th>
                  <th className="px-5 py-3 font-medium">XP</th>
                  <th className="px-5 py-3 font-medium">Rank</th>
                  <th className="px-5 py-3 font-medium">Progress</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} onClick={() => setSelected(s)} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] cursor-pointer">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={s.name} size="sm" />
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-ink/60">{s.class}</td>
                    <td className="px-5 py-3.5 text-ink/60">{s.tasksCompleted}</td>
                    <td className="px-5 py-3.5 text-ink/60">{s.avgScore}%</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-ink/60">{s.xp} XP</td>
                    <td className="px-5 py-3.5 text-ink/60">#{s.rank}</td>
                    <td className="px-5 py-3.5 w-40"><ProgressBar value={s.progress} showPercent={false} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </main>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Student progress" size="sm">
        {selected && (
          <div>
            <div className="flex items-center gap-3">
              <Avatar name={selected.name} size="lg" />
              <div>
                <p className="font-display font-semibold">{selected.name}</p>
                <p className="text-sm text-ink/45">{selected.class} · Level {selected.level}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
              <div className="bg-black/[0.02] rounded-xl p-3"><p className="text-ink/45 text-xs">Tasks completed</p><p className="font-semibold mt-0.5">{selected.tasksCompleted}</p></div>
              <div className="bg-black/[0.02] rounded-xl p-3"><p className="text-ink/45 text-xs">Average score</p><p className="font-semibold mt-0.5">{selected.avgScore}%</p></div>
              <div className="bg-black/[0.02] rounded-xl p-3"><p className="text-ink/45 text-xs">XP</p><p className="font-semibold mt-0.5">{selected.xp}</p></div>
              <div className="bg-black/[0.02] rounded-xl p-3"><p className="text-ink/45 text-xs">Current badge</p><p className="font-semibold mt-0.5">{selected.badge}</p></div>
            </div>
            <div className="mt-5">
              <ProgressBar value={selected.progress} label="Overall progress" tone="green" />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
