
import "./../styles/animations.css";

const hearts = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  delay: `${(index % 9) * -1.4}s`,
  duration: `${8 + (index % 5) * 2}s`,
  size: `${14 + (index % 4) * 7}px`,
}));

export default function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
          }}
        >
          {heart.id % 3 === 0 ? "🌸" : "💗"}
        </span>
      ))}
    </div>
  );
}
