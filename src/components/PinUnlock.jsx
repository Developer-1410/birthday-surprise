
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import FloatingHearts from "./FloatingHearts";
import "../styles/pin.css";

const SECRET_PIN = "142010";

export default function PinUnlock({ onNext }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();

    if (unlocked) return;

    if (pin === SECRET_PIN) {
      setError(false);
      setUnlocked(true);

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        confetti({
          particleCount: 60,
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#ff69b4", "#ffb6c1", "#ffd700", "#ffffff"],
        });
      }

      setTimeout(() => {
        onNext();
      }, 1800);
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <main className="pin-page">
      <FloatingHearts />

      <motion.div
        className="pin-card"
        initial={{ opacity: 0, scale: 0.85, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="pin-teddy"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🧸
        </motion.div>

        <motion.div
          className="pin-lock"
          animate={unlocked ? { scale: [1, 1.3, 1] } : {}}
        >
          {unlocked ? "💖" : "🔐"}
        </motion.div>

        <p className="pin-small-title">A LITTLE SECRET ♡</p>

        <h1 className="pin-title">
          {unlocked ? "You Unlocked My Heart!" : "Enter a Special Date"}
        </h1>

        <p className="pin-description">
          {unlocked
            ? "Yay! Your surprise is waiting for you 💗"
            : "Only someone truly special can unlock this little surprise."}
        </p>

        <form onSubmit={handleUnlock}>
          <motion.div
            className="pin-input-wrapper"
            animate={error ? { x: [-10, 10, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
            onAnimationComplete={() => setError(false)}
          >
            <div className="pin-boxes" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={`pin-box ${pin.length > index ? "filled" : ""}`}
                >
                  {pin.length > index ? "♥" : ""}
                </div>
              ))}
            </div>

            <input
              className="pin-real-input"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
                setError(false);
              }}
              aria-label="Enter your six-digit birthday PIN"
              disabled={unlocked}
              required
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                className="pin-error"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
              >
                Oops! That's not the special date. Try again 💕
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            className="pin-button"
            type="submit"
            disabled={pin.length !== 6 || unlocked}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {unlocked ? "Unlocked! 💖" : "Unlock My Surprise ♡ →"}
          </motion.button>
        </form>

        <p className="pin-hint">
          Hint: It's a very special birthday 🎂
        </p>

        <div className="pin-decoration" aria-hidden="true">
          🌸 💗 🌸
        </div>
      </motion.div>
    </main>
  );
}
