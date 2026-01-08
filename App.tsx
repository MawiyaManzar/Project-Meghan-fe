
import React, { useState, useEffect } from 'react';
import { Mood, StressSource, RiskTier, UserState, UserBio, SmallPromise } from './types';
import { CRISIS_KEYWORDS } from './constants';
import { getMeghanResponse } from './services/gemini';
import DynamicOrb from './components/DynamicOrb';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import Pomodoro from './components/Pomodoro';
import SmallPromises from './components/SmallPromises';
import SoundTherapy from './components/SoundTherapy';
import DailyReminder from './components/DailyReminder';
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
  Star,
  User,
  Laugh,
  X,
  Sparkles,
  MessageSquareQuote
} from 'lucide-react';

const DEFAULT_PROMISES: SmallPromise[] = [
  { id: '1', text: "Drink a glass of water", completed: false },
  { id: '2', text: "Walk for 5 minutes", completed: false },
  { id: '3', text: "Enjoy a cup of coffee", completed: false },
];

const App: React.FC = () => {
  const [step, setStep] = useState<'onboarding' | 'triage' | 'feeling' | 'naming' | 'tutorial' | 'main'>('onboarding');
  const [userState, setUserState] = useState<UserState>({
    mood: Mood.CALM,
    source: StressSource.OTHERS,
    tier: RiskTier.GREEN,
    steps: 4210,
    sleepHours: 6,
    pomoSessions: 0,
    soundSessions: 0,
    reminderSaved: false,
    xp: 0,
    level: 1,
    empathyPoints: 0,
    bio: {
      name: '',
      major: '',
      hobbies: '',
      values: '',
      dailyReminder: '',
      futureVision: ''
    },
    promises: DEFAULT_PROMISES
  });
  const [activeTab, setActiveTab] = useState<'chat' | 'dashboard' | 'social' | 'tools' | 'knowledge' | 'leaderboard'>('chat');
  const [joke, setJoke] = useState<string | null>(null);
  const [isJokeLoading, setIsJokeLoading] = useState(false);
  const [detailedFeelingText, setDetailedFeelingText] = useState('');

  const addXP = (amount: number) => {
    setUserState(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 200) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const addEmpathyPoints = (amount: number) => {
    setUserState(prev => ({
      ...prev,
      empathyPoints: prev.empathyPoints + amount,
      xp: prev.xp + (amount * 2) // Bonus XP for empathy
    }));
  };

  const updateBio = (field: keyof UserBio, value: string) => {
    const isNewValue = !userState.bio[field] && value.trim() !== '';
    setUserState(prev => ({
      ...prev,
      bio: { ...prev.bio, [field]: value },
      reminderSaved: field === 'dailyReminder' ? true : prev.reminderSaved
    }));
    if (isNewValue) addXP(20);
  };

  const togglePromise = (id: string) => {
    setUserState(prev => {
      const newPromises = prev.promises.map(p => 
        p.id === id ? { ...p, completed: !p.completed } : p
      );
      const newlyCompleted = newPromises.find(p => p.id === id)?.completed;
      if (newlyCompleted) setTimeout(() => addXP(10), 100);
      return { ...prev, promises: newPromises };
    });
  };

  const handleOrbContinue = () => setStep('triage');

  const handleTriageContinue = (source: StressSource, text?: string) => {
    let tier = RiskTier.GREEN;
    if (userState.mood === Mood.ANXIOUS || userState.mood === Mood.SAD) tier = RiskTier.YELLOW;
    if (text && CRISIS_KEYWORDS.some(kw => text.toLowerCase().includes(kw))) tier = RiskTier.RED;
    
    setUserState(prev => ({ ...prev, source, otherText: text, tier }));
    
    if (source === StressSource.OTHERS) {
      setStep('naming');
    } else {
      setStep('feeling');
    }
  };

  const handleFeelingContinue = () => {
    if (detailedFeelingText.trim()) {
      setUserState(prev => ({ ...prev, otherText: detailedFeelingText }));
      addXP(10);
    }
    setStep('naming');
  };

  const handleNamingComplete = () => {
    if (!userState.bio.name.trim()) return;
    setStep('tutorial');
    addXP(15);
  };

  const handleTutorialComplete = () => {
    setStep('main');
    addXP(25);
  };

  const handleMakeMeLaugh = async () => {
    if (isJokeLoading) return;
    setIsJokeLoading(true);
    try {
      const response = await getMeghanResponse(
        [{ role: 'user', content: 'Tell me a joke that will make me laugh, keep it wholesome and sibling-like.' }],
        userState.tier, 
        userState.mood, 
        userState.source, 
        userState.bio
      );
      setJoke(response);
      addXP(5);
    } catch (err) {
      console.error(err);
      setJoke("Why did the pillow go to the doctor? It was feeling a bit down.");
    } finally {
      setIsJokeLoading(false);
    }
  };

  const getStressorQuestion = () => {
    switch (userState.source) {
      case StressSource.ACADEMICS:
        return "I know university life can be a marathon. What specifically about your studies is draining your energy right now?";
      case StressSource.RELATIONSHIP:
        return "Navigating connections with others isn't always easy. Is there something specific in your interactions that's weighing on your heart?";
      case StressSource.FAMILY:
        return "Our roots go deep, and sometimes that brings complexity. What's happening in your family space that you'd like to vent about?";
      default:
        return "Tell me more about what you're experiencing...";
    }
  };

  if (step === 'onboarding') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-800">
        <div className="max-w-md w-full text-center space-y-8 md:space-y-12">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight">Meet <span className="font-bold text-teal-600">Meghan</span></h1>
            <p className="text-slate-500 font-light text-base md:text-lg">Your grounding space. How are you carrying yourself right now?</p>
          </div>
          <DynamicOrb mood={userState.mood} setMood={(m) => setUserState({ ...userState, mood: m })} />
          <button onClick={handleOrbContinue} className="group flex items-center gap-2 mx-auto px-8 md:px-10 py-4 md:py-5 bg-white text-slate-700 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-bold text-sm md:text-base">
            I'm ready to talk <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (step === 'triage') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-slate-50">
        <div className="max-w-lg w-full space-y-6 md:space-y-8 glass p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-2xl">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">What's weighing on you?</h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium">Knowing where the pressure comes from helps me find the right words.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[StressSource.ACADEMICS, StressSource.RELATIONSHIP, StressSource.FAMILY, StressSource.OTHERS].map((s) => (
              <button key={s} onClick={() => s !== StressSource.OTHERS ? handleTriageContinue(s) : setUserState({...userState, source: StressSource.OTHERS})} className={`p-4 md:p-6 rounded-[24px] md:rounded-[32px] border text-left transition-all duration-300 ${userState.source === s ? 'bg-teal-500 text-white border-teal-600 shadow-xl shadow-teal-100 scale-[1.02]' : 'bg-white text-slate-600 border-slate-100 hover:border-teal-200'}`}>
                <div className="font-bold text-xs md:text-sm tracking-wide">{s}</div>
              </button>
            ))}
          </div>
          {userState.source === StressSource.OTHERS && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <textarea className="w-full p-4 md:p-5 rounded-[24px] md:rounded-[32px] border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-[100px] md:min-h-[120px] text-sm leading-relaxed text-slate-900" placeholder="Briefly share what's happening..." onChange={(e) => setUserState({...userState, otherText: e.target.value})} />
              <button onClick={() => handleTriageContinue(StressSource.OTHERS, userState.otherText)} className="w-full py-4 md:py-5 bg-teal-500 text-white rounded-full font-bold shadow-xl shadow-teal-200 hover:bg-teal-600 transition-all active:scale-95">Find Clarity</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'feeling') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-slate-50">
        <div className="max-w-lg w-full space-y-6 md:space-y-8 glass p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-100 text-teal-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4">
              <MessageSquareQuote size={24} md:size={32} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">Unpacking the weight</h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium">{getStressorQuestion()}</p>
          </div>
          <div className="space-y-4">
            <textarea 
              className="w-full p-4 md:p-5 rounded-[24px] md:rounded-[32px] border border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-[120px] md:min-h-[160px] text-sm leading-relaxed bg-slate-900 text-white placeholder:text-slate-400 shadow-inner" 
              placeholder="It's okay to let it out here. This stays between us. (Optional)" 
              value={detailedFeelingText}
              onChange={(e) => setDetailedFeelingText(e.target.value)} 
            />
            <div className="flex gap-3">
              <button 
                onClick={handleFeelingContinue}
                className="w-full py-4 md:py-5 bg-teal-500 text-white rounded-full font-bold shadow-xl shadow-teal-200 hover:bg-teal-600 transition-all active:scale-95"
              >
                {detailedFeelingText.trim() ? "I'm ready" : "Skip this part"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'naming') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-slate-50">
        <div className="max-w-md w-full space-y-6 md:space-y-8 glass p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-100 text-teal-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4">
              <User size={24} md:size={32} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">Almost there...</h2>
            <p className="text-slate-500 text-xs md:text-sm">Before we begin, what can I call you?</p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
              <input 
                type="text" 
                value={userState.bio.name}
                onChange={(e) => updateBio('name', e.target.value)}
                placeholder="How should I address you?"
                className="w-full p-4 md:p-5 rounded-[16px] md:rounded-[24px] border border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm bg-slate-900 text-white placeholder:text-slate-400 shadow-inner"
              />
            </div>
            <button 
              onClick={handleNamingComplete}
              disabled={!userState.bio.name.trim()}
              className="w-full py-4 md:py-5 bg-teal-500 text-white rounded-full font-bold shadow-xl shadow-teal-200 hover:bg-teal-600 disabled:opacity-50 transition-all"
            >
              Start Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'tutorial') {
    return <Tutorial onComplete={handleTutorialComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-32 lg:pb-0 lg:pl-64">
      {/* Joke Notification */}
      {joke && (
        <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-lg animate-in slide-in-from-top duration-500">
          <div className="glass p-5 md:p-6 rounded-[24px] md:rounded-[32px] border-emerald-100 bg-white shadow-2xl flex flex-col gap-3 relative">
            <button onClick={() => setJoke(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 text-emerald-500 mb-1">
              <Laugh size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Meghan's Sense of Humor</span>
            </div>
            <p className="text-slate-700 font-medium leading-relaxed text-sm md:text-base">{joke}</p>
            <button 
              onClick={() => setJoke(null)}
              className="mt-1 py-1.5 px-5 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold hover:bg-emerald-100 transition-colors self-end"
            >
              Haha, thanks!
            </button>
          </div>
        </div>
      )}

      <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 glass border-r flex-col p-6 z-50">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-teal-100">M</div>
          <span className="text-xl font-bold text-slate-800">Meghan</span>
        </div>
        <div className="mb-8 p-4 bg-gradient-to-br from-indigo-500 to-teal-600 rounded-3xl text-white shadow-xl shadow-indigo-100 flex flex-col items-center text-center">
          <Sparkles size={24} className="mb-2 fill-white" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 leading-tight">Your Future Successful Self</span>
          <div className="text-lg font-black mt-1">Growth Phase {userState.level}</div>
          <div className="w-full h-1.5 bg-white/20 rounded-full mt-3 overflow-hidden">
            <div className="bg-white h-full rounded-full transition-all duration-500" style={{ width: `${(userState.xp % 200) / 200 * 100}%` }} />
          </div>
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          <NavBtn active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<MessageCircle size={18}/>} label="Empathy Chat" />
          <NavBtn active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={18}/>} label="Insights" />
          <NavBtn active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} icon={<BrainCircuit size={18}/>} label="Personalize" />
          <NavBtn active={activeTab === 'leaderboard'} onClick={() => setActiveTab('leaderboard')} icon={<Trophy size={18}/>} label="Community" />
          <NavBtn active={activeTab === 'social'} onClick={() => setActiveTab('social')} icon={<Users size={18}/>} label="Peer Clusters" />
          <NavBtn active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} icon={<BookOpen size={18}/>} label="Wellness Tools" />
        </div>
      </nav>

      <main className="p-4 md:p-6 max-w-5xl mx-auto min-h-screen">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">Meghan</h1>
            <p className="text-slate-500 text-xs md:text-sm font-medium">Your digital older sibling.</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
             <button 
               onClick={handleMakeMeLaugh}
               disabled={isJokeLoading}
               className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full font-bold text-[10px] md:text-xs transition-all shadow-sm active:scale-95 ${
                 isJokeLoading 
                 ? 'bg-amber-50 text-amber-400 cursor-wait' 
                 : 'bg-amber-100 text-amber-600 hover:bg-amber-200 hover:shadow-md'
               }`}
             >
               <Laugh size={14} className={isJokeLoading ? 'animate-bounce' : ''} />
               {isJokeLoading ? 'Thinking...' : 'Make me laugh!'}
             </button>

             <button 
               onClick={() => setActiveTab('knowledge')}
               className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-1.5 md:py-2.5 bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md transition-all group"
             >
               <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Profile</p>
                  <p className="text-xs md:text-sm font-bold text-slate-700">{userState.bio.name || 'Friend'}</p>
               </div>
               <div className="w-8 h-8 md:w-10 md:h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-teal-100 group-hover:scale-105 transition-transform text-sm md:text-base">
                 {userState.bio.name ? userState.bio.name.charAt(0).toUpperCase() : <User size={16} />}
               </div>
             </button>
          </div>
        </header>

        <div className="pb-12 lg:pb-0">
          {activeTab === 'chat' && <Chat tier={userState.tier} mood={userState.mood} source={userState.source} bio={userState.bio} onXPGain={addXP} />}
          {activeTab === 'dashboard' && <Dashboard data={userState} />}
          {activeTab === 'knowledge' && <KnowledgeCenter bio={userState.bio} onUpdate={updateBio} />}
          {activeTab === 'leaderboard' && <Leaderboard user={userState} />}
          {activeTab === 'social' && <PeerClusters source={userState.source} empathyPoints={userState.empathyPoints} onEmpathyGain={addEmpathyPoints} />}
          {activeTab === 'tools' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-4 md:space-y-8">
                <SmallPromises promises={userState.promises} onToggle={togglePromise} />
                <Pomodoro onComplete={() => {
                  setUserState(prev => ({...prev, pomoSessions: prev.pomoSessions + 1}));
                  addXP(50);
                }} />
              </div>
              <div className="space-y-4 md:space-y-8">
                <SoundTherapy onSoundStart={() => {
                  setUserState(prev => ({...prev, soundSessions: prev.soundSessions + 1}));
                  addXP(5);
                }} />
                <DailyReminder initialText={userState.bio.dailyReminder || ""} onSaveText={(txt) => updateBio('dailyReminder', txt)} />
              </div>
            </div>
          )}
        </div>
      </main>

      <nav className="lg:hidden fixed bottom-6 left-4 right-4 h-20 glass rounded-full shadow-2xl flex items-center justify-around px-2 z-[90] border border-white/50">
        <MobileNavBtn active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<MessageCircle size={20}/>} label="Chat" />
        <MobileNavBtn active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={20}/>} label="Stats" />
        <MobileNavBtn active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} icon={<BrainCircuit size={20}/>} label="Self" />
        <MobileNavBtn active={activeTab === 'social'} onClick={() => setActiveTab('social')} icon={<Users size={20}/>} label="Peer" />
        <MobileNavBtn active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} icon={<BookOpen size={20}/>} label="Tools" />
      </nav>
    </div>
  );
};

const NavBtn: React.FC<{active: boolean, onClick: () => void, icon: any, label: string}> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${active ? 'bg-teal-500 text-white shadow-xl shadow-teal-100 scale-[1.02]' : 'text-slate-500 hover:bg-slate-100'}`}>
    {icon} <span className="font-bold text-sm">{label}</span>
  </button>
);

const MobileNavBtn: React.FC<{active: boolean, onClick: () => void, icon: any, label: string}> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 min-w-[50px] ${active ? 'text-teal-600 bg-teal-50/50' : 'text-slate-400 hover:text-slate-600'}`}>
    {icon}
    <span className="text-[9px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

export default App;
