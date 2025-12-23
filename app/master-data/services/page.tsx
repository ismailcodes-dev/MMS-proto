"use client";

import React, { useState } from 'react';
import { 
  Plus, Minus, Search, Edit2, Trash2, 
  Wind, Droplets, Wrench, Zap, Home, 
  CheckCircle2, AlertCircle, MoreVertical,
  Globe, FileText, Package
} from 'lucide-react';

// --- TYPES (Matching image_bd56a0.png columns) ---
interface ServiceItem {
  id: string;
  name: string;
  arabicName: string;
  invoiceName: string;
  invoiceArabicName: string;
  hasInventory: boolean;
  reminderDays: number | null;
  price: number;
  active: boolean;
}

interface ServiceCategory {
  id: string;
  name: string;
  icon?: React.ReactNode;
  subCategories?: ServiceCategory[];
  items?: ServiceItem[];
}

// --- MOCK DATA ---
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
              { 
                id: 's1', 
                name: 'Cleaning [Indoor: Water - Outdoor: Water]', 
                arabicName: 'تنظيف [الوحدة الداخلية: بالماء - الوحدة الخارجية: بالماء]',
                invoiceName: 'Cleaning Split AC (Water/Water)',
                invoiceArabicName: 'تنظيف مكيف سبليت (ماء/ماء)',
                hasInventory: false,
                reminderDays: 180,
                price: 150,
                active: true
              },
              { 
                id: 's2', 
                name: 'Cleaning [Indoor: Steam - Outdoor: Water]', 
                arabicName: 'تنظيف [الوحدة الداخلية: بخار - الوحدة الخارجية: بالماء]',
                invoiceName: 'Deep Cleaning Split AC (Steam)',
                invoiceArabicName: 'تنظيف عميق مكيف سبليت (بخار)',
                hasInventory: false,
                reminderDays: 180,
                price: 200,
                active: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'water', name: 'Water System', icon: <Droplets size={18}/>,
    subCategories: [
      {
        id: 'ws-filters', name: 'Water Filters',
        items: [
           { 
             id: 's3', 
             name: '5-Stage Filter Installation', 
             arabicName: 'تركيب فلتر 5 مراحل',
             invoiceName: 'Supply & Install 5-Stage Filter',
             invoiceArabicName: 'توفير وتركيب فلتر 5 مراحل',
             hasInventory: true,
             reminderDays: 90,
             price: 750,
             active: true
           }
        ]
      }
    ]
  }
];

export default function ServicesMasterPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // --- RECURSIVE CARD COMPONENT ---
  const CategoryCard = ({ category, level }: { category: ServiceCategory, level: number }) => {
    const isExpanded = expanded[category.id];
    const hasChildren = (category.subCategories && category.subCategories.length > 0) || (category.items && category.items.length > 0);
    
    // Style logic
    const borderColor = level === 0 ? 'border-slate-600' : 'border-slate-700';
    const bgColor = level === 0 ? 'bg-[#1F2436]' : level === 1 ? 'bg-[#141824]' : 'bg-[#0f111a]';
    const paddingLeft = level === 0 ? 'p-4' : 'p-3 pl-6';

    return (
      <div className={`mb-3 rounded-lg border ${borderColor} ${bgColor} overflow-hidden transition-all duration-300`}>
        
        {/* HEADER */}
        <div 
          onClick={() => hasChildren && toggleExpand(category.id)}
          className={`flex justify-between items-center cursor-pointer ${paddingLeft} hover:bg-white/5`}
        >
          <div className="flex items-center gap-3">
             {level === 0 && <div className="p-2 rounded bg-blue-600/20 text-blue-400">{category.icon}</div>}
             <span className={`font-medium ${level === 0 ? 'text-lg text-white' : 'text-sm text-slate-300'}`}>
               {category.name}
             </span>
             {level > 0 && <span className="text-[10px] bg-slate-700 px-2 rounded-full text-slate-400">Category</span>}
          </div>
          
          <div className="flex items-center gap-2">
            {hasChildren && (
                <button className="text-slate-400 p-1 hover:text-white">
                {isExpanded ? <Minus size={16}/> : <Plus size={16}/>}
                </button>
            )}
            <button className="p-1 hover:text-blue-400"><Edit2 size={14}/></button>
          </div>
        </div>

        {/* BODY */}
        {isExpanded && (
          <div className={`border-t border-slate-700/50 p-2 ${level === 0 ? 'bg-slate-800/10' : ''}`}>
            
            {/* 1. Sub-Categories */}
            {category.subCategories?.map(sub => (
              <CategoryCard key={sub.id} category={sub} level={level + 1} />
            ))}

            {/* 2. LEAF ITEMS (The Full Info Cards) */}
            {category.items && (
              <div className="space-y-2 mt-1 px-2">
                {category.items.map(item => (
                  <div key={item.id} className="bg-[#1F2436] border border-slate-600 rounded-lg p-4 hover:border-blue-500 transition-colors group">
                     
                     {/* Top Row: Main Info */}
                     <div className="flex justify-between items-start mb-3 border-b border-slate-700 pb-3">
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                             <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                             <h4 className="text-sm font-bold text-white">{item.name}</h4>
                           </div>
                           <div className="text-xs text-slate-400 font-arabic" dir="rtl">{item.arabicName}</div>
                        </div>
                        <div className="text-right">
                           <div className="text-lg font-bold text-blue-400">{item.price} QAR</div>
                           <div className="flex gap-2 justify-end mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                              <button className="p-1 hover:text-blue-400" title="Edit"><Edit2 size={14}/></button>
                              <button className="p-1 hover:text-red-400" title="Delete"><Trash2 size={14}/></button>
                           </div>
                        </div>
                     </div>

                     {/* Bottom Row: Detailed Columns Grid */}
                     <div className="grid grid-cols-4 gap-4 text-xs">
                        
                        {/* Invoice Names */}
                        <div className="col-span-2">
                           <label className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                             <FileText size={10}/> Invoice Name (En/Ar)
                           </label>
                           <div className="text-slate-300">{item.invoiceName}</div>
                           <div className="text-slate-400 font-arabic">{item.invoiceArabicName}</div>
                        </div>

                        {/* Inventory & Reminders */}
                        <div className="col-span-1">
                           <label className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                             <Package size={10}/> Inventory
                           </label>
                           <div className={item.hasInventory ? 'text-green-400' : 'text-slate-500'}>
                              {item.hasInventory ? 'Linked' : 'No Inventory'}
                           </div>
                        </div>

                        <div className="col-span-1">
                           <label className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                             <AlertCircle size={10}/> Reminder
                           </label>
                           <div className="text-slate-300">
                             {item.reminderDays ? `${item.reminderDays} Days` : '-'}
                           </div>
                        </div>

                     </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-200 font-sans p-6 flex flex-col">
      
      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-white">Services Master Data</h1>
           <p className="text-slate-400 text-sm">Manage service hierarchy, pricing, and details.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg shadow-blue-900/20">
          <Plus size={16}/> Add New Service
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-6">
         <input 
           type="text" 
           placeholder="Search by Service Name, Code, or Arabic Title..." 
           className="w-full bg-[#1F2436] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-blue-500 outline-none"
         />
         <Search size={18} className="absolute left-3 top-3.5 text-slate-500"/>
      </div>

      {/* MAIN CONTENT: The Nested Cards */}
      <div className="flex-1 overflow-y-auto pb-10">
         {SERVICE_TREE.map(cat => (
           <CategoryCard key={cat.id} category={cat} level={0} />
         ))}
      </div>

    </div>
  );
}