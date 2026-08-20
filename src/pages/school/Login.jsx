import React from 'react'
import LoginForm from '../../components/LoginForm'

export default function SchoolLogin() {
  return (
    <LoginForm
      roleLabel="School"
      idLabel="School ID"
      idPlaceholder="e.g. SCH2201"
      tone="bg-indigo-700/10 text-indigo-700"
      homeRoute="/school/dashboard"
      sampleName={() => 'Sunrise Rural School'}
    />
  )
}
