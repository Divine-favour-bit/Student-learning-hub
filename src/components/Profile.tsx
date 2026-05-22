import React, { useState } from "react";
import { 
  Trophy, 
  Trash2, 
  Plus, 
  MapPin, 
  Calendar, 
  Clock, 
  Award, 
  Calculator, 
  AlertCircle, 
  CheckSquare, 
  BookOpen, 
  GraduationCap 
} from "lucide-react";
import { ExamDeadline } from "../types";

export default function Profile() {
  // GPA Course rows state
  const [gpaCourses, setGpaCourses] = useState([
    { id: "1", courseCode: "MATH301", grade: "A", credits: 3 },
    { id: "2", courseCode: "CS102", grade: "B", credits: 4 },
    { id: "3", courseCode: "PHYS204", grade: "A", credits: 3 },
    { id: "4", courseCode: "ENG112", grade: "A", credits: 2 }
  ]);

  const [inputCode, setInputCode] = useState("");
  const [inputGrade, setInputGrade] = useState("A");
  const [inputCredits, setInputCredits] = useState(3);

  // Deadlines calendar states
  const [deadlines, setDeadlines] = useState<ExamDeadline[]>([
    { id: "d-1", title: "CS102 Graphs Homework Lab", type: "assignment", date: "2026-05-24", courseCode: "CS102", completed: false },
    { id: "d-2", title: "MATH301 Midterm Exam Block", type: "exam", date: "2026-05-28", courseCode: "MATH301", completed: false },
    { id: "d-3", title: "PHYS204 Laboratory Report", type: "project", date: "2026-06-03", courseCode: "PHYS204", completed: true }
  ]);

  // Deadlines Form Inputs
  const [deadTitle, setDeadTitle] = useState("");
  const [deadType, setDeadType] = useState<"exam" | "assignment" | "project">("assignment");
  const [deadDate, setDeadDate] = useState("2026-05-25");
  const [deadCode, setDeadCode] = useState("");

  const gradeValues: Record<string, number> = {
    "A": 4.0, "B+": 3.5, "B": 3.0, "C+": 2.5, "C": 2.0, "D": 1.0, "F": 0.0
  };

  const handleAddGpaCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    
    setGpaCourses([
      ...gpaCourses,
      {
        id: String(Date.now()),
        courseCode: inputCode.toUpperCase(),
        grade: inputGrade,
        credits: Number(inputCredits)
      }
    ]);
    setInputCode("");
  };

  const handleRemoveGpaCourse = (id: string) => {
    setGpaCourses(gpaCourses.filter(c => c.id !== id));
  };

  // GPA calculation logic
  const calculateGPA = () => {
    let totalCredits = 0;
    let earnedGradePoints = 0;

    gpaCourses.forEach(c => {
      const gpv = gradeValues[c.grade] ?? 4.0;
      earnedGradePoints += gpv * c.credits;
      totalCredits += c.credits;
    });

    if (totalCredits === 0) return "0.00";
    return (earnedGradePoints / totalCredits).toFixed(2);
  };

  const handleAddDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deadTitle.trim() || !deadCode.trim()) {
      alert("⚠️ Provide deadline heading and course code.");
      return;
    }

    const newItem: ExamDeadline = {
      id: String(Date.now()),
      title: deadTitle,
      type: deadType,
      date: deadDate,
      courseCode: deadCode.toUpperCase(),
      completed: false
    };

    setDeadlines([...deadlines, newItem]);
    setDeadTitle("");
    setDeadCode("");
  };

  const handleToggleDeadline = (id: string) => {
    setDeadlines(deadlines.map(d => d.id === id ? { ...d, completed: !d.completed } : d));
  };

  const handleRemoveDeadline = (id: string) => {
    setDeadlines(deadlines.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Profile Overview Card Header */}
      <section className="bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-6 select-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-xl pointer-events-none"></div>

        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250" 
          alt="Sampson Obiefuna"
          className="w-20 h-20 rounded-full object-cover border-4 border-slate-100 dark:border-slate-850 shadow-md"
        />

        <div className="flex-1 text-center md:text-left space-y-1">
          <h2 className="text-lg font-black text-slate-850 dark:text-slate-150">Sampson Obiefuna</h2>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wide">University sophomore • Computer Science</p>
          <div className="flex flex-wrap gap-2 pt-1 justify-center md:justify-start text-[10px]">
            <span className="bg-slate-105 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-500 dark:text-slate-400">ID: #99023412</span>
            <span className="bg-slate-105 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-500 dark:text-slate-400">Class of 2028</span>
            <span className="bg-green-105 dark:bg-green-950/20 px-2 py-0.5 rounded font-mono font-bold text-green-700">CGPA Status: Perfect</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-805 text-center min-w-[120px]">
          <p className="text-[9px] text-slate-400 font-bold uppercase">Semester GPA</p>
          <h3 className="text-3xl font-black text-blue-600 font-mono mt-0.5">{calculateGPA()}</h3>
          <span className="text-[9px] text-slate-405 font-mono">Based on {gpaCourses.length} courses</span>
        </div>
      </section>

      {/* Main Split: GPA calculator vs Deadlines calendar tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GPA Calculator Column (Left) */}
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <Calculator className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-850 dark:text-slate-100">Semester GPA Calc</h3>
              <p className="text-[10px] text-slate-400 font-medium">Recompute academic predictions on the fly</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Added Course rows list */}
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {gpaCourses.map(course => (
                <div 
                  key={course.id}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/15 text-xs flex justify-between items-center group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-800 dark:text-slate-205 py-0.5 px-2 bg-slate-200 dark:bg-slate-800 rounded font-mono text-[10px]">
                      {course.courseCode}
                    </span>
                    <span className="text-slate-500 font-semibold">{course.credits} Credits</span>
                  </div>
                  
                  <div className="flex items-center gap-3.5 select-none font-bold">
                    <span className="font-mono bg-blue-100/50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2.5 py-0.5 rounded">
                      Grade: {course.grade} ({gradeValues[course.grade]} points)
                    </span>
                    
                    <button
                      onClick={() => handleRemoveGpaCourse(course.id)}
                      className="text-slate-300 hover:text-red-500 cursor-pointer border border-transparent"
                      title="Remove course from prediction"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {gpaCourses.length === 0 && (
                <p className="text-center text-slate-400 text-xs py-10">💤 Calculator clean! Add courses below to predict semester milestones.</p>
              )}
            </div>

            {/* GPA input form */}
            <form onSubmit={handleAddGpaCourse} className="p-3.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 space-y-3 select-none">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Course Code</label>
                  <input
                    type="text"
                    placeholder="MATH301"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full text-xs font-bold bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-850 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Letter Grade</label>
                  <select
                    value={inputGrade}
                    onChange={(e) => setInputGrade(e.target.value)}
                    className="w-full text-xs font-semibold bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-slate-705 dark:text-slate-250 focus:outline-hidden"
                  >
                    {Object.keys(gradeValues).map(gr => (
                      <option key={gr} value={gr}>{gr}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Credit hours</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={inputCredits}
                    onChange={(e) => setInputCredits(Number(e.target.value))}
                    className="w-full text-xs font-semibold bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-slate-850 dark:text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 rounded-lg cursor-pointer transition-colors"
              >
                Insert Course predict details (+ GPA impact)
              </button>
            </form>

            <div className="bg-slate-50 dark:bg-slate-955 rounded-xl p-3 text-[10px] text-slate-500 leading-normal flex gap-2">
              <AlertCircle className="w-4 h-4 text-blue-500 shrink-0" />
              <span>
                Standard university grading framework is mapped: A (4.0), B+ (3.5), B (3.0), C+ (2.5), C (2.0), D (1.0), F (0.0). Cumulative credits are updated automatically.
              </span>
            </div>
          </div>
        </section>

        {/* Deadlines exam calendar tracker */}
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
          
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <Calendar className="w-5 h-5 text-indigo-500 animate-pulse" />
            <div>
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-850 dark:text-slate-100">Exams & Deadlines Tracker</h3>
              <p className="text-[10px] text-slate-400 font-medium">Coordinate test dates and term submissions</p>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* List log */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {deadlines.map((dl) => (
                <div 
                  key={dl.id}
                  className={`p-3 rounded-xl border flex justify-between items-center text-xs transition-opacity ${
                    dl.completed ? "border-slate-100 bg-slate-50 dark:bg-slate-955 opacity-60" : "border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-905"
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <button
                      onClick={() => handleToggleDeadline(dl.id)}
                      className="mt-0.5 text-slate-350 hover:text-green-600 transition-colors shrink-0"
                    >
                      <CheckSquare className={`w-4.5 h-4.5 ${dl.completed ? "text-green-500 fill-green-50" : "text-slate-300"}`} />
                    </button>
                    
                    <div className="min-w-0">
                      <h4 className={`font-bold text-slate-850 dark:text-slate-200 truncate leading-snug ${dl.completed ? "line-through text-slate-400" : ""}`}>
                        {dl.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 font-semibold">
                        Code: <span className="font-bold text-blue-600 leading-none">{dl.courseCode}</span> • Due: {dl.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 select-none shrink-0 border border-transparent">
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded font-mono ${
                      dl.type === "exam" 
                        ? "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-300" 
                        : dl.type === "project" 
                        ? "bg-purple-50 text-purple-700 dark:bg-purple-950/20 dark:text-purple-300" 
                        : "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-300"
                    }`}>
                      {dl.type}
                    </span>

                    <button
                      onClick={() => handleRemoveDeadline(dl.id)}
                      className="text-slate-300 hover:text-red-500 cursor-pointer border border-transparent p-1 hover:bg-slate-105 rounded"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
              {deadlines.length === 0 && (
                <p className="text-center text-slate-400 text-xs py-10 font-semibold">💤 Relax! No upcoming deadlines on file.</p>
              )}
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleAddDeadline} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 space-y-2.5 select-none">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">Task Description</label>
                  <input
                    type="text"
                    placeholder="e.g. CS102 Midterm Exam Review"
                    selected-attr="true"
                    value={deadTitle}
                    onChange={(e) => setDeadTitle(e.target.value)}
                    className="w-full text-xs font-semibold bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-850 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CS102"
                    value={deadCode}
                    onChange={(e) => setDeadCode(e.target.value)}
                    className="w-full text-xs font-bold bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-850 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">Type</label>
                  <select
                    value={deadType}
                    onChange={(e) => setDeadType(e.target.value as any)}
                    className="w-full text-xs font-semibold bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-slate-700 dark:text-slate-250 focus:outline-hidden"
                  >
                    <option value="assignment">📂 Assignment</option>
                    <option value="exam">📝 Midterm/Exam</option>
                    <option value="project">🧪 Project Lab</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">Due Date</label>
                  <input
                    type="date"
                    value={deadDate}
                    onChange={(e) => setDeadDate(e.target.value)}
                    className="w-full text-xs font-semibold bg-white dark:bg-slate-955 border border-slate-205 dark:border-slate-800 rounded-lg px-2 py-1.5 text-slate-800 dark:text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-805 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-bold py-1.5 rounded-lg cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
              >
                Schedule Task deadline
              </button>
            </form>

          </div>
        </section>

      </div>
    </div>
  );
}
