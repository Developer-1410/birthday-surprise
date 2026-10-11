import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Fireworks from "./Fireworks";
import "../styles/final.css";

const stars = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  left: `${(i * 73.7 + 13) % 100}%`,
  top: `${(i * 47.3 + 7) % 100}%`,
  delay: `${(i % 12) * 0.3}s`,
  size: `${1 + (i % 3)}px`,
}));

export default function FinalSurprise() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 2000),
      setTimeout(() => setStage(2), 5000),
      setTimeout(() => setStage(3), 7000),
      setTimeout(() => setStage(4), 9000),
      setTimeout(() => setStage(5), 11000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (stage < 1) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const colors = [
      "#ff69b4",
      "#ffb6c1",
      "#ffd700",
      "#ffffff",
      "#c084fc",
      "#ff4d8d",
    ];

    

    const interval = setInterval(
      stage >= 5 ? 2000 : 650
    );

    return () => clearInterval(interval);
  }, [stage]);

  return (
    <main className="final-page">

      <Fireworks active={stage >= 1} />
      {/* Night sky stars */}
      <div className="final-stars" aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className="final-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        className="final-moon"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        aria-hidden="true"
      >
        🌙
      </motion.div>

      <div className="final-content">
        <AnimatePresence>
          {stage === 0 && (
            <motion.div
              key="intro"
              className="final-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>Tonight, the stars have a little secret... ✨</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              className="final-heart"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              aria-hidden="true"
            >
              💖
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              className="final-teddy"
              initial={{ opacity: 0, y: 100, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.5, type: "spring" }}
              aria-hidden="true"
            >
              🧸
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 4 && (
            <motion.div
              className="final-message"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              <p className="final-small-title">
                TO SOMEONE TRULY SPECIAL ♡
              </p>

              <h1>
                Happy Birthday
                <span>Once Again! 💗</span>
              </h1>

              <p className="final-wish">
                May your life always be filled with
                beautiful moments, endless happiness,
                and all the love you deserve.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 5 && (
            <motion.div
              className="final-ending"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p>
                Keep smiling, because your smile makes
                the world a little brighter. ♡
              </p>

              <div className="final-hearts" aria-hidden="true">
                💗 🌸 💖 🌸 💗
              </div>

              <p className="final-signature">
                Made with love and a little extra care ♡
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
