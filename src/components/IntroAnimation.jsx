import ScoreBall from "./Scoreball";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useEffect,
  useState,
  useRef,
} from "react";

const redBalls = [
  { x: 0, y: 0 },

  { x: -18, y: 18 },
  { x: 18, y: 18 },

  { x: -36, y: 36 },
  { x: 0, y: 36 },
  { x: 36, y: 36 },

  { x: -54, y: 54 },
  { x: -18, y: 54 },
  { x: 18, y: 54 },
  { x: 54, y: 54 },

  { x: -72, y: 72 },
  { x: -36, y: 72 },
  { x: 0, y: 72 },
  { x: 36, y: 72 },
  { x: 72, y: 72 },
];

const IntroAnimation = ({
  onComplete,
}) => {
    const [impact, setImpact] = useState(false);

    const [scatter, setScatter] = useState(false);

    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {

  if (fadeOut) {

    const timer =
      setTimeout(() => {

        onComplete();

      }, 900);

    return () =>
      clearTimeout(timer);
  }

}, [fadeOut]);

  return (
    
    <motion.section
  animate={{

  x: impact
    ? [0, -6, 6, -4, 4, 0]
    : 0,

  y: impact
    ? [0, -2, 2, -1, 1, 0]
    : 0,

  opacity:
    fadeOut ? 0 : 1,

  scale:
    fadeOut ? 1.08 : 1,

 filter:
    fadeOut
    ? "blur(18px)"
    : "blur(0px)",
}}

transition={{

  duration:
    fadeOut ? 1.1 : 0.35,

  ease: "easeInOut",
}}
      className="
        fixed inset-0
        z-99999
        overflow-hidden
        flex items-center
        justify-center
      "
      style={{
        background:
          "radial-gradient(circle at center, #14532d 0%, #0b1014 85%)",
      }}
    >
        {

}



      {/* TABLE GLOW */}
      <div
        className="
          absolute inset-0
        "
        style={{
          background:
            "radial-gradient(circle at center, rgba(34,197,94,0.25), transparent 65%)",
        }}
      />

      {/* SNOOKER TEXT */}
<motion.div

animate={{

  scale:
    impact ? [1, 1.04, 1] : 1,

  opacity:
    fadeOut ? 0 : 1,

  y:
    impact ? [0, 4, 0] : 0,
}}

transition={{
  duration: 0.5,
}}

  className="
    absolute
    left-1/2
    top-[68%]
    -translate-x-1/2
    -translate-y-1/2
    z-10
  "
>

  <motion.h1

initial={{
  opacity: 0,
  y: 40,
  filter: "blur(10px)",
}}

animate={{
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
}}

    transition={{
      duration: 0.9,
      delay: 0.15,
      ease: "easeOut",
    }}

    className="
      text-5xl
      md:text-7xl
      font-black
      tracking-[10px]
      bg-linear-to-b
from-white
to-gray-400
bg-clip-text
text-transparent
      whitespace-nowrap
    "
style={{
   textShadow: impact

  ? `
      0 0 4px rgba(255,255,255,0.95),
      0 0 8px rgba(255,255,255,0.9),
      0 0 18px rgba(255,255,255,0.75),
      0 0 40px rgba(255,255,255,0.45)
    `

  : `
      0 0 3px rgba(255,255,255,0.6),
      0 0 10px rgba(255,255,255,0.25)
    `,
}}
   
  >

    SNOOKER

  </motion.h1>

</motion.div>

      {/* WHITE CUE BALL */}
<motion.div

  initial={{
    x: 0,
    y: -510,
  }}

animate={{
  x: 0,
  y: -80,
}}

transition={{
  duration: 0.9,
  ease: "easeInOut",
}}
  onAnimationComplete={() => {

    setImpact(true);


    setScatter(true);

    setTimeout(() => {

  setFadeOut(true);

}, 900);

    if (navigator.vibrate) {

      navigator.vibrate([
        120,
        50,
        120,
      ]);
    }
  }}

  className="
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    z-30
  "

  style={{
  filter:
    "drop-shadow(0 0 14px rgba(255,255,255,0.6))",
}}
>

    {
  scatter && (

    <motion.div

      initial={{
        opacity: 0.5,
      }}

      animate={{
        opacity: 0,
        scaleX: 2.5,
      }}

      transition={{
        duration: 0.5,
      }}

      className="
        absolute
        left-1/2
        top-1/2
        h-3
        w-16
        rounded-full
        -translate-x-1/2
        -translate-y-1/2
        blur-md
      "

      style={{
        background:
          "rgba(255,29,37,0.45)",

        transformOrigin:
          "center",
      }}
    />
  )
}

  <ScoreBall
    color="#ffffff"
    points=""
    showPlus={false}
  />

</motion.div>

      {/* TRIANGLE */}
      <div
        className="
 relative
          w-75
          h-75
        "
      >

        {
          redBalls.map(
            (ball, index) => (

  <motion.div

  key={index}

  initial={{
    x: ball.x,
    y: ball.y,
  }}

  animate={
    scatter
      ? {

          x:
            ball.x +
            (Math.random() * 600 - 300),

          y:
            ball.y +
            (Math.random() * 400 - 200),

          rotate:
            Math.random() * 720,

          opacity: 1,
          scale:1.2,
        }

      : {
          x: ball.x,
          y: ball.y,
          rotate: 0,
          opacity: 1,
        }
  }

  transition={{
    duration: 1.4,
    ease: "easeOut",
  }}

  className="
    absolute
  top-25
  left-30
  "

   
>
  <ScoreBall
    color="#ff1d25"
    points=""
    small={false}
    showPlus={false}
  />
</motion.div>
            )
          )
        }

      </div>

    </motion.section>
  );
};

export default IntroAnimation;