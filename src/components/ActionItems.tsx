import { useState } from 'react';
import { Clock, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { mockActionItems } from '../data/mockData';

type ItemStatus = 'Pending' | 'Approved' | 'Deferred' | 'Colatilla' | 'Disapproved';

export default function ActionItems() {
  const [items] = useState<any[]>(() => {
    const saved = localStorage.getItem('board_action_items');
    if (saved) return JSON.parse(saved);
    
    return mockActionItems.map(i => ({
      ...i,
      status: (i.completed ? 'Approved' : 'Pending') as ItemStatus,
      reason: '',
    }));
  });

  const [filter, setFilter] = useState<ItemStatus | 'All'>('All');

  const filtered = items.filter(i => filter === 'All' || i.status === filter);
  const pending = items.filter(i => i.status === 'Pending');

  const groupedItems = filtered.reduce((groups: { [key: string]: any[] }, item) => {
    const title = item.meetingTitle || 'Uncategorized';
    if (!groups[title]) groups[title] = [];
    groups[title].push(item);
    return groups;
  }, {});

  const getStatusConfig = (status: ItemStatus) => {
    switch (status) {
      case 'Approved': return { color: 'text-emerald-600 bg-emerald-50', icon: <CheckCircle2 size={16} /> };
      case 'Deferred': return { color: 'text-amber-600 bg-amber-50', icon: <Clock size={16} /> };
      case 'Colatilla': return { color: 'text-purple-600 bg-purple-50', icon: <FileText size={16} /> };
      case 'Disapproved': return { color: 'text-rose-600 bg-rose-50', icon: <XCircle size={16} /> };
      default: return { color: 'text-slate-500 bg-slate-100', icon: <Clock size={16} /> };
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Action Items</h1>
          <p className="text-slate-500 mt-1 text-sm">
            {pending.length} pending · {items.length - pending.length} processed
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {(['All', 'Pending', 'Approved', 'Deferred', 'Colatilla', 'Disapproved'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              filter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {Object.entries(groupedItems).map(([title, meetingItems]) => (
          <div key={title} className="space-y-4">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
              {title}
            </h2>
            
            <div className="space-y-3">
              {meetingItems.map(item => {
                const config = getStatusConfig(item.status);
                return (
                  <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${config.color}`}>
                            {config.icon} {item.status}
                          </span>
                        </div>
                        <p className={`text-sm font-semibold leading-relaxed transition-all ${
                          item.status === 'Disapproved' 
                            ? 'text-rose-800 line-through decoration-rose-300' 
                            : item.status === 'Approved' 
                              ? 'text-slate-400' 
                              : 'text-slate-800'
                        }`}>
                          {item.description}
                        </p>
                        
                        {item.status === 'Colatilla' && (
                          <div className="mt-3 p-3 bg-purple-50/50 border border-purple-100 rounded-xl inline-block">
                            <p className="text-[11px] text-purple-600 font-bold italic flex items-center gap-2">
                              <FileText size={14} />
                              To be followed by supporting document(s)
                            </p>
                          </div>
                        )}

                        {item.status === 'Disapproved' && item.reason && (
                          <div className="mt-3 p-3 bg-rose-50/50 rounded-lg border border-rose-100">
                            <label className="block text-[10px] font-black text-rose-400 uppercase mb-1">Reason</label>
                            <p className="text-sm text-rose-800">{item.reason}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}