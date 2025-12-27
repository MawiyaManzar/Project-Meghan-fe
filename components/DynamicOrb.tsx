
import React from 'react';
import { Mood } from '../types';

interface OrbProps {
  mood: Mood;
  setMood: (mood: Mood) => void;
  size?: 'sm' | 'lg';
  text?: string;
}

const DynamicOrb: React.FC<OrbProps> = ({ mood, setMood, size = 'lg', text }) => {
  const getOrbColors = () => {
    switch (mood) {
      case Mood.ANXIOUS:
        return {
          bg: 'bg-rose-500',
          shadow: 'shadow-[0_0_100px_rgba(225,29,72,0.4)]',
          core: 'bg-rose-200',
          accent: 'text-rose-600',
          label: 'Fast Pulse'
        };
      case Mood.SAD:
        return {
          bg: 'bg-indigo-600',
          shadow: 'shadow-[0_0_100px_rgba(79,70,229,0.4)]',
          core: 'bg-indigo-300',
          accent: 'text-indigo-600',
          label: 'Feeling Heavy'
        };
      case Mood.CALM:
      default:
        return {
          bg: 'bg-teal-500',
          shadow: 'shadow-[0_0_100px_rgba(20,184,166,0.4)]',
          core: 'bg-teal-200',
          accent: 'text-teal-600',
          label: 'Grounded'
        };
    }
  };

  const colors = getOrbColors();
  const orbSize = size === 'lg' ? 'w-52 h-52 md:w-72 md:h-72' : 'w-10 h-10';

  const moodOptions = [
    {
      type: Mood.SAD,
      label: "Feeling Heavy",
      description: "I'm exhausted or feeling a bit lost.",
      colorClass: mood === Mood.SAD 
        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xl shadow-indigo-100' 
        : 'bg-white text-indigo-600 border-indigo-100 hover:border-indigo-200'
    },
    {
      type: Mood.ANXIOUS,
      label: "Fast Pulse",
      description: "Restless, mind racing, or on edge.",
      colorClass: mood === Mood.ANXIOUS 
        ? 'bg-rose-500 text-white border-rose-600 shadow-xl shadow-rose-100' 
        : 'bg-white text-rose-500 border-rose-100 hover:border-rose-200'
    },
    {
      type: Mood.CALM,
      label: "Grounded",
      description: "Balanced and ready to connect.",
      colorClass: mood === Mood.CALM 
        ? 'bg-teal-500 text-white border-teal-600 shadow-xl shadow-teal-100' 
        : 'bg-white text-teal-600 border-teal-100 hover:border-teal-200'
    }
  ];

  return (
    <div className="flex flex-col items-center gap-14 w-full max-w-2xl mx-auto relative">
      {/* Orb Container */}
      <div className="relative flex items-center justify-center">
        {/* Thought Ring */}
        {size === 'lg' && text && (
          <div className="absolute inset-0 -m-16 pointer-events-none animate-[spin_30s_linear_infinite]">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-20">
              <path id="curve" fill="transparent" d="M 100, 100 m -85, 0 a 85,85 0 1,0 170,0 a 85,85 0 1,0 -170,0" />
              <text className="text-[8px] font-bold uppercase tracking-[0.4em] fill-current">
                <textPath xlinkHref="#curve">
                  {text} • {text} • {text} •
                </textPath>
              </text>
            </svg>
          </div>
        )}

        {/* The Orb */}
        <div 
          className={`
            ${orbSize} rounded-full transition-all duration-1000 ease-in-out relative flex flex-col items-center justify-center
            ${colors.bg} ${colors.shadow} ${mood === Mood.SAD ? 'animate-pulse' : 'animate-pulse-slow'}
          `}
        >
          {/* Inner Core */}
          <div className={`absolute w-3/4 h-3/4 rounded-full ${colors.core} opacity-20 blur-2xl animate-pulse`} />
          
          {/* Surface Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 rounded-full" />
          
          {/* Mood Label Center */}
          <div className="relative z-10 flex flex-col items-center pointer-events-none">
            {size === 'lg' ? (
              <span className="text-white font-bold text-xl md:text-2xl tracking-tighter drop-shadow-md animate-in fade-in zoom-in duration-1000">
                {colors.label}
              </span>
            ) : (
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            )}
          </div>
        </div>
      </div>
      
      {size === 'lg' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full px-4">
          {moodOptions.map((opt) => (
            <button 
              key={opt.type}
              onClick={() => setMood(opt.type)}
              className={`flex flex-col items-center gap-1.5 px-6 py-6 rounded-[40px] border transition-all duration-500 hover:scale-[1.03] active:scale-95 group ${opt.colorClass}`}
            >
              <span className="font-bold text-sm tracking-wide">{opt.label}</span>
              <span className={`text-[10px] text-center leading-relaxed font-medium transition-opacity duration-500 ${mood === opt.type ? 'opacity-90' : 'opacity-50 group-hover:opacity-80'}`}>
                {opt.description}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicOrb;
