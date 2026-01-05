
import React, { useState } from 'react';
import { Users, Info, ExternalLink, Heart, Send, Sparkles } from 'lucide-react';
import { PEER_CLUSTERS } from '../constants';

interface PeerClustersProps {
  empathyPoints: number;
  onEmpathyGain: (amount: number) => void;
}

const PeerClusters: React.FC<PeerClustersProps> = ({ empathyPoints, onEmpathyGain }) => {
  const [supportText, setSupportText] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSupportSubmit = () => {
    if (!supportText.trim()) return;
    
    setSuccessMessage('Empathy Shared!');
    onEmpathyGain(10);
    setSupportText('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleQuickSupport = (e: React.MouseEvent, clusterName: string) => {
    e.stopPropagation(); // Don't trigger the cluster selection
    setSuccessMessage(`Support sent to ${clusterName}!`);
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
          <Users className="text-emerald-500" size={24} /> Anonymous Clusters
        </h2>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Safe Space Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PEER_CLUSTERS.map((cluster) => (
          <div 
            key={cluster.id} 
            onClick={() => setSelectedCluster(cluster.name)}
            className={`glass p-5 rounded-3xl transition-all cursor-pointer group relative border ${
              selectedCluster === cluster.name ? 'border-emerald-500 ring-2 ring-emerald-100 bg-white' : 'hover:border-emerald-200'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{cluster.name}</h3>
              <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                <Users size={14} />
                {cluster.members}
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-4 font-medium h-10 overflow-hidden line-clamp-2">{cluster.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <button className="text-[10px] font-black text-slate-400 group-hover:text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                Enter Space <ExternalLink size={12} />
              </button>
              
              <button 
                onClick={(e) => handleQuickSupport(e, cluster.name)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all text-[10px] font-bold border border-rose-100 shadow-sm active:scale-90"
                title="Send a quick wave of support"
              >
                <Heart size={12} fill="currentColor" />
                Support
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Share Wisdom Section */}
      <div className="glass p-8 rounded-[40px] border border-indigo-100 bg-white shadow-xl shadow-indigo-50/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Offer a Hand</h3>
            <p className="text-sm text-slate-500">Share words of grounding with your {selectedCluster || 'peers'}.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <textarea 
              value={supportText}
              onChange={(e) => setSupportText(e.target.value)}
              placeholder={selectedCluster ? `Write something supportive for the ${selectedCluster}...` : "Select a cluster above and share some grounding advice..."}
              disabled={!selectedCluster}
              className="w-full p-5 rounded-[32px] border border-slate-100 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 min-h-[120px] text-sm leading-relaxed transition-all"
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
            disabled={!supportText.trim() || !selectedCluster}
            className="w-full py-4 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-30 disabled:shadow-none transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
            Share Wisdom
          </button>
        </div>
      </div>

      {/* Expert Quote Placeholder */}
      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-start gap-4 relative z-10">
          <div className="p-3 bg-white text-emerald-600 rounded-2xl shadow-sm">
            <Info size={24} />
          </div>
          <div>
            <h3 className="font-bold text-emerald-900 mb-1">Community Insight</h3>
            <p className="text-sm text-emerald-700 leading-relaxed mb-4 italic">
              "We often feel alone in our stress, but in this space, you're part of a forest. Even when one tree struggles, the roots beneath share the burden."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-emerald-200 overflow-hidden flex items-center justify-center font-bold text-[10px] text-emerald-600">
                AT
              </div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Global Support Feed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerClusters;
