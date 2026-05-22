import React, { useState } from "react";
import { 
  Search, 
  Download, 
  Bookmark, 
  Trash2, 
  Plus, 
  Filter, 
  FolderOpen, 
  FileText, 
  HelpCircle, 
  Code,
  GraduationCap,
  Sparkles,
  Link
} from "lucide-react";
import { CourseMaterial } from "../types";

interface ResourcesProps {
  materials: CourseMaterial[];
  onUpload: (newMat: CourseMaterial) => void;
  onBookmark: (id: string) => void;
  onDownload: (id: string) => void;
  bookmarkedIds: string[];
}

export default function Resources({
  materials,
  onUpload,
  onBookmark,
  onDownload,
  bookmarkedIds
}: ResourcesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Upload state
  const [upTitle, setUpTitle] = useState("");
  const [upCode, setUpCode] = useState("");
  const [upDept, setUpDept] = useState("Computer Science");
  const [upCat, setUpCat] = useState<"lecture-notes" | "study-guide" | "past-question" | "programming-resource">("lecture-notes");
  const [upType, setUpType] = useState<"pdf" | "zip" | "docx" | "link">("pdf");
  const [upSize, setUpSize] = useState("2.4 MB");
  const [upDesc, setUpDesc] = useState("");

  // Departments List
  const departments = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Engineering", "General"];

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upTitle.trim() || !upCode.trim()) {
      alert("⚠️ Please specify file title and course code!");
      return;
    }

    const newMaterial: CourseMaterial = {
      id: String(Date.now()),
      title: upTitle,
      courseCode: upCode.toUpperCase(),
      department: upDept,
      category: upCat,
      fileType: upType,
      fileSize: upType === "link" ? "External redirect" : upSize,
      downloads: 0,
      likes: 0,
      uploader: "Sampson Obiefuna (You)",
      uploadDate: new Date().toLocaleDateString(),
      description: upDesc || "Student resource material uploaded to Shared campus archives."
    };

    onUpload(newMaterial);
    setUpTitle("");
    setUpCode("");
    setUpDesc("");
    alert("🎉 Your study material has been uploaded to the Student Resource Hub index! Thank you for supporting peer studies.");
  };

  const filtered = materials.filter((m) => {
    const matchesSearch = 
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.courseCode.toLowerCase().includes(search.toLowerCase()) ||
      (m.description || "").toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === "all" || m.category === selectedCategory;
    const matchesDept = selectedDept === "all" || m.department === selectedDept;

    return matchesSearch && matchesCategory && matchesDept;
  });

  const categories = [
    { code: "all", label: "📚 All Classes", color: "bg-slate-100 text-slate-800" },
    { code: "lecture-notes", label: "✍️ Lecture Notes", color: "bg-blue-50 text-blue-700" },
    { code: "study-guide", label: "🔑 Study Guides", color: "bg-amber-50 text-amber-700" },
    { code: "past-question", label: "📝 Past Questions Archive", color: "bg-green-50 text-green-700" },
    { code: "programming-resource", label: "💻 Programming Labs", color: "bg-indigo-50 text-indigo-700" }
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Title Header with info summary banner */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-850 dark:text-slate-100 flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-blue-600" />
            <span>Materials and Guides Library</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-450 mt-1 leading-normal">
            Browse and search files uploaded by university students, sorted by category and department.
          </p>
        </div>
      </section>

      {/* Main categories navigation menu & filters search bar */}
      <section className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4 select-none">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.code}
              onClick={() => setSelectedCategory(c.code)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c.code
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "bg-slate-50 text-slate-600 dark:bg-slate-850 dark:text-slate-350 hover:bg-slate-100"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by course name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-white"
            />
          </div>

          {/* Department filter selection */}
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-250 focus:outline-hidden"
            >
              <option value="all">🏢 All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Main grids containing PDFs / Docs */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Materials List Display */}
        <div className="lg:col-span-2 space-y-3.5">
          {filtered.length > 0 ? (
            filtered.map((mat) => {
              const isSaved = bookmarkedIds.includes(mat.id);
              return (
                <div 
                  key={mat.id}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-4.5 rounded-2xl shadow-xs transition-all hover:border-blue-500/30 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-blue-105 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold px-2 py-0.5 rounded-md font-mono">
                        {mat.courseCode}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {mat.department} • {mat.uploader}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-850 dark:text-slate-100 text-xs md:text-sm">
                      {mat.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">
                      {mat.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1.5 text-[10px] font-mono text-slate-450 dark:text-slate-500 select-none">
                      <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[9px] font-sans font-bold uppercase tracking-wider">
                        {mat.fileType} • {mat.fileSize || "1.2 MB"}
                      </span>
                      <span>Uploaded {mat.uploadDate}</span>
                      <span>👍 {mat.likes} likes</span>
                      <span>⬇️ {mat.downloads} downloads</span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex flex-col gap-2 shrink-0 select-none">
                    <button
                      onClick={() => onBookmark(mat.id)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 rounded-xl transition-colors cursor-pointer border border-transparent"
                      title={isSaved ? "Saved" : "Save file"}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? "fill-blue-650 text-blue-650" : ""}`} />
                    </button>
                    <button
                      onClick={() => onDownload(mat.id)}
                      className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:dark:bg-blue-900/50 rounded-xl transition-colors cursor-pointer flex items-center justify-center border border-transparent"
                      title="Download material"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-450 dark:text-slate-550 text-xs">
              💤 No course materials found. Try resetting our filters or enter alternate search keywords.
            </div>
          )}
        </div>

        {/* Upload widget form sidebar */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 text-white p-5 rounded-2xl shadow-md border border-blue-900/40 space-y-4">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-blue-300 animate-pulse" />
                <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wider">Submit Peer Study Guide</h3>
              </div>
              <p className="text-[10px] text-slate-300 leading-normal">
                Share high-scoring exam files, notes digests, or homework guidelines to back the campus library!
              </p>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div>
                <label className="block text-[9px] font-bold text-slate-300 uppercase tracking-wide mb-1">Resource Title</label>
                <input
                  type="text"
                  placeholder="e.g. MATH301 Midterm Past Questions with Answers"
                  value={upTitle}
                  onChange={(e) => setUpTitle(e.target.value)}
                  className="w-full text-xs font-semibold bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-hidden focus:ring-1 focus:ring-blue-400 placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-300 uppercase tracking-wide mb-1">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. MATH301"
                    value={upCode}
                    onChange={(e) => setUpCode(e.target.value)}
                    className="w-full text-xs font-bold bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-hidden focus:ring-1 focus:ring-blue-400 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-300 uppercase tracking-wide mb-1">Department</label>
                  <select
                    value={upDept}
                    onChange={(e) => setUpDept(e.target.value)}
                    className="w-full text-xs font-semibold bg-slate-900 border border-white/10 rounded-lg px-2 py-2 text-slate-305 focus:outline-hidden"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-300 uppercase tracking-wide mb-1">Doc Category</label>
                  <select
                    value={upCat}
                    onChange={(e) => setUpCat(e.target.value as any)}
                    className="w-full text-xs font-semibold bg-slate-900 border border-white/10 rounded-lg px-2 py-2 text-slate-305 focus:outline-hidden"
                  >
                    <option value="lecture-notes">Lecture Notes</option>
                    <option value="study-guide">Study Guide</option>
                    <option value="past-question">Past Question</option>
                    <option value="programming-resource">Prog Resource</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-300 uppercase tracking-wide mb-1">File Type</label>
                  <select
                    value={upType}
                    onChange={(e) => setUpType(e.target.value as any)}
                    className="w-full text-xs font-semibold bg-slate-900 border border-white/10 rounded-lg px-2 py-2 text-slate-305 focus:outline-hidden"
                  >
                    <option value="pdf">PDF</option>
                    <option value="zip">ZIP</option>
                    <option value="docx">DOCX</option>
                    <option value="link">External Link</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-300 uppercase tracking-wide mb-1">Short Description</label>
                <textarea
                  placeholder="e.g. Solutions covering line integrals, conservative vector fields, and Green's theorem. Verified by midterm A-grade peer."
                  value={upDesc}
                  onChange={(e) => setUpDesc(e.target.value)}
                  rows={2}
                  className="w-full text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-hidden focus:ring-1 focus:ring-blue-400 placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1 shadow-md shadow-blue-500/10"
              >
                <span>Upload Study material</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
