import { Trash2, ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransitions";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const navigate = useNavigate();

  const savedMatches = JSON.parse(
    localStorage.getItem(
      "snooker-history"
    ) || "[]"
  );

  const clearHistory = () => {

    localStorage.removeItem(
      "snooker-history"
    );

    window.location.reload();
  };

  return (
    <PageTransition>
      <section
        className="
          min-h-screen
          px-4 py-25
        "
        style={{
        background:
          "radial-gradient(circle at center, var(--glow-color), transparent 120%)",
      }}
    >

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

            <button

  onClick={() =>
    navigate(-1)
  }

  className="
    w-12 h-12
    rounded-full
    flex items-center
    justify-center
    cursor-pointer
    transition-all
    hover:scale-105
  "

  style={{
    background:
      "var(--bg-secondary)",

    color:
      "var(--text-secondary)",
  }}
>

  <ArrowLeft size={22} />

</button>

          <h1
            className="
              text-3xl md:text-5xl
              font-black
            "
            style={{
              color:
                "var(--text-primary)",
            }}
          >
            History
          </h1>

          {
            savedMatches.length > 0 && (

              <button
                onClick={clearHistory}
                className="
                  px-5 py-3
                  rounded-2xl
                  flex items-center gap-2
                  cursor-pointer
                "
                style={{
                  background:
                    "#ef4444",

                  color: "#fff",
                }}
              >
                <Trash2 size={18} />

                Clear
              </button>
            )
          }

        </div>

        {/* EMPTY STATE */}
        {
          savedMatches.length === 0 && (

            <div
              className="
                rounded-[35px]
                p-14 text-center
              "
              style={{
                background:
                  "var(--bg-secondary)",
              }}
            >

              <h2
                className="
                  text-2xl md:text-3xl
                  font-bold
                "
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                No Saved Matches
              </h2>

              <p className="text-gray-500 mt-3">
                Completed matches will appear here.
              </p>

            </div>
          )
        }

        {/* MATCHES */}
        <div className="space-y-5">

          {
            savedMatches.map(
              (match, index) => (

                <div
                  key={index}
                  className="
                    rounded-[30px]
                    p-6
                  "
                  style={{
                    background:
                      "var(--bg-secondary)",
                  }}
                >

                  {/* TOP */}
                  <div className="flex items-center justify-between flex-wrap gap-4">

                    <div>

                      <h2
                        className="
                          text-2xl font-bold
                        "
                        style={{
                          color:
                            "var(--text-secondary)",
                        }}
                      >
                        {match.winner}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        Winner
                      </p>

                    </div>

                    <div className="text-right">

                      <h1 className="text-4xl font-black text-yellow-400">
                        {match.score}
                      </h1>

                      <p className="text-gray-500">
                        points
                      </p>

                    </div>

                  </div>

                  {/* PLAYERS */}
                  <div className="mt-6">

                    <p className="text-gray-500 mb-3">
                      Players
                    </p>

                    <div className="flex flex-wrap gap-3">

                      {
                        match.players.map(
                          (
                            player,
                            playerIndex
                          ) => (

                            <div
                              key={playerIndex}
                              className="
                                px-4 py-2
                                rounded-full
                              "
                              style={{
                                background:
                                  "rgba(255,255,255,0.1)",

                                color:
                                  "var(--text-secondary)",
                              }}
                            >
                              {player.name}
                            </div>
                          )
                        )
                      }

                    </div>

                  </div>

                  {/* DATE */}
                  <p className="text-gray-500 mt-6 text-sm">
                    {match.date}
                  </p>

                </div>
              )
            )
          }

        </div>

      </div>
    </section>
    </PageTransition>
  );
};

export default HistoryPage;