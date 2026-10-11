
import { useEffect, useRef, useState } from "react";

const SONGS = [
  {
    src: `${import.meta.env.BASE_URL}music/ishq-hai.mp3`,
    start: 85, // 1:25
  },
  {
    src: `${import.meta.env.BASE_URL}music/mast-magan.mp3`,
    start: 190, // 3:10
  },
];

const VOLUME = 0.4;
const FADE_DURATION = 2000;

export default function MusicPlayer({ page }) {
  const audioRefs = useRef([]);
  const activeIndex = useRef(0);
  const fadeRef = useRef(null);
  const playingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Pages 1-4: Ishq Hai
  // Pages 5-6: Mast Magan
  // Assumes page is numbered 1 through 6.
  const songIndex = page >= 4 ? 1 : 0;

  useEffect(() => {
    const audios = SONGS.map((song) => {
      const audio = new Audio(song.src);
      audio.preload = "none";
      audio.volume = 0;

      const loop = () => {
        audio.currentTime = song.start;
        if (playingRef.current) {
          audio.play().catch(() => {});
        }
      };

      audio.addEventListener("ended", loop);

      audioRefs.current.push({
        audio,
        loop,
        start: song.start,
      });

      return audio;
    });

    return () => {
      cancelAnimationFrame(fadeRef.current);

      audioRefs.current.forEach(({ audio, loop }) => {
        audio.pause();
        audio.removeEventListener("ended", loop);
        audio.src = "";
      });

      audioRefs.current = [];
    };
  }, []);

  const fadeTo = (from, to) => {
    cancelAnimationFrame(fadeRef.current);

    const startTime = performance.now();
    const fromVolume = from ? from.volume : 0;

    if (to) {
      to.volume = 0;
    }

    const animate = (now) => {
      const progress = Math.max(
  0,
  Math.min(
    1,
    (now - startTime) / FADE_DURATION
  )
);

      if (from) {
        from.volume = Math.max(
          0,
          fromVolume * (1 - progress)
        );
      }

      if (to) {
  to.volume = Math.max(
    0,
    Math.min(1, VOLUME * progress)
  );
}

      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(animate);
      } else if (from) {
        from.pause();
      }
    };

    fadeRef.current = requestAnimationFrame(animate);
  };

  const startSong = async (index) => {
    const item = audioRefs.current[index];
    if (!item) return;

    const { audio, start } = item;

    if (audio.readyState < 1) {
      audio.load();
    }

    if (
      !Number.isFinite(audio.duration) ||
      audio.currentTime < start
    ) {
      audio.currentTime = start;
    }

    try {
      await audio.play();
      playingRef.current = true;
      setIsPlaying(true);
      fadeTo(null, audio);
    } catch (error) {
      console.warn("Music playback blocked:", error);
    }
  };

  useEffect(() => {
    if (!playingRef.current) {
      activeIndex.current = songIndex;
      return;
    }

    if (activeIndex.current === songIndex) return;

    const previous = audioRefs.current[activeIndex.current];
    const next = audioRefs.current[songIndex];

    if (!previous || !next) return;

    cancelAnimationFrame(fadeRef.current);

    const switchSong = async () => {
      const { audio, start } = next;

      audio.load();
      audio.currentTime = start;
      audio.volume = 0;

      try {
        await audio.play();
        fadeTo(previous.audio, audio);
        activeIndex.current = songIndex;
      } catch (error) {
        console.warn("Song switch failed:", error);
      }
    };

    switchSong();
  }, [songIndex]);

  const toggleMusic = async () => {
    if (isPlaying) {
      cancelAnimationFrame(fadeRef.current);

      audioRefs.current.forEach(({ audio }) => {
        audio.pause();
      });

      playingRef.current = false;
      setIsPlaying(false);
      return;
    }

    await startSong(songIndex);
    activeIndex.current = songIndex;
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      title={isPlaying ? "Pause music" : "Play music"}
      style={{
        position: "fixed",
        right: "16px",
        bottom: "18px",
        zIndex: 9999,
        width: "46px",
        height: "46px",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.6)",
        background: "rgba(255,105,180,0.9)",
        color: "white",
        fontSize: "22px",
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
      }}
    >
      {isPlaying ? "♫" : "▶"}
    </button>
  );
}
