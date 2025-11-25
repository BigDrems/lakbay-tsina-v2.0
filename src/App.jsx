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
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";

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
  const [welcomeDismissed, setWelcomeDismissed] = useState(() => {
    try {
      return localStorage.getItem("welcomeDismissed") === "true";
    } catch (error) {
      return false;
    }
  });

  // Show navbar if welcome is dismissed OR if we're not on the home page
  const showNavbar = welcomeDismissed || location.pathname !== "/";

  const handleWelcomeComplete = () => {
    localStorage.setItem("welcomeDismissed", "true");
    setWelcomeDismissed(true);
  };

  // Determine what to show on the home route
  const renderHomeContent = () => {
    if (welcomeDismissed) {
      return <Home />;
    } else {
      return <WelcomePage onComplete={handleWelcomeComplete} />;
    }
  };

  return (
    <AuthProvider>
      <ImagePreloader />
      <main className="flex flex-col max-w-screen overflow-x-hidden relative bg-white">
        {showNavbar && <NavBar />}
        <Routes>
          <Route path="/" element={
            <div className="max-w-[1920px] relative">
              <ProtectedRoute>
                {renderHomeContent()}
              </ProtectedRoute>
            </div>
          } />
          <Route path="/*" element={
            <div className="mt-18 h-full">
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/about" element={
                  <ProtectedRoute>
                    <Tungkol />
                  </ProtectedRoute>
                } />
                <Route path="/lessons" element={
                  <ProtectedRoute>
                    <Aralin />
                  </ProtectedRoute>
                } />
                <Route path="/entertainment" element={
                  <ProtectedRoute>
                    <Libangan />
                  </ProtectedRoute>
                } />
                <Route
                  path="/games/character-match"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<GameLoading />}>
                        <CharacterMatch />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/dynasty-timeline"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<GameLoading />}>
                        <DynastyTimeline />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/cultural-quiz"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<GameLoading />}>
                        <CulturalQuiz />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/music-memory"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<GameLoading />}>
                        <PyramidGame />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/geography-explorer"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<GameLoading />}>
                        <GeographyExplorer />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/term-definition"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<GameLoading />}>
                        <TermDefinitionGame />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/pretest"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<GameLoading />}>
                        <Pretest />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/posttest"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<GameLoading />}>
                        <PostTest />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route path="/dynasty-explorer" element={
                  <ProtectedRoute>
                    <DynastyExplorer />
                  </ProtectedRoute>
                } />
                <Route
                  path="/dynasty-explorer/:dynasty"
                  element={
                    <ProtectedRoute>
                      <DynastyExplorer />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          } />
        </Routes>
        {showNavbar && <Footer />}
      </main>
    </AuthProvider>
  );
}

export default App;
