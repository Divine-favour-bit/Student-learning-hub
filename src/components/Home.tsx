import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  UserPlus, 
  ArrowRight, 
  Bookmark, 
  FileText, 
  Flame, 
  Sparkles, 
  Brain, 
  Plus, 
  BookOpen, 
  Download, 
  Code, 
  Share2,
  PhoneCall,
  Laptop
} from "lucide-react";
import { CourseMaterial, BlogPost } from "../types";

interface HomeProps {
  onTabChange: (tab: string) => void;
  mockMaterials: CourseMaterial[];
  onDownload: (id: string) => void;
  onBookmark: (id: string) => void;
  bookmarkedIds: string[];
}

export default function Home({
  onTabChange,
  mockMaterials,
  onDownload,
  onBookmark,
  bookmarkedIds
}: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  const depts = [
    { code: "all", label: "All Departments" },
    { code: "Computer Science", label: "Computer Science" },
    { code: "Mathematics", label: "Mathematics" },
    { code: "Physics", label: "Physics" },
    { code: "Engineering", label: "Engineering" }
  ];

  const filteredMaterials = mockMaterials.filter((m) => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    if (deptFilter === "all") return matchesSearch;
    return matchesSearch && m.department === deptFilter;
  });

  const studentTips = [
    {
      id: "tip-1",
      title: "Mastering Active Recall with Flashcards",
      meta: "💡 5 mins read • Study Advice",
      desc: "Stop re-reading textbooks. Use active recall to test your brain directly after every major lecture block."
    },
    {
      id: "tip-2",
      title: "Optimizing Your Spaced Repetition",
      meta: "⏱️ 8 mins read • Productivity",
      desc: "Review your lecture notes at specific intervals (1 day, 3 days, 7 days) to lock the concepts into permanent long-term memory."
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Motivational Hero banner */}
      <section 
        id="home-hero-banner"
        className="relative overflow-hidden bg-gradient-to-tr from-slate-950 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 md:p-10 border border-blue-900/40 shadow-xl"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 font-semibold px-3 py-1 rounded-full text-xs tracking-wide border border-blue-400/20 select-none">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EduBuddy AI Ready to Tutor You</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Elevate Your Study Game & Stay Masterfully Organized.
          </h2>
          
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
            Search across lecture notes, previous midterms, past answers, GPA calculators, and productivity templates custom-built for university and college students. All in one central campus platform.
          </p>

          {/* Home quick status trackers */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-sm font-bold text-blue-400 font-mono">1,400+</span>
              <p className="text-[10px] text-slate-300 mt-0.5">Resources Active</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-sm font-bold text-green-400 font-mono">99.2%</span>
              <p className="text-[10px] text-slate-300 mt-0.5">Passing Success Rate</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-sm font-bold text-amber-400 font-mono">4.8★</span>
              <p className="text-[10px] text-slate-300 mt-0.5">Student Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course libraries search bar */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="w-full md:flex-1 relative">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by course code, department name, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-205 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>
          <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 select-none">
            {depts.map((d) => (
              <button
                key={d.code}
                onClick={() => setDeptFilter(d.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  deptFilter === d.code
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-350 hover:bg-slate-200"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic searchable resources grid */}
        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {filteredMaterials.slice(0, 4).map((m) => {
              const isFav = bookmarkedIds.includes(m.id);
              return (
                <div
                  key={m.id}
                  className="p-4 border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 rounded-xl flex items-start justify-between gap-4 hover:border-blue-500/30 transition-all shadow-xs"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-blue-105 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold px-2 py-0.5 rounded-md font-mono">
                        {m.courseCode}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {m.department}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-150 text-xs md:text-sm truncate">
                      {m.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {m.description || "Comprehensive lecture materials compiled by outstanding students."}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 pt-1 select-none">
                      <span>⬇️ {m.downloads} downloads</span>
                      <span>👍 {m.likes} helpful</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => onBookmark(m.id)}
                      className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 rounded-lg transition-colors cursor-pointer border border-transparent"
                      title={isFav ? "Saved" : "Save resource"}
                    >
                      <Bookmark className={`w-4 h-4 ${isFav ? "fill-blue-600 text-blue-600" : ""}`} />
                    </button>
                    <button
                      onClick={() => onDownload(m.id)}
                      className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 rounded-lg transition-colors cursor-pointer border border-transparent"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-450 dark:text-slate-500 text-xs font-semibold">
            🔍 No specific course resources found matching "{searchQuery}". Try "CS" or view the "Course Materials" tab.
          </div>
        )}

        <div className="flex justify-end pt-1 select-none">
          <button 
            onClick={() => onTabChange("resources")}
            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Browse Complete Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Bento style Quick Tools Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* GPA Calculator Quick Box */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/20 border border-blue-100 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl w-fit">
              <span className="text-lg font-bold">🧮</span>
            </div>
            <h3 className="font-extrabold text-slate-850 dark:text-slate-100 text-sm">CGPA / GPA Simulator</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Input semester grades and unit credits to compute your cumulative GPA effortlessly. Define success benchmarks!
            </p>
          </div>
          <button
            onClick={() => onTabChange("profile")}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg cursor-pointer transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Launch GPA Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Study Planner Box */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-slate-900 dark:to-orange-950/10 border border-amber-100 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl w-fit">
              <span className="text-lg font-bold">⏱️</span>
            </div>
            <h3 className="font-extrabold text-slate-850 dark:text-slate-100 text-sm">Pomodoro Timetable Work</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Boost your focus using structured breaks. Map exam deadlines and create timetable layouts to ace assignments.
            </p>
          </div>
          <button
            onClick={() => onTabChange("dashboard")}
            className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-2 rounded-lg cursor-pointer transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Open Study Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scholarship opportunities list */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="text-yellow-500 w-4.5 h-4.5" />
              <h3 className="font-bold text-slate-800 dark:text-slate-150 text-xs uppercase tracking-wider">Scholarships & Career</h3>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-800 text-[11px] leading-tight flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">Google Tech Internship</h4>
                  <p className="text-[9px] text-slate-450 mt-0.5">Software Engineering • Deadline: June 15</p>
                </div>
                <span className="text-[10px] text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded-md font-bold font-mono">Paid</span>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-800 text-[11px] leading-tight flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">Next-Gen Science Grant</h4>
                  <p className="text-[9px] text-slate-450 mt-0.5">Academic Scholarship • Apply before July 1</p>
                </div>
                <span className="text-[10px] text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded-md font-bold font-mono">$5,000</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onTabChange("blog")}
            className="mt-4 w-full bg-slate-805 hover:bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold py-2 rounded-lg cursor-pointer transition-all border border-slate-200 dark:border-slate-700 inline-flex items-center justify-center gap-1.5"
          >
            <span>View Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Tech and Programming Section & Peer forum snippet */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Programming Resources Board */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-slate-850 dark:text-slate-100 text-xs uppercase tracking-wider">Tech & Coding Toolbox</h3>
            </div>
            <span className="text-[10px] text-indigo-700 bg-indigo-50 dark:bg-indigo-950/20 px-2 py-0.5 rounded-full font-mono">GitHub Integrated</span>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Accelerate your engineering labs with handpicked coding cheat-sheets and compiler roadmaps loaded with CS concepts.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-55 dark:bg-slate-955 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800 block text-center transition-colors">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">GitHub Roadmap</p>
                <p className="text-[9px] text-slate-400 mt-0.5">Control & Branches</p>
              </a>
              <a href="https://devdocs.io" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-55 dark:bg-slate-955 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800 block text-center transition-colors">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">DevDocs Compiler</p>
                <p className="text-[9px] text-slate-400 mt-0.5">Interactive APIs</p>
              </a>
            </div>
          </div>
        </div>

        {/* Peer Forum Workspace block */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              <h3 className="font-bold text-slate-850 dark:text-slate-100 text-xs uppercase tracking-wider">Active Campus Workspace</h3>
            </div>
            <span className="text-[10px] text-blue-700 bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 rounded-full font-mono">Live Peers</span>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Collaborate and solve assignments with smart college classmates. Share questions or arrange focus breaks in one tap.
            </p>

            <div className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl cursor-pointer" onClick={() => onTabChange("forum")}>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded-md font-bold font-mono">CS & MATH</span>
                <span className="text-[10px] text-slate-400">Jordan Lee posted</span>
              </div>
              <h4 className="font-bold text-slate-850 dark:text-slate-200 text-xs truncate mt-1">Recommended visual guides for BFS & Dynamic Programming?</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Support and Contact Block */}
      <footer className="p-6 rounded-2xl bg-slate-55 dark:bg-slate-955 border border-slate-200/50 dark:border-slate-800 p-5 select-none md:flex md:items-center md:justify-between gap-6 space-y-4 md:space-y-0">
        <div className="space-y-1.5">
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Academic Support Desk</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Encountering trouble accessing server components or lecture files? Get continuous academic coordination.
          </p>
        </div>

        <div className="flex gap-2">
          <a
            href="mailto:support@studentresourcehub.edu"
            className="bg-white hover:bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer text-center"
          >
            Email Helpdesk
          </a>
          <button
            onClick={() => alert("📞 Connect live with user helpdesk coordinate: support@studentresourcehub.edu")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold text-center cursor-pointer shadow-xs"
          >
            Live Coordinator Call
          </button>
        </div>
      </footer>
    </div>
  );
}
