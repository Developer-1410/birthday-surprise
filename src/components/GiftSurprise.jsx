
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import FloatingHearts from "./FloatingHearts";
import "../styles/gift.css";

export default function GiftSurprise({ onNext }) {
  const [opened, setOpened] = useState(false);

  const openGift = () => {
    if (opened) return;

    setOpened(true);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      confetti({
        particleCount: 80,
        spread: 120,
        startVelocity: 45,
        origin: { y: 0.55 },
        colors: ["#ff69b4", "#ffb6c1", "#ffd700", "#ffffff"],
      });
    }
  };

  return (
    <main className="gift-page">
      <FloatingHearts />

      <motion.div
        className="gift-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="gift-teddy"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🧸
        </motion.div>

        <p className="gift-small-title">MADE JUST FOR YOU ♡</p>

        <h1 className="gift-heading">
          {opened ? "Surprise! 💖" : "A Little Surprise"}
          {!opened && <span> Just For You ♡</span>}
        </h1>

        <p className="gift-description">
          {opened
            ? "You deserve all the happiness, smiles, and beautiful moments in the world!"
            : "Someone as special as you deserves a little magic. Tap the gift to open it!"}
        </p>

        <div className="gift-stage">
          <motion.div
            className={`gift-box ${opened ? "gift-opened" : ""}`}
            onClick={openGift}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !opened) {
                e.preventDefault();
                openGift();
              }
            }}
            role="button"
            tabIndex={opened ? -1 : 0}
            aria-label="Open your birthday gift"
            animate={!opened ? {
              rotate: [0, -3, 3, -3, 3, 0],
            } : {}}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <motion.div
              className="gift-lid"
              animate={opened ? {
                y: -145,
                rotate: -18,
                opacity: 0,
              } : {}}
              transition={{ duration: 1 }}
            >
              <div className="gift-lid-ribbon" />
              <div className="gift-bow">🎀</div>
            </motion.div>

            <div className="gift-body">
              <div className="gift-ribbon" />
              <span className="gift-heart">♥</span>
            </div>

            <AnimatePresence>
              {opened && (
                <motion.div
                  className="gift-reveal-heart"
                  initial={{ scale: 0, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: -100, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                >
                  💖
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="open"
              className="gift-button"
              onClick={openGift}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tap to Open Your Gift 🎁
            </motion.button>
          ) : (
            <motion.div
              key="revealed"
              className="gift-revealed"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p>✨ A little reminder that you're truly special ✨</p>

              <motion.button
                className="gift-button"
                onClick={onNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                There's More For You ♡ →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
