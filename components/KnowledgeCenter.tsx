
import React from 'react';
import { UserBio } from '../types';
import { Sparkles, BrainCircuit, CheckCircle } from 'lucide-react';

interface KnowledgeCenterProps {
  bio: UserBio;
  onUpdate: (field: keyof UserBio, value: string) => void;
}

const KnowledgeCenter: React.FC<KnowledgeCenterProps> = ({ bio, onUpdate }) => {
  const fields: { key: keyof UserBio; label: string; icon: string; placeholder: string }[] = [
    { key: 'name', label: 'How should I call you?', icon: '👤', placeholder: 'e.g. Alex' },
    { key: 'major', label: 'What are you studying?', icon: '🎓', placeholder: 'e.g. Psychology' },
    { key: 'hobbies', label: 'What releases your happiness hormones?', icon: '🎨', placeholder: 'e.g. Painting, Hiking' },
    { key: 'values', label: 'What matters most to you?', icon: '⚖️', placeholder: 'e.g. Kindness, Ambition' },
  ];

  // Cast values to string to fix 'unknown' type error when calling .trim()
  const filledCount = Object.values(bio).filter(v => (v as string).trim() !== '').length;
  const progress = (filledCount / fields.length) * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="glass p-8 rounded-[40px] shadow-xl border border-emerald-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
            <BrainCircuit size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Connection Strength</h2>
            <p className="text-slate-500 text-sm">The more I know, the better I can support you.</p>
          </div>
        </div>

        {/* Knowledge Progress Bar */}
        <div className="space-y-2 mb-8">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-emerald-600 flex items-center gap-1">
              <span className="animate-pulse">✨</span> Meghan's Understanding
            </span>
            <span className="text-slate-400">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-1 border border-slate-50">
            <div 
              className="bg-gradient-to-r from-teal-400 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(20,184,166,0.3)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((f) => (
            <div key={f.key} className="space-y-2 group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span>{f.icon}</span> {f.label}
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={bio[f.key]}
                  onChange={(e) => onUpdate(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full p-4 rounded-2xl border border-slate-100 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm pr-10"
                />
                {bio[f.key] && bio[f.key].trim() !== '' && (
                  <CheckCircle size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-500 animate-in zoom-in" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 bg-teal-50 border border-teal-100 rounded-3xl flex gap-4 items-center">
        <div className="text-2xl">💡</div>
        <p className="text-sm text-teal-700 leading-relaxed">
          <strong>Tip:</strong> Meghan uses this info to give you context-aware micro-actions. Sharing what triggers your dopamine or serotonin helps her suggest more effective grounding.
        </p>
      </div>
    </div>
  );
};

export default KnowledgeCenter;
