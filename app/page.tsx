"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Home() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<"yes" | "no" | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isRName, setIsRName] = useState(false);

  const determineGolfSkill = (firstName: string): "yes" | "no" => {
    if (!firstName) return "no";

    const firstLetter = firstName.trim()[0].toUpperCase();

    // C, J, Z always return "Yes"
    if (firstLetter === "C" || firstLetter === "J" || firstLetter === "Z") {
      return "yes";
    }

    // R always returns "No"
    if (firstLetter === "R") {
      return "no";
    }

    // Logic for other letters
    // Vowels (A, E, I, O, U) - Yes
    if (["A", "E", "I", "O", "U"].includes(firstLetter)) {
      return "yes";
    }

    // Letters near the end of alphabet (T, V, W, X, Y) - Yes
    if (["T", "V", "W", "X", "Y"].includes(firstLetter)) {
      return "yes";
    }

    // Common starting letters (B, D, F, G, H, K, L, M, N, P, Q, S) - No
    return "no";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const firstLetter = name.trim()[0].toUpperCase();
    const isR = firstLetter === "R";
    setIsRName(isR);

    const golfResult = determineGolfSkill(name);
    setResult(golfResult);
    setShowResult(true);

    if (golfResult === "yes") {
      // Trigger confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ["#22c55e", "#4ade80", "#86efac", "#fbbf24", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  };

  const resetGame = () => {
    setName("");
    setResult(null);
    setShowResult(false);
    setIsRName(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Golf Icon/Logo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <div className="inline-block bg-white/10 backdrop-blur-sm p-8 rounded-full shadow-2xl">
                  <svg
                    className="w-24 h-24 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2L12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M19 5L13.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold text-white mb-4 text-shadow-lg"
              >
                Am I Good at Golf?
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-green-100 mb-12 text-shadow"
              >
                Enter your first name to discover your golf prowess
              </motion.p>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full px-8 py-5 text-xl text-center rounded-2xl bg-white/95 backdrop-blur-sm border-4 border-white/20 focus:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-400/50 transition-all duration-300 placeholder-gray-400 shadow-2xl"
                    autoFocus
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-6 text-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 border-4 border-white/30 hover:border-white/50"
                >
                  Am I Good at Golf?
                </motion.button>
              </motion.form>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-center"
            >
              {result === "yes" ? (
                <div className="space-y-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                  >
                    <div className="text-9xl mb-6">🏆</div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-8xl font-bold text-white mb-6 text-shadow-lg"
                  >
                    YES!
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl text-green-100 mb-4 text-shadow"
                  >
                    {name}, you&apos;re a golf legend!
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-green-200/80 mb-8"
                  >
                    Your swing is poetry in motion. The green is your canvas!
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="px-10 py-4 text-xl font-semibold text-emerald-900 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Try Another Name
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-8">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="text-9xl mb-6">{isRName ? "💀" : "⛳"}</div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-8xl font-bold text-red-400 mb-6 text-shadow-lg"
                  >
                    {isRName ? "ABSOLUTELY NOT!" : "NOT QUITE..."}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl text-white mb-4 text-shadow"
                  >
                    {isRName
                      ? "Nah you're still bad gang"
                      : `${name}, golf might not be your calling`}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-green-200/80 mb-8"
                  >
                    {isRName
                      ? `${name}, you're an embarrassment to the course. Your swing is so terrible, even the ball is ashamed. Maybe try a different sport... or better yet, don't.`
                      : "But hey, there's always mini golf!"}
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="px-10 py-4 text-xl font-semibold text-emerald-900 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Try Another Name
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
