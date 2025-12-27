
import React from 'react';
import { Trophy, Medal, Star, Flame } from 'lucide-react';
import { MOCK_LEADERBOARD } from '../constants';
import { UserState } from '../types';

interface LeaderboardProps {
  user: UserState;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ user }) => {
  const allEntries = [...MOCK_LEADERBOARD, { rank: 0, name: "You", level: user.level, xp: user.xp, isUser: true }]
    .sort((a, b) => b.xp - a.xp)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Trophy className="text-amber-500" size={28} /> Community Pulse
          </h2>
          <p className="text-slate-500 text-sm">We grow stronger when we grow together.</p>
        </div>
        <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 text-emerald-600">
          <Flame size={20} className="animate-bounce" />
          <span className="font-bold">Active Community</span>
        </div>
      </div>

      <div className="glass rounded-[40px] overflow-hidden shadow-xl border border-slate-100">
        <div className="bg-white/80 p-6 border-b flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
          <span>Rank & Guardian</span>
          <div className="flex gap-12 mr-8">
            <span>Level</span>
            <span>Total XP</span>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {allEntries.map((entry) => (
            <div 
              key={entry.name} 
              className={`p-6 flex items-center justify-between transition-colors ${entry.isUser ? 'bg-emerald-50/50' : 'hover:bg-slate-50/50'}`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-8 h-8 flex items-center justify-center font-bold text-sm rounded-full ${
                  entry.rank === 1 ? 'bg-amber-100 text-amber-600' : 
                  entry.rank === 2 ? 'bg-slate-100 text-slate-500' : 
                  entry.rank === 3 ? 'bg-orange-100 text-orange-600' : 'text-slate-400'
                }`}>
                  {entry.rank === 1 ? <Medal size={20} /> : entry.rank}
                </div>
                <div className="flex flex-col">
                  <span className={`font-semibold ${entry.isUser ? 'text-emerald-700' : 'text-slate-700'}`}>
                    {entry.name} {entry.isUser && <span className="text-[10px] ml-2 bg-emerald-100 px-2 py-0.5 rounded-full">YOU</span>}
                  </span>
                  <span className="text-xs text-slate-400">Guardian Spirit</span>
                </div>
              </div>

              <div className="flex gap-12 mr-6 text-sm">
                <div className="w-16 flex items-center gap-1 font-bold text-slate-700">
                  <Star size={14} className="text-amber-400" /> {entry.level}
                </div>
                <div className="w-16 font-mono font-medium text-slate-500">
                  {entry.xp.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-center text-xs text-slate-400 italic">
        * Leaderboard uses anonymous spirit names to protect privacy.
      </p>
    </div>
  );
};

export default Leaderboard;
