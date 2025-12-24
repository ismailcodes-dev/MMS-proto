"use client";

import React, { useState } from 'react';
import { 
  Camera, Mic, MapPin, Plus, Video, CalendarClock,
  AlertTriangle, CheckCircle2, ArrowLeft, FileText, X,
  DollarSign, Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';

export default function TechnicianVisitPage() {
  // --- STATE ---
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [isPayable, setIsPayable] = useState(true); // Mocking the "Payable Status" from the order
  
  // Hierarchy Data (Compound -> Building -> Unit -> Room)
  const [hierarchy, setHierarchy] = useState([
    {
      id: 'comp-1', type: 'Compound', name: 'Al-Faytri Complex', 
      buildings: [
        {
          id: 'bld-1', type: 'Building', name: 'Main Villa', 
          units: [
            {
              id: 'unit-1', type: 'Unit', name: 'Ground Floor',
              rooms: [
                { id: 'room-1', type: 'Room', name: 'Majlis', services: [] }
              ]
            }
          ]
        }
      ]
    }
  ]);

  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  // --- ACTIONS ---
  const handleRescheduleSubmit = () => {
    // In real app: POST to API to update order status to 'Rescheduled' with note
    alert(`Visit Rescheduled. Justification: "${rescheduleReason}"`);
    setShowReschedule(false);
  };

  const handleFinishVisit = () => {
    if(isPayable) {
        alert("Visit Complete. System is generating Invoice #INV-2025-8092...");
    } else {
        alert("Visit Complete. Data sent to Sales for Quotation.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-200 font-sans pb-28">
      
      {/* --- HEADER --- */}
      <div className="bg-[#1F2436] border-b border-slate-700 p-4 sticky top-0 z-20 shadow-md">
        <div className="flex justify-between items-start mb-2">
          <Link href="/contracts" className="text-slate-400 hover:text-white flex items-center gap-1 text-sm">
            <ArrowLeft size={16}/> Back
          </Link>
          <div className="flex gap-2">
             {/* Reschedule Button */}
             <button 
               onClick={() => setShowReschedule(true)}
               className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded text-xs font-bold flex items-center gap-1 hover:bg-amber-500/20"
             >
               <CalendarClock size={14} /> Reschedule
             </button>
             
             {/* Payable Status Badge */}
             {isPayable && (
                <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded text-xs font-bold uppercase flex items-center gap-1">
                  <DollarSign size={12}/> Payable Visit
                </span>
             )}
          </div>
        </div>
        <h1 className="text-lg font-bold text-white">Visit #8092 - Ahmed Sakr</h1>
        <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
          <MapPin size={14} className="text-blue-500"/>
          <span>Pearl Qatar, Tower 12</span>
        </div>
      </div>

      {/* --- CONTENT --- */}
      <div className="p-4 space-y-6">
        
        {/* HIERARCHY TREE */}
        {hierarchy.map((comp) => (
          <div key={comp.id} className="border border-slate-700 rounded-lg overflow-hidden">
            {/* Level 1: Compound */}
            <div className="bg-[#1F2436] p-3 flex justify-between items-center border-b border-slate-700">
              <div className="flex items-center gap-2">
                 <div className="bg-blue-600/20 p-1.5 rounded text-blue-400"><MapPin size={16}/></div>
                 <span className="font-bold text-white">{comp.name}</span>
                 <span className="text-[10px] text-slate-500 uppercase tracking-wider ml-2 border border-slate-600 px-1 rounded">Compound</span>
              </div>
              <button className="text-blue-400 p-1"><Plus size={16}/></button>
            </div>

            {/* Level 2: Building */}
            <div className="bg-[#141824] p-3 space-y-4">
               {comp.buildings.map((bld) => (
                 <div key={bld.id} className="border-l-2 border-slate-600 pl-4 ml-2 relative">
                    <div className="absolute -left-[9px] top-3 w-2 h-2 rounded-full bg-slate-600"></div>
                    <div className="flex justify-between items-center mb-3">
                       <h3 className="text-sm font-semibold text-slate-200">{bld.name}</h3>
                       <span className="text-[10px] text-slate-500 uppercase border border-slate-600 px-1 rounded">Building</span>
                    </div>

                    {/* Level 3: Unit */}
                    <div className="space-y-3">
                      {bld.units.map((unit) => (
                        <div key={unit.id} className="bg-[#1F2436] border border-slate-700 rounded p-3">
                           <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-700/50">
                             <div className="text-sm font-medium text-white">{unit.name}</div>
                             <span className="text-[10px] text-slate-500 uppercase border border-slate-600 px-1 rounded">Unit</span>
                           </div>

                           {/* Level 4: Room (Workspace) */}
                           <div className="grid grid-cols-1 gap-3">
                             {unit.rooms.map((room) => (
                               <div key={room.id} className="bg-[#0f111a] border border-slate-600/50 rounded p-3">
                                 <div className="flex justify-between items-center mb-3">
                                   <span className="text-blue-400 text-sm font-bold">{room.name}</span>
                                   <button 
                                     onClick={() => setActiveRoomId(activeRoomId === room.id ? null : room.id)}
                                     className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                                   >
                                     <Plus size={14}/> Add Service
                                   </button>
                                 </div>

                                 {/* --- ADD SERVICE FORM --- */}
                                 {activeRoomId === room.id && (
                                   <div className="bg-[#1F2436] border border-blue-500/30 rounded p-4 mb-3 animate-in fade-in slide-in-from-top-2">
                                     <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Service Details</h4>
                                     
                                     {/* Service Selection */}
                                     <div className="mb-3">
                                        <label className="text-[10px] text-slate-500 uppercase block mb-1">Service Type</label>
                                        <select className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-white">
                                          <option>General Inspection</option>
                                          <option>AC Maintenance</option>
                                          <option>Plumbing Leak</option>
                                          <option>Electrical Check</option>
                                        </select>
                                     </div>

                                     {/* Evidence Media (Video/Photo/Voice) */}
                                     <div className="mb-4">
                                       <label className="text-[10px] text-slate-500 uppercase block mb-2">Media Evidence</label>
                                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                         <button className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded flex flex-col items-center gap-1 text-[10px] border border-slate-600">
                                           <Camera size={16} className="text-blue-400"/> Photo
                                         </button>
                                         <button className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded flex flex-col items-center gap-1 text-[10px] border border-slate-600">
                                           <Video size={16} className="text-red-400"/> Video
                                         </button>
                                         <button className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded flex flex-col items-center gap-1 text-[10px] border border-slate-600">
                                           <Mic size={16} className="text-amber-400"/> Voice
                                         </button>
                                       </div>
                                     </div>

                                     {/* Sales Recommendation */}
                                     <div className="mb-4">
                                       <label className="text-[10px] text-blue-400 uppercase block mb-1 font-bold flex items-center gap-1">
                                         <FileText size={10}/> Recommendation for Sales Team
                                       </label>
                                       <textarea 
                                         className="w-full bg-[#0f111a] border border-blue-500/30 rounded p-2 text-xs text-white focus:border-blue-500 outline-none" 
                                         placeholder="e.g. Unit is old (Generic brand). I recommend proposing a Full Replacement Contract."
                                         rows={3}
                                       ></textarea>
                                     </div>

                                     <button 
                                        onClick={() => setActiveRoomId(null)}
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded text-sm font-medium"
                                     >
                                       Save Entry
                                     </button>

                                   </div>
                                 )}
                               </div>
                             ))}
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ))}

        {/* --- RESCHEDULE MODAL --- */}
        {showReschedule && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1F2436] w-full max-w-sm rounded-lg p-5 border border-slate-700 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <CalendarClock size={18} className="text-amber-500"/> Request Reschedule
                </h3>
                <button onClick={() => setShowReschedule(false)} className="text-slate-400 hover:text-white"><X size={20}/></button>
              </div>
              
              <p className="text-xs text-slate-400 mb-3">
                This will alert the Call Center. Please provide a mandatory justification.
              </p>
              
              <textarea 
                value={rescheduleReason}
                onChange={(e) => setRescheduleReason(e.target.value)}
                className="w-full bg-[#0f111a] border border-slate-600 rounded p-3 text-sm text-white mb-4 focus:border-amber-500 outline-none"
                rows={3}
                placeholder="e.g. Customer not available, Missing specialized tools..."
              ></textarea>
              
              <button 
                onClick={handleRescheduleSubmit}
                disabled={!rescheduleReason}
                className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded font-medium text-sm"
              >
                Submit Request
              </button>
            </div>
          </div>
        )}

      </div>

      {/* --- FOOTER --- */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1F2436] border-t border-slate-700 p-4 z-40 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div className="text-xs text-slate-400">
           Services Added: <span className="text-white font-bold">0</span>
        </div>
        <button 
            onClick={handleFinishVisit}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded font-bold text-sm flex items-center gap-2 shadow-lg shadow-green-900/20"
        >
           <CheckCircle2 size={18}/> 
           {isPayable ? "Finish & Generate Invoice" : "Finish Inspection"}
        </button>
      </div>

    </div>
  );
}