import React from 'react'
import { Settings as SettingsIcon } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import EmptyState from '../../components/EmptyState'

export default function SchoolSettings() {
  return (
    <div>
      <Navbar title="Settings" subtitle="School profile & preferences" name="School Admin" />
      <main className="p-4 md:p-8">
        <Card>
          <EmptyState
            icon={SettingsIcon}
            title="Settings — coming soon"
            description="School profile, notification preferences and integrations will be configurable here in a future release. This area is a placeholder in the prototype."
          />
        </Card>
      </main>
    </div>
  )
}
