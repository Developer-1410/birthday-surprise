
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import FloatingHearts from "./FloatingHearts";
import "../styles/reasons.css";

const reasons = [
  {
    emoji: "🌸",
    title: "Your Beautiful Smile",
    message:
      "Your smile has a way of making even an ordinary day feel a little more beautiful.",
  },
  {
    emoji: "💖",
    title: "Your Kind Heart",
    message:
      "The kindness you carry makes you someone truly wonderful.",
  },
  {
    emoji: "✨",
    title: "Your Special Presence",
    message:
      "Some people make everything feel better just by being around. You're one of them.",
  },
  {
    emoji: "🌷",
    title: "The Way You Are",
    message:
      "You don't need to change anything to be special. Being yourself is already enough.",
  },
  {
    emoji: "🦋",
    title: "Your Little Things",
    message:
      "Sometimes, it's the smallest things about someone that make them unforgettable.",
  },
  {
    emoji: "🌟",
    title: "Your Positive Energy",
    message:
      "You have a beautiful way of bringing happiness and warmth wherever you go.",
  },
  {
    emoji: "🧸",
    title: "Your Cuteness",
    message:
      "There's something naturally adorable about you that words can't quite explain.",
  },
  {
    emoji: "💫",
    title: "Your Uniqueness",
    message:
      "Among millions of people, there's only one you. And that's what makes you amazing.",
  },
  {
    emoji: "💕",
    title: "The Happiness You Bring",
    message:
      "You may not even realize how much happiness your presence can bring.",
  },
  {
    emoji: "❤️",
    title: "Simply Because You're You",
    message:
      "The final reason is the simplest one. You're special just because you're you.",
  },
];

export default function SpecialReasons({ onNext }) {
  const [current, setCurrent] = useState(0);

  const nextReason = () => {
    if (current < reasons.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const previousReason = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <main className="reasons-page">
      <FloatingHearts />

      <motion.div
        className="reasons-content"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="reasons-teddy"
          animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🧸
        </motion.div>

        <p className="reasons-small-title">
          A LITTLE SOMETHING ABOUT YOU ♡
        </p>

        <h1 className="reasons-heading">
          10 Things That Make
          <span> You Special 💗</span>
        </h1>

        <p className="reasons-description">
          Here's a little reminder of how wonderful you are.
          One reason at a time. ♡
        </p>

        <div className="reasons-card-area">
          <div className="reasons-card-back back-one" />
          <div className="reasons-card-back back-two" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="reason-card"
              initial={{ opacity: 0, x: 70, rotate: 5, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, x: -70, rotate: -5, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <span className="reason-number">
                {String(current + 1).padStart(2, "0")} / 10
              </span>

              <motion.div
                className="reason-emoji"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {reasons[current].emoji}
              </motion.div>

              <h2>{reasons[current].title}</h2>

              <p>{reasons[current].message}</p>

              <span className="reason-card-heart">♡</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="reasons-progress">
          {reasons.map((_, index) => (
            <span
              key={index}
              className={`reason-dot ${index === current ? "active" : ""}`}
            />
          ))}
        </div>

        <div className="reasons-actions">
          {current > 0 && (
            <button
              type="button"
              className="reason-back-button"
              onClick={previousReason}
              aria-label="Previous reason"
            >
              ←
            </button>
          )}

          <motion.button
            type="button"
            className="reason-next-button"
            onClick={nextReason}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {current === reasons.length - 1
              ? "A Special Letter Awaits ♡ →"
              : "Next Little Reason ♡ →"}
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
