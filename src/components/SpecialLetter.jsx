
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import FloatingHearts from "./FloatingHearts";
import "../styles/letter.css";

export default function SpecialLetter({ onNext }) {
  const [opened, setOpened] = useState(false);

  return (
    <main className="letter-page">
      <FloatingHearts />

      <motion.div
        className="letter-content"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="letter-teddy"
          animate={{ y: [0, -9, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🧸
        </motion.div>

        <p className="letter-small-title">SOMETHING FROM MY HEART ♡</p>

        <h1 className="letter-heading">
          A Message <span>Just For You 💌</span>
        </h1>

        <p className="letter-description">
          Some feelings are better expressed through little words.
          Here's something I wanted to tell you.
        </p>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              className="letter-envelope-section"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                type="button"
                className="letter-envelope"
                onClick={() => setOpened(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open your special letter"
              >
                <div className="envelope-back" />
                <div className="envelope-paper" />
                <div className="envelope-front" />
                <div className="envelope-flap" />
                <div className="envelope-heart">💗</div>
              </motion.button>

              <motion.button
                className="letter-button"
                onClick={() => setOpened(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Open Your Letter ♡
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              className="letter-opened-section"
              initial={{ opacity: 0, y: 70, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="letter-paper-open">
                <div className="letter-paper-decoration">🌸 ♡ 🌸</div>

                <h2>Dear Someone Special, 💗</h2>

                <p>
                  On this beautiful day, I just wanted to take a
                  moment to remind you how truly special you are.
                </p>

                <p>
                  Some people enter our lives and somehow make
                  ordinary moments feel a little more beautiful.
                  You are one of those people.
                </p>

                <p>
                  I hope this birthday brings you endless smiles,
                  wonderful memories, and all the happiness your
                  heart could ever wish for.
                </p>

                <p>
                  Never stop being the amazing person you are.
                  You deserve beautiful things, today and always.
                </p>

                <p className="letter-ending">
                  Happy Birthday, once again! 🎂💖
                </p>

                <p className="letter-signature">
                  With a little extra care, ♡
                  <br />
                  Someone Who Thinks You're Special
                </p>
              </div>

              <motion.button
                className="letter-button letter-continue"
                onClick={onNext}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                One Last Surprise Awaits ♡ →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
