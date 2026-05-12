import { motion } from "framer-motion";

function FloatingBall({
  size,
  color,
  top,
  left,
  right,
  bottom,
  delay = 0,
  animateBall = true,
}) {
  return (
    <motion.div
      animate={
        animateBall
          ? {
              y: [0, -20, 0],
            }
          : {}
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`
        ${
          top || left || right || bottom
            ? "absolute"
            : "relative"
        }
        rounded-full z-10 shrink-0 overflow-hidden
      `}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,

        /* Realistic Ball Gradient */
        background: `
          radial-gradient(
            circle at 35% 30%,
            rgba(255,255,255,0.88) 0%,
            ${color} 30%,
            ${color} 10%,
            rgba(0,0,0,0.5) 100%
          )
            
        `,

        boxShadow: `
          inset -12px -12px 24px rgba(0,0,0,0.6),
          inset 8px 8px 18px rgba(255,255,255,0.08),
          0 25px 45px rgba(0,0,0,0.35)
        `,
      }}
    >
      {/* Gloss Highlight */}
      <div
        className="absolute rounded-full"
        style={{
          width: "28%",
          height: "28%",
          top: "18%",
          left: "18%",
          background: "rgba(255,255,255,0.8)",
          opacity: 0.8,
        }}
      />
    </motion.div>
  );
}

export default FloatingBall;