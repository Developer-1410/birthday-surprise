
import { useEffect } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import FloatingHearts from "./FloatingHearts";
import "../styles/welcome.css";

export default function Welcome({ onNext }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = setTimeout(() => {
      const end = Date.now() + 2400;

      const interval = setInterval(() => {
        confetti({
          particleCount: 15,
          spread: 90,
          startVelocity: 35,
          origin: { x: 0.2, y: 0.5 },
          colors: ["#ff69b4", "#ffb6c1", "#ffd700", "#ffffff"],
        });

        confetti({
          particleCount: 15,
          spread: 90,
          startVelocity: 35,
          origin: { x: 0.8, y: 0.5 },
          colors: ["#ff69b4", "#ffb6c1", "#ffd700", "#ffffff"],
        });

        if (Date.now() >= end) {
          clearInterval(interval);
        }
      }, 700);

      return () => clearInterval(interval);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="welcome-page">
      <FloatingHearts />

      <motion.div
        className="welcome-content"
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="welcome-teddy"
          animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🧸
        </motion.div>

        <p className="welcome-date">14 OCTOBER ♡</p>

        <h1 className="welcome-heading">
          Happy <span>Birthday!</span>
        </h1>

        <h2 className="welcome-subtitle">
          To Someone Truly Special 💗
        </h2>

        <p className="welcome-message">
          Some people make the world a little more beautiful
          just by being in it.
          <br />
          And you're definitely one of them.
        </p>

        <motion.button
          type="button"
          className="welcome-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
        >
          I Have Something For You ♡
          <span aria-hidden="true"> →</span>
        </motion.button>

        <p className="welcome-footer">
          Made with a little extra care ♡
        </p>
      </motion.div>
    </main>
  );
}
