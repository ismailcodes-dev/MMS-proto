"use client";

import React, { useState } from 'react';
import { 
  Plus, Minus, Search, CheckCircle2, 
  Wind, Droplets, Wrench, Zap, Home, 
  ChevronRight, ChevronDown, ShoppingCart
} from 'lucide-react';

// --- TYPES ---
interface ServiceItem {
  id: string;
  name: string;
  price: number;
}

interface ServiceCategory {
  id: string;
  name: string;
  icon?: React.ReactNode;
  subCategories?: ServiceCategory[];
  items?: ServiceItem[];
}

// --- MOCK DATA (Replicating image_bced08.png) ---
const SERVICE_TREE: ServiceCategory[] = [
  {
    id: 'ac', name: 'Air Conditioning', icon: <Wind size={18}/>,
    subCategories: [
      {
        id: 'ac-split', name: 'Split Unit',
        subCategories: [
          {
            id: 'ac-split-clean', name: 'Cleaning Services',
            items: [
              { id: 's1', name: 'Cleaning [Indoor: Water - Outdoor: Water]', price: 150 },
              { id: 's2', name: 'Cleaning [Indoor: Water/Steam - Outdoor: Water]', price: 200 },
              { id: 's3', name: 'Cleaning [Indoor: Filter Only - Outdoor: Water]', price: 100 },
            ]
          },
          {
            id: 'ac-split-maint', name: 'Maintenance Level 1',
            items: [
              { id: 's4', name: 'Gas Top-up (R22)', price: 80 },
              { id: 's5', name: 'Capacitor Replacement', price: 120 },
            ]
          }
        ]
      },
      {
        id: 'ac-window', name: 'Window Unit',
        subCategories: [
           { id: 'ac-win-clean', name: 'Standard Cleaning', items: [{ id: 's6', name: 'Pressure Wash', price: 100 }] }
        ]
      },
      { id: 'ac-duct', name: 'Duct Split', subCategories: [] },
      { id: 'ac-cassette', name: 'Cassette Unit', subCategories: [] },
    ]
  },
  {
    id: 'water', name: 'Water System', icon: <Droplets size={18}/>,
    subCategories: [
      {
        id: 'ws-filter', name: 'Water Filter',
        subCategories: [
           { 
             id: 'ws-filt-install', name: 'Supply & Install',
             items: [
               { id: 's7', name: '3-Stage Filter Installation', price: 450 },
               { id: 's8', name: '5-Stage Filter Installation', price: 750 }
             ]
           }
        ]
      }
    ]
  },
  { id: 'plumbing', name: 'Plumbing', icon: <Wrench size={18}/>, subCategories: [] },
  { id: 'elec', name: 'Electrical', icon: <Zap size={18}/>, subCategories: [] },
  { id: 'gen', name: 'General', icon: <Home size={18}/>, subCategories: [] },
];

