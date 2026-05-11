export const BALLS = [
  {
    color: "#ff1d25",
    points: 1,
  },
  {
    color: "#facc15",
    points: 2,
  },
  {
    color: "#22c55e",
    points: 3,
  },
  {
    color: "#92400e",
    points: 4,
  },
  {
    color: "#2563eb",
    points: 5,
  },
  {
    color: "#f472b6",
    points: 6,
  },
  {
    color: "#111111",
    points: 7,
  },
];

export const COLOR_ORDER = [
  2, // Yellow
  3, // Green
  4, // Brown
  5, // Blue
  6, // Pink
  7, // Black
];

export const getNextPlayer =
  (
    activePlayer,
    totalPlayers
  ) => {

    return activePlayer ===
      totalPlayers - 1
      ? 0
      : activePlayer + 1;
};

export const clonePlayers = (
  players
) => {

  return JSON.parse(
    JSON.stringify(players)
  );
};

export const calculateWinner =
  (players) => {

    return players.reduce(
      (highest, current) => {

        return current.score >
          highest.score
          ? current
          : highest;
      }
    );
};

export const getRequiredColor =
  (currentColorIndex) => {

    return COLOR_ORDER[
      currentColorIndex
    ];
};

export const isCorrectColorBall =
  (
    points,
    currentColorIndex
  ) => {

    return (
      points ===
      COLOR_ORDER[
        currentColorIndex
      ]
    );
};