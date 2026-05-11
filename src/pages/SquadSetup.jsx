import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FloatingBall from "../components/FloatingBall";
import Scoreboard from "../pages/Scoreboard";
import PageTransition from "../components/PageTransitions";

const TEAM_COLORS = {
  teamA: "#ff1d25",
  teamB: "#2563eb",
};

function SquadSetup() {
  const navigate = useNavigate();

  // Load saved squad data
  const [teams, setTeams] = useState(() => {
    const savedTeams = localStorage.getItem(
      "snooker-squad-data"
    );

    return savedTeams
      ? JSON.parse(savedTeams)
      : {
          teamA: {
            name: "Team A",
            color: TEAM_COLORS.teamA,
            players: ["", ""],
          },

          teamB: {
            name: "Team B",
            color: TEAM_COLORS.teamB,
            players: ["", ""],
          },
        };
  });

  // Save automatically
  useEffect(() => {
    localStorage.setItem(
      "snooker-squad-data",
      JSON.stringify(teams)
    );
  }, [teams]);

  // Change team name
  const handleTeamName = (teamKey, value) => {
    setTeams({
      ...teams,

      [teamKey]: {
        ...teams[teamKey],
        name: value,
      },
    });
  };

  // Change player name
  const handlePlayerName = (
    teamKey,
    playerIndex,
    value
  ) => {
    const updatedPlayers = [
      ...teams[teamKey].players,
    ];

    updatedPlayers[playerIndex] = value;

    setTeams({
      ...teams,

      [teamKey]: {
        ...teams[teamKey],
        players: updatedPlayers,
      },
    });
  };

const isValid =

  teams.teamA.name.trim() !== "" &&

  teams.teamB.name.trim() !== "" &&

  teams.teamA.players.every(
    (player) =>
      player.trim() !== ""
  ) &&

  teams.teamB.players.every(
    (player) =>
      player.trim() !== ""
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
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Squad Setup
        </h1>

        <p
          className="mt-1 mb-5 text-lg"
          style={{
            color: "graytext",
          }}
        >
          Configure teams and player names.
        </p>

        {/* Teams Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* TEAM A */}
          <div
            className="rounded-3xl p-6 border"
            style={{
              background: "var(--bg-secondary)",
              borderColor: "var(--card-border)",
            }}
          >
            {/* Team Header */}
            <div className="flex  items-center gap-4 mb-6">
              <FloatingBall
                size="42px"
                radius="50%"
                color={teams.teamA.color}
                animateBall={false}
              />

              <input
                type="text"
                value={teams.teamA.name}
                placeholder="Team A"
                onChange={(e) =>
                  handleTeamName(
                    "teamA",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 rounded-2xl outline-none border placeholder:text-(--input-placeholder)]"
                style={{
                  background: "transparent",
                  borderColor: "var(--card-border)",
                  color: "var(--input-text)",
                }}
              />
            </div>

            {/* Players */}
            <div className="space-y-4">
              {teams.teamA.players.map(
                (player, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Player ${
                      index + 1
                    } Name`}
                    value={player}
                    onChange={(e) =>
                      handlePlayerName(
                        "teamA",
                        index,
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-2xl outline-none border placeholder:text-(--input-placeholder)]"
                    style={{
                      background: "transparent",
                      borderColor: "var(--card-border)",
                      color: "var(--input-text)",
                    }}
                  />
                )
              )}
            </div>
          </div>

          {/* TEAM B */}
          <div
            className="rounded-3xl p-6 border"
            style={{
              background: "var(--bg-secondary)",
              borderColor: "var(--card-border)",
            }}
          >
            {/* Team Header */}
            <div className="flex items-center gap-4 mb-6">
              <FloatingBall
                size="42px"
                radius="50%"
                color={teams.teamB.color}
                animateBall={false}
              />

              <input
                type="text"
                value={teams.teamB.name}
                placeholder="Team B"
                onChange={(e) =>
                  handleTeamName(
                    "teamB",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 rounded-2xl outline-none border placeholder:text-(--input-placeholder)]"
                style={{
                  background: "transparent",
                  borderColor: "var(--card-border)",
                  color: "var(--input-text)",
                }}
              />
            </div>

            {/* Players */}
            <div className="space-y-4">
              {teams.teamB.players.map(
                (player, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Player ${
                      index + 1
                    } Name`}
                    value={player}
                    onChange={(e) =>
                      handlePlayerName(
                        "teamB",
                        index,
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-2xl outline-none border placeholder:text-(--input-placeholder)]"
                    style={{
                      background: "transparent",
                      borderColor: "var(--card-border)",
                      color: "var(--input-text)",
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-end mt-10">
          <button
          disabled={!isValid}
          onClick={()=>{
            localStorage.setItem("snooker-match-type", "squad"); navigate("/Scoreboard")}}
            className="disabled:opacity-40 disabled:cursor-not-allowed px-8 py-4 rounded-2xl text-lg font-bold cursor-pointer transition-all hover:scale-105"
            style={{
              background: "var(--button-color)",
              color: "var(--text-primary)",
            }}
          >
            Start Match →
          </button>
        </div>
      </div>
    </section>
    </PageTransition>
  );
}

export default SquadSetup;