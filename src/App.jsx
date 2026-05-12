import { Routes, Route, useLocation,Navigate } from "react-router-dom";

import Home from "./pages/Home";
import IndividualSetup from "./pages/IndividualSetup";
import SquadSetup from "./pages/SquadSetup";
import Scoreboard from "./pages/Scoreboard";
import Navbar from "./components/Navbar";
import { useState,useEffect } from "react";
import HistoryPage from "./pages/History";
import { AnimatePresence } from "framer-motion";
import IntroAnimation from "./components/IntroAnimation";
import NotFound from "./pages/NotFound";

const AnimatedRoutes = () => {

  return (

    <AnimatePresence mode="wait">

      const location =
  useLocation();

      <Routes
        location={location}
        key={location.pathname}
      >

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/individual"
          element={
            <IndividualSetup />
          }
        />

        <Route
          path="/squad"
          element={<SquadSetup />}
        />

        <Route
          path="/scoreboard"
          element={<Scoreboard />}
        />

        <Route
          path="/history"
          element={<HistoryPage />}
        />

      <Route
  path="/404"
  element={<NotFound />}
/>

<Route
  path="*"
  element={
    <Navigate to="/404" />
  }
/>

      </Routes>

    </AnimatePresence>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [showIntro, setShowIntro] = useState(true);

  const [installPrompt,
  setInstallPrompt] =
  useState(null);

const [showInstall,
  setShowInstall] =
  useState(false);

    const location =
    useLocation();

 const hideNavbar =
  location.pathname === "/404";

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

    const handleInstall =
    async () => {

      if (!installPrompt)
        return;

      installPrompt.prompt();

      const choice =
        await installPrompt.userChoice;

      if (
        choice.outcome ===
        "accepted"
      ) {

        setShowInstall(false);
      }
    };

  useEffect(() => {

  const isMobile =
    window.innerWidth < 768;

  if (!isMobile) {

    setShowIntro(false);
  }

}, []);

  useEffect(() => {

  if (darkMode) {

    document.documentElement.classList.remove(
      "light"
    );

  } else {

    document.documentElement.classList.add(
      "light"
    );
  }

}, [darkMode]);

useEffect(() => {

  const handleInstallPrompt =
    (e) => {

      e.preventDefault();

      setInstallPrompt(e);

      setShowInstall(true);
    };

  window.addEventListener(
    "beforeinstallprompt",
    handleInstallPrompt
  );

  return () => {

    window.removeEventListener(
      "beforeinstallprompt",
      handleInstallPrompt
    );
  };

}, []);

  return (  
    <main
      className="min-h-screen relative overflow-x-hidden overflow-y-hidden transition-all duration-500 pt-[env(safe-area-inset-top)]"
      style={{
        background: "var(--bg-primary)",
      }}
    >
      {showIntro && <IntroAnimation
      onComplete={() => setShowIntro(false)}
      />}
      {
  !hideNavbar && (

    <Navbar
      darkMode={darkMode}
      toggleTheme={toggleTheme}
    />
  )
}
      <AnimatedRoutes />

{
  showInstall && (

    <button

      onClick={
        handleInstall
      }

      className="
        fixed
        bottom-24
        right-5
        z-50
        text-sm

        px-5 py-3
        rounded-2xl

        font-bold
        shadow-2xl

        animate-bounce
        hover:animate-none
        transition-all duration-300
        hover:scale-105
        focus:outline-none
      "

      style={{
        background:
          "#facc15",

        color:
          "#000",
      }}
    >

      Install

    </button>
  )
}

    </main>
  );
}

export default App;