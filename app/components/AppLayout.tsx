"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { 
  LayoutDashboard, Phone, Camera, 
  FileCheck, Database, Menu, X, ChevronRight 
} from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-[#0f111a]">
      
      {/* --- MOBILE OVERLAY --- */}
      {/* Dims the screen when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- FLUID SIDEBAR --- */}
      {/* Logic:
          - Mobile: Fixed position, off-screen by default (-translate-x-full), slides in.
          - Tablet (md): Static position, Slim width (w-20).
          - Desktop (lg): Full width (w-64).
      */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 
        flex flex-col flex-shrink-0 
        bg-[#141824] border-r border-slate-700 
        transition-all duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-64 md:w-20 lg:w-64
      `}>
        
        {/* LOGO AREA */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-700 flex-shrink-0">
          {/* Full Logo (Mobile & Desktop) */}
          <span className="font-bold text-lg text-white tracking-wide md:hidden lg:block">ALFYTRI ERP</span>
          {/* Mini Logo (Tablet Only) */}
          <span className="font-bold text-xl text-white hidden md:block lg:hidden">AE</span>
          
          {/* Close Button (Mobile Only) */}
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400">
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          
          {/* 1. DASHBOARD */}
          <div className="mb-6">
            <p className="px-3 text-[10px] uppercase text-slate-500 font-bold mb-2 md:hidden lg:block">Overview</p>
            <Link href="/contracts/manage/" className="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 rounded-md hover:bg-slate-800 hover:text-white transition-colors relative">
               <LayoutDashboard size={18} className="flex-shrink-0" />
               <span className="md:hidden lg:block">Contracts Dashboard</span>
               {/* Tooltip for Tablet Mode */}
               <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 md:group-hover:block hidden lg:hidden pointer-events-none z-50 whitespace-nowrap shadow-lg">Contracts Dashboard</span>
            </Link>
          </div>

          {/* 2. OPERATIONAL WORKFLOW */}
          <div className="mb-6">
            <p className="px-3 text-[10px] uppercase text-slate-500 font-bold mb-2 md:hidden lg:block">Contract Workflow</p>
            
            {/* Step 1 */}
            <Link href="/call-center/visit/create" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-blue-900/20 hover:text-blue-400 transition-colors mb-1 relative">
               <div className="flex items-center gap-3">
                 <Phone size={18} className="flex-shrink-0" />
                 <span className="md:hidden lg:block">1. Call Center Visit</span>
               </div>
               <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 md:hidden lg:block"/>
               <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 md:group-hover:block hidden lg:hidden pointer-events-none z-50 whitespace-nowrap shadow-lg">Call Center Visit</span>
            </Link>

            {/* Step 2 */}
            <Link href="/technician/visit" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-amber-900/20 hover:text-amber-400 transition-colors mb-1 relative">
               <div className="flex items-center gap-3">
                 <Camera size={18} className="flex-shrink-0" />
                 <span className="md:hidden lg:block">2. Technician App</span>
               </div>
               <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 md:hidden lg:block"/>
               <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 md:group-hover:block hidden lg:hidden pointer-events-none z-50 whitespace-nowrap shadow-lg">Technician App</span>
            </Link>

            {/* Step 3 */}
            <Link href="/sales/quotation/create" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-green-900/20 hover:text-green-400 transition-colors mb-1 relative">
               <div className="flex items-center gap-3">
                 <FileCheck size={18} className="flex-shrink-0" />
                 <span className="md:hidden lg:block">3. Quotation Builder</span>
               </div>
               <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 md:hidden lg:block"/>
               <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 md:group-hover:block hidden lg:hidden pointer-events-none z-50 whitespace-nowrap shadow-lg">Quotation Builder</span>
            </Link>

             {/* Step 4 */}
             <Link href="/technician/routine-visit" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-amber-900/20 hover:text-amber-400 transition-colors mb-1 relative">
               <div className="flex items-center gap-3">
                 <Camera size={18} className="flex-shrink-0" />
                 <span className="md:hidden lg:block">4. Contract Visit</span>
               </div>
               <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 md:hidden lg:block"/>
               <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 md:group-hover:block hidden lg:hidden pointer-events-none z-50 whitespace-nowrap shadow-lg">Contract Visit</span>
            </Link>

             {/* Step 5 */}
             <Link href="/teams/manage" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-amber-900/20 hover:text-amber-400 transition-colors mb-1 relative">
               <div className="flex items-center gap-3">
                 <Camera size={18} className="flex-shrink-0" />
                 <span className="md:hidden lg:block">5. Team Layout</span>
               </div>
               <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 md:hidden lg:block"/>
               <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 md:group-hover:block hidden lg:hidden pointer-events-none z-50 whitespace-nowrap shadow-lg">Team Layout</span>
            </Link>

             {/* Step 6 */}
             <Link href="/services/selector" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-amber-900/20 hover:text-amber-400 transition-colors mb-1 relative">
               <div className="flex items-center gap-3">
                 <Camera size={18} className="flex-shrink-0" />
                 <span className="md:hidden lg:block">6. Service Look</span>
               </div>
               <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 md:hidden lg:block"/>
               <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 md:group-hover:block hidden lg:hidden pointer-events-none z-50 whitespace-nowrap shadow-lg">Service Look</span>
            </Link>
          </div>

          {/* 3. SETTINGS */}
          <div>
            <p className="px-3 text-[10px] uppercase text-slate-500 font-bold mb-2 md:hidden lg:block">Configuration</p>
            <Link href="/master-data/services" className="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-slate-800 hover:text-white transition-colors relative">
               <Database size={18} className="flex-shrink-0" />
               <span className="md:hidden lg:block">Master Data</span>
               <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 md:group-hover:block hidden lg:hidden pointer-events-none z-50 whitespace-nowrap shadow-lg">Master Data</span>
            </Link>
          </div>

        </nav>
        
        {/* USER PROFILE */}
        <div className="p-4 border-t border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-blue-900/50 flex-shrink-0">AS</div>
            <div className="md:hidden lg:block overflow-hidden">
              <div className="text-sm font-medium text-white truncate">Ahmed Sakr</div>
              <div className="text-xs text-slate-500 truncate">System Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* MOBILE HEADER (Small Screens Only) */}
        <header className="md:hidden h-16 bg-[#141824] border-b border-slate-700 flex items-center justify-between px-4 flex-shrink-0">
           <span className="font-bold text-lg text-white tracking-wide">ALFYTRI ERP</span>
           <button onClick={() => setIsSidebarOpen(true)} className="text-slate-400 p-2">
             <Menu size={24} />
           </button>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

      </main>
    </div>
  );
}