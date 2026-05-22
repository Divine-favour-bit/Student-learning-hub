import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // AI Assistant endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, chatHistory } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = getGenAI();
      
      const contentsParts: any[] = [];
      
      contentsParts.push({
        role: "user",
        parts: [{ text: "You are 'EduBuddy', a highly knowledgeable, friendly, and ultra-supportive AI study assistant on the 'Student Resource Hub' platform. You assist university/college students with concept explanation, exam preparations, general coding, essays structural feedback, research guidelines, and high-quality study advice. Answer with high clear structure in markdown, warm and encouraging tone. Use short bullet points where suitable." }]
      });
      contentsParts.push({
        role: "model",
        parts: [{ text: "Understood! I'll be EduBuddy, the empathetic, constructive, and precise educational partner for all students. I will provide excellently formatted, motivational, and directly applicable academic advice. Let's study smarter!" }]
      });

      if (chatHistory && Array.isArray(chatHistory)) {
        chatHistory.slice(-8).forEach((ch: any) => {
          contentsParts.push({
            role: ch.role === "user" ? "user" : "model",
            parts: [{ text: ch.text }]
          });
        });
      }

      contentsParts.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contentsParts,
      });

      res.json({ text: response.text || "Sorry, I couldn't generate a response." });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "Failed to communicate with AI Study Assistant." });
    }
  });

  // Forum Mock DB State
  let forumPostsAndThreads = [
    {
      id: "1",
      title: "How to prepare for Advanced Calculus midterm?",
      department: "Mathematics",
      author: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      content: "Does anyone have past questions or study guides for Real Analysis / Vector Calculus? Looking for study group partners too or maybe scheduling an online group study session!",
      likes: 12,
      comments: [
        { id: "c1", author: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100", content: "Yes! Check the 'Resources' section. I uploaded a 2025 Past Exam with solutions under MATH301.", time: "2 hours ago" },
        { id: "c2", author: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100", content: "Count me in for the study group. We can book a study room at the library this Wednesday.", time: "1 hour ago" }
      ],
      time: "3 hours ago",
      tags: ["ExamPrep", "StudyGroup", "MATH301"]
    },
    {
      id: "2",
      title: "Web Development React State Management Best Practices",
      department: "Computer Science",
      author: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      content: "Should I stick to simple local State, Context API, or learn Redux/Zustand for our class semester projects?",
      likes: 8,
      comments: [
        { id: "c3", author: "Dave K.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100", content: "Zustand is amazing and super simple compared to Redux Toolkit! Strongly recommend for college projects.", time: "5 hours ago" }
      ],
      time: "1 day ago",
      tags: ["React", "State", "CS102"]
    },
    {
      id: "3",
      title: "Recommended resources for learning Data Structures & Algorithms",
      department: "Computer Science",
      author: "Jordan Lee",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
      content: "Struggling with graph theory algorithms (BFS/DFS) and dynamic programming. Any visual guide sites?",
      likes: 19,
      comments: [
        { id: "c4", author: "Chen Wei", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100", content: "Check out Visualgo.net or NeetCode! They explain topics with step-by-step visual overlays.", time: "10 hours ago" }
      ],
      time: "2 days ago",
      tags: ["CS", "DSA", "Algorithms"]
    }
  ];

  app.get("/api/forum", (req, res) => {
    res.json(forumPostsAndThreads);
  });

  app.post("/api/forum", (req, res) => {
    const { title, department, author, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const newPost = {
      id: String(forumPostsAndThreads.length + 1),
      title,
      department: department || "General",
      author: author || "Curious Student",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
      content,
      likes: 1,
      comments: [],
      time: "Just now",
      tags: tags || []
    };
    forumPostsAndThreads.unshift(newPost);
    res.status(201).json(newPost);
  });

  app.post("/api/forum/:id/comment", (req, res) => {
    const { id } = req.params;
    const { author, content } = req.body;
    const post = forumPostsAndThreads.find(p => p.id === id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newComment = {
      id: String(post.comments.length + 1),
      author: author || "Student Peer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      content: content || "Nice observation! Thanks for sharing.",
      time: "Just now"
    };
    post.comments.push(newComment);
    res.status(201).json(post);
  });

  app.post("/api/forum/:id/like", (req, res) => {
    const { id } = req.params;
    const post = forumPostsAndThreads.find(p => p.id === id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.likes += 1;
    res.json(post);
  });

  // Serve static UI assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
