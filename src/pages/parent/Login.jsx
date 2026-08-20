import React from 'react'
import LoginForm from '../../components/LoginForm'

export default function ParentLogin() {
  return (
    <LoginForm
      roleLabel="Parent"
      idLabel="Parent ID"
      idPlaceholder="e.g. PAR445"
      tone="bg-leaf-600/10 text-leaf-600"
      homeRoute="/parent/dashboard"
      sampleName={() => 'Mr. Sharma'}
      sampleMeta={{ child: 'Rahul Sharma' }}
    />
  )
}
