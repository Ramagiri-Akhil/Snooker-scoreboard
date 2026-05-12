import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FloatingBall from "../components/FloatingBall";
import Scoreboard from "../pages/Scoreboard";
import PageTransition from "../components/PageTransitions";
import {motion} from "framer-motion";
const COLORS = [
  "#ff1d25",
  "#2563eb",
  "#facc15",
  "#f472b6",
  "#22c55e",
];

function IndividualSetup() {
  const navigate = useNavigate();

  const [playerCount, setPlayerCount] = useState(2);

  // Load saved players from localStorage
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem(
      "snooker-individual-players"
    );

    return savedPlayers
      ? JSON.parse(savedPlayers)
      : [
          {
            name: "",
            color: "#ff1d25",
          },
          {
            name: "",
            color: "#2563eb",
          },
        ];
  });

  // Save players automatically
  useEffect(() => {
    localStorage.setItem(
      "snooker-individual-players",
      JSON.stringify(players)
    );
  }, [players]);

  // Sync player count with players array
  useEffect(() => {
    setPlayerCount(players.length);
  }, [players]);

  // Change Player Count
  const handlePlayerCount = (count) => {
    const updatedPlayers = [];

    for (let i = 0; i < count; i++) {
      updatedPlayers.push({
        name: players[i]?.name || "",
        color: players[i]?.color || COLORS[i],
      });
    }

    setPlayers(updatedPlayers);
  };

  // Handle Name Change
  const handleNameChange = (index, value) => {
    const updatedPlayers = [...players];

    updatedPlayers[index].name = value;

    setPlayers(updatedPlayers);
  };

  // Handle Color Change
  const handleColorChange = (index, color) => {
    const updatedPlayers = [...players];

    updatedPlayers[index].color = color;

    setPlayers(updatedPlayers);
  };

const isValid =
  players.every(
    (player) =>
      player.name.trim() !== ""
  );

  return (
    <PageTransition>
    <section
      className="relative z-20 min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background:
          "radial-gradient(circle at center, var(--glow-color), transparent 110%)",
      }}
    >
      <div
        className="w-full max-w-6xl rounded-[40px] p-6 md:p-12 border backdrop-blur-md"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        {/* Title */}
        <h1
          className="cinzel-400 text-xl md:text-3xl font-bold mb-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Individual Setup
        </h1>

        <p
          className="mt-1 mb-5 text-sm md:text-base"
          style={{
            color: "graytext",
          }}
        >
          Choose 2–5 players, each with a unique color.
        </p>

        {/* Player Count Buttons */}
       {/* Player Count Buttons */}
<div className="mb-5 flex gap-3">

  {[2, 3, 4, 5].map(
    (count) => {

      const isActive =
        playerCount === count;

      return (

        <motion.button

          key={count}

          onClick={() =>
            handlePlayerCount(count)
          }

          whileTap={{
            scale: 0.92,
          }}

          whileHover={{
            scale: 1.03,
          }}

          className="
            relative
            flex-1 py-3
            rounded-xl
            overflow-hidden
            cursor-pointer
            border
          "

          style={{
            borderColor:
              isActive
                ? "#facc15"
                : "var(--card-border)",
          }}
        >

          {/* ACTIVE BACKGROUND */}
          {
            isActive && (

              <motion.div

                layoutId="player-count-pill"

                className="
                  absolute inset-0
                  rounded-xl
                "

                style={{
                  background:
                    "var(--button-color)",
                }}
              />
            )
          }

          {/* NUMBER */}
          <span
            className="
              relative z-10
              font-semibold
            "
            style={{
              color:
                isActive
                  ? "#000"
                  : "var(--text-secondary)",
            }}
          >
            {count}
          </span>

        </motion.button>
      );
    }
  )}

</div>

        {/* Player Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {players.map((player, index) => (
            <div
              key={index}
              className="rounded-3xl p-6 border"
              style={{
                background: "var(--bg-secondary)",
                borderColor: "var(--card-border)",
              }}
            >
              {/* Player Title */}
              <h2
                className="text-xl font-bold mb-4"
                style={{
                  color: "graytext",
                }}
              >
                Player {index + 1}
              </h2>

              {/* Name Input */}
              <input
                type="text"
                placeholder={`Player ${index + 1} Name`}
                value={player.name}
                onChange={(e) =>
                  handleNameChange(index, e.target.value)
                }
                className="w-full text-sm px-4 py-3 rounded-2xl outline-none border"
                style={{
          background: "var(--card-bg)",
          borderColor: "var(--card-border)",
          color:"var(--input-text)",
        }}
              />

              {/* Color Selection */}
              <div className="flex gap-3 mt-5 flex-wrap">
                {COLORS.map((color) => {
                  const alreadyUsed = players.some(
                    (p, i) =>
                      p.color === color && i !== index
                  );

                  return (
                    <button
                      key={color}
                      disabled={alreadyUsed}
                      onClick={() =>
                        handleColorChange(index, color)
                      }
                      className={`
                        rounded-full transition-all
                        ${
                          alreadyUsed
                            ? "opacity-30 cursor-not-allowed"
                            : "cursor-pointer"
                        }
                      `}
                    >
                      <FloatingBall
                        size="42px"
                        color={color}
                        animateBall={false}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <div className="flex justify-end mt-5">
          <button
          disabled={!isValid}
          onClick={()=>{
            localStorage.setItem("snooker-match-type", "individual");
            navigate('/Scoreboard')}}
            className="disabled:opacity-40 disabled:cursor-not-allowed px-8 py-4 rounded-2xl text-sm font-bold cursor-pointer transition-all hover:scale-105"
            style={{
              background: "var(--button-color)",
              color: "#000",
            }}
          >
            Start
          </button>
        </div>
      </div>
    </section>
    </PageTransition>
  );
}

export default IndividualSetup;