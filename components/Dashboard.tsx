
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Activity, Moon, BookOpen, Quote, Sparkles, Heart, ShieldCheck, CheckSquare, Music, Mic } from 'lucide-react';
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
  const promisesKept = data.promises.filter(p => p.completed).length;
  
  const wellnessData = [
    { name: 'Promises', value: promisesKept, goal: data.promises.length, color: '#10b981', icon: <CheckSquare size={16} /> },
    { name: 'Focus', value: data.pomoSessions, goal: 4, color: '#f59e0b', icon: <BookOpen size={16} /> },
    { name: 'Therapy', value: data.soundSessions, goal: 5, color: '#6366f1', icon: <Music size={16} /> },
  ];

  const todayQuote = QUOTES[new Date().getDay() % QUOTES.length];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
      {/* Welcome & Future Self Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 glass p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-xl border border-teal-50 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 text-teal-50 opacity-10 group-hover:scale-110 transition-transform duration-1000">
            <Sparkles size={160} md:size={200} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em]">Growth Status</span>
              <div className="h-px flex-1 bg-teal-50" />
            </div>
            <h2 className="text-xl md:text-3xl font-light text-slate-800 mb-2 leading-tight">
              Hello, <span className="font-bold text-teal-600">{data.bio.name || "Friend"}</span>. 
              <br className="hidden md:block" /> You're evolving into your <span className="italic font-normal">best version</span>.
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium">Growth Phase {data.level} • Future Successful Self in progress.</p>
          </div>
        </div>
        
        <div className="glass p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-xl border border-indigo-50 flex flex-col justify-center bg-gradient-to-br from-white to-indigo-50/30">
          <div className="flex items-center gap-2 text-indigo-500 mb-3 md:mb-4">
            <Quote size={18} md:size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Sisterly Wisdom</span>
          </div>
          <p className="text-xs md:text-sm italic text-slate-600 leading-relaxed font-medium">
            "{todayQuote}"
          </p>
        </div>
      </div>

      {/* Wellness Tool Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {wellnessData.map((item) => (
          <div key={item.name} className="glass p-5 md:p-6 rounded-[24px] md:rounded-[32px] flex flex-col gap-2 border-slate-50 hover:border-teal-100 transition-all">
            <div className="flex items-center gap-2" style={{ color: item.color }}>
              {item.icon}
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.name} Kept</span>
            </div>
            <div className="text-2xl md:text-3xl font-light">
              {item.value} <span className="text-xs md:text-sm text-slate-400 font-medium">/ {item.goal}</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 md:h-2 rounded-full overflow-hidden mt-1 md:mt-2 p-[1px] md:p-[2px]">
              <div className="h-full rounded-full transition-all duration-1000" style={{ backgroundColor: item.color, width: `${Math.min((item.value / item.goal) * 100, 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Core Habits Chart */}
        <div className="glass p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-xl border border-slate-50">
          <h3 className="text-slate-700 font-bold mb-6 flex items-center gap-2 text-sm md:text-base">
            <Activity size={18} className="text-indigo-500" /> Wellness Mastery
          </h3>
          <div className="h-[200px] md:h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wellnessData} layout="vertical" margin={{ left: 0, right: 30, top: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={70} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                  {wellnessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Community & Reminders */}
        <div className="space-y-4 md:space-y-6">
          <div className="glass p-5 md:p-6 rounded-[24px] md:rounded-[32px] bg-emerald-50/50 border-emerald-100 flex items-center justify-between group">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck size={20} md:size={24} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Self Trust Status</p>
                <p className="font-bold text-emerald-700 text-xs md:text-sm">{data.reminderSaved ? "Reminder Active" : "No Reminder Set"}</p>
              </div>
            </div>
            {data.reminderSaved && <CheckSquare className="text-emerald-500" size={18} />}
          </div>

          <div className="glass p-5 md:p-6 rounded-[24px] md:rounded-[32px] bg-rose-50/50 border-rose-100 flex items-center justify-between group">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-rose-500 shadow-sm group-hover:scale-110 transition-transform">
                <Heart size={20} md:size={24} fill="currentColor" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Community Impact</p>
                <p className="font-bold text-rose-700 text-xs md:text-sm">{data.empathyPoints} Empathy Points</p>
              </div>
            </div>
            <div className="text-[9px] font-black text-rose-400 uppercase hidden xs:block">Guardian Spirit</div>
          </div>
          
          <div className="p-5 md:p-6 bg-slate-900 rounded-[24px] md:rounded-[32px] text-white flex flex-col justify-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Success Vision</p>
            <p className="text-xs font-medium opacity-80 leading-relaxed">
              "Your future successful self is the result of these tiny, consistent moments of grounding."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
