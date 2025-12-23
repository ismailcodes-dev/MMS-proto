"use client";

import React, { useState } from 'react';
import { 
  Search, Plus, MoreVertical, Trash2, 
  Users, User, Briefcase, Sun, GripVertical, AlertCircle
} from 'lucide-react';

// --- TYPES ---
type EmployeeStatus = 'Unassigned' | 'Vacation' | 'Other Work';

interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string; // Color or Image URL
  status: EmployeeStatus;
}

interface Team {
  id: string;
  name: string;
  leader: Employee | null;
  members: Employee[];
}

// --- MOCK DATA ---
const INITIAL_EMPLOYEES: Employee[] = [
  { id: 'e1', name: 'Sarah Connor', role: 'Senior Tech', avatar: 'bg-blue-500', status: 'Unassigned' },
  { id: 'e2', name: 'John Wick', role: 'HVAC Specialist', avatar: 'bg-green-500', status: 'Unassigned' },
  { id: 'e3', name: 'Tony Stark', role: 'Electrician', avatar: 'bg-red-500', status: 'Unassigned' },
  { id: 'e4', name: 'Steve Rogers', role: 'Helper', avatar: 'bg-blue-400', status: 'Unassigned' },
  { id: 'e5', name: 'Peter Parker', role: 'Junior Tech', avatar: 'bg-yellow-500', status: 'Vacation' },
  { id: 'e6', name: 'Bruce Banner', role: 'Plumber', avatar: 'bg-purple-500', status: 'Other Work' },
  { id: 'e7', name: 'Natasha Romanoff', role: 'Supervisor', avatar: 'bg-pink-500', status: 'Unassigned' },
];

