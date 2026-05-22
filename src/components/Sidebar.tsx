import React, { useState } from "react";
import { 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  User, 
  Settings, 
  Bell, 
  Sparkles,
  ChevronRight,
  Menu,
  GraduationCap
} from "lucide-react";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  unreadNotifications: number;
  onOpenNotifications: () => void;
}

export default function Sidebar({
  currentTab,
  onTabChange,
  darkMode,
  onToggleDarkMode,
  unreadNotifications,
  onOpenNotifications
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home Page", icon: Home, description: "Acing index & guidelines" },
    { id: "dashboard", label: "My Dashboard", icon: LayoutDashboard, description: "Notion productivity workspace" },
    { id: "resources", label: "Course Materials", icon: BookOpen, description: "Study notes & past papers" },
    { id: "forum", label: "Student Forum", icon: MessageSquare, description: "Discuss with peer groups" },
    { id: "blog", label: "Tips & Career", icon: FileText, description: "Scholarships & study hacks" },
    { id: "profile", label: "GPA & Deadlines", icon: User, description: "Calculators & exam calendar" },
    { id: "settings", label: "Control Panel", icon: Settings, description: "Preferences & UI toggles" }
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header id="mobile-top-bar" className="md:hidden w-full h-14 bg-blue-900 border-b border-blue-800 text-white flex items-center justify-between px-4 sticky top-0 z-40 select-none shrink-0">
        <div className="flex items-center gap-1.5">
          <GraduationCap className="w-6 h-6 text-blue-300" />
          <span className="font-bold text-sm tracking-tight">Student Resource Hub</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNotifications}
            className="relative p-1.5 hover:bg-blue-800 text-blue-200 rounded-lg"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-blue-900"></span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 hover:bg-blue-800 text-blue-200 rounded-lg"
          >
            <Menu className="w-5.5 h-5.5" />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-72 max-w-[85vw] h-full bg-slate-900 text-white p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6 select-none pb-4 border-b border-slate-800">
                <GraduationCap className="w-7 h-7 text-blue-400" />
                <h2 className="font-bold text-base tracking-tight text-slate-100">Resource Hub</h2>
              </div>

              <nav className="space-y-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all text-xs font-semibold ${
                        isActive 
                          ? "bg-blue-600 text-white" 
                          : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Theme presets</span>
              <button
                onClick={onToggleDarkMode}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] uppercase font-bold tracking-wider cursor-pointer"
              >
                {darkMode ? "☀️ Light UI" : "🌙 Dark Mode"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside 
        id="desktop-sidebar-nav" 
        className="hidden md:flex w-64 bg-slate-900 text-white p-5 flex-col justify-between shrink-0 h-screen sticky top-0 shadow-2xl border-r border-slate-800 select-none"
      >
        <div>
          {/* Brand Logo header */}
          <div className="flex items-center gap-2.5 mb-7 select-none justify-center">
            <div className="p-2 bg-blue-600/25 rounded-xl border border-blue-500/20">
              <GraduationCap className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight text-white leading-none">Student Resource</h1>
              <p className="text-[10px] text-blue-400 mt-1 uppercase font-bold tracking-widest font-mono">CAMPUS HUB</p>
            </div>
          </div>

          {/* Quick study motto alert */}
          <div className="mb-6 p-3 rounded-xl bg-slate-805 bg-gradient-to-br from-slate-950/40 to-slate-850/40 border border-slate-800 text-[11px] text-slate-450 leading-relaxed">
            <span className="font-bold text-slate-200">Quote of the Day:</span> "The expert in anything was once a beginner." Focus on tiny progress daily! 🚀
          </div>

          {/* Sidebar Menu items */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full text-left rounded-xl px-3 py-2.5 transition-all flex items-center gap-3 group relative cursor-pointer ${
                    isActive 
                      ? "bg-blue-600 hover:bg-blue-650 text-white shadow-lg shadow-blue-600/10" 
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-normal">{item.label}</p>
                    <p className={`text-[9px] mt-0.5 truncate ${isActive ? "text-blue-200" : "text-slate-500 group-hover:text-slate-400"}`}>
                      {item.description}
                    </p>
                  </div>
                  {isActive && (
                    <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer profile & setting quick stats */}
        <div className="space-y-3 pt-5 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <button
              onClick={onToggleDarkMode}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-350 rounded-lg text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full"
            >
              <span>{darkMode ? "☀️ Warm Light Mode" : "🌙 Cozy Dark Mode"}</span>
            </button>
          </div>
          <div className="flex items-center gap-2.5 px-1 bg-slate-950/20 py-2 rounded-lg leading-tight select-none">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
              alt="User" 
              className="w-8 h-8 rounded-full object-cover border border-blue-500/30"
            />
            <div className="min-w-0">
              <h4 className="text-[11px] font-bold text-slate-200 truncate">Sampson Obiefuna</h4>
              <p className="text-[9px] text-slate-500">divinefavorobiefuna@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
