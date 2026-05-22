import React, { useState } from "react";
import { 
  FileText, 
  ExternalLink, 
  Search, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  DollarSign, 
  Calendar,
  Compass,
  ArrowUpRight
} from "lucide-react";
import { BlogPost, ScholarshipOpportunity } from "../types";

export default function Blog() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [scholarshipFilter, setScholarshipFilter] = useState<"all" | "scholarship" | "internship">("all");
  const [oppQuery, setOppQuery] = useState("");

  const blogPosts: BlogPost[] = [
    {
      id: "b1",
      title: "5 Spaced Repetition Hacks to Pass Finals with Flying Colors",
      excerpt: "Review your notes on a systematic schedule (1, 3, 7, and 30 days) to prevent the famous standard forgetting curve from destroying your results.",
      category: "study-tips",
      readTime: "4 mins read",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300",
      date: "May 18, 2026",
      author: "Dr. Evelyn Vance",
      likes: 42
    },
    {
      id: "b2",
      title: "Getting Started with Open Source: A Guide for Sophomore Engineers",
      excerpt: "Don't restrict your portfolio to classroom toys. Learn how to discover good first issues on GitHub and configure pull requests correctly.",
      category: "tech",
      readTime: "7 mins read",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=300",
      date: "May 15, 2026",
      author: "Jordan Lee (CS TA)",
      likes: 31
    },
    {
      id: "b3",
      title: "How to Secure High-Paying Tech Internships from Campus Placement",
      excerpt: "Standard resume blueprints, algorithms prep, communication cues, and networking scripts compiled from recruiters inside top tech companies.",
      category: "career",
      readTime: "10 mins read",
      imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=300",
      date: "May 10, 2026",
      author: "Sarah Chen",
      likes: 58
    }
  ];

  const opportunities: ScholarshipOpportunity[] = [
    {
      id: "o1",
      title: "Google Software Engineering Summer Internship",
      organization: "Google LLC",
      deadline: "June 30, 2026",
      amount: "Paid Summer Term ($8,500/mo)",
      link: "https://buildyourfuture.withgoogle.com/",
      category: "internship",
      tags: ["Developer", "Data Structures", "Remote Options"]
    },
    {
      id: "o2",
      title: "Next-Gen Women in STEM National Award",
      organization: "NextGen Tech Foundation",
      deadline: "July 15, 2026",
      amount: "$10,000 Academic Grant",
      link: "https://www.nsf.gov/",
      category: "scholarship",
      tags: ["STEM", "Underrepresented", "A+ Grades"]
    },
    {
      id: "o3",
      title: "Microsoft Research PhD Fellowship Program",
      organization: "Microsoft Corp",
      deadline: "August 01, 2026",
      amount: "$42,000 Annual Stipend + Laptop",
      link: "https://www.microsoft.com/en-us/research/academic-programs/",
      category: "scholarship",
      tags: ["PhD", "Algorithms", "AI Grounding"]
    },
    {
      id: "o4",
      title: "Stripe Product Engineering Co-Op placement",
      organization: "Stripe Inc",
      deadline: "Sept 10, 2026",
      amount: "Paid Co-Op ($7,200/mo + housing)",
      link: "https://stripe.com/jobs",
      category: "internship",
      tags: ["Full Stack", "APIs", "San Francisco"]
    }
  ];

  const filteredPosts = blogPosts.filter(p => {
    if (selectedCat === "all") return true;
    return p.category === selectedCat;
  });

  const filteredOpps = opportunities.filter((op) => {
    const matchesQuery = 
      op.title.toLowerCase().includes(oppQuery.toLowerCase()) ||
      op.organization.toLowerCase().includes(oppQuery.toLowerCase()) ||
      op.tags.some(t => t.toLowerCase().includes(oppQuery.toLowerCase()));

    const matchesType = scholarshipFilter === "all" || op.category === scholarshipFilter;

    return matchesQuery && matchesType;
  });

  return (
    <div className="space-y-8 pb-10">
      
      {/* Blog & News Headline Banner */}
      <section className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Tips & Career Guides</span>
          <h2 className="text-lg md:text-xl font-bold tracking-tight">Learn Smarter: Academic Articles Board</h2>
          <p className="text-xs text-slate-350 max-w-xl">
            Read proven strategies compiled by top-tier educators, university teaching assistants, and senior engineering graduates.
          </p>
        </div>
        <Compass className="w-10 h-10 text-indigo-400 shrink-0 select-none animate-pulse" />
      </section>

      {/* Split workspace: blog posts left, opportunities directory right */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Blog Posts Column */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-150 dark:border-slate-800">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-850 dark:text-slate-150 flex items-center gap-1.5 leading-none">
              <FileText className="w-4.5 h-4.5 text-blue-600" />
              <span>Academic Guides & Handouts</span>
            </h3>

            {/* Filter selectors */}
            <div className="flex gap-1">
              {(["all", "study-tips", "tech", "career"] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    selectedCat === cat
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-650 dark:bg-slate-800 dark:text-slate-350"
                  }`}
                >
                  {cat === "all" ? "All" : cat === "study-tips" ? "Study Hacks" : cat === "tech" ? "Coding" : "Career"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {filteredPosts.map(post => {
              return (
                <div 
                  key={post.id}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs flex flex-col sm:flex-row gap-4 p-4 hover:border-blue-500/20 transition-colors"
                >
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full sm:w-36 h-36 sm:h-auto rounded-xl object-cover shrink-0 bg-slate-100"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 select-none">
                        <span className="text-[9px] bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                          {post.category === "study-tips" ? "Study Tips" : post.category === "tech" ? "Tech Tooling" : "Careers"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{post.date}</span>
                      </div>

                      <h4 className="font-extrabold text-xs md:text-sm text-slate-850 dark:text-slate-100 leading-snug">
                        {post.title}
                      </h4>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono select-none border-t border-slate-100 dark:border-slate-800/50 pt-2">
                      <span>By {post.author}</span>
                      <span>📖 {post.readTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scholarships & Opportunities Column */}
        <div className="lg:col-span-2 space-y-4 select-none">
          
          <div className="flex flex-col gap-2 pb-2 border-b border-slate-150 dark:border-slate-800">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-850 dark:text-slate-150 flex items-center gap-1.5 leading-none">
              <GraduationCap className="w-5 h-5 text-indigo-500" />
              <span>Scholarships & Placement Pipeline</span>
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-relaxed">
              Discover and apply directly to sponsored summer internships, PhD research stipends, and college grants.
            </p>
          </div>

          <div className="space-y-3">
            {/* Search Input bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by role or company..."
                value={oppQuery}
                onChange={(e) => setOppQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-905 border border-slate-205 dark:border-slate-850 rounded-lg text-[11px] text-slate-800 dark:text-white"
              />
            </div>

            {/* Type buttons */}
            <div className="flex gap-1.5">
              {(["all", "scholarship", "internship"] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setScholarshipFilter(type)}
                  className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    scholarshipFilter === type
                      ? "bg-slate-800 hover:bg-slate-850 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-650 dark:bg-slate-850 dark:text-slate-350"
                  }`}
                >
                  {type === "all" ? "All Pipeline" : type === "scholarship" ? "🎓 Scholarships" : "💼 Internships"}
                </button>
              ))}
            </div>

            {/* Opportunity card block */}
            <div className="space-y-2.5">
              {filteredOpps.map(op => {
                const isScholarship = op.category === "scholarship";
                return (
                  <div
                    key={op.id}
                    className="p-4 rounded-xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-905 flex flex-col justify-between gap-3 shadow-xs hover:border-blue-500/20 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase font-mono ${
                          isScholarship ? "bg-purple-100 text-purple-705 dark:bg-purple-950/20 dark:text-purple-300" : "bg-green-100 text-green-705 dark:bg-green-950/20 dark:text-green-300"
                        }`}>
                          {op.category}
                        </span>
                        
                        <span className="text-[9px] font-mono font-bold text-slate-450 dark:text-slate-500">
                          {op.deadline}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 leading-tight pt-1">
                        {op.title}
                      </h4>

                      <p className="text-[10px] font-medium text-slate-400">
                        {op.organization}
                      </p>

                      <p className="text-xs font-black text-blue-600 dark:text-blue-400 pt-1 flex items-center gap-1 font-mono">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{op.amount}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {op.tags.map((t, i) => (
                        <span key={i} className="text-[9px] bg-slate-50 dark:bg-slate-850 text-slate-500 px-1.5 py-0.5 rounded border border-slate-150 dark:border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={op.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-slate-600 dark:text-slate-355 hover:text-blue-650 inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 justify-center py-1.5 rounded-lg transition-colors border border-transparent"
                    >
                      <span>Apply on official portal</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                );
              })}
              {filteredOpps.length === 0 && (
                <p className="text-center text-slate-400 text-xs py-6">🔍 No specific placement matches found. Try another tag query!</p>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
