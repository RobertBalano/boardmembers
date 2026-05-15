import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

const initialMembers: any[] = [
  { id: '1', name: 'HON. DESIDERIO R. APAG III', role: 'Chair', designation: 'Commissioner, CHED / Chairperson', email: 'd.apag@ched.gov.ph', phone: 'N/A', joinDate: '2023-01-01', avatar: '/desiderio.jpg', isActive: true },
  { id: '2', name: 'HON. ANDRES C. PAGATPATAN, JR.', role: 'Vice Chair', designation: 'President, ESSU / Vice Chairperson', email: 'president@essu.edu.ph', phone: 'N/A', joinDate: '2023-01-01', avatar: '', isActive: true },
  { 
    id: '3', 
    name: 'SENATOR LOREN B. LEGARDA', 
    role: 'Member', 
    designation: 'Chairperson, Senate Committee on Higher, Technical and Vocational Education / Member', 
    email: 'loren.legarda@senate.gov.ph', 
    phone: 'N/A', 
    joinDate: '2023-01-01', 
    avatar: '',
    isActive: true,
    representative: { id: '5', name: 'HON. MARCELINO C. LIBANAN', designation: 'Representative', email: 'm.libanan@house.gov.ph', phone: 'N/A', avatar: '', isActive: true }
  },
  { 
    id: '4', 
    name: 'CONGRESSMAN JUDE A. ACIDRE', 
    role: 'Member', 
    designation: 'Chairperson, House Committee on Higher and Technical Education / Member', 
    email: 'jude.acidre@house.gov.ph', 
    phone: 'N/A', 
    joinDate: '2023-01-01', 
    avatar: '',
    isActive: true,
    representative: { id: '6', name: 'HON. CHRISTOPHER SHEEN P. GONZALES', designation: 'Representative', email: 'cs.gonzales@house.gov.ph', phone: 'N/A', avatar: '', isActive: true }
  },
  { id: '7', name: 'HON. JOHN GLENN D. OCAÑA', role: 'Member', designation: 'Regional Director, DOST - RO VIII / Member', email: 'jg.ocana@dost.gov.ph', phone: 'N/A', joinDate: '2023-01-01', avatar: '', isActive: true },
  { id: '8', name: 'HON. MEYLENE C. ROSALES', role: 'Member', designation: 'Regional Director, NEDA - RO VIII / Member', email: 'mc.rosales@neda.gov.ph', phone: 'N/A', joinDate: '2023-01-01', avatar: '', isActive: true },
  { id: '9', name: 'HON. GILBERT A. ESCOTO', role: 'Member', designation: 'Private Sector Representative / Member', email: 'g.escoto@private.org', phone: 'N/A', joinDate: '2023-01-01', avatar: '', isActive: true },
  { id: '10', name: 'HON. REYNALDO C. DORADO', role: 'Member', designation: 'Private Sector Representative / Member', email: 'r.dorado@private.org', phone: 'N/A', joinDate: '2023-01-01', avatar: '', isActive: true },
  { id: '11', name: 'HON. PEDRO WYNSTON M. LAGRAMADA', role: 'Member', designation: 'President, Federated Alumni Association / Member', email: 'p.lagramada@alumni.essu.edu.ph', phone: 'N/A', joinDate: '2023-01-01', avatar: '', isActive: true },
  { id: '12', name: 'HON. REYNA ERIKA T. RIVERA', role: 'Member', designation: 'President, Federated Student Council Organization, Inc. / Member', email: 'r.rivera@student.essu.edu.ph', phone: 'N/A', joinDate: '2023-01-01', avatar: '', isActive: true },
  { id: '13', name: 'HON. GERSHON G. ESCOTO, JR.', role: 'Member', designation: 'President, Federated Faculty Association / Member', email: 'g.escotojr@faculty.essu.edu.ph', phone: 'N/A', joinDate: '2023-01-01', avatar: '', isActive: true },
  { id: '14', name: 'DR. DEBBIE JOYCE R. VOLOSO', role: 'Secretary', designation: 'University Board Secretary', email: 'dj.voloso@essu.edu.ph', phone: 'N/A', joinDate: '2023-01-01', avatar: '', isActive: true },
];

export default function Members() {
  const [members] = useState(initialMembers);

  const MemberCard = ({ member, isRep = false }: { member: any, isRep?: boolean }) => {
    const getRoleStyles = (role: string) => {
      if (isRep) return 'bg-amber-100 text-amber-600'; 
      switch (role) {
        case 'Chair': return 'bg-sky-100 text-sky-600';
        case 'Vice Chair': return 'bg-emerald-100 text-emerald-600';
        case 'Secretary': return 'bg-purple-100 text-purple-600';
        default: return 'bg-slate-100 text-slate-600';
      }
    };

    return (
      <div className={`bg-white p-6 rounded-[2rem] border transition-all duration-300 ${!member.isActive ? 'opacity-60 grayscale-[0.4]' : ''} ${isRep ? 'border-amber-100 ml-12 mt-[-1rem] relative z-0 border-t-0 rounded-t-none bg-amber-50/20' : 'border-slate-100 shadow-sm z-10 relative'}`}>
        <div className="flex justify-end mb-2">
          <div className="scale-75 origin-right flex items-center">
            <span className={`text-[10px] font-bold uppercase tracking-tighter ${member.isActive ? 'text-emerald-500' : 'text-slate-400'}`}>
              {member.isActive ? '• Active' : '• Inactive'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5 mb-4">
          <div className={`${isRep ? 'w-14 h-14' : 'w-20 h-20'} rounded-full overflow-hidden bg-slate-100 border-2 border-white flex-shrink-0 shadow-sm relative`}>
            {member.avatar ? (
              <img src={member.avatar} className="w-full h-full object-cover" alt={member.name} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xl">{member.name.charAt(0)}</div>
            )}
            <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${member.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`${isRep ? 'text-base' : 'text-lg'} font-bold text-[#1e293b] leading-tight mb-1`}>{member.name}</h3>
            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${getRoleStyles(member.role)}`}>
              {isRep ? 'Representative' : member.role}
            </span>
          </div>
        </div>
        {!isRep && <p className="text-xs text-slate-400 font-medium italic mb-4 leading-relaxed">{member.designation}</p>}
        <div className="space-y-2 pt-4 border-t border-slate-50">
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <Mail size={14} className="text-slate-300" /> <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <Phone size={14} className="text-slate-300" /> <span>{member.phone}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 p-8 bg-[#f8fafc] min-h-screen">
      <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Governing Board</h1>
          <p className="text-slate-400 text-sm">View University Board Members</p>
        </div>
      
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 max-w-6xl mx-auto">
        {members.map((m) => (
          <div key={m.id} className="flex flex-col">
            <MemberCard member={m} />
            {m.representative && (
              <div className="relative">
                <div className="absolute left-10 top-0 w-0.5 h-4 bg-amber-200"></div>
                <MemberCard member={m.representative} isRep />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}