
import React, { useState, useRef, useEffect } from 'react';
import { CloudRain, Wind, Bird, Play, Pause, Music } from 'lucide-react';

const SOUNDS = [
  { id: 'rain', name: 'Gentle Rain', icon: <CloudRain size={20} />, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }, // Placeholder URLs
  { id: 'white', name: 'White Noise', icon: <Wind size={20} />, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'birds', name: 'Forest Birds', icon: <Bird size={20} />, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

const SoundTherapy: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = (sound: typeof SOUNDS[0]) => {
    if (activeId === sound.id) {
      audioRef.current?.pause();
      setActiveId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = sound.url;
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      }
      setActiveId(sound.id);
    }
  };

  return (
    <div className="glass p-8 rounded-[40px] shadow-xl border border-slate-50 flex flex-col gap-6">
      <h3 className="font-bold text-slate-800 flex items-center gap-2">
        <Music size={18} className="text-indigo-500" /> Sound Therapy
      </h3>
      
      <audio ref={audioRef} loop className="hidden" />

      <div className="grid grid-cols-1 gap-3">
        {SOUNDS.map((sound) => (
          <button
            key={sound.id}
            onClick={() => toggleSound(sound)}
            className={`flex items-center justify-between p-4 rounded-3xl border transition-all duration-500 ${
              activeId === sound.id 
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-lg shadow-indigo-100 scale-[1.02]' 
                : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-2xl ${activeId === sound.id ? 'bg-white/20' : 'bg-slate-50'}`}>
                {sound.icon}
              </div>
              <span className="font-bold text-sm tracking-wide">{sound.name}</span>
            </div>
            {activeId === sound.id ? <Pause size={18} /> : <Play size={18} />}
          </button>
        ))}
      </div>

      {activeId && (
        <div className="flex items-center gap-2 justify-center animate-pulse">
          <div className="w-1 h-3 bg-indigo-400 rounded-full" />
          <div className="w-1 h-5 bg-indigo-500 rounded-full" />
          <div className="w-1 h-3 bg-indigo-400 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default SoundTherapy;
