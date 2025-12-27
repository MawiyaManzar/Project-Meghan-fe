
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';

interface PomodoroProps {
  onComplete: () => void;
}

const Pomodoro: React.FC<PomodoroProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
      alert(mode === 'work' ? "Focus session complete! Time for a micro-break." : "Break over. Ready to gently refocus?");
      setMode(mode === 'work' ? 'break' : 'work');
      setTimeLeft(mode === 'work' ? 5 * 60 : 25 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="p-6 rounded-3xl bg-white shadow-xl border border-slate-100 flex flex-col items-center">
      <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">
        {mode === 'work' ? 'Focus Session' : 'Gentle Break'}
      </div>
      <div className="text-6xl font-light text-slate-800 mb-6 font-mono">
        {formatTime(timeLeft)}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={toggleTimer}
          className="p-4 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors"
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button 
          onClick={resetTimer}
          className="p-4 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
        <button 
          onClick={() => {
            setMode(mode === 'work' ? 'break' : 'work');
            setTimeLeft(mode === 'work' ? 5 * 60 : 25 * 60);
            setIsActive(false);
          }}
          className="p-4 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
        >
          <Coffee size={24} />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
