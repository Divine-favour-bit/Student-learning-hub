import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  PlusCircle, 
  Tag, 
  Eye, 
  RefreshCw, 
  Sparkles,
  HelpCircle,
  Hash
} from "lucide-react";
import { DiscussionPost } from "../types";

export default function Forum() {
  const [posts, setPosts] = useState<DiscussionPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create Post state
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newDept, setNewDept] = useState("Computer Science");
  const [newTagsText, setNewTagsText] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "Computer Science" | "Mathematics" | "General">("all");

  // Comment state mapped
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentTextState, setCommentTextState] = useState<Record<string, string>>({});

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/forum");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to load forum:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert("⚠️ Thread title and main contents are required!");
      return;
    }

    const tagsArray = newTagsText
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    try {
      const res = await fetch("/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          department: newDept,
          tags: tagsArray,
          author: "Sampson Obiefuna (You)"
        })
      });

      if (res.ok) {
        const addedPost = await res.json();
        setPosts((prev) => [addedPost, ...prev]);
        setNewTitle("");
        setNewContent("");
        setNewTagsText("");
        alert("🎉 Thread successfully opened! Peer students can now reply to your query.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikePost = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/forum/${id}/like`, { method: "POST" });
      if (res.ok) {
        const updatedPost = await res.json();
        setPosts(posts.map(p => p.id === id ? { ...p, likes: updatedPost.likes } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (id: string, e: React.FormEvent) => {
    e.preventDefault();
    const txt = commentTextState[id];
    if (!txt || !txt.trim()) return;

    try {
      const res = await fetch(`/api/forum/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: "Sampson Obiefuna (You)",
          content: txt
        })
      });

      if (res.ok) {
        const updatedPost = await res.json();
        setPosts(posts.map(p => p.id === id ? { ...p, comments: updatedPost.comments } : p));
        setCommentTextState({ ...commentTextState, [id]: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentChange = (id: string, value: string) => {
    setCommentTextState({ ...commentTextState, [id]: value });
  };

  // Filter threads based on select categories
  const filteredPosts = posts.filter(p => {
    if (activeTab === "all") return true;
    return p.department === activeTab;
  });

  return (
    <div className="space-y-8 pb-10">
      
      {/* Page header */}
      <section className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-850 dark:text-slate-100 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <span>Campus Discussion Forum</span>
          </h2>
          <p className="text-xs text-slate-550 dark:text-slate-450 mt-1">
            Solve problems together, schedule group meetings, and share knowledge with peer classmates.
          </p>
        </div>

        <button 
          onClick={fetchPosts}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 rounded-xl transition-all cursor-pointer border border-transparent"
          title="Refresh discussions board"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </section>

      {/* Main Forum Split: creation & listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Thread list (Left) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Tabs selectors bar */}
          <div className="flex border-b border-slate-150 dark:border-slate-800 pb-2 gap-2 select-none">
            {(["all", "Computer Science", "Mathematics", "General"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab === "all" ? "🌐 All Threads" : tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-400 text-xs font-semibold flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span>Loading peer contributions database...</span>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white dark:bg-slate-905 border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl shadow-xs space-y-3.5"
                >
                  {/* Thread Author line */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100/60 dark:border-slate-800/65">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={post.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"} 
                        alt={post.author} 
                        className="w-8 h-8 rounded-full border border-blue-500/10 object-cover"
                      />
                      <div className="leading-tight select-none">
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-150">{post.author}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{post.time} • Dept: <span className="font-bold text-blue-600">{post.department}</span></p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {post.tags.map((tg, idx) => (
                        <span key={idx} className="text-[9px] bg-slate-50 dark:bg-slate-850 text-slate-500 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded font-mono">
                          #{tg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Main Thread Content */}
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-xs md:text-sm text-slate-900 dark:text-slate-100 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                      {post.content}
                    </p>
                  </div>

                  {/* Comments and Like trigger lines */}
                  <div className="flex items-center gap-5 pt-1.5 border-t border-slate-100/50 dark:border-slate-800/50 text-[10px] text-slate-500 dark:text-slate-450 font-mono select-none">
                    <button 
                      onClick={(e) => handleLikePost(post.id, e)}
                      className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.likes} Helpful</span>
                    </button>

                    <button 
                      onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.comments.length} Comments</span>
                    </button>
                  </div>

                  {/* Comments box area */}
                  {activeCommentPostId === post.id && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 space-y-4">
                      {/* Comments Log */}
                      <div className="space-y-3">
                        {post.comments.map((cm) => (
                          <div key={cm.id} className="flex gap-2.5 items-start bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-2.5 rounded-lg text-xs">
                            <img 
                              src={cm.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=155"} 
                              alt={cm.author} 
                              className="w-6 h-6 rounded-full shrink-0 border border-blue-500/5 object-cover"
                            />
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2 select-none">
                                <span className="font-extrabold text-[11px] text-slate-800 dark:text-slate-150">{cm.author}</span>
                                <span className="text-[9px] text-slate-400 font-mono">{cm.time}</span>
                              </div>
                              <p className="text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">{cm.content}</p>
                            </div>
                          </div>
                        ))}
                        {post.comments.length === 0 && (
                          <p className="text-center text-slate-400 text-[11px] py-2 italic font-semibold">No comments posted yet. Suggest a solution below!</p>
                        )}
                      </div>

                      {/* Comment Input */}
                      <form onSubmit={(e) => handleAddComment(post.id, e)} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Type reply or suggest solutions..."
                          value={commentTextState[post.id] || ""}
                          onChange={(e) => handleCommentChange(post.id, e.target.value)}
                          className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
                        />
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white dark:bg-slate-905 rounded-2xl border border-slate-150 dark:border-slate-800 text-slate-450 text-xs font-semibold">
              💤 No current threads under `{activeTab}`. Open a discussion below!
            </div>
          )}

        </div>

        {/* Start new discussion (Right) */}
        <div className="space-y-4 select-none">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            
            <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-4.5 h-4.5 text-blue-605" />
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">Start Study Thread</h3>
              </div>
              <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-1 leading-normal">
                Stuck on homework questions, need notes or scheduling library slots? Ask classmate experts.
              </p>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">Topic Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Help needed with CS102 Graphs assignment"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-850 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 gap-1">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">Subject Area</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 dark:bg-slate-905 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-slate-700 dark:text-slate-250 focus:outline-hidden"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="General">General/Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">Tags (separated by comma)</label>
                <input
                  type="text"
                  placeholder="e.g. React, CS, Assignment3"
                  value={newTagsText}
                  onChange={(e) => setNewTagsText(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-850 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">Main Question Details</label>
                <textarea
                  placeholder="e.g. I am receiving a 'Maximum update depth exceeded' error inside my React custom hook. Any ideas or visual models?"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  className="w-full text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-850 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors"
              >
                Publish thread
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
