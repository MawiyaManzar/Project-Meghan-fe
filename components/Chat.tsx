
import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, LifeBuoy, Sparkles } from 'lucide-react';
import { ChatMessage, RiskTier, Mood, StressSource, UserBio } from '../types';
import { getMeghanResponse } from '../services/gemini';

interface ChatProps {
  tier: RiskTier;
  mood: Mood;
  source: StressSource;
  bio: UserBio;
  onXPGain: (amount: number) => void;
}

const Chat: React.FC<ChatProps> = ({ tier, mood, source, bio, onXPGain }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    const greet = async () => {
      setIsLoading(true);
      const initial = await getMeghanResponse(
        [{ role: 'user', content: 'Hello Meghan. I need someone to talk to.' }],
        tier, mood, source, bio
      );
      setMessages([{ role: 'model', content: initial }]);
      setIsLoading(false);
    };
    greet();
  }, [tier, mood, source, bio]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    setIsLoading(true);
    
    // Gain XP for sharing thoughts
    onXPGain(5);

    try {
      const reply = await getMeghanResponse(newMsgs, tier, mood, source, bio);
      setMessages([...newMsgs, { role: 'model', content: reply }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMsgs, { role: 'model', content: "I'm sorry, I'm having a little trouble connecting. But I'm still right here with you." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const openCrisisResources = () => {
    window.open('https://www.crisistextline.org/', '_blank');
  };

  return (
    <div className="flex flex-col h-[60vh] md:h-[550px] w-full max-w-2xl mx-auto glass rounded-[32px] overflow-hidden shadow-2xl relative">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${tier === RiskTier.RED ? 'bg-red-500' : tier === RiskTier.YELLOW ? 'bg-indigo-400' : 'bg-teal-400'} animate-pulse`} />
          <h2 className="font-semibold text-slate-700 text-sm md:text-base">Meghan</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={openCrisisResources}
            className={`flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all shadow-sm ${
              tier === RiskTier.RED 
              ? 'bg-red-600 text-white border-red-700 hover:bg-red-700 scale-105' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tier === RiskTier.RED ? <AlertCircle size={14} /> : <LifeBuoy size={14} />}
            <span className="hidden xs:inline">{tier === RiskTier.RED ? 'GET URGENT HELP' : 'Resources'}</span>
            <span className="xs:hidden">{tier === RiskTier.RED ? 'SOS' : 'Help'}</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] md:max-w-[85%] px-4 py-3 rounded-[20px] ${
              m.role === 'user' 
                ? 'bg-teal-500 text-white rounded-br-none shadow-md' 
                : 'bg-white border text-slate-700 rounded-bl-none shadow-sm'
            }`}>
              <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border px-4 py-3 rounded-[20px] rounded-bl-none shadow-sm animate-pulse">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex gap-2 sticky bottom-0">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Share your thoughts..."
          className="flex-1 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-xs md:text-sm text-slate-900 placeholder:text-slate-400"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="p-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 disabled:opacity-30 transition-all shadow-md active:scale-90 shrink-0"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
