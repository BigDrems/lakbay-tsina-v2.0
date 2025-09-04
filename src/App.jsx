import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import WelcomePage from "./pages/WelcomPage";
import WorldMap from "./components/WorldMap";
import Tungkol from "./pages/Tungkol";
import Aralin from "./pages/Aralin";
import Libangan from "./pages/Libangan";
import DynastyExplorer from "./components/DynastyExplorer";
import ImagePreloader from "./components/ImagePreloader";
import PyramidGame from "./components/games/PyramidGame";
import PostTest from "./components/games/PostTest";

// Lazy load game components
const CharacterMatch = lazy(() => import("./components/games/CharacterMatch"));
const DynastyTimeline = lazy(() =>
  import("./components/games/DynastyTimeline")
);
const CulturalQuiz = lazy(() => import("./components/games/CulturalQuiz"));
const GeographyExplorer = lazy(() =>
  import("./components/games/GeographyExplorer")
);
const TermDefinitionGame = lazy(() =>
  import("./components/games/TermDefinitionGame")
);
const Pretest = lazy(() => import("./components/games/Pretest"));

// Loading component for game routes
const GameLoading = () => (
  <div className="min-h-screen bg-[#F5E6D3] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B3100] mx-auto mb-4"></div>
      <p className="text-[#6B3100]">Naglo-load ng laro...</p>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const SESSION_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

  const [welcomeDismissed, setWelcomeDismissed] = useState(() => {
    try {
      // Check if session exists and hasn't expired
      const sessionData = JSON.parse(sessionStorage.getItem("welcomeSession"));
      if (sessionData && sessionData.expiry > Date.now()) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  });

  // Show navbar if welcome is dismissed OR if we're not on the home page
  const showNavbar = welcomeDismissed || location.pathname !== "/";

  const handleWelcomeComplete = () => {
    // Create session with expiration time
    const sessionData = {
      dismissed: true,
      expiry: Date.now() + SESSION_DURATION,
    };
    sessionStorage.setItem("welcomeSession", JSON.stringify(sessionData));
    setWelcomeDismissed(true);
  };

  // Refresh session timer when user is active
  useEffect(() => {
    if (welcomeDismissed) {
      const refreshSession = () => {
        const sessionData = {
          dismissed: true,
          expiry: Date.now() + SESSION_DURATION,
        };
        sessionStorage.setItem("welcomeSession", JSON.stringify(sessionData));
      };

      // Refresh session on user activity
      window.addEventListener("click", refreshSession);
      window.addEventListener("keypress", refreshSession);
      window.addEventListener("scroll", refreshSession);
      window.addEventListener("mousemove", refreshSession);

      return () => {
        window.removeEventListener("click", refreshSession);
        window.removeEventListener("keypress", refreshSession);
        window.removeEventListener("scroll", refreshSession);
        window.removeEventListener("mousemove", refreshSession);
      };
    }
  }, [welcomeDismissed, SESSION_DURATION]);

  // Determine what to show on the home route
  const renderHomeContent = () => {
    if (welcomeDismissed) {
      return <Home />;
    } else {
      return <WelcomePage onComplete={handleWelcomeComplete} />;
    }
  };

  return (
    <>
      <ImagePreloader />
      <main className="flex flex-col max-w-screen overflow-x-hidden relative bg-white">
        {showNavbar && <NavBar />}
        <div className="max-w-[1920px] relative">
          <Routes>
            <Route path="/" element={renderHomeContent()} />
          </Routes>
        </div>
        <div className="mt-18 h-full">
          <Routes>
            <Route path="/about" element={<Tungkol />} />
            <Route path="/lessons" element={<Aralin />} />
            <Route path="/entertainment" element={<Libangan />} />
            <Route
              path="/games/character-match"
              element={
                <Suspense fallback={<GameLoading />}>
                  <CharacterMatch />
                </Suspense>
              }
            />
            <Route
              path="/games/dynasty-timeline"
              element={
                <Suspense fallback={<GameLoading />}>
                  <DynastyTimeline />
                </Suspense>
              }
            />
            <Route
              path="/games/cultural-quiz"
              element={
                <Suspense fallback={<GameLoading />}>
                  <CulturalQuiz />
                </Suspense>
              }
            />
            <Route
              path="/games/music-memory"
              element={
                <Suspense fallback={<GameLoading />}>
                  <PyramidGame />
                </Suspense>
              }
            />
            <Route
              path="/games/geography-explorer"
              element={
                <Suspense fallback={<GameLoading />}>
                  <GeographyExplorer />
                </Suspense>
              }
            />
            <Route
              path="/games/term-definition"
              element={
                <Suspense fallback={<GameLoading />}>
                  <TermDefinitionGame />
                </Suspense>
              }
            />
            <Route
              path="/games/pretest"
              element={
                <Suspense fallback={<GameLoading />}>
                  <Pretest />
                </Suspense>
              }
            />
            <Route
              path="/games/posttest"
              element={
                <Suspense fallback={<GameLoading />}>
                  <PostTest />
                </Suspense>
              }
            />
            <Route path="/dynasty-explorer" element={<DynastyExplorer />} />
            <Route
              path="/dynasty-explorer/:dynasty"
              element={<DynastyExplorer />}
            />
          </Routes>
        </div>
        {showNavbar && <Footer />}
      </main>
    </>
  );
}

export default App;
