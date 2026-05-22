import React from "react";
import { Trophy, Award, Star, Flame, Sparkles, UserCheck } from "lucide-react";
import { StudentLeader } from "../types";

interface LeaderboardProps {
  currentPoints: number;
}

export default function Leaderboard({ currentPoints }: LeaderboardProps) {
  // Mock study champions
  const staticLeaders: StudentLeader[] = [
    { id: "lead-1", name: "Sarah Chen", points: 2800, rank: 1, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100", badge: "🥇 Study Legend" },
    { id: "lead-2", name: "Alex Rivera", points: 2150, rank: 2, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100", badge: "🥈 Quiz Ninja" },
    { id: "lead-3", name: "Chen Wei", points: 1900, rank: 3, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100", badge: "🥉 Math Wizard" },
    { id: "lead-4", name: "Emma Watson", points: 1200, rank: 4, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100", badge: "🔥 5-Day Streak" }
  ];

  // Sampson's current student object
  const me: StudentLeader = {
    id: "me",
    name: "Sampson Obiefuna (You)",
    points: 1500 + currentPoints, // Base points + current points earned
    rank: 4, // Will calculate rank dynamically relative to other leaders
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    badge: "🎓 Active Peer Tutee"
  };

  // Combine and sort
  const allLeaders = [...staticLeaders, me].sort((a, b) => b.points - a.points);
  
  // Re-calculate rankings
  const rankedLeaders = allLeaders.map((leader, i) => ({
    ...leader,
    rank: i + 1
  }));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500 animate-pulse" />
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-850 dark:text-slate-205">Active Campus Leaderboard</h3>
        </div>
        <span className="text-[10px] bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>S2 Spring Term</span>
        </span>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
        Earn academic points by resolving practice tests, concluding focus timers, and supporting peer forum comments!
      </p>

      {/* Leaderboard layout list */}
      <div className="space-y-2">
        {rankedLeaders.map((leader) => {
          const isMe = leader.id === "me";
          const isTopThree = leader.rank <= 3;

          return (
            <div
              key={leader.id}
              className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                isMe
                  ? "bg-blue-50/40 border-blue-200 dark:bg-blue-950/15 dark:border-blue-900"
                  : "bg-slate-50/50 dark:bg-slate-950/10 border-slate-150 dark:border-slate-805"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Ranking placement indicator */}
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-black text-xs ${
                  leader.rank === 1 
                    ? "bg-amber-100/50 text-amber-600 dark:bg-amber-900/20" 
                    : leader.rank === 2 
                    ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-350" 
                    : leader.rank === 3 
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-950/20" 
                    : "text-slate-400"
                }`}>
                  {leader.rank}
                </span>

                <img 
                  src={leader.avatar} 
                  alt={leader.name} 
                  className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 object-cover shrink-0"
                />

                <div className="min-w-0">
                  <h4 className={`text-xs font-bold leading-normal truncate flex items-center gap-1.5 ${isMe ? "text-blue-700 dark:text-blue-300" : "text-slate-800 dark:text-slate-200"}`}>
                    <span>{leader.name}</span>
                    {isMe && <UserCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold font-mono">{leader.badge}</p>
                </div>
              </div>

              <div className="text-right font-mono shrink-0 select-none">
                <span className={`text-xs font-extrabold ${isMe ? "text-blue-700 dark:text-blue-400" : "text-slate-800 dark:text-slate-200"}`}>
                  {leader.points} XP
                </span>
                <p className="text-[9px] text-slate-400">Total Points</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
