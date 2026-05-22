import React, { useState } from "react";
import { 
  Flame, 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  PlusCircle, 
  Trophy, 
  AlertCircle, 
  GraduationCap,
  Sparkles,
  Award
} from "lucide-react";
import { TimetableEntry } from "../types";
import Pomodoro from "./Pomodoro";

interface DashboardProps {
  points: number;
}

export default function Dashboard({ points }: DashboardProps) {
  // Mock study streak
  const [streak, setStreak] = useState(6);

  // Dynamic state for college study planner timetables
  const [timetable, setTimetable] = useState<TimetableEntry[]>([
    { id: "1", day: "Monday", courseCode: "MATH301", courseName: "Advanced Vector Calculus", time: "09:00 AM - 11:30 AM", room: "Lecture Hall B", color: "blue" },
    { id: "2", day: "Tuesday", courseCode: "CS102", courseName: "Data Structures & Algorithms", time: "01:00 PM - 03:30 PM", room: "Lab Room 4", color: "indigo" },
    { id: "3", day: "Wednesday", courseCode: "PHYS204", courseName: "Electromagnetism Theory", time: "10:30 AM - 01:00 PM", room: "Lecture Hall A", color: "purple" },
    { id: "4", day: "Thursday", courseCode: "CS102", courseName: "Data Structures & Algorithms", time: "11:00 AM - 01:00 PM", room: "Lab Room 4", color: "indigo" },
    { id: "5", day: "Friday", courseCode: "MATH301", courseName: "Advanced Vector Calculus", time: "02:00 PM - 04:00 PM", room: "Lecture Hall B", color: "blue" }
  ]);

  // Timetable Form inputs
  const [day, setDay] = useState("Monday");
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [time, setTime] = useState("09:00 AM - 11:00 AM");
  const [room, setRoom] = useState("");
  const [color, setColor] = useState("blue");

  // Daily study challenge list (Notion-style check-box)
  const [challenges, setChallenges] = useState([
    { id: "ch-1", text: "Complete 1 full Pomodoro focus interval", checked: true, score: 50 },
    { id: "ch-2", text: "Test calculus skills using practice quizzes", checked: false, score: 100 },
    { id: "ch-3", text: "Interact with EduBuddy AI chatbot on essay planning", checked: false, score: 50 },
    { id: "ch-4", text: "Revise algorithms files in Course Materials", checked: true, score: 50 }
  ]);

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode.trim() || !courseName.trim() || !room.trim()) {
      alert("⚠️ Complete all timetable class details (Course Code, Name, and Room).");
      return;
    }
    const newEntry: TimetableEntry = {
      id: String(Date.now()),
      day,
      courseCode: courseCode.toUpperCase(),
      courseName,
      time,
      room,
      color
    };
    setTimetable([...timetable, newEntry]);
    setCourseCode("");
    setCourseName("");
    setRoom("");
  };

  const handleRemoveSlot = (id: string) => {
    setTimetable(timetable.filter(item => item.id !== id));
  };

  const toggleChallenge = (id: string) => {
    setChallenges(challenges.map(ch => ch.id === id ? { ...ch, checked: !ch.checked } : ch));
  };

  // Group timetable slots by day
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Dynamic Student Statistics header row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Streak card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden select-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">My Daily Streak</p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 font-mono mt-1">{streak} Days</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 flex items-center justify-center border border-orange-500/10">
              <Flame className="w-5 h-5 fill-orange-500 text-orange-500 animate-pulse" />
            </div>
          </div>
          <div className="mt-3 text-[10px] text-slate-500 dark:text-slate-400">
            Keep logging in daily to secure your rank! Next level: <strong className="font-bold text-orange-500">10 Days</strong>
          </div>
        </div>

        {/* Global XP Points Earned */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden select-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Academic Points Earned</p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 font-mono mt-1">{points} pts</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-500/10 dark:bg-green-950/20 text-green-600 dark:text-green-400 flex items-center justify-center border border-green-500/10">
              <Trophy className="w-5 h-5 text-green-600 fill-green-500/20" />
            </div>
          </div>
          <div className="mt-3 text-[10px] text-slate-500 dark:text-slate-400">
            Points updated after you complete focus pomodoros or finish quizzes.
          </div>
        </div>

        {/* Calendar deadlines tracker overview */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden select-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Weekly Deadlines</p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 font-mono mt-1">3 Tasks</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/10">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-3 text-[10px] text-slate-500 dark:text-slate-400">
            Next: <strong className="font-bold text-blue-600 dark:text-blue-400">MATH301 Midterm Prep</strong> in 2 days.
          </div>
        </div>

        {/* Active Campus Status badge */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm relative overflow-hidden select-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">User Status Level</p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-1.5">
                Cum Laude
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/10">
              <Award className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="mt-3 text-[10px] text-slate-500 dark:text-slate-400">
            Top 5% on campus standard study rankings.
          </div>
        </div>
      </section>

      {/* Notion style study challenges checklists (Interactive) */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-slate-850 dark:text-slate-100 text-xs uppercase tracking-wider">Dynamic Daily Study Challenges</h3>
          </div>
          <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-mono font-bold">Earn bonus XP</span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-normal">
          Check off tasks to secure daily active checkpoints. Your scores are updated instantly on device:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {challenges.map((ch) => (
            <div
              key={ch.id}
              onClick={() => toggleChallenge(ch.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                ch.checked
                  ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                  : "bg-slate-50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350"
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2
                  className={`w-4.5 h-4.5 ${ch.checked ? "text-emerald-600 fill-emerald-100 dark:fill-none" : "text-slate-300"}`}
                />
                <span className={`text-xs font-semibold ${ch.checked ? "line-through opacity-70" : ""}`}>
                  {ch.text}
                </span>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                ch.checked ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20" : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }`}>
                +{ch.score} XP
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pomodoro Study Timer component integration */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-slate-850 dark:text-slate-100 text-xs uppercase tracking-wider">Core Workspace: Pomodoro & Study Timer</h3>
        </div>
        <Pomodoro />
      </section>

      {/* Day by Day Study Planner & Timetable Editor */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-md space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-slate-850 dark:text-slate-100 text-sm flex items-center gap-1.5 leading-none">
              <Calendar className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
              <span>Study Timetable Planner</span>
            </h3>
            <p className="text-[11px] text-slate-450 dark:text-slate-400 mt-1">
              Add lectures, labs, and office hours to stay on top of the campus schedule.
            </p>
          </div>
          <span className="text-[10px] bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-md font-mono font-bold">
            {timetable.length} Active Classes
          </span>
        </div>

        {/* Schedule grid day by day */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {daysOfWeek.map((currentDay) => {
            const daySlots = timetable.filter(slot => slot.day === currentDay);
            return (
              <div 
                key={currentDay}
                className="p-3 bg-slate-50/50 dark:bg-slate-950/30 border border-slate-205 dark:border-slate-800/85 rounded-xl space-y-3"
              >
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-1.5 uppercase tracking-wider font-mono select-none">
                  {currentDay}
                </h4>

                <div className="space-y-2">
                  {daySlots.map((slot) => (
                    <div 
                      key={slot.id}
                      className={`p-2.5 rounded-lg border text-[11px] leading-snug shadow-xs relative group ${
                        slot.color === "blue" 
                          ? "bg-blue-50/10 border-blue-250 dark:border-blue-900" 
                          : slot.color === "indigo" 
                          ? "bg-indigo-50/10 border-indigo-250 dark:border-indigo-900" 
                          : "bg-purple-50/10 border-purple-250 dark:border-purple-900"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1 text-[9px] font-bold font-mono">
                        <span className={slot.color === "blue" ? "text-blue-600 dark:text-blue-400" : slot.color === "indigo" ? "text-indigo-600 dark:text-indigo-400" : "text-purple-600 dark:text-purple-400"}>
                          {slot.courseCode}
                        </span>
                        
                        {/* Remove button */}
                        <button
                          onClick={() => handleRemoveSlot(slot.id)}
                          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-transparent"
                          title="Delete class"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h5 className="font-bold text-slate-800 dark:text-slate-200 truncate leading-snug">
                        {slot.courseName}
                      </h5>

                      <div className="flex items-center gap-1 mt-1.5 text-slate-450 dark:text-slate-400 font-semibold text-[9px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{slot.time}</span>
                      </div>

                      <div className="flex items-center gap-1 mt-1 text-slate-400 text-[9px] font-semibold">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{slot.room}</span>
                      </div>
                    </div>
                  ))}

                  {daySlots.length === 0 && (
                    <div className="text-center py-6 text-slate-400 text-[10px] italic">
                      No classes
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timetable planner adding form */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs mb-3 flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span>Schedule New Lecture/Lab</span>
          </h4>

          <form onSubmit={handleAddSlot} className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">Weekday</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full text-xs font-semibold bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-2 text-slate-700 dark:text-slate-250 focus:outline-hidden"
              >
                {daysOfWeek.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">Course Code</label>
              <input
                type="text"
                placeholder="e.g. MATH301"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full text-xs font-bold bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-2 text-slate-800 dark:text-slate-150 focus:outline-hidden"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">Course Title</label>
              <input
                type="text"
                placeholder="e.g. Advanced Vector Calculus"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full text-xs font-semibold bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-2 text-slate-800 dark:text-slate-150 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">Classroom / Web Link</label>
              <input
                type="text"
                placeholder="e.g. Hall B / Zoom link"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full text-xs font-semibold bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-2 text-slate-800 dark:text-slate-150 focus:outline-hidden"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Class</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
