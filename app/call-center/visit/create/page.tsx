"use client";

import React, { useState } from 'react';
import { 
  Search, Plus, ChevronDown, ChevronUp, 
  Phone, User, MapPin, Calendar, Clock, 
  Save, X, Info
} from 'lucide-react';

export default function CreateVisitPage() {
  // --- STATE ---
  const [sections, setSections] = useState({
    customer: true,
    scope: true,
    calendar: true
  });

  const [visitData, setVisitData] = useState({
    phone: "",
    name: "IT Mohamed Ismail", // Mocked from screenshot
    compound: "",
    building: "",
    unit: "",
    room: "",
    visitType: "Contract Request", // Service vs Contract
    notes: ""
  });

  const [selectedSlot, setSelectedSlot] = useState<{team: string, time: string} | null>(null);

  // Toggle Section Helper
  const toggle = (key: keyof typeof sections) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#141824] text-slate-200 font-sans pb-20">
      
      {/* --- 1. TOP STATUS BAR (Matches image_b03a4c.png) --- */}
      <div className="bg-[#1F2436] border-b border-slate-700 p-4 flex justify-between items-center text-sm sticky top-0 z-30 shadow-md">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg">Visit No: -</span>
          </div>
          <div className="flex flex-col border-l border-slate-600 pl-8">
            <span className="text-white font-bold text-lg">Status: -</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           {/* Visit Type Toggle */}
           <div className="bg-[#141824] rounded-full p-1 flex border border-slate-600">
             <button 
                onClick={() => setVisitData({...visitData, visitType: 'Service Request'})}
                className={`px-4 py-1 rounded-full text-xs font-medium transition-colors ${visitData.visitType === 'Service Request' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
             >
               Service
             </button>
             <button 
                onClick={() => setVisitData({...visitData, visitType: 'Contract Request'})}
                className={`px-4 py-1 rounded-full text-xs font-medium transition-colors ${visitData.visitType === 'Contract Request' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}
             >
               Contract
             </button>
           </div>
           
           <div className="flex flex-col text-right border-l border-slate-600 pl-6">
            <span className="text-slate-400 text-xs">Creation Date:</span>
            <span className="text-white font-mono">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">

        {/* --- SECTION 2: CUSTOMER & HIERARCHY (Matches image_b03a4c.png) --- */}
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <button 
            onClick={() => toggle('customer')}
            className="w-full bg-[#1F2436] p-3 flex justify-between items-center text-blue-400 font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            <span>Customer & Location Information</span>
            {sections.customer ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>
          
          {sections.customer && (
            <div className="bg-[#141824] p-6 border-t border-slate-700">
              <div className="grid grid-cols-3 gap-6">
                
                {/* Col 1: Personal Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Customer Phone <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <select className="w-full bg-[#1F2436] border border-slate-600 rounded p-2 text-sm text-white focus:border-blue-500 appearance-none">
                          <option>+974 7219 5504</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-3 text-slate-500 pointer-events-none"/>
                      </div>
                      <button className="bg-blue-600/20 text-blue-400 border border-blue-600/50 p-2 rounded hover:bg-blue-600 hover:text-white"><Plus size={16}/></button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Customer Name</label>
                    <div className="relative">
                       <input type="text" value={visitData.name} readOnly className="w-full bg-[#1F2436] border border-slate-700 rounded p-2 text-sm text-slate-300 cursor-not-allowed" />
                       <User size={14} className="absolute right-3 top-3 text-slate-600"/>
                    </div>
                  </div>
                </div>

                {/* Col 2 & 3: The 4-Level Hierarchy [Requested Requirement] */}
                <div className="col-span-2 bg-[#0f111a] border border-slate-700 rounded p-4 relative">
                  <div className="absolute -top-2.5 left-3 bg-[#1F2436] px-2 text-[10px] text-blue-400 font-bold border border-blue-500/30 rounded">
                    SITE LOCATION DETAILS
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     {/* Compound */}
                     <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Compound</label>
                        <select className="w-full bg-[#1F2436] border border-slate-600 rounded p-2 text-sm text-white">
                           <option value="">Select Compound...</option>
                           <option>Pearl Qatar Complex</option>
                           <option>West Bay Lagoon</option>
                        </select>
                     </div>
                     {/* Building */}
                     <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Building</label>
                        <select className="w-full bg-[#1F2436] border border-slate-600 rounded p-2 text-sm text-white">
                           <option value="">Select Building...</option>
                           <option>Tower 12</option>
                           <option>Villa 45</option>
                        </select>
                     </div>
                     {/* Unit */}
                     <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Unit</label>
                        <select className="w-full bg-[#1F2436] border border-slate-600 rounded p-2 text-sm text-white">
                           <option value="">Select Unit...</option>
                           <option>Penthouse 4A</option>
                           <option>Ground Floor</option>
                        </select>
                     </div>
                     {/* Room */}
                     <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">Room / Area</label>
                        <select className="w-full bg-[#1F2436] border border-slate-600 rounded p-2 text-sm text-white">
                           <option value="">Select Room...</option>
                           <option>Master Bedroom</option>
                           <option>Main Kitchen</option>
                        </select>
                     </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* --- SECTION 3: SCOPE & ITEM NOTES (Matches "Services" but for Scope) --- */}
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <button 
            onClick={() => toggle('scope')}
            className="w-full bg-[#1F2436] p-3 flex justify-between items-center text-blue-400 font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            <span>Preliminary Scope / Item Notes</span>
            {sections.scope ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>

          {sections.scope && (
            <div className="bg-[#141824] border-t border-slate-700 p-4">
              <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">
                 Describe items needing service (For Technician Reference)
              </label>
              <textarea 
                className="w-full h-24 bg-[#0f111a] border border-slate-600 rounded p-3 text-sm text-slate-300 focus:border-blue-500 outline-none resize-none"
                placeholder="e.g. 3 AC units in the Master Bedroom are leaking water. Client wants to discuss Annual Contract for the whole villa."
              ></textarea>
            </div>
          )}
        </div>

        {/* --- SECTION 4: TEAM AVAILABILITY GRID (Matches image_b03a62.png) --- */}
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <button 
            onClick={() => toggle('calendar')}
            className="w-full bg-[#1F2436] p-3 flex justify-between items-center text-blue-400 font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            <span>Team Availability & Booking</span>
            {sections.calendar ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>

          {sections.calendar && (
            <div className="bg-[#141824] border-t border-slate-700 p-4 overflow-x-auto">
              {/* Date Control */}
              <div className="flex gap-2 mb-4">
                <div className="bg-[#1F2436] border border-slate-600 rounded p-2 flex items-center gap-2 text-sm text-white min-w-[200px]">
                   <Calendar size={14} className="text-blue-400"/>
                   <span>Wednesday, Dec 24, 2025</span>
                </div>
                {/* Mock Date Tabs */}
                {['Thu, Dec 25', 'Fri, Dec 26', 'Sat, Dec 27'].map(d => (
                  <div key={d} className="bg-[#1F2436] border border-slate-700 rounded p-2 text-xs text-slate-400 hover:text-white cursor-pointer">
                    {d} <span className="bg-slate-700 px-1 rounded text-[10px] ml-1">0%</span>
                  </div>
                ))}
              </div>

              {/* THE GRID */}
              <div className="min-w-[800px] border border-slate-700 rounded text-xs">
                {/* Header Row */}
                <div className="grid grid-cols-13 bg-[#1F2436] text-center font-bold text-slate-400 border-b border-slate-700 divide-x divide-slate-700">
                  <div className="p-2 text-left pl-4 w-32 sticky left-0 bg-[#1F2436] z-10 border-r border-slate-700">Team</div>
                  {['08:00', '09:00', '10:00', '11:00', '12:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'].map(t => (
                    <div key={t} className="p-2 min-w-[60px]">{t}</div>
                  ))}
                </div>

                {/* Team Rows */}
                {[
                  { id: 'T01', name: 'Team 01', booked: [1, 2] }, // Booked 09:00-11:00
                  { id: 'T02', name: 'Team 02', booked: [] },
                  { id: 'T03', name: 'Team 03', booked: [4, 5, 6] }
                ].map((team) => (
                  <div key={team.id} className="grid grid-cols-13 border-b border-slate-700 divide-x divide-slate-700 h-12 relative group hover:bg-[#1F2436]/50">
                    {/* Team Name Column */}
                    <div className="p-2 flex flex-col justify-center pl-4 w-32 sticky left-0 bg-[#141824] z-10 border-r border-slate-700 group-hover:bg-[#1F2436]">
                      <span className="font-bold text-blue-400">{team.name}</span>
                      <span className="text-[10px] text-slate-500">2 Techs</span>
                    </div>

                    {/* Time Slots */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const isBooked = team.booked.includes(i);
                      const isSelected = selectedSlot?.team === team.id && selectedSlot?.time === `${i}`;
                      
                      return (
                        <div 
                          key={i} 
                          onClick={() => !isBooked && setSelectedSlot({team: team.id, time: `${i}`})}
                          className={`
                            relative cursor-pointer transition-colors
                            ${isBooked ? 'bg-red-500/20 cursor-not-allowed' : 'hover:bg-green-500/20'}
                            ${isSelected ? 'bg-green-500/40 ring-1 ring-green-400' : ''}
                          `}
                        >
                          {isBooked && (
                            <div className="absolute inset-1 bg-red-900/40 border border-red-500/30 rounded flex items-center justify-center">
                               <span className="text-[8px] text-red-300">BOOKED</span>
                            </div>
                          )}
                          {isSelected && (
                             <div className="absolute inset-1 border border-green-500 rounded flex items-center justify-center">
                               <span className="text-[8px] text-green-300 font-bold">SELECTED</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              
              {/* Grid Legend */}
              <div className="flex gap-4 mt-2 justify-end text-[10px] text-slate-400">
                 <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#141824] border border-slate-600"></div> Free</div>
                 <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500/20 border border-red-500/30"></div> Booked</div>
                 <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500/40 border border-green-500"></div> Selected</div>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* --- BOTTOM ACTION BAR --- */}
      <div className="fixed bottom-0 left-64 right-0 bg-[#1F2436] border-t border-slate-700 p-4 flex justify-end gap-4 z-40">
        <button className="px-6 py-2 text-slate-300 hover:text-white text-sm font-medium border border-slate-600 rounded">Cancel</button>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded shadow-lg shadow-blue-900/20 flex items-center gap-2">
          <Save size={16}/> Confirm Visit
        </button>
      </div>

    </div>
  );
}