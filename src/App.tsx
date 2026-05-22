import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Resources from "./components/Resources";
import Forum from "./components/Forum";
import Blog from "./components/Blog";
import Profile from "./components/Profile";
import SettingsView from "./components/Settings";
import Chatbot from "./components/Chatbot";
import Leaderboard from "./components/Leaderboard";
import { CourseMaterial } from "./types";
import { Bell, Sparkles, X, BookOpen, AlertCircle } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [points, setPoints] = useState<number>(300); // Sampson starts with 300 base XP
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["m-1"]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Global Course materials list (supports adding and searching on device)
  const [materials, setMaterials] = useState<CourseMaterial[]>([
    {
      id: "m-1",
      title: "MATH301: Midterm Practice Exam Keys (2025)",
      courseCode: "MATH301",
      department: "Mathematics",
      category: "past-question",
      fileType: "pdf",
      fileSize: "1.4 MB",
      downloads: 325,
      likes: 112,
      uploader: "Dr. Evelyn Vance",
      uploadDate: "May 10, 2026",
      description: "Verified key answers covering Green's theorems, double path integrals, and conservative fields theorems."
    },
    {
      id: "m-2",
      title: "CS102: Data Structures & Algorithms cheat-sheets",
      courseCode: "CS102",
      department: "Computer Science",
      category: "study-guide",
      fileType: "docx",
      fileSize: "840 KB",
      downloads: 512,
      likes: 195,
      uploader: "Jordan Lee (CS TA)",
      uploadDate: "May 12, 2026",
      description: "Compact visual layout representing big-O memory complexities, hash trees, and BFS graph traversals."
    },
    {
      id: "m-3",
      title: "PHYS204: Electromagnetism Theory Laboratory Guide",
      courseCode: "PHYS204",
      department: "Physics",
      category: "lecture-notes",
      fileType: "zip",
      fileSize: "4.8 MB",
      downloads: 142,
      likes: 38,
      uploader: "Prof. Alan Turing",
      uploadDate: "April 28, 2026",
      description: "Interactive lab blueprints with sample reports, measurement graphs, and formulas derivations guide."
    }
  ]);

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: "1", title: "📝 New calculus resources published", desc: "MATH301: Midterm Practice Exam keys are now available inside Course Materials.", time: "2 hours ago", read: false },
    { id: "2", title: "💬 2 classmates commented on your post", desc: "'How to prepare for Calculus midterm' thread received answers from Sarah Chen.", time: "5 hours ago", read: false },
    { id: "3", title: "💼 Software Co-op opportunity accepts sophomores", desc: "Stripe Product Engineering Summer Co-Op portal is active on opportunities board.", time: "1 day ago", read: true }
  ]);

  // Handle document theme modification when dark mode toggles
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleIncrementPoints = (pts: number) => {
    setPoints((prev) => prev + pts);
    // Add custom notification for points earned
    const newNotify: NotificationItem = {
      id: String(Date.now()),
      title: "🔥 Points Earned!",
      desc: `Congratulations! You scored +${pts} XP points by finishing a daily challenge test.`,
      time: "Just now",
      read: false
    };
    setNotifications((prev) => [newNotify, ...prev]);
  };

  const handleAddMaterialItem = (item: CourseMaterial) => {
    setMaterials((prev) => [item, ...prev]);
  };

  const handleBookmarkItem = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(bId => bId !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  const handleDownloadItem = (id: string) => {
    // Increment download trigger count
    setMaterials(materials.map(m => m.id === id ? { ...m, downloads: m.downloads + 1 } : m));
    alert("📥 Study document layout sent to browser download directory!");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Main layout router rendering
  const renderTabContent = () => {
    switch (currentTab) {
      case "home":
        return (
          <Home 
            onTabChange={setCurrentTab}
            mockMaterials={materials}
            onDownload={handleDownloadItem}
            onBookmark={handleBookmarkItem}
            bookmarkedIds={bookmarkedIds}
          />
        );
      case "dashboard":
        return (
          <Dashboard 
            points={points}
          />
        );
      case "resources":
        return (
          <Resources 
            materials={materials}
            onUpload={handleAddMaterialItem}
            onDownload={handleDownloadItem}
            onBookmark={handleBookmarkItem}
            bookmarkedIds={bookmarkedIds}
          />
        );
      case "forum":
        return (
          <Forum />
        );
      case "blog":
        return (
          <Blog />
        );
      case "profile":
        return (
          <Profile />
        );
      case "settings":
        return (
          <SettingsView 
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
        );
      default:
        return (
          <Home 
            onTabChange={setCurrentTab}
            mockMaterials={materials}
            onDownload={handleDownloadItem}
            onBookmark={handleBookmarkItem}
            bookmarkedIds={bookmarkedIds}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex flex-col md:flex-row transition-colors duration-350">
      
      {/* Structural responsive sidebar navigation */}
      <Sidebar 
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        unreadNotifications={unreadCount}
        onOpenNotifications={() => setShowNotifications(true)}
      />

      {/* Main Study platform workspace */}
      <main className="flex-1 min-w-0 p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Workspace board list (Center Column) */}
        <div className="flex-1 space-y-6">
          
          {/* Header section with notifications alerts triggers on desktop */}
          <div className="hidden md:flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-4.5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-1.5 select-none leading-none">
              <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
              <div>
                <h2 className="font-extrabold text-xs text-slate-800 dark:text-slate-100 uppercase tracking-widest font-mono">Student Resource Hub</h2>
                <p className="text-[10px] text-slate-400 mt-1 font-bold">University & College Digital Campus Workspace</p>
              </div>
            </div>

            <div className="flex items-center gap-4 select-none">
              <div className="text-right text-[11px] font-mono">
                <span className="font-extrabold text-blue-650 dark:text-blue-400">{points} XP</span>
                <span className="text-slate-400"> (Sampson's academic profile points)</span>
              </div>

              {/* Notification icon trigger */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 rounded-xl transition-all cursor-pointer border border-transparent"
                title="Notifications Dashboard"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-650 animate-bounce"></span>
                )}
              </button>
            </div>
          </div>

          {/* Active Tab rendering layout */}
          {renderTabContent()}

        </div>

        {/* Global Widget Sidebar (Right Column) only on desktop - displaying leaderboards or study tests */}
        <div className="w-full lg:w-80 shrink-0 space-y-6 select-none">
          
          {/* Interactive practice testing module */}
          <Leaderboard 
            currentPoints={points - 300}
          />

          {/* Dynamic Daily Challenge Quizzing component */}
          <div className="bg-slate-50 dark:bg-slate-950/20 rounded-2xl">
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">QUICK TEST MODULE</label>
            <HomeQuiz onPointsEarned={handleIncrementPoints} />
          </div>

        </div>

      </main>

      {/* Floating ask AI tutor assistant */}
      <Chatbot />

      {/* Slide-out side notifications panel */}
      {showNotifications && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex justify-end">
          <div 
            className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-3xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4 mb-4 select-none">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-605" />
                  <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-150 uppercase tracking-wider">My Notification Board</h3>
                </div>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action utilities */}
              {notifications.length > 0 && (
                <div className="flex justify-between pb-3 select-none text-[10px] font-mono text-slate-450">
                  <button onClick={handleMarkAllNotificationsRead} className="hover:text-blue-600 transition-colors cursor-pointer">Mark all read</button>
                  <button onClick={handleClearNotifications} className="hover:text-red-500 transition-colors cursor-pointer">Wipe clear</button>
                </div>
              )}

              {/* Notification items */}
              <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      n.read 
                        ? "bg-slate-50/50 border-slate-105 dark:bg-slate-950/10 dark:border-slate-855 opacity-70"
                        : "bg-blue-50/20 border-blue-150 dark:bg-blue-950/10 dark:border-blue-900"
                    }`}
                  >
                    <div className="flex justify-between items-start select-none">
                      <span className={`text-[9px] font-bold uppercase ${n.read ? "text-slate-400" : "text-blue-600 dark:text-blue-400"}`}>
                        {n.read ? "Read Notification" : "Active Event"}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">{n.time}</span>
                    </div>

                    <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-150 mt-1 leading-tight">{n.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal mt-1">{n.desc}</p>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="text-center py-20 text-slate-400 text-xs font-semibold">
                    💤 No active academic event logs on dashboard. You're completely up to speed!
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowNotifications(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Back to Campus Workspace
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// Inline Wrapper to pass onPointsEarned cleanly without circular loading issues
import Quiz from "./components/Quiz";
function HomeQuiz({ onPointsEarned }: { onPointsEarned: (pts: number) => void }) {
  return (
    <Quiz onPointsEarned={onPointsEarned} />
  );
}
