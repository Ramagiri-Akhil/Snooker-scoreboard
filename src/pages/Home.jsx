import { useNavigate } from "react-router-dom";
import FloatingBall from "../components/FloatingBall";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransitions";

const containerVariants = {

  hidden: {},

  show: {

    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {

  hidden: {
    opacity: 0,
    y: 40,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function Home() {
  const navigate = useNavigate();



  return (
    <PageTransition >
      <FloatingBall
        size="90px"
        color="#ff0000"
        top="18%"
        left="8%"
        delay={0}
      />

      <FloatingBall
        size="90px"
        color="#2f2fe4"
        top="20%"
        left="47%"
        delay={1}
      />

      <FloatingBall
        size="90px"
        color="#111111"
        top="20%"
        right="8%"
        delay={2}
      />

      <FloatingBall
        size="90px"
        color="#facc15"
        bottom="15%"
        left="28%"
        delay={1.5}
      />

      <FloatingBall
        size="90px"
        color="#f472b6"
        bottom="15%"
        right="28%"
        delay={2.5}
      />

      {/* Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, var(--glow-color), transparent 110%)",
        }}
      />


      {/* Content */}
      <motion.section className="relative mb-8 z-10 min-h-screen flex flex-col items-center justify-center px-5"
      variants={containerVariants}
      initial="hidden"
        animate="show"
      >
        <motion.h1
          className="cinzel-400 text-5xl md:text-7xl font-black tracking-tight text-center"
          variants={itemVariants}
          style={{
            color: "var(--text-primary)",
          }}
        >
          Snooker
        </motion.h1>

        <motion.p
          className="oswald-400 mt-2 mb-5 text-base md:text-lg text-center"
          variants={itemVariants}
          style={{
            color: "var(--text-primary)",
          }}
        >
          Professional scoring, beautifully simple
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl z-10 ">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, 
                ease: "easeOut",
                type: "spring",
              stiffness: 120,
              damping: 14,
             }}
            onClick={() => navigate("/individual")}
            className="min-h-10 rounded-3xl p-5 backdrop-blur-md border hover:cursor-pointer"
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            whileTap={{
                scale:0.98
            }}
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
          >
            <div className="flex gap-3 mb-5 z-10">
              <FloatingBall
                size="40px"
                color="#ff1d25"
                animateBall={false}
              />

              <FloatingBall
                size="40px"
                color="#facc15"
                animateBall={false}
              />

              <FloatingBall
                size="40px"
                color="#2563eb"
                animateBall={false}
              />
            </div>

            <h2
              className="text-2xl md:text-4xl font-bold mb-2"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Individual
            </h2>

            <p
              className="mt-4"
              style={{
                color: "GrayText",
              }}
            >
              2–5 players, free-for-all
            </p>

            <button
              className="mt-5 font-semibold"
              style={{
                color: "var(--button-color)",
              }}
            >
              Choose →
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            onClick={() => navigate("/squad")}
            className="w-full max-w-3xl min-h-10 rounded-3xl p-5 backdrop-blur-md border hover:cursor-pointer"
             initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, 
                ease: "easeOut",
                type: "spring",
              stiffness: 120,
              damping: 14,
             }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
          >
            <div className="flex gap-3 mb-5 z-10">
              <FloatingBall
                size="40px"
                color="#111111"
                animateBall={false}
              />

              <FloatingBall
                size="40px"
                color="#f472b6"
                animateBall={false}
              />
            </div>

            <h2
              className="text-2xl md:text-4xl font-bold mb-2"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Squad
            </h2>

            <p
              className="mt-4"
              style={{
                color: "GrayText",
              }}
            >
              Team A vs Team B (2v2)
            </p>

            <button
              className="mt-5 font-semibold"
              style={{
                color: "var(--button-color)",
              }}
            >
              Choose →
            </button>
          </motion.div>
        </div>
      </motion.section>
    </PageTransition>
  );
}

export default Home;