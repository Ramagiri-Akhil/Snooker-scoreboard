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

    const location =
    useLocation();

 const hideNavbar =
  location.pathname === "/404";

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
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

  return (

    
  
    <main
      className="min-h-screen relative overflow-hidden transition-all duration-500"
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
    </main>
  );
}

export default App;