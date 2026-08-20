import React from 'react'
import Navbar from '../../components/Navbar'
import BadgeCard from '../../components/BadgeCard'
import { useApp } from '../../context/AppContext'

export default function StudentBadges() {
  const { badgeCatalog, studentProgress } = useApp()
  const unlockedCount = studentProgress.badges.length

  return (
    <div>
      <Navbar title="Badges & Achievements" subtitle={`${unlockedCount} of ${badgeCatalog.length} unlocked`} name="Student" />
      <main className="p-4 md:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {badgeCatalog.map((b) => (
            <BadgeCard
              key={b.id}
              badge={b}
              unlocked={studentProgress.badges.includes(b.id)}
              dateEarned={studentProgress.badges.includes(b.id) ? 'recently' : null}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
