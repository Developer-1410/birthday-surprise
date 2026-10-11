import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Welcome from "./components/Welcome";
import PinUnlock from "./components/PinUnlock";
import GiftSurprise from "./components/GiftSurprise";
import SpecialReasons from "./components/SpecialReasons";
import SpecialLetter from "./components/SpecialLetter";
import FinalSurprise from "./components/FinalSurprise";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [page, setPage] = useState(1);

  return (
    <div className="app">
      <MusicPlayer page={page}/>
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
  key={page}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0, transition: { duration: 0.1 } }}
  transition={{
    duration: 0.2,
    ease: "easeOut",
  }}
>
        {page === 1 && (
          <Welcome onNext={() => setPage(2)} />
        )}

        {page === 2 && (
          <PinUnlock onNext={() => setPage(3)} />
        )}

        {page === 3 && (
          <GiftSurprise onNext={() => setPage(4)} />
        )}

        {page === 4 && (
          <SpecialReasons onNext={() => setPage(5)} />
        )}

        {page === 5 && (
          <SpecialLetter onNext={() => setPage(6)} />
        )}

        {page === 6 && <FinalSurprise />}
      </motion.div>
    </AnimatePresence>
    </div>
  );
}

export default App;
