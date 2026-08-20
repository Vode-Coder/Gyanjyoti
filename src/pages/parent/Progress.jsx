import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import { useApp } from '../../context/AppContext'

const trend = [
  { week: 'W1', score: 68 }, { week: 'W2', score: 72 }, { week: 'W3', score: 75 },
  { week: 'W4', score: 80 }, { week: 'W5', score: 83 }, { week: 'W6', score: 88 },
]

export default function ParentProgress() {
  const { loggedInUser } = useApp()
  return (
    <div>
      <Navbar title="Progress over time" subtitle="Detailed view of learning trends" name={loggedInUser?.name} />
      <main className="p-4 md:p-8">
        <Card className="p-6">
          <h3 className="font-display font-semibold mb-4">Average score trend (last 6 weeks)</h3>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E8F5" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#6B6D85' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B6D85' }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eee' }} />
                <Line type="monotone" dataKey="score" stroke="#16A34A" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </main>
    </div>
  )
}
