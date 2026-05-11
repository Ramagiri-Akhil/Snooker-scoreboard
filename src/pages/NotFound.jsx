import {
  motion,
} from "framer-motion";

import {
  Home,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import FloatingBall from "../components/FloatingBall";

const NotFound = () => {

  const navigate =
    useNavigate();

  return (

    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        relative
        overflow-hidden
      "
    >

      {/* BG GLOW */}
      <div
        className="
          absolute inset-0
          opacity-30
        "
        style={{
          background:
             "radial-gradient(circle at center, var(--glow-color), transparent 120%)",
        }}
      />

      {/* FLOATING BALLS */}
 <FloatingBall
  color="#ff1d25"
  size={90}
  top="12%"
  left="8%"
  delay={0}
/>

<FloatingBall
  color="#2563eb"
  size={70}
  top="18%"
  right="12%"
  delay={1}
/>

<FloatingBall
  color="#facc15"
  size={100}
  bottom="10%"
  left="12%"
  delay={2}
/>

<FloatingBall
  color="#ec4899"
  size={85}
  bottom="12%"
  right="10%"
  delay={3}
/>
      {/* CONTENT */}
      <div
        className="
          relative z-10
          text-center
          max-w-xl
        "
      >

        <motion.h1

          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.7,
          }}

          className="
            text-7xl
            md:text-9xl
            font-black
            mb-6
          "

          style={{
            color:
              "var(--text-secondary)",
          }}
        >

          404

        </motion.h1>

        <motion.h2

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.2,
            duration: 0.7,
          }}

          className="
            text-2xl
            md:text-4xl
            font-bold
            mb-4
          "

          style={{
            color:
              "var(--text-secondary)",
          }}
        >

          Cue Missed The Table

        </motion.h2>

        <motion.p

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            delay: 0.4,
          }}

          className="
            text-lg
            mb-10
          "

          style={{
            color:
              "GrayText",
          }}
        >

          The page you’re looking for
          doesn’t exist or has been
          potted already.

        </motion.p>

        <motion.button

          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          onClick={() => navigate("/")}

          className="
            px-8 py-4
            rounded-2xl
            font-bold
            flex items-center
            gap-3
            mx-auto
          "

          style={{
            background:
              "#facc15",

            color:
              "#000",
          }}
        >

          <Home size={22} />

          Home

        </motion.button>

      </div>

    </section>
  );
};

export default NotFound;