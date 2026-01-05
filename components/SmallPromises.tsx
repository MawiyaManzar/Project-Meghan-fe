
import React from 'react';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { SmallPromise } from '../types';

interface SmallPromisesProps {
  promises: SmallPromise[];
  onToggle: (id: string) => void;
}

const SmallPromises: React.FC<SmallPromisesProps> = ({ promises, onToggle }) => {
  return (
    <div className="glass p-8 rounded-[40px] shadow-xl border border-slate-50 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Sparkles size={18} className="text-amber-500" /> Small Promises
        </h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {promises.filter(p => p.completed).length} / {promises.length} Kept
        </span>
      </div>

      <div className="space-y-3">
        {promises.map((promise) => (
          <button
            key={promise.id}
            onClick={() => onToggle(promise.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-3xl border transition-all duration-300 group ${
              promise.completed 
                ? 'bg-teal-50 border-teal-100 text-teal-700' 
                : 'bg-white border-slate-100 text-slate-600 hover:border-teal-200'
            }`}
          >
            {promise.completed ? (
              <CheckCircle2 size={20} className="text-teal-500 shrink-0" />
            ) : (
              <Circle size={20} className="text-slate-300 group-hover:text-teal-400 shrink-0" />
            )}
            <span className={`text-sm font-medium transition-all ${promise.completed ? 'line-through opacity-60' : ''}`}>
              {promise.text}
            </span>
          </button>
        ))}
      </div>
      
      <p className="text-[10px] text-slate-400 text-center italic">
        "One small promise kept to yourself builds an ocean of trust."
      </p>
    </div>
  );
};

export default SmallPromises;
