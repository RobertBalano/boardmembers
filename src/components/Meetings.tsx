import { useState } from 'react';
import { 
  Calendar, MapPin, Users, ChevronRight, Clock, X 
} from 'lucide-react';
import { Meeting, AgendaItem } from '../types';
import { mockMeetings } from '../data/mockData';

export default function Meetings() {
  const [meetings] = useState<Meeting[]>(mockMeetings);
  const [selected, setSelected] = useState<Meeting | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = (filterStatus === 'all' ? meetings : meetings.filter(m => m.status === filterStatus))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  function formatDate(d: string) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  function statusBadge(status: string) {
    const map: Record<string, string> = {
      scheduled: 'bg-sky-50 text-sky-600 border-sky-100',
      completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      'in-progress': 'bg-amber-50 text-amber-600 border-amber-100',
      cancelled: 'bg-rose-50 text-rose-500 border-rose-100',
    };
    return map[status] ?? 'bg-slate-100 text-slate-500';
  }

  const totalDuration = (items: AgendaItem[]) => items.reduce((sum, i) => sum + i.duration, 0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Meetings</h1>
          <p className="text-slate-500 mt-1 text-sm">{meetings.length} total meetings</p>
        </div>
      </div>

    
      <div className="flex gap-2 mb-6">
        {['all', 'scheduled', 'in-progress', 'completed', 'cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterStatus === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

    
      <div className="space-y-3">
        {filtered.map(meeting => (
          <div
            key={meeting.id}
            onClick={() => setSelected(meeting)}
            className="bg-white border border-slate-100 rounded-xl p-5 cursor-pointer hover:border-sky-200 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-slate-900 text-sm">{meeting.title}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusBadge(meeting.status)}`}>
                    {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-slate-400" />
                    {formatDate(meeting.date)} at {meeting.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-slate-400" />
                    {meeting.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={12} className="text-slate-400" />
                    {meeting.attendees.length} attendees
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-slate-400" />
                    {totalDuration(meeting.agenda)} min estimated
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-sky-400 transition-colors mt-0.5 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-end p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[calc(100vh-2rem)] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="font-bold text-slate-900">{selected.title}</h2>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusBadge(selected.status)}`}>
                  {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}