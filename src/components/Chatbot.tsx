import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, CornerDownLeft, Minimize2, Maximize2, Trash2, HelpCircle } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "👋 Hi there! I'm **EduBuddy**, your AI Study Assistant. I'm connected to the college curriculum database.\n\nAsk me anything! For example:\n* 📝 *'Explain Time Complexity & Big O notation simply.'*\n* 💡 *'Help me outline my English Research Paper.'*\n* ⚡ *'Create a quick 5-step checklist for Calculus exam preparation.'*\n* ⏱️ *'Give me advice on using the Pomodoro study technique effectively.'*",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const presets = [
    { label: "Explain Big O", text: "Can you explain Time Complexity (Big O Notation) simply with examples in Python?" },
    { label: "Calculus Prep", text: "Create a study plan for an upcoming college Calculus Exam covering integrals." },
    { label: "Essay Checklist", text: "What is the best way to structure a 5-page critical analysis essay?" },
    { label: "Acing Job Interviews", text: "Provide a mock interview checklist for an entry-level software engineering internship." }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Map state for server request format
      const chatHistory = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, chatHistory })
      });

      if (!response.ok) {
        throw new Error("Failed to receive response from study server.");
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: "model",
        text: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: "model",
        text: `⚠️ **System Note:** ${err.message || "Unable to reach your AI assistant. Please configure your GEMINI_API_KEY inside Settings > Secrets."}. We are running on simulated study mode.`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: "🧹 Memory cleared! I'm ready for the next round of academic study questions. What subject are we tackling next?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Small floating action pill */}
      {!isOpen && (
        <button
          id="btn-chatbot-float"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-5 py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm font-medium border border-blue-400/20"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span>Ask EduBuddy AI</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </button>
      )}

      {/* Main Chat Panel */}
      {isOpen && (
        <div
          id="pnl-chatbot-window"
          className={`fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-900 rounded-2xl shadow-3xl flex flex-col border border-slate-200 dark:border-slate-800 transition-all duration-300 ${
            isMinimized ? "w-96 h-14" : "w-[440px] h-[580px] max-h-[85vh] max-w-[90vw]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-t-2xl shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600/30 p-1.5 rounded-lg border border-blue-500/30">
                <Bot className="w-4 h-4 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-none flex items-center gap-1.5">
                  EduBuddy AI
                  <span className="text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/20 font-mono">3.5 Flash</span>
                </h3>
                <p className="text-[10px] text-blue-200 mt-0.5 opacity-90">Academic Companion & Tutor</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)} 
                className="hover:bg-white/10 p-1 rounded transition text-blue-200"
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={clearChat} 
                className="hover:bg-white/10 p-1 rounded transition text-blue-200" 
                title="Clear history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/10 p-1 rounded transition text-blue-200 font-bold"
                title="Close chatbot"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Body Content */}
          {!isMinimized && (
            <>
              {/* Message Log */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/30">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.role === "model" && (
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 dark:bg-blue-900/40 flex items-center justify-center shrink-0 border border-blue-400/20 mt-1">
                        <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2.5 max-w-[82%] text-sm ${
                        m.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-none shadow-md"
                          : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-150 rounded-tl-none border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
                      }`}
                    >
                      <div className="whitespace-pre-line leading-relaxed prose dark:prose-invert">
                        {m.text}
                      </div>
                      <span
                        className={`text-[9px] block mt-1.5 text-right ${
                          m.role === "user" ? "text-blue-200" : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {m.timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                      </span>
                    </div>
                    {m.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-300/50 dark:border-slate-700/50 mt-1">
                        <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center mt-1">
                      <Bot className="w-4 h-4 text-blue-600 animate-bounce" />
                    </div>
                    <div className="bg-white dark:bg-slate-800 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse [animation-delay:0.4s]"></span>
                      <span className="text-xs text-slate-400 ml-1 font-mono">EduBuddy is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Presets and Presets Header */}
              {messages.length === 1 && (
                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/50 shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1.5 block flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-blue-500" /> Smart Suggestions
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {presets.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(p.text)}
                        className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg transition-all shadow-xs cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Form */}
              <div className="p-3 border-t border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-905 rounded-b-2xl shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask standard questions or study methods..."
                    className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 border border-transparent dark:focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className={`absolute right-1.5 p-2 rounded-lg transition-colors ${
                      input.trim() && !loading
                        ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                        : "text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400 select-none">
                  <span className="flex items-center gap-1">
                    📖 Connected to AI Server
                  </span>
                  <span className="flex items-center gap-0.5">
                    Press <kbd className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">Enter</kbd> to send
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
