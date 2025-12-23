"use client";

import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, Camera, MapPin, 
  ChevronDown, ChevronUp, Clock, FileText, 
  Wrench, X, Plus, PlayCircle, UploadCloud
} from 'lucide-react';
import Link from 'next/link';

export default function RoutineMaintenancePage() {
  // --- STATE ---
  const [visitDetails] = useState({
    id: "VST-2025-9901",
    contractId: "CON-2025-8821",
    customer: "Ahmed Sakr",
    address: "Pearl Qatar, Tower 12, Unit 4A",
    type: "Monthly Routine Maintenance",
    startTime: "09:00 AM",
    status: "In Progress"
  });

  // Assets linked to this Contract (Pre-loaded)
  const [assets, setAssets] = useState([
    { 
      id: 101, name: "Split AC (Daikin)", location: "Master Bedroom", 
      status: "Pending", tasks: [
        { id: 1, name: "Clean Filters", done: false },
        { id: 2, name: "Check Gas Pressure", done: false },
        { id: 3, name: "Flush Drain Line", done: false }
      ],
      photo: null as string | null
    },
    { 
      id: 102, name: "Water Pump (Grundfos)", location: "Roof", 
      status: "Pending", tasks: [
        { id: 1, name: "Check Pressure", done: false },
        { id: 2, name: "Inspect for Leaks", done: false }
      ],
      photo: null as string | null
    }
  ]);

  const [activeAssetId, setActiveAssetId] = useState<number | null>(null);
  const [showOutOfScope, setShowOutOfScope] = useState(false);

  // --- ACTIONS ---
  const toggleTask = (assetId: number, taskId: number) => {
    setAssets(assets.map(asset => {
      if (asset.id === assetId) {
        const newTasks = asset.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
        return { ...asset, tasks: newTasks };
      }
      return asset;
    }));
  };

  const handleUploadPhoto = (assetId: number) => {
    // Mock photo upload
    setAssets(assets.map(a => a.id === assetId ? { ...a, photo: "uploaded_img.jpg", status: "Completed" } : a));
  };

  const calculateProgress = () => {
    const completed = assets.filter(a => a.status === 'Completed').length;
    return Math.round((completed / assets.length) * 100);
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-200 font-sans pb-28">
      
      {/* --- 1. HEADER: Visit Context --- */}
      <div className="bg-[#1F2436] border-b border-slate-700 p-4 sticky top-0 z-20 shadow-md">
        <div className="flex justify-between items-start mb-2">
           <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
             {visitDetails.type}
           </span>
           <div className="flex items-center gap-1 text-slate-400 text-xs">
             <Clock size={12}/> {visitDetails.startTime}
           </div>
        </div>
        <h1 className="text-lg font-bold text-white mb-1">{visitDetails.customer}</h1>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <MapPin size={12} className="text-amber-500"/>
          <span>{visitDetails.address}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-1">
            <span>Progress</span>
            <span>{calculateProgress()}%</span>
          </div>
          <div className="h-2 bg-[#141824] rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${calculateProgress()}%` }}></div>
          </div>
        </div>
      </div>

      {/* --- 2. ASSET CHECKLIST (Contract Scope) --- */}
      <div className="p-4 space-y-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contract Assets</h2>
        
        {assets.map((asset) => (
          <div key={asset.id} className={`border rounded-lg overflow-hidden transition-colors ${asset.status === 'Completed' ? 'border-green-500/30 bg-green-500/5' : 'border-slate-700 bg-[#1F2436]'}`}>
            
            {/* Asset Header */}
            <div 
              onClick={() => setActiveAssetId(activeAssetId === asset.id ? null : asset.id)}
              className="p-4 flex justify-between items-center cursor-pointer"
            >
               <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-full ${asset.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                   <Wrench size={16}/>
                 </div>
                 <div>
                   <h3 className="font-bold text-white text-sm">{asset.name}</h3>
                   <div className="text-xs text-slate-500">{asset.location}</div>
                 </div>
               </div>
               {activeAssetId === asset.id ? <ChevronUp size={16} className="text-slate-500"/> : <ChevronDown size={16} className="text-slate-500"/>}
            </div>

            {/* Expanded Tasks */}
            {activeAssetId === asset.id && (
              <div className="bg-[#141824] border-t border-slate-700 p-4 animate-in slide-in-from-top-2">
                <div className="space-y-3 mb-4">
                  {asset.tasks.map((task) => (
                    <div key={task.id} 
                         onClick={() => toggleTask(asset.id, task.id)}
                         className="flex items-center gap-3 p-2 rounded hover:bg-[#1F2436] cursor-pointer"
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.done ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-600'}`}>
                        {task.done && <CheckCircle2 size={12}/>}
                      </div>
                      <span className={`text-sm ${task.done ? 'text-slate-300 line-through' : 'text-white'}`}>{task.name}</span>
                    </div>
                  ))}
                </div>

                {/* Evidence Section */}
                <div className="border-t border-slate-700 pt-4">
                  <label className="text-[10px] text-slate-500 uppercase font-bold mb-2 block">Completion Evidence [Cite: 49]</label>
                  {asset.photo ? (
                    <div className="relative w-full h-32 bg-slate-800 rounded-lg overflow-hidden border border-green-500/50 flex items-center justify-center">
                       <span className="text-green-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Photo Verified</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleUploadPhoto(asset.id)}
                      className="w-full py-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 flex flex-col items-center gap-1 hover:border-blue-500 hover:text-blue-400"
                    >
                      <Camera size={18}/>
                      <span className="text-xs">Take 'After' Photo (Mandatory)</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* --- 3. OUT OF SCOPE (Upsell Opportunity) [Cite: 192] --- */}
        <div className="pt-4">
           <button 
             onClick={() => setShowOutOfScope(true)}
             className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 border-dashed p-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold"
           >
             <Plus size={16}/> Report Out-of-Scope Issue
           </button>
        </div>
      </div>

      {/* --- 4. OUT OF SCOPE MODAL --- */}
      {showOutOfScope && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
           <div className="bg-[#1F2436] w-full max-w-sm rounded-lg p-5 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-white font-bold flex items-center gap-2"><AlertTriangle size={16} className="text-amber-500"/> Report Issue</h3>
                 <button onClick={() => setShowOutOfScope(false)}><X size={18} className="text-slate-400"/></button>
              </div>
              
              <div className="space-y-3 mb-4">
                 <div>
                    <label className="text-[10px] text-slate-500 uppercase block mb-1">Item Description</label>
                    <input type="text" placeholder="e.g. Broken Window Handle" className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-white"/>
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 uppercase block mb-1">Technician Note</label>
                    <textarea placeholder="Explain why this is not covered..." className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-white" rows={2}></textarea>
                 </div>
                 <div className="flex gap-2">
                    <button className="flex-1 bg-slate-700 py-2 rounded text-xs text-white flex items-center justify-center gap-1"><Camera size={14}/> Evidence</button>
                 </div>
              </div>

              <button 
                onClick={() => { alert("Issue Reported! Sent to Sales for Quote."); setShowOutOfScope(false); }}
                className="w-full bg-blue-600 text-white py-2 rounded font-bold text-sm"
              >
                Submit for Quotation
              </button>
           </div>
        </div>
      )}

      {/* --- 5. FOOTER --- */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1F2436] border-t border-slate-700 p-4 z-40 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div className="text-xs text-slate-400">
           Assets Completed: <span className="text-white font-bold">{assets.filter(a=>a.status==='Completed').length}/{assets.length}</span>
        </div>
        <button 
            disabled={calculateProgress() < 100}
            className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-green-900/20"
        >
           <CheckCircle2 size={18}/> Finish Visit
        </button>
      </div>

    </div>
  );
}