export default function TeamBuilderPage() {
  // --- STATE ---
  const [pool, setPool] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [teams, setTeams] = useState<Team[]>([
    { id: 't1', name: 'Team Alpha', leader: null, members: [] }
  ]);
  const [draggedItem, setDraggedItem] = useState<{ employee: Employee, source: 'pool' | 'team', teamId?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<EmployeeStatus>('Unassigned');

  // --- DRAG HANDLERS ---
  const handleDragStart = (e: React.DragEvent, employee: Employee, source: 'pool' | 'team', teamId?: string) => {
    setDraggedItem({ employee, source, teamId });
    e.dataTransfer.effectAllowed = 'move';
    // Visual drag ghost customization can go here
  };

  const handleDrop = (e: React.DragEvent, targetTeamId: string, targetZone: 'leader' | 'members') => {
    e.preventDefault();
    if (!draggedItem) return;

    const { employee, source, teamId: sourceTeamId } = draggedItem;

    // 1. Remove from Source
    if (source === 'pool') {
      setPool(prev => prev.filter(emp => emp.id !== employee.id));
    } else if (source === 'team' && sourceTeamId) {
      setTeams(prev => prev.map(t => {
        if (t.id === sourceTeamId) {
          // Check if he was leader or member
          const isLeader = t.leader?.id === employee.id;
          return {
            ...t,
            leader: isLeader ? null : t.leader,
            members: isLeader ? t.members : t.members.filter(m => m.id !== employee.id)
          };
        }
        return t;
      }));
    }

    // 2. Add to Target
    setTeams(prev => prev.map(t => {
      if (t.id === targetTeamId) {
        if (targetZone === 'leader') {
          // If there is already a leader, move old leader to members (swap logic) or back to pool
          const oldLeader = t.leader;
          let newMembers = [...t.members];
          if (oldLeader) newMembers.push(oldLeader); // Demote old leader to member
          return { ...t, leader: employee, members: newMembers };
        } else {
          return { ...t, members: [...t.members, employee] };
        }
      }
      return t;
    }));

    setDraggedItem(null);
  };

  const handleReturnToPool = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.source === 'pool') return;

    // Remove from team
    setTeams(prev => prev.map(t => {
      if (t.id === draggedItem.teamId) {
        return {
          ...t,
          leader: t.leader?.id === draggedItem.employee.id ? null : t.leader,
          members: t.members.filter(m => m.id !== draggedItem.employee.id)
        };
      }
      return t;
    }));

    // Add back to pool
    setPool(prev => [...prev, draggedItem.employee]);
    setDraggedItem(null);
  };

  const addNewTeam = () => {
    const newId = `t${teams.length + 1}`;
    setTeams([...teams, { id: newId, name: `Team ${teams.length + 1}`, leader: null, members: [] }]);
  };

  const removeTeam = (id: string) => {
    const team = teams.find(t => t.id === id);
    if (!team) return;
    
    // Return everyone to pool
    const returningEmployees = [...team.members];
    if (team.leader) returningEmployees.push(team.leader);
    
    setPool(prev => [...prev, ...returningEmployees]);
    setTeams(prev => prev.filter(t => t.id !== id));
  };

  // --- RENDER HELPERS ---
  const filteredPool = pool.filter(e => e.status === activeTab);

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-200 font-sans p-6 flex flex-col gap-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-white">Team Management</h1>
           <p className="text-slate-400 text-sm">Drag employees to assign leaders and members.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative w-64">
             <input type="text" placeholder="Search employees..." className="w-full bg-[#1F2436] border border-slate-700 rounded-full px-4 py-2 pl-10 text-sm focus:border-blue-500 outline-none"/>
             <Search size={16} className="absolute left-3 top-2.5 text-slate-500"/>
           </div>
           <button onClick={addNewTeam} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-lg shadow-blue-900/20">
             <Plus size={18}/> Add Team
           </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 h-[calc(100vh-140px)]">
        
        {/* --- LEFT PANEL: EMPLOYEE POOL (De-Clustered) --- */}
        <div 
          className="w-1/4 flex flex-col gap-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleReturnToPool}
        >
           {/* Custom Tab Switcher */}
           <div className="flex p-1 bg-[#1F2436] rounded-lg border border-slate-700">
              {['Unassigned', 'Vacation', 'Other Work'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as EmployeeStatus)}
                  className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                    activeTab === tab 
                    ? (tab === 'Unassigned' ? 'bg-slate-700 text-white' : tab === 'Vacation' ? 'bg-orange-500/20 text-orange-400' : 'bg-purple-500/20 text-purple-400')
                    : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab} ({pool.filter(e => e.status === tab).length})
                </button>
              ))}
           </div>

           {/* The Drop Zone / List */}
           <div className={`flex-1 bg-[#1F2436] border border-slate-700 rounded-xl p-3 overflow-y-auto transition-colors ${draggedItem?.source === 'team' ? 'border-dashed border-blue-500 bg-blue-500/5' : ''}`}>
              {filteredPool.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs gap-2">
                   <User size={24} className="opacity-20"/>
                   No employees in this category
                </div>
              ) : (
                <div className="space-y-2">
                   {filteredPool.map(emp => (
                     <div 
                       key={emp.id}
                       draggable
                       onDragStart={(e) => handleDragStart(e, emp, 'pool')}
                       className="group bg-[#141824] border border-slate-700 hover:border-slate-500 rounded-lg p-3 flex items-center gap-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all"
                     >
                        <GripVertical size={16} className="text-slate-600 group-hover:text-slate-400"/>
                        <div className={`w-8 h-8 rounded-full ${emp.avatar} flex items-center justify-center text-[10px] font-bold text-white shadow-inner`}>
                          {emp.name.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-200">{emp.name}</div>
                          <div className="text-[10px] text-slate-500">{emp.role}</div>
                        </div>
                     </div>
                   ))}
                </div>
              )}
           </div>
        </div>

        {/* --- RIGHT PANEL: TEAM BUILDER --- */}
        <div className="w-3/4 overflow-y-auto space-y-6 pr-2">
           {teams.map(team => (
             <div key={team.id} className="bg-[#1F2436] border border-slate-700 rounded-xl overflow-hidden shadow-lg">
                
                {/* Team Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center">
                   <div>
                     <h3 className="text-white font-bold text-lg">{team.name}</h3>
                     <p className="text-blue-100 text-xs">{team.leader ? '1' : '0'} Leader • {team.members.length} Members</p>
                   </div>
                   <button onClick={() => removeTeam(team.id)} className="text-white/60 hover:text-white p-2 hover:bg-white/10 rounded"><Trash2 size={18}/></button>
                </div>

                <div className="p-6 space-y-6">
                  
                  {/* ZONE 1: TEAM LEADER */}
                  <div>
                    <label className="text-xs font-bold text-amber-500 uppercase mb-2 flex items-center gap-2">
                      <User size={14}/> Team Leader
                    </label>
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, team.id, 'leader')}
                      className={`h-20 border-2 border-dashed rounded-lg transition-all flex items-center justify-center ${
                        team.leader 
                        ? 'border-slate-700 bg-[#141824]' 
                        : 'border-slate-600 bg-slate-800/30 hover:border-amber-500 hover:bg-amber-500/5'
                      }`}
                    >
                      {team.leader ? (
                        <div 
                           draggable
                           onDragStart={(e) => handleDragStart(e, team.leader!, 'team', team.id)}
                           className="flex items-center gap-3 w-full h-full px-4 cursor-grab active:cursor-grabbing"
                        >
                           <div className={`w-10 h-10 rounded-full ${team.leader.avatar} flex items-center justify-center font-bold text-white shadow-lg border-2 border-[#1F2436]`}>
                              {team.leader.name.substring(0,2)}
                           </div>
                           <div>
                              <div className="font-bold text-white">{team.leader.name}</div>
                              <div className="text-xs text-amber-500">{team.leader.role}</div>
                           </div>
                        </div>
                      ) : (
                        <div className="text-slate-500 text-sm flex items-center gap-2">
                          <Plus size={16}/> Drag Leader Here
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ZONE 2: TEAM MEMBERS */}
                  <div>
                    <label className="text-xs font-bold text-blue-400 uppercase mb-2 flex items-center gap-2">
                      <Users size={14}/> Team Members
                    </label>
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, team.id, 'members')}
                      className="min-h-[120px] bg-[#141824] border-2 border-dashed border-slate-700 rounded-lg p-3 transition-all hover:border-blue-500 hover:bg-blue-500/5"
                    >
                       {team.members.length === 0 ? (
                         <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm mt-4">
                            <span className="opacity-50">Drag team members here</span>
                         </div>
                       ) : (
                         <div className="grid grid-cols-3 gap-3">
                           {team.members.map(member => (
                             <div 
                               key={member.id}
                               draggable
                               onDragStart={(e) => handleDragStart(e, member, 'team', team.id)}
                               className="bg-[#1F2436] p-2 rounded border border-slate-700 flex items-center gap-2 cursor-grab active:cursor-grabbing hover:border-blue-500"
                             >
                                <div className={`w-8 h-8 rounded-full ${member.avatar} flex items-center justify-center text-[10px] font-bold text-white`}>
                                   {member.name.substring(0,2)}
                                </div>
                                <div className="overflow-hidden">
                                   <div className="text-sm text-slate-200 truncate">{member.name}</div>
                                   <div className="text-[10px] text-slate-500 truncate">{member.role}</div>
                                </div>
                             </div>
                           ))}
                         </div>
                       )}
                    </div>
                  </div>

                </div>
             </div>
           ))}

           {/* Empty State for Teams */}
           {teams.length === 0 && (
             <div className="h-64 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500">
                <AlertCircle size={32} className="mb-2 opacity-50"/>
                <p>No teams created yet.</p>
                <button onClick={addNewTeam} className="text-blue-400 text-sm mt-2 hover:underline">Create your first team</button>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}