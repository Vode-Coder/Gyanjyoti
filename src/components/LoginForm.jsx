import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Sprout } from 'lucide-react'
import Button from './Button'
import { Field, Input } from './Input'
import { useApp } from '../context/AppContext'

export default function LoginForm({
  roleLabel, idLabel, idPlaceholder, tone, homeRoute, registerLink, sampleName, sampleMeta,
}) {
  const navigate = useNavigate()
  const { login } = useApp()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!id.trim() || !password.trim()) {
      setError('Please enter both fields to continue.')
      return
    }
    login(roleLabel.toLowerCase(), { id, name: sampleName(id), meta: sampleMeta })
    navigate(homeRoute)
  }

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm">
        <button onClick={() => navigate('/roles')} className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-6">
          <ArrowLeft size={15} /> Back to role selection
        </button>

        <div className="bg-surface rounded-2xl border border-black/5 shadow-soft p-7">
          <div className={`inline-flex p-2.5 rounded-xl ${tone} mb-4`}>
            <Sprout size={20} />
          </div>
          <h2 className="font-display text-xl font-semibold">{roleLabel} Login</h2>
          <p className="text-sm text-ink/45 mt-1">Enter any ID and password to explore the demo.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <Field label={idLabel} required>
              <Input value={id} onChange={(e) => setId(e.target.value)} placeholder={idPlaceholder} autoComplete="username" />
            </Field>
            <Field label="Password" required>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
            </Field>
            {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
            <Button type="submit" className="w-full mt-2">Login</Button>
          </form>

          {registerLink && (
            <p className="text-sm text-center text-ink/50 mt-5">
              New candidate?{' '}
              <Link to={registerLink} className="text-indigo-700 font-medium hover:underline">Create Account</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
