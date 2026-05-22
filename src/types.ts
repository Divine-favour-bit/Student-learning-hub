export interface CourseMaterial {
  id: string;
  title: string;
  courseCode: string;
  department: string;
  category: "lecture-notes" | "study-guide" | "past-question" | "programming-resource";
  fileType: "pdf" | "zip" | "docx" | "link";
  fileSize?: string;
  downloads: number;
  likes: number;
  uploader: string;
  uploadDate: string;
  description?: string;
  downloadUrl?: string;
}

export interface TimetableEntry {
  id: string;
  day: string; // "Monday" | "Tuesday" | etc.
  courseCode: string;
  courseName: string;
  time: string;
  room: string;
  color?: string;
}

export interface ExamDeadline {
  id: string;
  title: string;
  type: "exam" | "assignment" | "project";
  date: string;
  courseCode: string;
  completed: boolean;
}

export interface DiscussionPost {
  id: string;
  title: string;
  department: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: Comment[];
  time: string;
  tags: string[];
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: "study-tips" | "tech" | "career" | "news";
  readTime: string;
  imageUrl: string;
  date: string;
  author: string;
  likes: number;
}

export interface ScholarshipOpportunity {
  id: string;
  title: string;
  organization: string;
  deadline: string;
  amount: string;
  link: string;
  category: "scholarship" | "internship";
  tags: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface StudentLeader {
  id: string;
  name: string;
  points: number;
  rank: number;
  avatar: string;
  badge: string;
}
