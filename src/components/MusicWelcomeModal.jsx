
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const funnyMessages = [
  "Areee, music se kya dushmani hai? 🙄",
  "Hehe! Pakad ke dikhao! 😜",
  "Ek baar play toh kar do na! 💗",
  "Oyeee! Button bhi tumse darr gaya! 🏃‍♂️",
  "Maan bhi jao na! 😫",
  "Kitni ziddi ho yaar tum! 😭",
  "Ab bas bhi karo, madam ji! 😓",
  "Achha baba, pleaseeee! 🥺"
];

const positions = [
  { x: -90, y: -160, rotate: -20 },
  { x: 95, y: -300, rotate: 25 },
  { x: -100, y: -340, rotate: -30 },
  { x: 90, y: -100, rotate: 20 },
  { x: 0, y: -260, rotate: 360 },
  { x: -95, y: -80, rotate: -25 },
  { x: 100, y: -210, rotate: 30 },
  { x: 0, y: 0, rotate: 0 },
];

export default function MusicWelcomeModal({
  onPlay,
}) {
  const [attempts, setAttempts] = useState(0);

  const handleSkip = () => {
  setAttempts((prev) => prev + 1);
};

  const position =
    attempts === 0
      ? { x: 0, y: 0, rotate: 0 }
      : positions[(attempts - 1) % positions.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(38, 10, 30, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{
  type: "spring",
  stiffness: 450,
  damping: 10,
  mass: 0.6,
}}
        role="dialog"
        aria-modal="true"
        aria-labelledby="music-welcome-title"
        style={{
          width: "100%",
          maxWidth: "370px",
          padding: "28px 22px",
          borderRadius: "26px",
          background:
            "linear-gradient(145deg, #fff5fa, #ffe2ef)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{ fontSize: "48px" }}
        >
          💗
        </motion.div>

        <h2
          id="music-welcome-title"
          style={{
            color: "#b52d69",
            fontSize: "25px",
            margin: "12px 0",
          }}
        >
          Waittt, Pretty Girl!
        </h2>

        <p
          style={{
            color: "#8f466a",
            fontSize: "15px",
            lineHeight: 1.7,
          }}
        >
          Before you enter this little world of
          surprises, turn on the music for a more
          magical experience! 🎶
        </p>

        <div
          style={{
            margin: "20px 0",
            padding: "16px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.75)",
            color: "#b52d69",
            fontSize: "14px",
          }}
        >
          🎵 A little melody, just for you 💕
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={onPlay}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "30px",
            background:
              "linear-gradient(135deg, #ff69b4, #e84393)",
            color: "white",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow:
              "0 6px 18px rgba(232,67,147,0.3)",
          }}
        >
          ▶ Play Music & Begin
        </motion.button>

        <div
          style={{
            marginTop: "18px",
            height: "55px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.button
            type="button"
            animate={position}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 15,
              mass: 0.6,
            }}
            onClick={handleSkip}
            style={{
              padding: "9px 18px",
              border: "1px solid #f4a2c5",
              borderRadius: "22px",
              background: "white",
              color: "#b52d69",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Not Now ✕
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {attempts > 0 && (
            <motion.p
              key={attempts}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                color: "#d63384",
                fontSize: "13px",
                minHeight: "20px",
                marginTop: "8px",
              }}
            >
              {
                funnyMessages[(attempts - 1) % funnyMessages.length]
              }
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
