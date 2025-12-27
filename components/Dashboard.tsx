
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Moon, BookOpen, Heart } from 'lucide-react';
import { UserState } from '../types';

interface DashboardProps {
  data: UserState;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const chartData = [
    { name: 'Steps', value: data.steps, goal: 10000, color: '#10b981' },
    { name: 'Sleep', value: data.sleepHours * 10, goal: 80, color: '#6366f1' },
    { name: 'Focus', value: data.pomoSessions * 20, goal: 100, color: '#f59e0b' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <div className="glass p-6 rounded-3xl flex flex-col gap-2">
        <div className="flex items-center gap-2 text-emerald-500">
          <Activity size={20} />
          <span className="text-xs font-bold uppercase tracking-wider">Physical Movement</span>
        </div>
        <div className="text-3xl font-light">{data.steps.toLocaleString()} <span className="text-sm text-slate-400">steps</span></div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
          <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((data.steps/10000)*100, 100)}%` }} />
        </div>
      </div>

      <div className="glass p-6 rounded-3xl flex flex-col gap-2">
        <div className="flex items-center gap-2 text-indigo-500">
          <Moon size={20} />
          <span className="text-xs font-bold uppercase tracking-wider">Rest Quality</span>
        </div>
        <div className="text-3xl font-light">{data.sleepHours} <span className="text-sm text-slate-400">hours</span></div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
          <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((data.sleepHours/8)*100, 100)}%` }} />
        </div>
      </div>

      <div className="glass p-6 rounded-3xl flex flex-col gap-2">
        <div className="flex items-center gap-2 text-amber-500">
          <BookOpen size={20} />
          <span className="text-xs font-bold uppercase tracking-wider">Focus Rounds</span>
        </div>
        <div className="text-3xl font-light">{data.pomoSessions} <span className="text-sm text-slate-400">sessions</span></div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
          <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((data.pomoSessions/4)*100, 100)}%` }} />
        </div>
      </div>

      <div className="glass p-6 rounded-3xl flex flex-col gap-2">
        <div className="flex items-center gap-2 text-rose-500">
          <Heart size={20} />
          <span className="text-xs font-bold uppercase tracking-wider">Mood Pulse</span>
        </div>
        <div className="text-3xl font-light capitalize">{data.mood}</div>
        <span className="text-xs text-slate-400">Risk Tier: {data.tier}</span>
      </div>

      <div className="md:col-span-2 lg:col-span-4 glass p-6 rounded-3xl mt-4">
        <h3 className="text-slate-700 font-semibold mb-6 flex items-center gap-2">
          <Activity size={18} className="text-emerald-500" /> Habit vs Goal Correlation
        </h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
