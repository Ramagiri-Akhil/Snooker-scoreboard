import {
  Home,
  History,
  Sun,
  Moon,
} from "lucide-react";

import { motion } from "framer-motion";

import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({
  darkMode,
  toggleTheme,
}) => {

  const navigate = useNavigate();

  const location = useLocation();

  const navItems = [
    {
      icon: <Home size={24} />,
      label: "Home",
      path: "/",
    },

    {
      icon: <History size={24} />,
      label: "History",
      path: "/history",
    },
  ];

  return (
    <>
      {/* DESKTOP NAV */}
      <div
        className="
          hidden md:flex
          fixed top-5 left-1/2
          -translate-x-1/2
          z-50
        "
      >

        <div
          className="
            flex items-center gap-3
            px-4 py-3
            rounded-full
            border
            backdrop-blur-xl
          "
          style={{
            background:
              "rgba(0,0,0,0.25)",

            borderColor:
              "rgba(255,255,255,0.08)",
          }}
        >

          {/* NAV ITEMS */}
          {
            navItems.map((item) => {

              const isActive =
                location.pathname ===
                item.path;

              return (
                <motion.button
                  key={item.path}

                  onClick={() =>
                    navigate(item.path)
                  }

                  whileHover={{
                    scale: 1.05,
                  }}

                  whileTap={{
                    scale: 0.95,
                  }}

                  className="
                    relative
                    flex items-center
                    gap-2
                    px-5 py-3
                    rounded-full
                    transition-all
                    cursor-pointer
                  "
                  style={{
                    color: isActive
                      ? "#facc15"
                      : "var(--text-secondary)",
                  }}
                >

                  {
                    isActive && (
                      <motion.div

                        layoutId="active-pill"

                        className="
                          absolute inset-0
                          rounded-full
                        "

                        style={{
                          background:
                            "rgba(250,204,21,0.12)",

                          border:
                            "1px solid rgba(250,204,21,0.3)",
                        }}
                      />
                    )
                  }

                  <span className="relative z-10">
                    {item.icon}
                  </span>

                  <span className="relative z-10 font-semibold">
                    {item.label}
                  </span>

                </motion.button>
              );
            })
          }

          {/* THEME BUTTON */}
          <motion.button

            whileHover={{
              rotate: 20,
              scale: 1.08,
            }}

            whileTap={{
              scale: 0.9,
            }}

            onClick={toggleTheme}

            className="
              w-12 h-12
              rounded-full
              flex items-center
              justify-center
              cursor-pointer
            "

            style={{
              background:
                "rgba(255,255,255,0.06)",

              color:
                "var(--text-primary)",
            }}
          >
            {
              darkMode
                ? <Sun />
                : <Moon />
            }
          </motion.button>

        </div>
      </div>

      {/* MOBILE NAV */}
      <div
        className="
          md:hidden
          fixed bottom-5 left-1/2
          -translate-x-1/2
          z-50
          w-[92%]
        "
      >

        <div
          className="
            flex items-center
            justify-around
            px-4 py-3
            rounded-full
            border
            backdrop-blur-xl
          "

          style={{
            background:
              "rgba(0,0,0,0.25)",

            borderColor:
              "rgba(255,255,255,0.08)",
          }}
        >

          {/* HOME + HISTORY */}
          {
            navItems.map((item) => {

              const isActive =
                location.pathname ===
                item.path;

              return (
                <motion.button

                  key={item.path}

                  onClick={() =>
                    navigate(item.path)
                  }

                  whileTap={{
                    scale: 0.9,
                  }}

                  className="
                    relative
                    w-14 h-14
                    rounded-full
                    flex items-center
                    justify-center
                    cursor-pointer
                  "
                  style={{
                    color: isActive
                      ? "#facc15"
                      : "var(--text-secondary)",
                  }}
                >

                  {
                    isActive && (
                      <motion.div

                        layoutId="mobile-pill"

                        className="
                          absolute inset-0
                          rounded-full
                        "

                        style={{
                          background:
                            "rgba(250,204,21,0.12)",

                          border:
                            "1px solid rgba(250,204,21,0.3)",
                        }}
                      />
                    )
                  }

                  <span className="relative z-10">
                    {item.icon}
                  </span>

                </motion.button>
              );
            })
          }

          {/* THEME */}
          <motion.button

            whileTap={{
              scale: 0.9,
            }}

            onClick={toggleTheme}

            className="
              w-14 h-14
              rounded-full
              flex items-center
              justify-center
              cursor-pointer
            "

            style={{
              background:
                "rgba(255,255,255,0.06)",

              color:
                "var(--text-primary)",
            }}
          >
            {
              darkMode
                ? <Sun />
                : <Moon />
            }
          </motion.button>

        </div>
      </div>
    </>
  );
};

export default Navbar;