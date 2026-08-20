import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Trophy } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import ProgressBar from '../../components/ProgressBar'
import { useApp } from '../../context/AppContext'
import { ageGroups } from '../../lib/mockData'

export default function CandidateDashboard() {
  const { loggedInUser, candidateProfile, candidateCategories, candidateProgress } = useApp()
  const navigate = useNavigate()
  const group = ageGroups.find((g) => g.id === candidateProfile?.ageGroupId)
  const categories = candidateCategories || []

  return (
    <div>
      <Navbar title="Your Personalized Learning Journey" subtitle={group ? `${group.label} · Age ${group.range}` : 'Candidate'} name={loggedInUser?.name || candidateProfile?.name} />
      <main className="p-4 md:p-8 space-y-6">
        <Card className="p-6 bg-gradient-to-br from-indigo-700 to-violet-600 text-white border-0">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div><p className="text-xs text-white/70">Candidate</p><p className="font-display font-semibold">{candidateProfile?.name || loggedInUser?.name}</p></div>
            <div><p className="text-xs text-white/70">Age Category</p><p className="font-display font-semibold">{group?.label || '—'}</p></div>
            <div><p className="text-xs text-white/70">XP</p><p className="font-display font-semibold">640 XP</p></div>
            <div className="flex items-center gap-1.5"><Trophy size={16} /><p className="font-display font-semibold">3 badges</p></div>
          </div>
        </Card>

        <div>
          <h3 className="font-display font-semibold text-lg flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-violet-600" /> Personalized for You
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Card key={cat} className="p-5" hover>
                <p className="font-display font-semibold">{cat}</p>
                <div className="mt-3">
                  <ProgressBar value={candidateProgress[cat] || 40} tone="green" showPercent />
                </div>
                <button
                  onClick={() => navigate('/candidate/tasks', { state: { category: cat } })}
                  className="mt-4 text-sm font-medium text-indigo-700 hover:underline"
                >
                  Open category →
                </button>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
