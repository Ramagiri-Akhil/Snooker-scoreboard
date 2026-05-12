import confetti from "canvas-confetti";

import { motion, AnimatePresence }
from "framer-motion";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import FloatingBall from "../components/FloatingBall";
import ScoreBall from "../components/Scoreball";
import PageTransition from "../components/PageTransitions";
import AnimatedScore from "../components/AnimatedScore";

import {
  BALLS,
  clonePlayers,
  getNextPlayer,
  getRequiredColor,
  isCorrectColorBall,
  calculateWinner,
} from "../utils/gameLogic";

function Scoreboard() {
  const navigate = useNavigate();

  const matchType = localStorage.getItem("snooker-match-type");

  // Individual Players
  const individualPlayers = JSON.parse(
    localStorage.getItem("snooker-individual-players") || "[]",
  );

  // Squad Data
  const squadData = JSON.parse(
    localStorage.getItem("snooker-squad-data") || "{}",
  );

  // Generate Players
  const initialPlayers = useMemo(() => {
    // INDIVIDUAL MODE
    if (matchType === "individual") {
      return individualPlayers.map((player) => ({
        ...player,
        score: 0,
      }));
    }

    // SQUAD MODE
    if (matchType === "squad") {
      return [
        {
          name: squadData?.teamA?.name || "Team A",

          subtitle: "1 & 2",

          color: squadData?.teamA?.color || "#ff1d25",

          score: 0,
        },

        {
          name: squadData?.teamB?.name || "Team B",

          subtitle: "3 & 4",

          color: squadData?.teamB?.color || "#2563eb",

          score: 0,
        },
      ];
    }

    return [];
  }, [matchType, individualPlayers, squadData]);

  const [gameState, setGameState] =
  useState({
    players: initialPlayers,
    activePlayer: 0,
    reds: 15,
  });


  const [customPoints, setCustomPoints] = useState("");

  const [showFoulPanel, setShowFoulPanel] = useState(false);

  const [history, setHistory] = useState([]);

  const [activityLog, setActivityLog] =
  useState([]);

  const [scoreAnimations, setScoreAnimations] =
  useState([]);

  const [currentColorIndex, setCurrentColorIndex] =
  useState(0);

const [gameOver, setGameOver] =
  useState(false);

const [winner, setWinner] =
  useState(null);

const [ballHitSound] =
  useState(
    new Audio(
      "/sounds/ball-hit.mp3"
    )
  );

const [foulSound] =
  useState(
    new Audio(
      "/sounds/foul.mp3"
    )
  );

const [winnerSound] =
  useState(
    new Audio(
      "/sounds/winner.mp3"
    )
  );

  

  // Add to History
const updateGameState = (newState) => {

  setHistory((prev) => [

    ...prev,

    JSON.parse(
      JSON.stringify(gameState)
    ),
  ]);

  setGameState(newState);
};

//Activity Log
const addActivity = (
  playerName,
  ballColor,
  points,
  type = "score"
) => {

  setActivityLog((prev) => [

    {
      playerName,
      ballColor,
      points,
      type,
    },

    ...prev,
  ]);
};

//confetti on win
const triggerConfetti = () => {

  const end =
    Date.now() + 3000;

  const colors = [
    "#ff1d25",
    "#facc15",
    "#22c55e",
    "#2563eb",
    "#f472b6",
  ];

  const frame = () => {

    if (Date.now() > end)
      return;

    confetti({
      particleCount: 4,

      angle: 60,

      spread: 55,

      startVelocity: 60,

      origin: {
        x: 0,
        y: 0.5,
      },

      zIndex:99999,

      colors,
    });

    confetti({
      particleCount: 4,

      angle: 120,

      spread: 55,

      startVelocity: 60,

      origin: {
        x: 1,
        y: 0.5,
      },

      colors,
    });

    requestAnimationFrame(
      frame
    );
  };

  frame();
};

//Balls animation 
const triggerScoreAnimation = (
  color,
  points
) => {

  const id = Date.now();

  const newAnimation = {
    id,
    color,
    points,
  };

  setScoreAnimations((prev) => [
    ...prev,
    newAnimation,
  ]);

  setTimeout(() => {

    setScoreAnimations((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

  }, 1200);
};

//Play sound
const playBallSound = () => {

  ballHitSound.currentTime = 0;

  ballHitSound.volume = 0.5;

  ballHitSound.play();
};

const playFoulSound = () => {

  foulSound.currentTime = 0;

  foulSound.volume = 0.55;

  foulSound.play();
};

const playWinnerSound = () => {

  winnerSound.currentTime = 0;

  winnerSound.volume = 0.6;

  winnerSound.play();
};

  // Add Score
const addScore = (points) => {

  if (gameOver) return;
  playBallSound();

  // RED PHASE
  if (gameState.reds > 0) {

    const updatedPlayers =
      clonePlayers(
        gameState.players
      );

    updatedPlayers[
      gameState.activePlayer
    ].score += points;

    triggerScoreAnimation(
  BALLS.find(
    (ball) =>
      ball.points === points
  )?.color,

  points
);

    addActivity(
      gameState.players[
        gameState.activePlayer
      ].name,

      BALLS.find(
        (ball) =>
          ball.points === points
      )?.color,

      points,

      "score"
    );

    updateGameState({
      ...gameState,

      players: updatedPlayers,

      reds:
        points === 1 &&
        gameState.reds > 0
          ? gameState.reds - 1
          : gameState.reds,
    });

    return;
  }

  // COLOR CLEARANCE PHASE
  const requiredColor =
    getRequiredColor(
      currentColorIndex
    );

  // WRONG BALL CLICKED
  if (
    !isCorrectColorBall(
      points,
      currentColorIndex
    )
  ) {
    return;
  }

  const updatedPlayers =
    clonePlayers(
      gameState.players
    );

  updatedPlayers[
    gameState.activePlayer
  ].score += points;

  addActivity(
    gameState.players[
      gameState.activePlayer
    ].name,

    BALLS.find(
      (ball) =>
        ball.points === points
    )?.color,

    points,

    "score"
  );

  // LAST BLACK
  if (currentColorIndex === 5) {

    const winner =
      calculateWinner(
        updatedPlayers
      );

setWinner(winner);

setGameOver(true);

triggerConfetti();

playWinnerSound();

const previousHistory =
  JSON.parse(
    localStorage.getItem(
      "snooker-history"
    ) || "[]"
  );

const newMatch = {

  winner: winner.name,

  score: winner.score,

  players: updatedPlayers,

  date:
    new Date().toLocaleString(),
};

localStorage.setItem(
  "snooker-history",

  JSON.stringify([
    newMatch,
    ...previousHistory,
  ])
);
  }

  updateGameState({
    ...gameState,
    players: updatedPlayers,
  });

  setCurrentColorIndex(
    (prev) => prev + 1
  );
};

//change turn
const changeTurn = (index) => {

  updateGameState({
    ...gameState,
    activePlayer: index,
  });
};

  // Next Turn
const nextTurn = () => {

  updateGameState({
    ...gameState,

activePlayer:
  getNextPlayer(
    gameState.activePlayer,
    gameState.players.length
  ),
  });
};
  //Undo Function

const undoLastAction = () => {

  if (history.length === 0)
    return;

  const previousState =
    history[history.length - 1];

  setGameState(previousState);

  setHistory((prev) =>
    prev.slice(0, prev.length - 1)
  );
};
  // Reset
const resetGame = () => {

  setGameState({
    players: gameState.players.map(
      (player) => ({
        ...player,
        score: 0,
      })
    ),

    activePlayer: 0,

    reds: 15,
  });

  setShowFoulPanel(false);

  setCurrentColorIndex(0);

  setGameOver(false);

  setWinner(null);

  setActivityLog([]);

  setHistory([]);
};

  // Apply Foul
const applyFoul = (points) => {

  const updatedPlayers = clonePlayers(gameState.players);

  playFoulSound();

    updatedPlayers[
    gameState.activePlayer
  ].score -= points;

addActivity(
  gameState.players[
    gameState.activePlayer
  ].name,

  "#ef4444",

  points,

  "foul"
);

  updateGameState({
    ...gameState,
    players: updatedPlayers,
  });
};

  // Custom Apply
const applyCustomPoints = () => {

  const value = Number(customPoints);

  playFoulSound();

  if (!value || value <= 0) return;

const updatedPlayers =
  clonePlayers(
    gameState.players
  );

  updatedPlayers[
    gameState.activePlayer
  ].score -= value;


addActivity(
  gameState.players[
    gameState.activePlayer
  ].name,

  "#ef4444",

  value,

  "foul"
);

  updateGameState({
    ...gameState,
    players: updatedPlayers,
  });

  setCustomPoints("");
};
  return (
    <PageTransition>
    <section
      className="min-h-screen px-3 md:px-4 py-8"
      style={{
        background:
          "radial-gradient(circle at center, var(--glow-color), transparent 120%)",
      }}
    >
        <AnimatePresence>

  {
    scoreAnimations.map(
      (animation) => (

        <motion.div

          key={animation.id}

          initial={{
            opacity: 1,
            y: 0,
            scale: 0.8,
          }}

          animate={{
            opacity: 0,
            y: -180,
            scale: 1.2,
          }}

          exit={{
            opacity: 0,
          }}

          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}

          className="
            fixed
            left-1/2 top-1/2
            -translate-x-1/2
            z-9999
            pointer-events-none
          "
        >

          <div
            className="
              w-20 h-20
              rounded-full
              flex items-center
              justify-center
              relative
            "

            style={{

              background: `
                radial-gradient(
                  circle at 30% 30%,
                  rgba(255,255,255,0.9) 0%,
                  ${animation.color} 35%,
                  ${animation.color} 70%,
                  rgba(0,0,0,0.9) 100%
                )
              `,

              color: "#fff",

              boxShadow: `
                0 0 30px ${animation.color}
              `,
            }}
          >

            +{animation.points}

            {/* GLOSS */}
            <div
              className="
                absolute rounded-full
              "
              style={{
                width: "22%",
                height: "22%",
                top: "18%",
                left: "18%",
                background:
                  "rgba(255,255,255,0.7)",
              }}
            />

          </div>

        </motion.div>
      )
    )
  }

</AnimatePresence>
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-4">
        {/* Reds */}
        <div
          className="text-xs md:text-xl font-bold "
          style={{
            color: "graytext",
          }}
        >
          REDS {gameState.reds}/15
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
          onClick={()=>{
            console.log("clicked");
            undoLastAction()
          }}
            className="px-4 md:px-5 py-3 text-xs rounded-2xl  cursor-pointer"
            style={{
              background: "var(--bg-secondary)",
              color: "var(--text-secondary)",
            }}
          >
            Undo
          </button>

          <button
            onClick={resetGame}
            className="px-4 md:px-5 py-3 text-xs rounded-2xl  cursor-pointer"
            style={{
              background: "#ef4444",
              color: "#fff",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-2 md:gap-4">
        {/* LEFT SIDE */}
        <div className="space-y-2">
          {gameState.players.map((player, index) => {
            const isActive = gameState.activePlayer === index;

            return (
              <div
                key={index}
                onClick={()=>{
                    changeTurn(index)
                }}
                className="rounded-2xl p-5 transition-all border-2 cursor-pointer hover:scale-[1.02]"
                style={{
                  background: "var(--bg-secondary)",

                  borderColor: isActive ? "#facc15" : "transparent",

                  boxShadow: isActive
                    ? "0 0 25px rgba(250,204,21,0.6)"
                    : "none",
                }}
              >
                {/* Strike Badge */}

                <div className="flex items-center justify-between">
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <FloatingBall
                      size="30px"
                      color={player.color}
                      animateBall={false}
                    />

                    <div>
                      <h2
                        className="cinzel-400 text-sm md:text-xl font-bold"
                        style={{
                          color: "var(--text-secondary)",
                        }}
                      >
                        {player.name}
                      </h2>

                      {/* Squad Subtitle */}
                      {matchType === "squad" && (
                        <p className="text-sm text-gray-500">
                          {player.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* SCORE */}
                  <h1 className="text-lg md:text-5xl text-yellow-400">
                      <AnimatedScore
    value={player.score}
  />
                  </h1>
                </div>
              </div>
            );
          })}

          {
  gameState.reds === 0 &&
  !gameOver && (

    <div className="mt-1 px-6">

      <p className="text-gray-500 text-sm mb-2 tracking-[2px]">
        NEXT REQUIRED BALL
      </p>

      <ScoreBall
        color={
          BALLS.find(
            (ball) =>
              ball.points ===
              getRequiredColor(
                currentColorIndex
              )
          )?.color
        }

        points={
          getRequiredColor(
            currentColorIndex
          )
        }

        small={true}

        showPlus={false}
      />

    </div>
  )
}

          {/* REDS REMAINING */}
          <div
            className="rounded-2xl p-4 md:p-6"
            style={{
              background: "var(--bg-secondary)",
            }}
          >
            <p className="text-gray-500 tracking-[3px] p-2 text-sm md:text-base">
              REDS REMAINING
            </p>

            <div className="flex gap-1 md:gap-2 flex-wrap px-2 p-2">
              {Array.from({ length: 15 }).map(
  (_, index) => {

    const isUsed =
      index >= gameState.reds;

    return (
      <div
        key={index}
        className={`
          transition-all duration-300
          ${
            isUsed
              ? "opacity-25 blur-[1px]"
              : "opacity-100"
          }
        `}
      >
        <FloatingBall
          size="15px"
          color="#ff1d25"
          animateBall={false}
        />
      </div>
    );
  }
)}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="rounded-3xl
                        p-4 md:p-8
                        w-full
                        overflow-hidden"
          style={{
            background: "var(--bg-secondary)",
          }}
        >
          {/* ON STRIKE */}
          <p className="tracking-[4px] text-gray-500">ON STRIKE</p>

          <h1
            className="cinzel-400 text-lg md:text-5xl  mt-1"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {gameState.players[gameState.activePlayer]?.name}
          </h1>

  <AnimatePresence>

  {
    gameOver && (

      <motion.div

        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        exit={{
          opacity: 0,
        }}

        className="
          fixed inset-0
          z-999
          flex items-center
          justify-center
          px-4
        "
      >

        {/* BACKDROP */}
        <div
          className="
            absolute inset-0
            backdrop-blur-md
          "
          style={{
            background:
              "rgba(0,0,0,0.45)",
          }}
        />

        {/* MODAL */}
        <motion.div

          initial={{
            scale: 0.7,
            opacity: 0,
            y: 40,
          }}

          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}

          exit={{
            scale: 0.8,
            opacity: 0,
          }}

          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}

          className="
            relative z-10
            w-full max-w-xl
            rounded-[40px]
            p-6 md:p-12
            text-center
          "

          style={{
            background:
              "var(--bg-secondary)",

            border:
              "1px solid rgba(255,255,255,0.12)",

            backdropFilter:
              "blur(18px)",

            boxShadow:
              "0 25px 80px rgba(0,0,0,0.45)",
          }}
        >

          {/* TITLE */}
          <motion.h2

            animate={{
              scale: [1, 1.06, 1],
            }}

            transition={{
              repeat: Infinity,
              duration: 2,
            }}

            className="
              text-yellow-400
              text-lg md:text-2xl
              font-bold tracking-[4px]
            "
          >
            WINNER
          </motion.h2>

          {/* WINNER NAME */}
          <h1
            className="
              text-2xl md:text-7xl
              font-black mt-2
            "
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            {winner?.name}
          </h1>

          {/* SCORE */}
          <p className="text-gray-400 mt-2 text-lg">
            {winner?.score} points
          </p>

          {/* BUTTONS */}
          <div className="flex gap-5 justify-center mt-5 flex-wrap">

            {/* Restart */}
            <button
              onClick={resetGame}
              className="
                px-4 py-3 rounded-2xl
                font-bold cursor-pointer
                transition-all hover:scale-105
              "
              style={{
                background:
                  "var(--button-color)",

                color:
                  "var(--text-primary)",
              }}
            >
              Rematch
            </button>

            {/* Home */}
            <button
              onClick={() =>
                navigate("/")
              }
              className="
                px-6 py-3 rounded-2xl
                font-bold cursor-pointer
                transition-all hover:scale-105
              "
              style={{
                background:
                  "var(--button-color)",

                color:
                  "var(--text-primary)",

                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Home
            </button>

          </div>

        </motion.div>
      </motion.div>
    )
  }

</AnimatePresence>

          {/* BALLS */}
          <div className="flex md:gap-5 gap-2 flex-wrap mt-2">
{BALLS.map((ball) => {

  const isDisabled =
    gameOver;

  return (
    <div
      key={ball.points}
      className={
        isDisabled
          ? "opacity-40 pointer-events-none"
          : "opacity-100"
      }
    >

      <ScoreBall
        color={ball.color}
        points={ball.points}
        redCount={
          ball.points === 1
            ? gameState.reds
            : null
        }
        onClick={() =>
          addScore(ball.points)
        }
      />

    </div>
  );
})}
          </div>

          {/* ACTIONS */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {/* FOUL BUTTON */}
            <button
            disabled={gameOver}
              onClick={() => setShowFoulPanel(!showFoulPanel)}
            className={`
  py-4 rounded-2xl
  border-2 border-red-500
  text-red-500
   md:text-2xl text-base
  transition-all

  ${
    gameOver
      ? "opacity-40 cursor-not-allowed"
      : "cursor-pointer"
  }
`}
            >
              Foul
            </button>

            {/* NEXT TURN */}
            <button
            disabled={gameOver}
              onClick={nextTurn}
             className={`
  py-4 rounded-2xl
  text-white 
  md:text-2xl text-base
  transition-all

  ${
    gameOver
      ? "opacity-40 cursor-not-allowed"
      : "cursor-pointer"
  }
`}
              style={{
                background: "var(--button-color)",

                color: "var(--text-primary)",
              }}
            >
              Next Turn →
            </button>
          </div>

          {/* EXPANDABLE FOUL PANEL */}
          {showFoulPanel && (
            <div
              className="rounded-2xl p-2 space-y-1 mt-4 "
              style={{
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <p
                className="text-sm  mb-2"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Foul penalty
              </p>

              {/* Foul Buttons */}
              <div className="flex gap-2 flex-wrap">
                {[4, 5, 6, 7].map((foul) => (
                  <button
                    key={foul}
                    onClick={() => applyFoul(foul)}
                    className="
                        w-8 h-8 rounded-full
                        bg-red-600 text-white
                         text-xs
                        cursor-pointer
                        hover:scale-105
                        transition-all
                      "
                  >
                    - {foul}
                  </button>
                ))}
              </div>

              {/* CUSTOM APPLY */}
              <div className="flex gap-2 mt-3 justify-between">
                <input
                  type="number"
                  value={customPoints}
                  onChange={(e) => setCustomPoints(e.target.value)}
                  placeholder="Custom"
                  className="
                      flex-1 px-2 py-3 text-xs
                      rounded-2xl outline-none
                    "
                  style={{
                    background: "#02140e",
                    color: "var(--input-text)",
                  }}
                />

                <button
                  onClick={applyCustomPoints}
                  className="
                      px-10 py-3 rounded-2xl text-xs
                       cursor-pointer
                    "
                  style={{
                    background: "var(--button-color)",

                    color: "var(--text-primary)",
                  }}
                >
                  Apply
                </button>
                {/* MATCH HISTORY */}
              </div>
            </div>
          )}
        </div>
        {/* MATCH HISTORY */}
<div
  className="rounded-2xl p-3 mt-2 md:mt-4"
  style={{
    background: "rgba(255,255,255,0.03)",
  }}
>

  <p
    className="text-sm  mb-3"
    style={{
      color: "var(--text-secondary)",
    }}
  >
    Match History
  </p>

  <div className="space-y-2 max-h-62 overflow-y-auto">

    {
      activityLog.length === 0 && (
        <p className="text-gray-500 text-xs">
          No activity yet
        </p>
      )
    }

    {
      activityLog.map(
        (activity, index) => (

          <div
            key={index}
            className="
              flex items-center
              justify-between
              px-4 py-3 rounded-xl
            "
            style={{
              background:
                "rgba(255,255,255,0.04)",
            }}
          >

            {/* LEFT */}
            <div className="flex items-center gap-3">

              <ScoreBall
                color={
                  activity.ballColor
                }
                points={
                  activity.points
                }
                small={true}
                showPlus={false}
              />

              <p
                className="text-sm"
                style={{
                  color:
                    "var(--text-primary)",
                }}
              >
                {activity.playerName}
              </p>

            </div>

            {/* RIGHT */}
            <p
              className="font-bold"
              style={{
                color:
                  activity.type ===
                  "foul"
                    ? "#ef4444"
                    : "#22c55e",
              }}
            >
              {
                activity.type ===
                "foul"
                  ? `-${activity.points}`
                  : `+${activity.points}`
              }
            </p>

          </div>
        )
      )
    }

  </div>
</div>
      </div>
    </section>
    </PageTransition>
  );
}

export default Scoreboard;