export default function ServiceSelectorPage() {
  // --- STATE ---
  // Tracks which categories are expanded (e.g., {'ac': true, 'ac-split': true})
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  
  // Cart: { 's1': 2 } means 2 qty of service ID s1
  const [cart, setCart] = useState<Record<string, number>>({});

  // --- ACTIONS ---
  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const newQty = Math.max(0, current + delta);
      if (newQty === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const getTotalItems = () => Object.values(cart).reduce((a, b) => a + b, 0);

  // --- RECURSIVE COMPONENT FOR NESTED CARDS ---
  const CategoryCard = ({ category, level }: { category: ServiceCategory, level: number }) => {
    const isExpanded = expanded[category.id];
    const hasChildren = (category.subCategories && category.subCategories.length > 0) || (category.items && category.items.length > 0);
    
    // Indentation and color shifts based on level
    const borderColor = level === 0 ? 'border-slate-600' : 'border-slate-700';
    const bgColor = level === 0 ? 'bg-[#1F2436]' : level === 1 ? 'bg-[#141824]' : 'bg-[#0f111a]';
    const paddingLeft = level === 0 ? 'p-4' : 'p-3 pl-4';

    return (
      <div className={`mb-3 rounded-lg border ${borderColor} ${bgColor} overflow-hidden transition-all duration-300`}>
        
        {/* HEADER ROW */}
        <div 
          onClick={() => hasChildren && toggleExpand(category.id)}
          className={`flex justify-between items-center cursor-pointer ${paddingLeft} hover:bg-white/5`}
        >
          <div className="flex items-center gap-3">
             {level === 0 && <div className="p-2 rounded bg-blue-600/20 text-blue-400">{category.icon}</div>}
             <span className={`font-medium ${level === 0 ? 'text-lg text-white' : level === 1 ? 'text-md text-slate-200' : 'text-sm text-slate-300'}`}>
               {category.name}
             </span>
          </div>
          
          {hasChildren && (
            <button className="text-slate-400 p-1 rounded-full border border-slate-600 hover:text-white hover:border-white transition-colors">
              {isExpanded ? <Minus size={14}/> : <Plus size={14}/>}
            </button>
          )}
        </div>

        {/* EXPANDABLE BODY (Nested Box) */}
        {isExpanded && (
          <div className={`border-t border-slate-700/50 p-3 ${level === 0 ? 'bg-slate-800/10' : ''}`}>
            
            {/* Render Sub-Categories (Recursion) */}
            {category.subCategories?.map(sub => (
              <CategoryCard key={sub.id} category={sub} level={level + 1} />
            ))}

            {/* Render Leaf Items (Actual Services) */}
            {category.items && (
              <div className="grid grid-cols-1 gap-2 mt-1">
                {category.items.map(item => {
                   const qty = cart[item.id] || 0;
                   return (
                     <div key={item.id} className="flex justify-between items-center bg-[#1F2436] border border-slate-600 rounded p-3 ml-4 hover:border-blue-500 transition-colors">
                        <div>
                           <div className="text-sm text-white font-medium">{item.name}</div>
                           <div className="text-xs text-slate-400">{item.price} QAR</div>
                        </div>
                        
                        {/* Qty Control (The [-] 1 [+] from your sketch) */}
                        <div className="flex items-center gap-3 bg-[#0f111a] rounded px-2 py-1 border border-slate-700">
                           <button onClick={(e) => { e.stopPropagation(); updateQty(item.id, -1); }} className="text-slate-400 hover:text-white disabled:opacity-30" disabled={qty===0}>
                             <Minus size={14}/>
                           </button>
                           <span className="text-sm font-bold text-blue-400 w-4 text-center">{qty}</span>
                           <button onClick={(e) => { e.stopPropagation(); updateQty(item.id, 1); }} className="text-slate-400 hover:text-white">
                             <Plus size={14}/>
                           </button>
                        </div>
                     </div>
                   );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-200 font-sans pb-24 flex flex-col">
      
      {/* HEADER */}
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-bold text-white mb-4">Select Services</h1>
        <div className="relative">
           <input 
             type="text" 
             placeholder="Search for a service..." 
             className="w-full bg-[#1F2436] border border-slate-700 rounded-full py-3 pl-10 pr-4 text-sm focus:border-blue-500 outline-none"
           />
           <Search size={18} className="absolute left-3 top-3.5 text-slate-500"/>
        </div>
      </div>

      {/* SERVICE LIST (The Nested Cards) */}
      <div className="flex-1 overflow-y-auto p-6 pt-2">
         {SERVICE_TREE.map(cat => (
           <CategoryCard key={cat.id} category={cat} level={0} />
         ))}
      </div>

      {/* FOOTER CART */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-64 right-0 p-4 bg-[#1F2436] border-t border-slate-700 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] z-40 flex justify-between items-center animate-in slide-in-from-bottom-5">
           <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-full text-white">
                <ShoppingCart size={20}/>
              </div>
              <div>
                <div className="text-sm text-white font-bold">{getTotalItems()} Services Selected</div>
                <div className="text-xs text-slate-400">Total estimated from base prices</div>
              </div>
           </div>
           <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-green-900/20">
             Confirm Selection
           </button>
        </div>
      )}

    </div>
  );
}