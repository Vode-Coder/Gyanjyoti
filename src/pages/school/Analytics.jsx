import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, CartesianGrid } from 'recharts'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import StatCard from '../../components/StatCard'
import { CheckCircle2, Star, Users2, BookOpen } from 'lucide-react'
import { weeklyActivity, subjectCompletion } from '../../lib/mockData'

export default function SchoolAnalytics() {
  return (
    <div>
      <Navbar title="Analytics" subtitle="School-wide learning insights" name="School Admin" />
      <main className="p-4 md:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={CheckCircle2} label="Task completion" value="82%" tone="leaf" />
          <StatCard icon={Star} label="Average score" value="86%" tone="gold" />
          <StatCard icon={Users2} label="Student engagement" value="High" sub="4.2 sessions / week" tone="violet" />
          <StatCard icon={BookOpen} label="Most completed subject" value="Mathematics" tone="indigo" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-display font-semibold mb-4">Weekly activity</h3>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E8F5" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B6D85' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B6D85' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eee' }} />
                  <Bar dataKey="tasks" fill="#453FC2" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display font-semibold mb-4">Subject completion</h3>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <RadarChart data={subjectCompletion} outerRadius={90}>
                  <PolarGrid stroke="#E7E8F5" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6B6D85' }} />
                  <Radar dataKey="value" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.35} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eee' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
