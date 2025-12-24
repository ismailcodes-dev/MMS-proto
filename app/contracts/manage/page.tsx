"use client";

import React, { useState } from 'react';
import { 
  Calendar, CheckCircle2, Clock, 
  DollarSign, MapPin, Search, Plus,
  MoreVertical, Printer, AlertCircle,
  FileText
} from 'lucide-react';

// --- TYPES ---
interface Contract {
  id: string;
  customer: string;
  status: 'Draft' | 'Active' | 'Expired';
  address: string;
  startDate: string;
  endDate: string;
  frequency: string;
  totalValue: number;
  paymentProgress: number; // 0 to 100
}

// --- MOCK DATA: ALL CONTRACTS ---
const ALL_CONTRACTS: Contract[] = [
  {
    id: "CON-2025-8821",
    customer: "Ahmed Sakr",
    status: 'Active',
    address: "Pearl Qatar, Tower 12",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    frequency: "Monthly",
    totalValue: 12000,
    paymentProgress: 25
  },
  {
    id: "CON-2025-8822",
    customer: "Al-Faytri General Trading",
    status: 'Draft',
    address: "Lusail Marina, Office 404",
    startDate: "2025-02-01",
    endDate: "2026-02-01",
    frequency: "Quarterly",
    totalValue: 45000,
    paymentProgress: 0
  },
  {
    id: "CON-2024-1004",
    customer: "West Bay Hotel",
    status: 'Expired',
    address: "West Bay, Zone 61",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    frequency: "Monthly",
    totalValue: 120000,
    paymentProgress: 100
  }
];

