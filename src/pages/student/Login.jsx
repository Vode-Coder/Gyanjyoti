import React from 'react'
import LoginForm from '../../components/LoginForm'

export default function StudentLogin() {
  return (
    <LoginForm
      roleLabel="Student"
      idLabel="Student ID"
      idPlaceholder="e.g. STU001"
      tone="bg-violet-600/10 text-violet-600"
      homeRoute="/student/dashboard"
      sampleName={() => 'Rahul Sharma'}
    />
  )
}
