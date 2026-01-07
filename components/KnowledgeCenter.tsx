
import React from 'react';
import { UserBio } from '../types';
import { Sparkles, BrainCircuit, CheckCircle, Target, BookOpen, Heart, Compass, Mountain } from 'lucide-react';

interface KnowledgeCenterProps {
  bio: UserBio;
  onUpdate: (field: keyof UserBio, value: string) => void;
}

const KnowledgeCenter: React.FC<KnowledgeCenterProps> = ({ bio, onUpdate }) => {
  const fields: { key: keyof UserBio; label: string; sub: string; icon: React.ReactNode; placeholder: string }[] = [
    { 
      key: 'name', 
      label: 'Your Identity', 
      sub: 'The name your future self carries with pride.',
      icon: <Compass size={18} />, 
      placeholder: 'What should Meghan call you?' 
    },
    { 
      key: 'major', 
      label: 'Your Current Path', 
      sub: 'The domain you are currently mastering.',
      icon: <BookOpen size={18} />, 
      placeholder: 'What are you studying?' 
    },
    { 
      key: 'hobbies', 
      label: 'Energy Sources', 
      sub: 'Activities that recharge your internal battery.',
      icon: <Heart size={18} />, 
      placeholder: 'e.g. Painting, Digital Art, Tennis' 
    },
    { 
      key: 'values', 
      label: 'Anchor Points', 
      sub: 'The non-negotiables that guide your decisions.',
      icon: <Target size={18} />, 
      placeholder: 'e.g. Integrity, Curiosity, Growth' 
    },
    { 
      key: 'futureVision', 
      label: 'The North Star', 
      sub: 'A one-sentence vision of your successful self.',
      icon: <Mountain size={18} />, 
      placeholder: 'e.g. Lead a team with empathy and innovation.' 
    },
  ];

  const filledCount = Object.values(bio).filter(v => typeof v === 'string' && v.trim() !== '').length;
  const progress = (filledCount / fields.length) * 100;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Blueprint Header */}
      <div className="glass p-8 rounded-[48px] shadow-2xl border border-indigo-50 relative overflow-hidden bg-gradient-to-br from-white to-indigo-50/20">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BrainCircuit size={120} className="text-indigo-600" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-indigo-600 text-white rounded-3xl shadow-lg shadow-indigo-100">
              <Sparkles size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">The Personal Blueprint</h2>
              <p className="text-slate-500 font-medium">Defining the details that fuel your Growth Phase.</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm font-bold items-center">
              <span className="text-indigo-600 uppercase tracking-widest text-[10px]">Syncing with Future Self</span>
              <span className="text-slate-400 text-xs">{Math.round(progress)}% Defined</span>
            </div>
            <div className="w-full bg-slate-100/50 h-5 rounded-full overflow-hidden p-1 border border-slate-100">
              <div 
                className="bg-gradient-to-r from-teal-400 via-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((f) => (
          <div key={f.key} className={`glass p-6 rounded-[32px] border transition-all duration-500 group ${bio[f.key] ? 'border-emerald-100 bg-white shadow-md' : 'border-slate-100 bg-slate-50/30 hover:border-indigo-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl transition-colors ${bio[f.key] ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{f.label}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{f.sub}</p>
                </div>
              </div>
              {bio[f.key] && bio[f.key].trim() !== '' && (
                <div className="bg-emerald-500 text-white p-1 rounded-full animate-in zoom-in">
                  <CheckCircle size={14} />
                </div>
              )}
            </div>
            
            <div className="relative">
              <input 
                type="text"
                value={bio[f.key] || ''}
                onChange={(e) => onUpdate(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-transparent border-b border-slate-200 py-2 focus:border-indigo-500 focus:outline-none text-sm text-slate-700 placeholder:text-slate-300 transition-colors"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Sibling Tip Section */}
      <div className="bg-slate-900 text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden group">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mb-32 -mr-32 group-hover:scale-110 transition-transform duration-1000" />
        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10 text-center md:text-left">
          <div className="w-20 h-20 bg-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-xl border border-white/10 shrink-0">
             <span className="text-4xl">💡</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Why this matters to Meghan</h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              "When I know your North Star, I can stop giving generic advice. If you're stressed about an exam but your value is 'Growth,' I can remind you that a hurdle is just a workout for your brain. We're building your future self together, one detail at a time."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCenter;