export default function ContractManagePage() {
  // --- STATE ---
  const [contracts] = useState<Contract[]>(ALL_CONTRACTS);
  const [selectedId, setSelectedId] = useState<string>("CON-2025-8821");
  const [searchTerm, setSearchTerm] = useState("");

  // Derived State: The currently selected contract object
  const activeContract = contracts.find(c => c.id === selectedId) || contracts[0];

  // Mock Visits & Payments (In a real app, you'd fetch these when selectedId changes)
  const [visits] = useState([
    { id: 1, date: "2025-01-05", status: "Completed", type: "Routine" },
    { id: 2, date: "2025-02-05", status: "Scheduled", type: "Routine" },
    { id: 3, date: "2025-03-05", status: "Tentative", type: "Routine" },
  ]);

  // Filter Logic for Sidebar
  const filteredContracts = contracts.filter(c => 
    c.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-full md:overflow-hidden bg-[#0f111a]">
      
      {/* --- 1. LEFT SIDEBAR: CONTRACT LIST --- */}
      {/* Mobile: Full width, fits content. Desktop: Fixed width, independent scroll. */}
      <aside className="w-full md:w-80 bg-[#141824] border-r border-slate-700 flex flex-col flex-shrink-0 z-20 md:h-full">
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-700 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-white font-bold text-lg">Contracts</h2>
             <button className="p-1.5 bg-blue-600 hover:bg-blue-500 rounded text-white shadow-lg shadow-blue-900/20">
               <Plus size={16}/>
             </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
             <input 
               type="text" 
               placeholder="Search contracts..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 pl-9 text-xs text-white focus:border-blue-500 outline-none"
             />
             <Search size={14} className="absolute left-3 top-2.5 text-slate-500"/>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
             <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-[10px] font-bold border border-blue-600/30 whitespace-nowrap">All</button>
             <button className="px-3 py-1 bg-[#0f111a] text-slate-400 rounded-full text-[10px] border border-slate-700 hover:border-slate-500 whitespace-nowrap">Active</button>
             <button className="px-3 py-1 bg-[#0f111a] text-slate-400 rounded-full text-[10px] border border-slate-700 hover:border-slate-500 whitespace-nowrap">Drafts</button>
          </div>
        </div>

        {/* Scrollable List (Desktop: overflow-y-auto / Mobile: auto height) */}
        <div className="flex-1 md:overflow-y-auto min-h-[300px] md:min-h-0">
           {filteredContracts.map((contract) => (
             <div 
               key={contract.id}
               onClick={() => setSelectedId(contract.id)}
               className={`p-4 border-b border-slate-700/50 cursor-pointer transition-colors hover:bg-[#1F2436] ${selectedId === contract.id ? 'bg-[#1F2436] border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
             >
                <div className="flex justify-between items-start mb-1">
                   <span className="text-xs font-mono text-slate-500">{contract.id}</span>
                   <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                      contract.status === 'Active' ? 'bg-green-500/10 text-green-400' : 
                      contract.status === 'Draft' ? 'bg-amber-500/10 text-amber-400' : 
                      'bg-red-500/10 text-red-400'
                   }`}>
                      {contract.status}
                   </span>
                </div>
                <div className="text-sm font-bold text-white mb-1 truncate">{contract.customer}</div>
                <div className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                   <MapPin size={10}/> {contract.address}
                </div>
                
                {contract.status === 'Active' && (
                  <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${contract.paymentProgress}%` }}></div>
                  </div>
                )}
             </div>
           ))}
        </div>
      </aside>


      {/* --- 2. MAIN CONTENT: CONTRACT DETAILS --- */}
      {/* Desktop: Flex-1, Side-by-side. Mobile: Stacks below list. */}
      <main className="flex-1 flex flex-col md:h-full md:overflow-hidden relative bg-[#0f111a]">
        
        {/* Header Strip (Sticky) */}
        <div className="bg-[#1F2436]/95 backdrop-blur border-b border-slate-700 p-6 flex-shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md z-10">
           <div>
              <h1 className="text-2xl font-bold text-white mb-1">{activeContract.customer}</h1>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1"><FileText size={14} className="text-blue-500"/> {activeContract.id}</span>
                <span className="flex items-center gap-1"><Clock size={14}/> {activeContract.startDate} — {activeContract.endDate}</span>
              </div>
           </div>
           
           <div className="flex gap-2 self-end sm:self-auto">
              {activeContract.status === 'Active' && (
                 <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-900/20">
                   <AlertCircle size={16}/> Emergency
                 </button>
              )}
              {activeContract.status === 'Draft' && (
                 <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-green-900/20">
                   <CheckCircle2 size={16}/> Activate
                 </button>
              )}
              <button className="p-2 bg-[#141824] border border-slate-600 rounded text-slate-300 hover:text-white"><Printer size={18}/></button>
              <button className="p-2 bg-[#141824] border border-slate-600 rounded text-slate-300 hover:text-white"><MoreVertical size={18}/></button>
           </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 p-4 md:p-6 pb-20 md:overflow-y-auto">
            
            {/* DASHBOARD KPI (Responsive Grid: 1 -> 2 -> 4) */}
            {activeContract.status === 'Active' && (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
                 <div className="bg-[#1F2436] border border-slate-700 p-4 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Next Visit</div>
                    <div className="text-lg font-bold text-white flex items-center gap-2">
                       <Calendar size={18} className="text-blue-500"/> Feb 05
                    </div>
                 </div>
                 <div className="bg-[#1F2436] border border-slate-700 p-4 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Payment Status</div>
                    <div className="text-lg font-bold text-green-400 flex items-center gap-2">
                       <CheckCircle2 size={18}/> Paid 25%
                    </div>
                 </div>
                 <div className="bg-[#1F2436] border border-slate-700 p-4 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Emergencies</div>
                    <div className="text-lg font-bold text-white">1 / 5 Used</div>
                 </div>
                 <div className="bg-[#1F2436] border border-slate-700 p-4 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Total Value</div>
                    <div className="text-lg font-bold text-white">{activeContract.totalValue.toLocaleString()} QAR</div>
                 </div>
              </div>
            )}

            {/* Detailed Grid (Responsive Grid: Stack -> Side-by-side) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Visit Schedule Table */}
              <div className="xl:col-span-2 border border-slate-700 rounded-lg bg-[#1F2436] overflow-hidden h-fit">
                 <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                   <h3 className="font-bold text-white flex items-center gap-2">
                     <Calendar size={18} className="text-blue-500"/> Visit Schedule
                   </h3>
                   <span className="text-xs text-slate-400">{activeContract.frequency} Plan</span>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-300">
                    <thead className="bg-[#141824] text-xs text-slate-500 uppercase">
                        <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {visits.map((visit) => (
                        <tr key={visit.id} className="hover:bg-[#141824]">
                            <td className="px-4 py-3 text-white font-mono whitespace-nowrap">{visit.date}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{visit.type}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${
                                visit.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                visit.status === 'Tentative' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            }`}>
                                {visit.status}
                            </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                            <button className="text-slate-500 hover:text-white"><MoreVertical size={16}/></button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                 </div>
              </div>

              {/* Financials / Scope */}
              <div className="xl:col-span-1 space-y-6">
                 <div className="border border-slate-700 rounded-lg bg-[#1F2436] p-4">
                    <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                       <DollarSign size={16} className="text-green-500"/> Financial Summary
                    </h3>
                    <div className="space-y-3">
                       <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                          <span className="text-slate-400">Total Contract</span>
                          <span className="text-white font-bold">{activeContract.totalValue.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                          <span className="text-slate-400">Paid Amount</span>
                          <span className="text-green-400 font-bold">{(activeContract.totalValue * (activeContract.paymentProgress/100)).toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Outstanding</span>
                          <span className="text-red-400 font-bold">{(activeContract.totalValue * (1 - activeContract.paymentProgress/100)).toLocaleString()}</span>
                       </div>
                    </div>
                 </div>

                 <div className="border border-slate-700 rounded-lg bg-[#1F2436] p-4">
                    <h3 className="font-bold text-white text-sm mb-3">Included Services</h3>
                    <ul className="space-y-2 text-xs text-slate-300">
                       <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500"/> 4x Split AC Maint.</li>
                       <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500"/> 1x Water Tank Cleaning</li>
                       <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500"/> 5x Emergency Calls</li>
                    </ul>
                 </div>
              </div>
            </div>
        </div>

      </main>
    </div>
  );
}