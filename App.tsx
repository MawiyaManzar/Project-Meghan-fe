
import React, { useState, useEffect } from 'react';
import { Mood, StressSource, RiskTier, UserState, UserBio } from './types';
import { CRISIS_KEYWORDS } from './constants';
import DynamicOrb from './components/DynamicOrb';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import Pomodoro from './components/Pomodoro';
import PeerClusters from './components/PeerClusters';
import KnowledgeCenter from './components/KnowledgeCenter';
import Leaderboard from './components/Leaderboard';
import Tutorial from './components/Tutorial';
import { 
  Heart, 
  Activity, 
  MessageCircle, 
  Users, 
  BookOpen, 
  PenTool, 
  ChevronRight, 
  LayoutDashboard, 
  BrainCircuit, 
  Trophy, 
  Star 
} from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<'onboarding' | 'triage' | 'tutorial' | 'main'>('onboarding');
  const [userState, setUserState] = useState<UserState>({
    mood: Mood.CALM,
    source: StressSource.OTHERS,
    tier: RiskTier.GREEN,
    steps: 4210,
    sleepHours: 6,
    pomoSessions: 0,
    xp: 0,
    level: 1,
    bio: {
      name: '',
      major: '',
      hobbies: '',
      values: ''
    }
  });
  const [activeTab, setActiveTab] = useState<'chat' | 'dashboard' | 'social' | 'tools' | 'knowledge' | 'leaderboard'>('chat');

  // XP & Level Logic
  const addXP = (amount: number) => {
    setUserState(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 200) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const updateBio = (field: keyof UserBio, value: string) => {
    const isNewValue = !userState.bio[field] && value.trim() !== '';
    setUserState(prev => ({
      ...prev,
      bio: { ...prev.bio, [field]: value }
    }));
    if (isNewValue) addXP(20); // Bonus for sharing more info
  };

  const handleOrbContinue = () => {
    setStep('triage');
  };

  const handleTriageContinue = (source: StressSource, text?: string) => {
    let tier = RiskTier.GREEN;
    
    if (userState.mood === Mood.ANXIOUS) tier = RiskTier.YELLOW;
    if (userState.mood === Mood.SAD) tier = RiskTier.YELLOW;

    if (text) {
      const containsCrisis = CRISIS_KEYWORDS.some(kw => text.toLowerCase().includes(kw));
      if (containsCrisis) tier = RiskTier.RED;
    }

    setUserState(prev => ({ ...prev, source, otherText: text, tier }));
    setStep('tutorial');
    addXP(15);
  };

  const handleTutorialComplete = () => {
    setStep('main');
    addXP(25); // Tutorial completion bonus
  };

  if (step === 'onboarding') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-800">
        <div className="max-w-md w-full text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-light tracking-tight">Meet <span className="font-bold text-teal-600">Meghan</span></h1>
            <p className="text-slate-500 font-light text-lg">Your grounding space. How are you carrying yourself right now?</p>
          </div>
          
          <DynamicOrb mood={userState.mood} setMood={(m) => setUserState({ ...userState, mood: m })} />

          <button 
            onClick={handleOrbContinue}
            className="group flex items-center gap-2 mx-auto px-10 py-5 bg-white text-slate-700 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-bold"
          >
            I'm ready to talk <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (step === 'triage') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="max-w-lg w-full space-y-8 glass p-10 rounded-[48px] shadow-2xl">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">What's weighing on you?</h2>
            <p className="text-slate-500 text-sm font-medium">Knowing where the pressure comes from helps me find the right words.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[StressSource.ACADEMICS, StressSource.RELATIONSHIP, StressSource.FAMILY, StressSource.OTHERS].map((s) => (
              <button
                key={s}
                onClick={() => {
                  if (s !== StressSource.OTHERS) handleTriageContinue(s);
                  else setUserState({...userState, source: StressSource.OTHERS});
                }}
                className={`p-6 rounded-[32px] border text-left transition-all duration-300 ${userState.source === s ? 'bg-teal-500 text-white border-teal-600 shadow-xl shadow-teal-100 scale-[1.02]' : 'bg-white text-slate-600 border-slate-100 hover:border-teal-200'}`}
              >
                <div className="font-bold text-sm tracking-wide">{s}</div>
              </button>
            ))}
          </div>

          {userState.source === StressSource.OTHERS && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <textarea 
                className="w-full p-5 rounded-[32px] border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-[120px] text-sm leading-relaxed"
                placeholder="Briefly share what's happening..."
                onChange={(e) => setUserState({...userState, otherText: e.target.value})}
              />
              <button 
                onClick={() => handleTriageContinue(StressSource.OTHERS, userState.otherText)}
                className="w-full py-5 bg-teal-500 text-white rounded-full font-bold shadow-xl shadow-teal-200 hover:bg-teal-600 transition-all active:scale-95"
              >
                Find Clarity
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'tutorial') {
    return <Tutorial onComplete={handleTutorialComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-24 lg:pb-0 lg:pl-64">
      {/* Sidebar - Desktop */}
      <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 glass border-r flex-col p-6 z-50">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-teal-100">M</div>
          <span className="text-xl font-bold text-slate-800">Meghan</span>
        </div>
        
        {/* User XP Badge */}
        <div className="mb-8 p-4 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-3xl text-white shadow-xl shadow-teal-100 flex flex-col items-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
            <Star size={24} className="fill-white" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Spirit Level</span>
          <span className="text-2xl font-bold">{userState.level}</span>
          <div className="w-full h-1.5 bg-white/20 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500" 
              style={{ width: `${(userState.xp % 200) / 200 * 100}%` }} 
            />
          </div>
          <span className="text-[9px] mt-2 opacity-60">{(userState.xp % 200)} / 200 XP to Level {userState.level + 1}</span>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          <NavBtn active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<MessageCircle size={18}/>} label="Empathy Chat" />
          <NavBtn active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={18}/>} label="Insights" />
          <NavBtn active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} icon={<BrainCircuit size={18}/>} label="Meghan's Knowledge" />
          <NavBtn active={activeTab === 'leaderboard'} onClick={() => setActiveTab('leaderboard')} icon={<Trophy size={18}/>} label="Community Pulse" />
          <NavBtn active={activeTab === 'social'} onClick={() => setActiveTab('social')} icon={<Users size={18}/>} label="Peer Clusters" />
          <NavBtn active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} icon={<BookOpen size={18}/>} label="Wellness Tools" />
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Session Tier</p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${userState.tier === RiskTier.RED ? 'bg-red-500' : 'bg-teal-400'}`} />
            <p className="text-xs text-slate-700 font-bold">{userState.tier} Alert</p>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="p-6 max-w-5xl mx-auto min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {userState.bio.name ? `Hello, ${userState.bio.name}.` : "Welcome home."}
            </h1>
            <p className="text-slate-500 text-sm font-medium">Every breath is a step forward.</p>
          </div>
          <div className="flex items-center gap-5">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Current Mood</p>
                <p className="text-sm font-bold text-slate-700 capitalize">{userState.mood}</p>
             </div>
             <DynamicOrb 
              mood={userState.mood} 
              setMood={(m) => setUserState({...userState, mood: m})} 
              size="sm" 
              text={userState.otherText}
            />
          </div>
        </header>

        {activeTab === 'chat' && (
          <Chat 
            tier={userState.tier} 
            mood={userState.mood} 
            source={userState.source} 
            bio={userState.bio} 
            onXPGain={addXP}
          />
        )}
        {activeTab === 'dashboard' && <Dashboard data={userState} />}
        {activeTab === 'knowledge' && <KnowledgeCenter bio={userState.bio} onUpdate={updateBio} />}
        {activeTab === 'leaderboard' && <Leaderboard user={userState} />}
        {activeTab === 'social' && <PeerClusters />}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><Activity size={18} className="text-teal-500" /> Focus Tool</h3>
              <Pomodoro onComplete={() => {
                setUserState(prev => ({...prev, pomoSessions: prev.pomoSessions + 1}));
                addXP(50);
              }} />
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><PenTool size={18} className="text-indigo-500" /> Sentiment Journal</h3>
              <div className="glass p-8 rounded-[40px] h-full flex flex-col gap-4 shadow-xl border border-slate-50">
                <p className="text-sm italic text-slate-500 border-l-4 border-teal-400 pl-4 font-medium leading-relaxed">
                  Meghan: "{userState.tier === RiskTier.RED ? 'What felt heaviest today?' : 'What is one thing that went right, however small?'}"
                </p>
                <textarea 
                  className="flex-1 bg-white/50 p-5 rounded-3xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm min-h-[150px] transition-all leading-relaxed"
                  placeholder="Pour your thoughts here..."
                />
                <button 
                  onClick={() => addXP(30)}
                  className="py-4 bg-slate-800 text-white rounded-3xl text-sm font-bold shadow-xl active:scale-95 transition-all hover:bg-slate-900"
                >
                  Save & Gain XP
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-20 glass rounded-full shadow-2xl flex items-center justify-around px-4 z-50 border border-white/50">
        <MobileNavBtn active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<MessageCircle size={22}/>} />
        <MobileNavBtn active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={22}/>} />
        <MobileNavBtn active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} icon={<BrainCircuit size={22}/>} />
        <MobileNavBtn active={activeTab === 'leaderboard'} onClick={() => setActiveTab('leaderboard')} icon={<Trophy size={22}/>} />
        <MobileNavBtn active={activeTab === 'social'} onClick={() => setActiveTab('social')} icon={<Users size={22}/>} />
        <MobileNavBtn active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} icon={<BookOpen size={22}/>} />
      </nav>
    </div>
  );
};

const NavBtn: React.FC<{active: boolean, onClick: () => void, icon: any, label: string}> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${active ? 'bg-teal-500 text-white shadow-xl shadow-teal-100 scale-[1.02]' : 'text-slate-500 hover:bg-slate-100'}`}
  >
    {icon}
    <span className="font-bold text-sm">{label}</span>
  </button>
);

const MobileNavBtn: React.FC<{active: boolean, onClick: () => void, icon: any}> = ({ active, onClick, icon }) => (
  <button 
    onClick={onClick}
    className={`p-3.5 rounded-full transition-all duration-300 ${active ? 'bg-teal-500 text-white shadow-xl shadow-teal-200' : 'text-slate-400 hover:bg-slate-50'}`}
  >
    {icon}
  </button>
);

export default App;
