
import React from 'react';
import { Users, Info, ExternalLink } from 'lucide-react';
import { PEER_CLUSTERS } from '../constants';

const PeerClusters: React.FC = () => {
  return (
    <div className="space-y-6">
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
          <div key={cluster.id} className="glass p-5 rounded-2xl hover:border-emerald-200 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">{cluster.name}</h3>
              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <Users size={14} />
                {cluster.members}
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-4">{cluster.description}</p>
            <button className="text-xs font-bold text-slate-400 group-hover:text-emerald-500 uppercase tracking-widest flex items-center gap-1">
              Join Cluster <ExternalLink size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Expert Placeholder */}
      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
            <Info size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-indigo-900 mb-1">Vetted Solution: Academic Stress</h3>
            <p className="text-sm text-indigo-700 leading-relaxed mb-4">
              "When deadlines feel like an avalanche, focus on the 'Next Smallest Step'. Not the whole paper, just the next sentence. Your brain needs to see completion to reduce cortisol."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-200 border-2 border-white overflow-hidden">
                <img src="https://picsum.photos/seed/psych/100/100" alt="Psychologist" />
              </div>
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Dr. Aris Thorne, PhD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerClusters;
