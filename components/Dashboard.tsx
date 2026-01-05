
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Moon, BookOpen, Quote, Sparkles } from 'lucide-react';
import { UserState } from '../types';

interface DashboardProps {
  data: UserState;
}

const QUOTES = [
  "You don't have to see the whole staircase, just take the first step.",
  "Your present circumstances don't determine where you can go; they merely determine where you start.",
  "Rest is not laziness, it's a bridge to your next great chapter.",
  "Be gentle with yourself. You are doing the best you can with what you have.",
  "Progress is rarely a straight line. Every zigzag is part of the journey."
];

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const chartData = [
    { name: 'Steps', value: data.steps, goal: 10000, color: '#14b8a6' },
    { name: 'Sleep', value: data.sleepHours * 10, goal: 80, color: '#4f46e5' },
    { name: 'Focus', value: data.pomoSessions * 20, goal: 100, color: '#f59e0b' },
  ];

  const todayQuote = QUOTES[new Date().getDay() % QUOTES.length];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome & Thought of the Day */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-8 rounded-[40px] shadow-xl border border-teal-50 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 text-teal-50 opacity-10 group-hover:scale-110 transition-transform duration-1000">
            <Sparkles size={200} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-light text-slate-800 mb-2">
              Welcome back, <span className="font-bold text-teal-600">{data.bio.name || "Friend"}</span>.
            </h2>
            <p className="text-slate-500 font-medium">It's a good day to be kind to yourself.</p>
          </div>
        </div>
        
        <div className="glass p-8 rounded-[40px] shadow-xl border border-indigo-50 flex flex-col justify-center bg-gradient-to-br from-white to-indigo-50/30">
          <div className="flex items-center gap-2 text-indigo-500 mb-4">
            <Quote size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Thought of the Day</span>
          </div>
          <p className="text-sm italic text-slate-600 leading-relaxed font-medium">
            "{todayQuote}"
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-[32px] flex flex-col gap-2 border-slate-50 hover:border-teal-100 transition-all">
          <div className="flex items-center gap-2 text-teal-500">
            <Activity size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">Physical Movement</span>
          </div>
          <div className="text-3xl font-light">{data.steps.toLocaleString()} <span className="text-sm text-slate-400 font-medium">steps</span></div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2 p-[2px]">
            <div className="bg-teal-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((data.steps/10000)*100, 100)}%` }} />
          </div>
        </div>

        <div className="glass p-6 rounded-[32px] flex flex-col gap-2 border-slate-50 hover:border-indigo-100 transition-all">
          <div className="flex items-center gap-2 text-indigo-500">
            <Moon size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">Rest Quality</span>
          </div>
          <div className="text-3xl font-light">{data.sleepHours} <span className="text-sm text-slate-400 font-medium">hours</span></div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2 p-[2px]">
            <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((data.sleepHours/8)*100, 100)}%` }} />
          </div>
        </div>

        <div className="glass p-6 rounded-[32px] flex flex-col gap-2 border-slate-50 hover:border-amber-100 transition-all">
          <div className="flex items-center gap-2 text-amber-500">
            <BookOpen size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">Focus Rounds</span>
          </div>
          <div className="text-3xl font-light">{data.pomoSessions} <span className="text-sm text-slate-400 font-medium">sessions</span></div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2 p-[2px]">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((data.pomoSessions/4)*100, 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="glass p-10 rounded-[48px] shadow-xl border border-slate-50">
        <h3 className="text-slate-700 font-bold mb-8 flex items-center gap-2">
          <Activity size={18} className="text-teal-500" /> Habit vs Goal Correlation
        </h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={32}>
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
