
import React, { useState } from 'react';
import { MessageCircle, LayoutDashboard, BrainCircuit, ChevronRight, Sparkles } from 'lucide-react';

interface TutorialProps {
  onComplete: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "The Empathy Engine",
      description: "Meghan isn't just an AI. She's your digital older sibling. Talk to her about your day, and she'll help you find exactly one small step to feel more grounded.",
      icon: <MessageCircle size={48} className="text-emerald-500" />,
      color: "bg-emerald-50"
    },
    {
      title: "Patterns for Wellness",
      description: "We correlate your physical steps, sleep, and focus sessions with your emotional health. Watch how your habits change the way you feel.",
      icon: <LayoutDashboard size={48} className="text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "Knowledge is Support",
      description: "The more Meghan knows about your major, hobbies, and values, the better she can personalize her care. Let's build a connection that actually matters.",
      icon: <BrainCircuit size={48} className="text-indigo-500" />,
      color: "bg-indigo-50"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 transition-colors duration-700">
      <div className="max-w-md w-full glass rounded-[40px] shadow-2xl p-10 flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 duration-500">
        
        {/* Slide Progress */}
        <div className="flex gap-2 w-full justify-center mb-4">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-200'}`} 
            />
          ))}
        </div>

        {/* Icon Container */}
        <div className={`p-8 rounded-full ${slides[currentSlide].color} transition-all duration-700 animate-in fade-in scale-90`}>
          {slides[currentSlide].icon}
        </div>

        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold text-slate-800">{slides[currentSlide].title}</h2>
          <p className="text-slate-500 leading-relaxed font-light">
            {slides[currentSlide].description}
          </p>
        </div>

        <div className="pt-6 w-full space-y-4">
          <button 
            onClick={handleNext}
            className="w-full py-4 bg-emerald-500 text-white rounded-full font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
          >
            {currentSlide === slides.length - 1 ? (
              <>
                <Sparkles size={18} /> Let's Begin (+25 XP)
              </>
            ) : (
              <>
                Next <ChevronRight size={18} />
              </>
            )}
          </button>
          
          <button 
            onClick={onComplete}
            className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            Skip Intro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
