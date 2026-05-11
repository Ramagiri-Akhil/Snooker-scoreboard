import {motion} from "framer-motion";
import { hapticTap } from "../utils/haptics";
function ScoreBall({
  color,
  points,
  onClick,
  active = false,
  small = false,
  showPlus = true,
  redCount=null,
}) {
  return (
    <motion.button
      whileTap={{
    scale: 0.88,
    y: 8,
  }}

  transition={{
    duration: 0.2,
  }}
      onClick={() => {

  hapticTap();

  onClick();
}}
className={`
        relative rounded-full
        flex items-center justify-center
         shrink-0
        transition-all

        ${
          small
            ? "w-8 h-8 text-[10px]"
            : "w-15 h-15 text-xl cursor-pointer hover:scale-105"
        }
      `}
      style={{
        background: `
          radial-gradient(
            circle at 30% 30%,
            rgba(255,255,255,0.88) 0%,
            ${color} 30%,
            ${color} 10%,
            rgba(0,0,0,0.9) 100%
          )
            
        `,

        boxShadow: active
          ? `0 0 30px ${color}`
          : "0 10px 25px rgba(0,0,0,0.35)",

        color: active ? "#000"
            : "#fff",
      }}
    >
      {showPlus ? "+" : ""}
      {points}

      {/* Gloss */}
      <div
        className="absolute rounded-full"
        style={{
          width: small ? "18%" : "28%",
          height: small ? "18%" : "28%",
          top: "18%",
          left: "18%",
          background: "rgba(255,255,255,0.8)",
          opacity: 0.8,
        }}
      />

      {/* Red Count */}
{
  points === 1 &&
  !small &&
  redCount !== null && (

    <div className="absolute bottom-1 text-xs bg-white text-black px-2 rounded-full">
      {redCount}
    </div>
  )
}
    </motion.button>
  );
}

export default ScoreBall;