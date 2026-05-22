import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Flame, CheckCircle, Plus, Trash2, Moon, Sun, ArrowRight, BookOpen } from "lucide-react";

type Mode = "pomodoro" | "short" | "long";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function Pomodoro() {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Simple local tasks checklist inside Pomodoro component
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Read Chapter 4 of Advanced Vector Calculus notes", completed: false },
    { id: "2", text: "Revise React state management code structure", completed: true },
    { id: "3", text: "Sketch database entity relationships diagram", completed: false }
  ]);
  const [newTask, setNewTask] = useState("");

  const modeTimes = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  };

  useEffect(() => {
    setTimeLeft(modeTimes[mode]);
    setIsRunning(false);
  }, [mode]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);

    if (mode === "pomodoro") {
      setPomodoroCount((prev) => prev + 1);
      alert("🎉 Core Focus Session item completed! Time for a short breather.");
      // Auto switch to short break
      setMode("short");
    } else {
      alert("⏱️ Break ended. Ready to dive back into ultimate focus mode?");
      setMode("pomodoro");
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modeTimes[mode]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const item: Task = {
      id: String(Date.now()),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, item]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Percentage for progress bar
  const totalDuration = modeTimes[mode];
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-6">
      {/* Visual Timer Controls Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800">
        
        {/* Session mode indicators */}
        <div className="flex gap-2 mb-6">
          {(["pomodoro", "short", "long"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                mode === m
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-350"
              }`}
            >
              {m === "pomodoro" ? "🔥 Study Split" : m === "short" ? "☕ Rest" : "🌴 Break"}
            </button>
          ))}
        </div>

        {/* Large Countdown Widget */}
        <div className="relative flex items-center justify-center w-52 h-52 mb-6">
          {/* Radial Border Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-150 dark:border-slate-800"></div>
          {/* Active Progress colored overlay (represented in standard modern gradient borders or radial visual styles) */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle
              cx="104"
              cy="104"
              r="100"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-blue-600 transition-all duration-300"
              strokeDasharray="628"
              strokeDashoffset={628 - (628 * progressPercent) / 100}
            />
          </svg>
          
          <div className="text-center z-10">
            <span className="text-5xl font-mono font-bold tracking-tight text-slate-800 dark:text-slate-100">
              {formatTime(timeLeft)}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1 font-bold">
              {isRunning ? "Focusing..." : "Paused"}
            </p>
          </div>
        </div>

        {/* Start / Pause Controls */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all focus:ring-3 cursor-pointer ${
              isRunning
                ? "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500/30"
                : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500/30"
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? "Pause" : "Start Focus"}
          </button>
          <button
            onClick={resetTimer}
            className="p-3 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-300 rounded-xl transition-all cursor-pointer"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Study Stats Indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
          <Flame className="w-4 h-4 text-orange-500" />
          <span>Daily Intervals Aced:</span>
          <span className="text-orange-600 dark:text-orange-400 font-bold">{pomodoroCount}</span>
        </div>
      </div>

      {/* Mini Study Tasks List */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-bold text-slate-800 dark:text-slate-150 text-sm">Target Session Tasks</h4>
          </div>
          
          <p className="text-xs text-slate-450 dark:text-slate-400 mb-4 leading-relaxed">
            Choose or add chores to smash while the countdown is ticking!
          </p>

          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/10 text-xs transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800"
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <button
                    onClick={() => toggleTask(t.id)}
                    className="text-slate-400 hover:text-green-500 transition-colors"
                  >
                    <CheckCircle
                      className={`w-4 h-4 ${t.completed ? "text-green-500 fill-green-50" : "text-slate-300"}`}
                    />
                  </button>
                  <span
                    className={`truncate text-slate-700 dark:text-slate-300 ${
                      t.completed ? "line-through text-slate-400 dark:text-slate-500" : ""
                    }`}
                  >
                    {t.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-6 text-slate-400 text-xs">
                💤 Free slot! Add tasks below to stay on track.
              </div>
            )}
          </div>
        </div>

        {/* Task Form */}
        <form onSubmit={addTask} className="mt-4 flex gap-1.5">
          <input
            type="text"
            placeholder="Plan study task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 text-slate-800 dark:text-slate-205 focus:outline-hidden"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>
      </div>
    </div>
  );
}
