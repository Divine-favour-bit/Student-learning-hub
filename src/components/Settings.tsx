import React, { useState } from "react";
import { 
  Settings, 
  Bell, 
  Moon, 
  Volume2, 
  Eye, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles,
  Info
} from "lucide-react";

interface SettingsProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function SettingsView({ darkMode, onToggleDarkMode }: SettingsProps) {
  // Alert settings state
  const [examNotify, setExamNotify] = useState(true);
  const [forumNotify, setForumNotify] = useState(true);
  const [newsletterNotify, setNewsletterNotify] = useState(false);
  const [alertsSound, setAlertsSound] = useState(true);
  const [targetGPA, setTargetGPA] = useState("3.80");

  const handleResetStorage = () => {
    if (confirm("🧹 Reset index local mock database? This will revert course notes tracker, uploaded files to factory defaults.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Title Header */}
      <section className="flex items-center gap-2">
        <Settings className="w-6 h-6 text-blue-600" />
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-850 dark:text-slate-100">Control Panel & Settings</h2>
          <p className="text-xs text-slate-500 mt-1">Configure campus notifications dashboard preferences, GPA benchmark parameters, and styling.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
        
        {/* Notifications and Sound Settings (Left) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <Bell className="w-5 h-5 text-blue-605" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-850 dark:text-slate-205">Notifications Dashboard Workspace</h3>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-150 dark:border-slate-805 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Alert 1 Day Before Exam Deadlines</h4>
                <p className="text-[10px] text-slate-450 mt-0.5 font-medium">Automatic system scans to avoid missing tests due on profile.</p>
              </div>
              <button 
                onClick={() => setExamNotify(!examNotify)}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${examNotify ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${examNotify ? "translate-x-4" : "translate-x-0"}`}></div>
              </button>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-155 dark:border-slate-805 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Classmate Forum Reply Alerts</h4>
                <p className="text-[10px] text-slate-450 mt-0.5 font-medium">Push notify when peer answers are posted under your forum thread.</p>
              </div>
              <button 
                onClick={() => setForumNotify(!forumNotify)}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${forumNotify ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${forumNotify ? "translate-x-4" : "translate-x-0"}`}></div>
              </button>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-155 dark:border-slate-805 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Weekly Opportunities Newsletter</h4>
                <p className="text-[10px] text-slate-450 mt-0.5 font-medium">Receive list digests of relevant summer internships & grants.</p>
              </div>
              <button 
                onClick={() => setNewsletterNotify(!newsletterNotify)}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${newsletterNotify ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${newsletterNotify ? "translate-x-4" : "translate-x-0"}`}></div>
              </button>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-155 dark:border-slate-805 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Sound Effects Toggle</h4>
                <p className="text-[10px] text-slate-450 mt-0.5 font-medium">Play pleasant alert chimes when Pomodoro splits conclude.</p>
              </div>
              <button 
                onClick={() => setAlertsSound(!alertsSound)}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${alertsSound ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${alertsSound ? "translate-x-4" : "translate-x-0"}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* GPA parameters & UI Presets (Right) */}
        <div className="space-y-4">
          
          {/* Target Parameter Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-105 dark:border-slate-800 pb-2.5">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-850 dark:text-slate-200">Study Milestones</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Target Graduation CGPA</label>
                <select
                  value={targetGPA}
                  onChange={(e) => setTargetGPA(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-800 dark:text-white focus:outline-hidden"
                >
                  <option value="4.00">🏆 4.00 Summa Cum Laude</option>
                  <option value="3.80">🥈 3.80 Magna Cum Laude</option>
                  <option value="3.50">🥉 3.50 Cum Laude</option>
                  <option value="3.00">📖 3.00 Standard Pass</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  We'll use this benchmark to calculate recommended focus intervals inside our study planners.
                </p>
              </div>
            </div>
          </div>

          {/* Wipe Storage Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-red-650 dark:text-red-405 border-b border-slate-105 dark:border-slate-800 pb-2.5">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider">Device Storage Cleanup</h3>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] text-slate-450 dark:text-slate-400 leading-normal">
                Wipes all calculated GPAs, newly uploaded files, current forum threads and resets back to system defaults. This is permanent.
              </p>

              <button
                onClick={handleResetStorage}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Format Local Database</span>
              </button>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-slate-950/20 border border-blue-100 dark:border-slate-800 rounded-2xl p-4 flex gap-2.5 text-[10px] text-slate-500 leading-normal">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>
              <strong>Student Resource Hub v2.1.0</strong>. Built with React, Vite, Tailwind CSS, Express, and Google Gemini API. Created to help students supercharge academic output offline or online.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
