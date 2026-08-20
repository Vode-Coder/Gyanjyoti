import React from 'react'
import LoginForm from '../../components/LoginForm'
import { useApp } from '../../context/AppContext'
import { Navigate } from 'react-router-dom'

export default function CandidateLogin() {
  const { candidateProfile, candidateCategories } = useApp()

  return (
    <LoginForm
      roleLabel="Candidate"
      idLabel="Candidate ID"
      idPlaceholder="e.g. CAND8823"
      tone="bg-ember-500/10 text-ember-600"
      homeRoute={candidateCategories ? '/candidate/dashboard' : '/candidate/personalization'}
      registerLink="/candidate/register"
      sampleName={() => candidateProfile?.name || 'Demo Candidate'}
    />
  )
}
