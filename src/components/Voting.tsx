import { BarChart3, Check, X, ChevronRight, Users, Trophy } from 'lucide-react';
import { useState } from 'react';

export default function Voting() {
  const [selectedBallotId, setSelectedBallotId] = useState<string | null>(null);
  
  const [hasVoted, setHasVoted] = useState(false);
  const [stats, setStats] = useState({
    yes: { count: 7, percent: 70 },
    no: { count: 2, percent: 20 },
    abstain: { count: 1, percent: 10 }
  });

  const ballots = [
    {
      id: 'ballot-1',
      title: 'Board Chair Election 2026',
      description: 'Annual election for the position of Board Chair.',
      status: 'closed',
      totalMembers: 12,
      results: [
        { name: 'CANDIDATE 1', role: 'Chair', votes: 8, isWinner: true },
        { name: 'CANDIDATE 2', role: 'Vice Chair', votes: 4, isWinner: false },
      ]
    },
    {
      id: 'ballot-2',
      title: 'Approve Strategic Plan 2026-2028',
      description: 'Vote to ratify the three-year strategic plan as presented.',
      status: 'active',
      totalMembers: 12,
    }
  ];

  const handleVote = (type: 'yes' | 'no' | 'abstain') => {
    if (hasVoted) return;
    
    const newCount = stats[type].count + 1;
    const total = stats.yes.count + stats.no.count + stats.abstain.count + 1;

    setStats({
      yes: { 
        count: type === 'yes' ? newCount : stats.yes.count, 
        percent: Math.round(((type === 'yes' ? newCount : stats.yes.count) / total) * 100) 
      },
      no: { 
        count: type === 'no' ? newCount : stats.no.count, 
        percent: Math.round(((type === 'no' ? newCount : stats.no.count) / total) * 100) 
      },
      abstain: { 
        count: type === 'abstain' ? newCount : stats.abstain.count, 
        percent: Math.round(((type === 'abstain' ? newCount : stats.abstain.count) / total) * 100) 
      },
    });
    setHasVoted(true);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Voting & Polling</h1>
          <p className="text-slate-500 mt-1 text-sm">1 active · 12 Total Board Members</p>
        </div>
      </div>

      <div className="grid gap-4">
        {ballots.map((ballot) => {
          const isExpanded = selectedBallotId === ballot.id;
          const isActive = ballot.status === 'active';

          return (
            <div 
              key={ballot.id} 
              className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${
                isExpanded ? 'border-sky-200 ring-4 ring-sky-50' : 'border-slate-100 hover:border-slate-200 shadow-sm'
              }`}
            >
              {/* Card Header */}
              <div 
                className="p-5 cursor-pointer" 
                onClick={() => setSelectedBallotId(isExpanded ? null : ballot.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-xl ${isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{ballot.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{ballot.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {ballot.status}
                    </span>
                    <ChevronRight size={18} className={`text-slate-300 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Expanded Results/Voting */}
              {isExpanded && (
                <div className="px-5 pb-6 animate-in fade-in slide-in-from-top-2">
                  <div className="pt-6 border-t border-slate-50 space-y-6">
                    
                    {/* Voting Action Section (Visible until vote is cast) */}
                    {isActive && !hasVoted && (
                      <div className="bg-sky-50/50 rounded-2xl p-6 border border-sky-100/50">
                        <p className="text-sm font-bold text-sky-900 mb-4 text-center">Cast your vote</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                          <button 
                            onClick={() => handleVote('yes')}
                            className="flex items-center gap-2 bg-white border border-emerald-200 text-emerald-700 px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-50 transition-all shadow-sm"
                          >
                            <Check size={18} /> Yes
                          </button>
                          <button 
                            onClick={() => handleVote('no')}
                            className="flex items-center gap-2 bg-white border border-rose-200 text-rose-700 px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-rose-50 transition-all shadow-sm"
                          >
                            <X size={18} /> No
                          </button>
                          <button 
                            onClick={() => handleVote('abstain')}
                            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
                          >
                            Abstain
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span>{isActive ? 'Live Standings' : 'Final Results'}</span>
                      <div className="flex items-center gap-1.5">
                        <Users size={14} />
                        <span>{isActive ? (stats.yes.count + stats.no.count + stats.abstain.count) : ballot.totalMembers} / 12 Members Voted</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {isActive ? (
                        <div className="space-y-5">
                          {/* Live Result Bars */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-semibold text-slate-700 flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Yes</span>
                              <span className="text-slate-500">{stats.yes.count} votes ({stats.yes.percent}%)</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${stats.yes.percent}%` }} />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-semibold text-slate-700 flex items-center gap-2"><X size={16} className="text-rose-500" /> No</span>
                              <span className="text-slate-500">{stats.no.count} votes ({stats.no.percent}%)</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-rose-500 transition-all duration-700" style={{ width: `${stats.no.percent}%` }} />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-semibold text-slate-700 flex items-center gap-2"><Users size={16} className="text-slate-400" /> Abstain</span>
                              <span className="text-slate-500">{stats.abstain.count} votes ({stats.abstain.percent}%)</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-slate-300 transition-all duration-700" style={{ width: `${stats.abstain.percent}%` }} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        ballot.results?.map((candidate) => (
                          <div key={candidate.name} className="space-y-2 p-3 rounded-xl border border-slate-50 bg-slate-50/50">
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-slate-800">{candidate.name}</span>
                                {candidate.isWinner && (
                                  <span className="flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                    <Trophy size={10} /> WINNER
                                  </span>
                                )}
                              </div>
                              <span className="font-medium text-slate-600">{candidate.votes} votes</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-1000 ${candidate.isWinner ? 'bg-emerald-500' : 'bg-slate-400'}`}
                                style={{ width: `${(candidate.votes / ballot.totalMembers) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}