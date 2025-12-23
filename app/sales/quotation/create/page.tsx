"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, User, MapPin, Calendar, 
  ChevronDown, ChevronUp, Plus, Search, 
  Trash2, Save, Printer, Share2, 
  Link as LinkIcon, AlertCircle, DollarSign,
  CheckCircle2, Building2
} from 'lucide-react';

export default function QuotationBuilderPage() {
  // --- STATE ---
  const [quoteType, setQuoteType] = useState<'Service' | 'Contract'>('Contract');
  const [linkedVisit, setLinkedVisit] = useState<string | null>(null); // "8092" if linked
  
  // Collapsible Sections
  const [sections, setSections] = useState({
    customer: true,
    terms: true, // Only for Contract
    scope: true,
    financials: true,
    notes: true
  });

  // Form Data
  const [formData, setFormData] = useState({
    customerName: "Ahmed Sakr",
    address: "Pearl Qatar, Tower 12",
    duration: "1 Year",
    frequency: "Monthly",
    paymentTerms: "In-Advance",
    spareParts: "Discount Only (15%)",
    freeEmergencies: 5,
    responseTime: "4 Hours",
    resolutionTime: "24 Hours"
  });

  // Services / Line Items
  const [services, setServices] = useState([
    { id: 1, name: "Split AC Maintenance", type: "Standard", qty: 4, price: 150, total: 600, notes: "" }
  ]);

  // --- ACTIONS ---
  const toggle = (key: keyof typeof sections) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLinkVisit = () => {
    // Simulate importing data from the Technician Visit we built earlier
    setLinkedVisit("8092");
    // Auto-fill services based on technician findings
    setServices([
      { id: 101, name: "Split AC (Daikin) - Master Bed", type: "Imported", qty: 1, price: 200, total: 200, notes: "Technician Rec: Needs chemical cleaning" },
      { id: 102, name: "Water Pump - Roof", type: "Imported", qty: 1, price: 350, total: 350, notes: "Technician Rec: Seal replacement" }
    ]);
    alert("Site Visit #8092 Linked! Services imported from Technician Report.");
  };

  const addCustomService = () => {
    const newId = services.length + 1;
    setServices([...services, { id: newId, name: "", type: "Specialized Request", qty: 1, price: 0, total: 0, notes: "" }]);
  };

  // Calculate Total
  const totalValue = services.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-200 font-sans pb-24">
      
      {/* --- 1. HEADER BAR --- */}
      <div className="bg-[#1F2436] border-b border-slate-700 p-4 sticky top-0 z-30 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Quotation No</span>
              <span className="text-white font-mono font-bold text-lg">Q-2025-001 (Auto)</span>
            </div>
            
            {/* QUOTATION TYPE TOGGLE [Cite: 70, 110] */}
            <div className="flex bg-[#141824] rounded-lg p-1 border border-slate-600">
               <button 
                 onClick={() => setQuoteType('Service')}
                 className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${quoteType === 'Service' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
               >
                 Service Request
               </button>
               <button 
                 onClick={() => setQuoteType('Contract')}
                 className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${quoteType === 'Contract' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
               >
                 Contract Request
               </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <span className="text-xs text-slate-400">Status: <span className="text-amber-400 font-bold">Draft Mode</span></span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* --- 2. CUSTOMER & SITE VISIT --- */}
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <button 
            onClick={() => toggle('customer')}
            className="w-full bg-[#1F2436] p-3 flex justify-between items-center text-blue-400 font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <User size={16}/> <span>Customer & Site Details</span>
            </div>
            {sections.customer ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>
          
          {sections.customer && (
            <div className="bg-[#141824] p-5 border-t border-slate-700 grid grid-cols-3 gap-6">
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Customer Name</label>
                    <input type="text" value={formData.customerName} className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-white"/>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Building Location Hierarchy [Cite: 120]</label>
                    <div className="flex gap-2">
                       <select className="flex-1 bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-slate-300">
                         <option>Compound</option>
                         <option>Tower</option>
                         <option>Villa</option>
                       </select>
                       <select className="flex-1 bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-slate-300">
                         <option>Unit/Apt</option>
                       </select>
                    </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Customer Address</label>
                    <div className="relative">
                      <input type="text" value={formData.address} className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-white"/>
                      <MapPin size={14} className="absolute right-3 top-2.5 text-slate-500"/>
                    </div>
                  </div>
               </div>

               {/* LINK SITE VISIT [Cite: 115] */}
               <div className="bg-[#1F2436] border border-slate-600 border-dashed rounded p-4 flex flex-col items-center justify-center text-center">
                  {!linkedVisit ? (
                    <>
                      <LinkIcon size={20} className="text-slate-500 mb-2"/>
                      <p className="text-xs text-slate-400 mb-2">Optional: Link a completed site visit to import technician data.</p>
                      <button onClick={handleLinkVisit} className="bg-blue-600/20 text-blue-400 border border-blue-600/50 px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
                        Link Site Visit
                      </button>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={24} className="text-green-500 mb-2"/>
                      <p className="text-sm font-bold text-white">Linked Visit #{linkedVisit}</p>
                      <p className="text-[10px] text-slate-500">Data Imported Successfully</p>
                      <button onClick={() => setLinkedVisit(null)} className="text-[10px] text-red-400 underline mt-1">Unlink</button>
                    </>
                  )}
               </div>
            </div>
          )}
        </div>

        {/* --- 3. CONTRACT TERMS (Conditional) [Cite: 127] --- */}
        {quoteType === 'Contract' && (
          <div className="border border-amber-500/30 rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-2">
            <button 
              onClick={() => toggle('terms')}
              className="w-full bg-[#2a2218] p-3 flex justify-between items-center text-amber-500 font-semibold text-sm hover:bg-amber-900/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText size={16}/> <span>Contract Terms & SLA</span>
              </div>
              {sections.terms ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </button>

            {sections.terms && (
              <div className="bg-[#141824] p-5 border-t border-slate-700 grid grid-cols-4 gap-6">
                 {/* Row 1: Frequency & Duration */}
                 <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Contract Duration [Cite: 129]</label>
                    <select className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-white">
                      <option>1 Year</option>
                      <option>2 Years</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Visits Frequency [Cite: 133]</label>
                    <select className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-white">
                      <option>Monthly (12 Visits)</option>
                      <option>Quarterly (4 Visits)</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Payment Terms [Cite: 145]</label>
                    <select className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-white">
                      <option>In-Advance (100%)</option>
                      <option>Monthly Installments</option>
                      <option>Quarterly Payments</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Spare Parts Coverage [Cite: 138]</label>
                    <select className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-white">
                      <option>Not Included</option>
                      <option>Discount Only (10%)</option>
                      <option>Fully Included (Premium)</option>
                    </select>
                 </div>

                 {/* Row 2: SLA & Emergency */}
                 <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Free Emergency Calls [Cite: 136]</label>
                    <input type="number" value={formData.freeEmergencies} className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-white"/>
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Response Time [Cite: 141]</label>
                    <div className="flex bg-[#0f111a] rounded border border-slate-600">
                        <button className="flex-1 text-[10px] bg-slate-700 text-white">4 Hours</button>
                        <button className="flex-1 text-[10px] text-slate-400">24 Hours</button>
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 uppercase font-bold mb-1">Resolution Time [Cite: 143]</label>
                    <input type="text" value="24 Hours" className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-sm text-slate-400" readOnly/>
                 </div>
              </div>
            )}
          </div>
        )}

        {/* --- 4. SERVICES SCOPE --- */}
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <button 
            onClick={() => toggle('scope')}
            className="w-full bg-[#1F2436] p-3 flex justify-between items-center text-blue-400 font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Building2 size={16}/> <span>Scope of Services</span>
            </div>
            {sections.scope ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>
          
          {sections.scope && (
            <div className="bg-[#141824] border-t border-slate-700">
               {/* Toolbar */}
               <div className="p-3 border-b border-slate-700 flex justify-between">
                  <button onClick={addCustomService} className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded flex items-center gap-2">
                    <Plus size={14}/> Add New / Specialized Service [Cite: 153]
                  </button>
                  <div className="relative">
                    <Search size={14} className="absolute left-2 top-2 text-slate-500"/>
                    <input type="text" placeholder="Search services..." className="bg-[#0f111a] border border-slate-600 rounded pl-7 pr-2 py-1 text-xs w-48"/>
                  </div>
               </div>

               {/* Table */}
               <table className="w-full text-left text-xs text-slate-300">
                 <thead className="bg-[#0f111a] text-slate-500 uppercase font-bold border-b border-slate-700">
                   <tr>
                     <th className="px-4 py-3">Service Name</th>
                     <th className="px-4 py-3">Type</th>
                     <th className="px-4 py-3">Notes / Description</th>
                     <th className="px-4 py-3 text-center">Qty</th>
                     <th className="px-4 py-3 text-right">Unit Price</th>
                     <th className="px-4 py-3 text-right">Total</th>
                     <th className="px-4 py-3 text-center">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-700">
                   {services.map((svc) => (
                     <tr key={svc.id} className="hover:bg-[#1F2436] transition-colors">
                       <td className="px-4 py-3">
                         {svc.type === 'Specialized Request' ? (
                           <input type="text" placeholder="Enter Service Name" className="bg-[#0f111a] border border-slate-600 rounded px-2 py-1 text-white w-full"/>
                         ) : (
                           <span className="font-medium text-white">{svc.name}</span>
                         )}
                         {/* Option to add image [Cite: 151] */}
                         <div className="text-[10px] text-blue-400 mt-1 cursor-pointer hover:underline">+ Add Image</div>
                       </td>
                       <td className="px-4 py-3">
                         <span className={`px-2 py-0.5 rounded ${svc.type==='Imported'?'bg-purple-500/10 text-purple-400': svc.type==='Specialized Request'?'bg-amber-500/10 text-amber-400':'bg-slate-700'}`}>
                           {svc.type}
                         </span>
                       </td>
                       <td className="px-4 py-3 w-1/3">
                          {svc.type === 'Specialized Request' ? (
                            <textarea placeholder="Describe this custom service..." className="bg-[#0f111a] border border-slate-600 rounded px-2 py-1 w-full text-xs" rows={1}></textarea>
                          ) : (
                            svc.notes || <span className="text-slate-600 italic">No notes</span>
                          )}
                       </td>
                       <td className="px-4 py-3 text-center">{svc.qty}</td>
                       <td className="px-4 py-3 text-right font-mono">{svc.price}</td>
                       <td className="px-4 py-3 text-right font-mono text-white font-bold">{svc.total}</td>
                       <td className="px-4 py-3 text-center">
                          <button className="text-slate-500 hover:text-red-400"><Trash2 size={14}/></button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          )}
        </div>

        {/* --- 5. NOTES & APPROVALS [Cite: 125, 126] --- */}
        <div className="grid grid-cols-2 gap-6">
           <div className="border border-slate-700 rounded-lg overflow-hidden bg-[#1F2436] p-4">
              <label className="text-xs text-blue-400 uppercase font-bold mb-2 block">Manager / Internal Notes (Approval)</label>
              <textarea className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-xs text-white h-24" placeholder="Notes for manager review..."></textarea>
           </div>
           <div className="border border-slate-700 rounded-lg overflow-hidden bg-[#1F2436] p-4">
              <label className="text-xs text-green-400 uppercase font-bold mb-2 block">Customer / Printed Notes</label>
              <textarea className="w-full bg-[#0f111a] border border-slate-600 rounded p-2 text-xs text-white h-24" placeholder="Notes visible on the PDF quotation..."></textarea>
           </div>
        </div>

      </div>

      {/* --- FOOTER ACTION BAR --- */}
      <div className="fixed bottom-0 left-64 right-0 bg-[#1F2436] border-t border-slate-700 p-4 z-40 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
         <div className="flex gap-4">
            <button className="text-slate-400 hover:text-white flex items-center gap-1 text-xs">
               <Printer size={16}/> Print PDF
            </button>
            <button className="text-green-400 hover:text-green-300 flex items-center gap-1 text-xs">
               <Share2 size={16}/> WhatsApp to Customer [Cite: 152]
            </button>
         </div>
         
         <div className="flex items-center gap-6">
            <div className="text-right">
               <div className="text-[10px] text-slate-500 uppercase">Total Amount</div>
               <div className="text-xl font-bold text-white">{totalValue} <span className="text-sm font-normal text-slate-500">QAR</span></div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-900/20">
              <Save size={16}/> Save & Send for Approval
            </button>
         </div>
      </div>

    </div>
  );
}