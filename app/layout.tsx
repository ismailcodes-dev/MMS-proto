import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { 
  LayoutDashboard, Phone, Camera, 
  FileCheck, Database, Settings, 
  ChevronRight 
} from "lucide-react";

export const metadata: Metadata = {
  title: "MMS Contracts Module",
  description: "Al-Faytri ERP Prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0f111a] text-slate-200 antialiased flex h-screen overflow-hidden">
        
        {/* --- GLOBAL SIDEBAR --- */}
        <aside className="w-64 bg-[#141824] border-r border-slate-700 flex flex-col flex-shrink-0">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-slate-700">
            <span className="font-bold text-lg text-white tracking-wide">ALFYTRI ERP</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
            
            {/* 1. DASHBOARD */}
            <div className="mb-6">
              <p className="px-3 text-[10px] uppercase text-slate-500 font-bold mb-2">Overview</p>
              <Link href="/contracts/manage/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <LayoutDashboard size={18} />
                <span>Contracts Dashboard</span>
              </Link>
            </div>

            {/* 2. OPERATIONAL WORKFLOW (The Logic You Described) */}
            <div className="mb-6">
              <p className="px-3 text-[10px] uppercase text-slate-500 font-bold mb-2">Contract Workflow</p>
              
              {/* Step 1: Call Center */}
              <Link href="/call-center/visit/create" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-blue-900/20 hover:text-blue-400 transition-colors mb-1">
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>1. Call Center Visit</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100"/>
              </Link>

              {/* Step 2: Technician */}
              <Link href="/technician/visit" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-amber-900/20 hover:text-amber-400 transition-colors mb-1">
                <div className="flex items-center gap-3">
                  <Camera size={18} />
                  <span>2. Technician App</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100"/>
              </Link>

              {/* Step 3: Sales / Quotation */}
              <Link href="/sales/quotation/create" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-green-900/20 hover:text-green-400 transition-colors">
                <div className="flex items-center gap-3">
                  <FileCheck size={18} />
                  <span>3. Quotation Builder</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100"/>
              </Link>

              <Link href="/technician/routine-visit" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-amber-900/20 hover:text-amber-400 transition-colors mb-1">
                <div className="flex items-center gap-3">
                  <Camera size={18} />
                  <span>5. Technician contract vist</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100"/>
              </Link>

              <Link href="/teams/manage" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-amber-900/20 hover:text-amber-400 transition-colors mb-1">
                <div className="flex items-center gap-3">
                  <Camera size={18} />
                  <span>6. Team layout</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100"/>
              </Link>

              <Link href="/services/selector" className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-amber-900/20 hover:text-amber-400 transition-colors mb-1">
                <div className="flex items-center gap-3">
                  <Camera size={18} />
                  <span>7. New Service Look</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100"/>
              </Link>

            </div>
    
            {/* 3. SETTINGS */}
            <div>
              <p className="px-3 text-[10px] uppercase text-slate-500 font-bold mb-2">Configuration</p>
              <Link href="/master-data/services" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                <Database size={18} />
                <span>Master Data</span>
              </Link>
            </div>

          </nav>
          
          {/* User Profile Stub */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-blue-900/50">AS</div>
              <div>
                <div className="text-sm font-medium text-white">Ahmed Sakr</div>
                <div className="text-xs text-slate-500">System Admin</div>
              </div>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 overflow-auto bg-[#0f111a] relative">
          {children}
        </main>

      </body>
    </html>
  );
}