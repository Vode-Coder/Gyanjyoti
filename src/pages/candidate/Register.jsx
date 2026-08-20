import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UserPlus, ShieldCheck } from 'lucide-react'
import Button from '../../components/Button'
import { Field, Input, Select, Textarea } from '../../components/Input'
import { useApp } from '../../context/AppContext'

const EDU_LEVELS = ['Primary School', 'Middle School', 'High School', 'Undergraduate', 'Graduate', 'Not currently studying']

export default function CandidateRegister() {
  const navigate = useNavigate()
  const { registerCandidate, login } = useApp()
  const [form, setForm] = useState({
    name: '', email: '', age: '', gender: '', education: EDU_LEVELS[0],
    location: '', interests: '', goals: '', idProof: '',
  })
  const [verifying, setVerifying] = useState(false)

  function update(k, v) { setForm((f) => ({ ...f, [k]: v })) }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.age) return
    setVerifying(true)
    // Mock document verification — no real upload/verification occurs.
    setTimeout(() => {
      registerCandidate(form)
      login('candidate', { id: 'CAND-NEW', name: form.name })
      setVerifying(false)
      navigate('/candidate/personalization')
    }, 1400)
  }

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg">
        <button onClick={() => navigate('/candidate/login')} className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-6">
          <ArrowLeft size={15} /> Back to login
        </button>

        <div className="bg-surface rounded-2xl border border-black/5 shadow-soft p-7">
          <div className="inline-flex p-2.5 rounded-xl bg-ember-500/10 text-ember-600 mb-4">
            <UserPlus size={20} />
          </div>
          <h2 className="font-display text-xl font-semibold">Create your candidate account</h2>
          <p className="text-sm text-ink/45 mt-1">We'll use this to personalize your learning path.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" required>
                <Input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" required />
              </Field>
              <Field label="Email" required>
                <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" required />
              </Field>
              <Field label="Age" required>
                <Input type="number" min="5" max="99" value={form.age} onChange={(e) => update('age', e.target.value)} placeholder="e.g. 16" required />
              </Field>
              <Field label="Gender (optional)">
                <Select value={form.gender} onChange={(e) => update('gender', e.target.value)}>
                  <option value="">Prefer not to say</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </Select>
              </Field>
              <Field label="Education level">
                <Select value={form.education} onChange={(e) => update('education', e.target.value)}>
                  {EDU_LEVELS.map((l) => <option key={l}>{l}</option>)}
                </Select>
              </Field>
              <Field label="Location">
                <Input value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="Village / District" />
              </Field>
            </div>
            <Field label="Interests" hint="Comma separated, e.g. Science, Drawing, Cricket">
              <Input value={form.interests} onChange={(e) => update('interests', e.target.value)} placeholder="What do you enjoy?" />
            </Field>
            <Field label="Learning goals">
              <Textarea value={form.goals} onChange={(e) => update('goals', e.target.value)} placeholder="What do you hope to achieve on Gyanjyoti?" />
            </Field>
            <Field label="ID proof (mock upload)" hint="This is a prototype — no document is actually uploaded or verified.">
              <Input value={form.idProof} onChange={(e) => update('idProof', e.target.value)} placeholder="e.g. Aadhaar / School ID number" />
            </Field>

            <div className="flex items-start gap-2 bg-indigo-700/5 rounded-xl p-3 text-xs text-ink/50">
              <ShieldCheck size={16} className="text-indigo-700 shrink-0 mt-0.5" />
              Verification is simulated for this demo — no documents leave your browser.
            </div>

            <Button type="submit" className="w-full" disabled={verifying}>
              {verifying ? 'Verifying details…' : 'Create Account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
