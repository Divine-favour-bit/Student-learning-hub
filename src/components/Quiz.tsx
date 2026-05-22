import React, { useState } from "react";
import { Award, CheckCircle, XCircle, ArrowRight, BookOpen, AlertCircle, RefreshCw, Trophy } from "lucide-react";
import { QuizQuestion } from "../types";

export default function Quiz({ onPointsEarned }: { onPointsEarned?: (pts: number) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const categoriesData: Record<string, QuizQuestion[]> = {
    computerScience: [
      {
        id: 1,
        question: "What is the time complexity of searching in a perfectly balanced Binary Search Tree (BST)?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        answerIndex: 2,
        explanation: "A balanced BST halves the search space at each level, leading to logarithmic O(log n) time complexity, where n is the number of nodes."
      },
      {
        id: 2,
        question: "Which of the following describes the 'LIFO' structure?",
        options: ["Queue", "Hash Table", "Stack", "Linked List"],
        answerIndex: 2,
        explanation: "LIFO stands for Last-In-First-Out, which is the exact behavior of a Stack datatstructure (push and pop from top)."
      },
      {
        id: 3,
        question: "Which HTTP status code represents 'Unauthorized Access'?",
        options: ["400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found"],
        answerIndex: 1,
        explanation: "HTTP 401 indicates that authentication credentials are missing or invalid, whereas 403 indicates resource permissions are disallowed."
      }
    ],
    mathematics: [
      {
        id: 1,
        question: "What is the derivative of f(x) = ln(x) with respect to x?",
        options: ["1/x", "e^x", "x", "1/(x^2)"],
        answerIndex: 0,
        explanation: "The derivative of the natural log of x with respect to x is basic math calculus rule d/dx[ln(x)] = 1/x."
      },
      {
        id: 2,
        question: "What is the value of the limit of sin(x)/x as x approaches 0?",
        options: ["0", "Infinity", "1", "Does not exist"],
        answerIndex: 2,
        explanation: "By L'Hopital's rule or basic trigonometric limit theorem, lim(x->0) sin(x)/x equals cos(0)/1 which is 1."
      }
    ],
    generalSci: [
      {
        id: 1,
        question: "Which chemical element is represented by the symbol 'Au'?",
        options: ["Silver", "Gold", "Copper", "Platinum"],
        answerIndex: 1,
        explanation: "'Au' comes from the Latin word 'aurum', meaning dawn - symbol for Gold."
      }
    ]
  };

  const startQuiz = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIdx(0);
    setSelectedAns(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleNext = () => {
    const questions = categoriesData[selectedCategory!];
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAns(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      if (onPointsEarned) {
        // Award points based on performance: (score * 100 points) + bonus for full marks
        const pointsEarned = (score + (selectedAns === questions[currentIdx].answerIndex ? 1 : 0)) * 100;
        onPointsEarned(pointsEarned);
      }
    }
  };

  const handleSubmitQuestion = () => {
    if (selectedAns === null || isSubmitted) return;
    const isCorrect = selectedAns === categoriesData[selectedCategory!][currentIdx].answerIndex;
    if (isCorrect) setScore((prev) => prev + 1);
    setIsSubmitted(true);
  };

  const currentQuestions = selectedCategory ? categoriesData[selectedCategory] : [];
  const currentQ = currentQuestions[currentIdx];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-105 dark:border-slate-800">
      {!selectedCategory ? (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-5 h-5 text-amber-500 animate-bounce" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">Interactive Daily Challenge Quizzes</h3>
          </div>
          
          <p className="text-xs text-slate-500 dark:text-slate-450 mb-6 leading-relaxed">
            Test your knowledge across core departments, level up on the Student Leaderboard, and earn profile achievements!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50/20 dark:bg-blue-950/10 flex flex-col justify-between">
              <div>
                <span className="text-xl">💻</span>
                <h4 className="font-bold text-slate-850 dark:text-slate-200 text-sm mt-2">Computer Science</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Algorithms, binary graphs, React states, and HTTP structures.
                </p>
              </div>
              <button
                onClick={() => startQuiz("computerScience")}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg cursor-pointer transition-colors"
              >
                Launch CS Quiz
              </button>
            </div>

            <div className="p-4 rounded-xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/10 dark:bg-amber-950/10 flex flex-col justify-between">
              <div>
                <span className="text-xl">📐</span>
                <h4 className="font-bold text-slate-850 dark:text-slate-200 text-sm mt-2">Mathematics Calculus</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Differential limits, logarithms integrals, and vector analysis.
                </p>
              </div>
              <button
                onClick={() => startQuiz("mathematics")}
                className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-2 rounded-lg cursor-pointer transition-colors"
              >
                Launch Calculus Quiz
              </button>
            </div>

            <div className="p-4 rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/10 dark:bg-purple-950/10 flex flex-col justify-between">
              <div>
                <span className="text-xl">🔬</span>
                <h4 className="font-bold text-slate-850 dark:text-slate-200 text-sm mt-2">General Sciences</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Chemistry symbols and physical models.
                </p>
              </div>
              <button
                onClick={() => startQuiz("generalSci")}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold py-2 rounded-lg cursor-pointer transition-colors"
              >
                Launch Sciences Quiz
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Header Progress */}
          <div className="flex items-center justify-between mb-5 select-none pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
              Category: {selectedCategory === "computerScience" ? "Computer Science" : selectedCategory === "mathematics" ? "Mathematics" : "General Sciences"}
            </span>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono px-2 py-0.5 rounded-sm">
              Question {currentIdx + 1} of {currentQuestions.length}
            </span>
          </div>

          {!quizFinished ? (
            <div className="space-y-5">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base leading-relaxed">
                {currentQ.question}
              </h4>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, i) => {
                  let borderClass = "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850";
                  let bgClass = "bg-white dark:bg-slate-905";

                  if (selectedAns === i) {
                    borderClass = "border-blue-600 dark:border-blue-500 ring-1 ring-blue-600 dark:ring-blue-500";
                    bgClass = "bg-blue-50/30 dark:bg-blue-950/10";
                  }

                  if (isSubmitted) {
                    if (currentQ.answerIndex === i) {
                      borderClass = "border-green-600 dark:border-green-500 ring-1 ring-green-600 dark:ring-green-500";
                      bgClass = "bg-green-50/20 dark:bg-green-950/10";
                    } else if (selectedAns === i) {
                      borderClass = "border-red-600 dark:border-red-500 ring-1 ring-red-600 dark:ring-red-500";
                      bgClass = "bg-red-50/20 dark:bg-red-950/10";
                    } else {
                      borderClass = "border-slate-200 dark:border-slate-800 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isSubmitted}
                      onClick={() => setSelectedAns(i)}
                      className={`w-full text-left p-3.5 rounded-xl border text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${borderClass} ${bgClass}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && currentQ.answerIndex === i && (
                        <CheckCircle className="w-4 h-4 text-green-600 shrink-0 ml-2" />
                      )}
                      {isSubmitted && selectedAns === i && currentQ.answerIndex !== i && (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 justify-end pt-2">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmitQuestion}
                    disabled={selectedAns === null}
                    className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                      selectedAns !== null
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>{currentIdx + 1 === currentQuestions.length ? "Finish Test" : "Next Question"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Explanations block */}
              {isSubmitted && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-905 border border-slate-200 dark:border-slate-800 mt-4 leading-relaxed flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Study explanation</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">{currentQ.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <Award className="w-12 h-12 text-amber-500 mx-auto animate-bounce mb-3" />
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">Quiz Completed!</h4>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
                You scored <strong className="text-blue-600 dark:text-blue-400">{score}</strong> out of{" "}
                <strong>{currentQuestions.length}</strong>.
              </p>

              <div className="bg-green-50/20 dark:bg-green-950/10 border border-green-200 dark:border-green-900 rounded-xl p-3 max-w-sm mx-auto mb-6 text-xs text-green-700 dark:text-green-300 font-bold">
                🎉 +{(score) * 100} Academic Points added to your global Leaderboard position!
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-350 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border border-transparent"
                >
                  Other Categories
                </button>
                <button
                  onClick={() => startQuiz(selectedCategory)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
