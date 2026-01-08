
import React, { useState } from 'react';
import { Users, Info, ExternalLink, Heart, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { PEER_CLUSTERS } from '../constants';
import { StressSource } from '../types';

interface PeerClustersProps {
  source: StressSource;
  empathyPoints: number;
  onEmpathyGain: (amount: number) => void;
}

const PeerClusters: React.FC<PeerClustersProps> = ({ source, empathyPoints, onEmpathyGain }) => {
  const [supportText, setSupportText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Filter to only show the user's specific cluster based on their current stressor
  const myCluster = PEER_CLUSTERS.find(c => c.source === source) || PEER_CLUSTERS[3];

  const handleSupportSubmit = () => {
    if (!supportText.trim()) return;
    
    setSuccessMessage('Empathy Shared!');
    onEmpathyGain(10);
    setSupportText('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleQuickSupport = () => {
    setSuccessMessage(`Support sent to ${myCluster.name}!`);
    onEmpathyGain(5);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Community Empathy Stats */}
      <div className="glass p-6 rounded-[40px] border border-emerald-100 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-100 text-emerald-500">
            <Heart size={32} fill="currentColor" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Your Empathy Legacy</h3>
            <p className="text-sm text-slate-500 font-medium">Helping others ground themselves.</p>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-emerald-600 tracking-tighter">{empathyPoints}</span>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Points</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="text-emerald-500" size={24} /> Your Dedicated Safe Space
        </h2>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Private Access Active
        </span>
      </div>

      {/* The Single User-Specific Cluster */}
      <div className="glass p-8 rounded-[48px] border-2 border-emerald-50 bg-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <Users size={120} />
        </div>
        
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Guardian Cluster</span>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{myCluster.name}</h3>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-2xl font-bold text-xs">
                <Users size={16} />
                {myCluster.members} Active Spirits
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-500 leading-relaxed font-light max-w-2xl">
            {myCluster.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <button 
              onClick={handleQuickSupport}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-all font-bold shadow-lg shadow-rose-100 active:scale-95"
            >
              <Heart size={20} fill="currentColor" />
              Send Strength
            </button>
            <div className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-50 text-slate-500 font-bold text-sm">
               <Sparkles size={16} className="text-emerald-500" />
               Only you can see this space
            </div>
          </div>
        </div>
      </div>

      {/* Share Wisdom Section */}
      <div className="glass p-8 rounded-[40px] border border-indigo-100 bg-white shadow-xl shadow-indigo-50/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Grounding Message</h3>
            <p className="text-sm text-slate-500">Contribute words of support to the {myCluster.name} community.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <textarea 
              value={supportText}
              onChange={(e) => setSupportText(e.target.value)}
              placeholder={`Write something grounding for the ${myCluster.members} others in this space...`}
              className="w-full p-6 rounded-[32px] border border-slate-100 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 min-h-[140px] text-sm leading-relaxed transition-all text-slate-900"
            />
            {showSuccess && (
              <div className="absolute inset-0 bg-emerald-500/95 rounded-[32px] flex flex-col items-center justify-center text-white animate-in fade-in zoom-in duration-300 z-10 text-center px-4">
                <Heart size={48} fill="currentColor" className="mb-2 animate-bounce" />
                <p className="font-bold text-lg">{successMessage}</p>
                <p className="text-xs opacity-80">Your kindness creates ripples.</p>
              </div>
            )}
          </div>
          <button 
            onClick={handleSupportSubmit}
            disabled={!supportText.trim()}
            className="w-full py-4 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-30 disabled:shadow-none transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
            Anonymously Share Wisdom
          </button>
        </div>
      </div>

      {/* Educational Footer */}
      <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[40px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-start gap-5 relative z-10">
          <div className="p-4 bg-white text-emerald-600 rounded-3xl shadow-sm">
            <Info size={28} />
          </div>
          <div>
            <h3 className="font-bold text-emerald-900 text-lg mb-2">Why am I only seeing this cluster?</h3>
            <p className="text-sm text-emerald-700 leading-relaxed mb-4 italic">
              "Healing happens best in communities that understand your specific journey. By focusing on the {myCluster.name}, Meghan ensures you are surrounded by roots that share the same soil."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-emerald-200 overflow-hidden flex items-center justify-center font-bold text-[10px] text-emerald-600">
                M
              </div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Meghan’s Philosophy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerClusters;
