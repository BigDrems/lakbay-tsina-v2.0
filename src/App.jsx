import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import WelcomePage from "./pages/WelcomPage";
import Tungkol from "./pages/Tungkol";
import Aralin from "./pages/Aralin";
import Libangan from "./pages/Libangan";
import LessonDetail from "./pages/LessonDetail";
import CourseContent from "./pages/CourseContent";
import CharacterMatch from "./components/games/CharacterMatch";
import DynastyTimeline from "./components/games/DynastyTimeline";
import CulturalQuiz from "./components/games/CulturalQuiz";
import MusicMemory from "./components/games/MusicMemory";
import GeographyExplorer from "./components/games/GeographyExplorer";

function App() {
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(() => {
    // Initialize from localStorage, default to false if not set
    return localStorage.getItem("isWelcomeComplete") === "true";
  });

  const handleWelcomeComplete = () => {
    setIsWelcomeComplete(true);
    // Save to localStorage
    localStorage.setItem("isWelcomeComplete", "true");
  };

  return (
    <>
      <main className="flex flex-col max-w-screen overflow-x-hidden relative">
        {isWelcomeComplete && <NavBar />}
        <div className="max-w-[1350px] relative">
          <Routes>
            <Route
              path="/"
              element={
                isWelcomeComplete ? (
                  <Home />
                ) : (
                  <WelcomePage onComplete={handleWelcomeComplete} />
                )
              }
            />
          </Routes>
        </div>
        <div className="mt-18">
          <Routes>
            <Route path="/about" element={<Tungkol />} />
            <Route path="/lessons/:id" element={<LessonDetail />} />
            <Route path="/course-content/:id" element={<CourseContent />} />
            <Route path="/lessons" element={<Aralin />} />
            <Route path="/entertainment" element={<Libangan />} />
            <Route path="/games/character-match" element={<CharacterMatch />} />
            <Route
              path="/games/dynasty-timeline"
              element={<DynastyTimeline />}
            />
            <Route path="/games/cultural-quiz" element={<CulturalQuiz />} />
            <Route path="/games/music-memory" element={<MusicMemory />} />
            <Route
              path="/games/geography-explorer"
              element={<GeographyExplorer />}
            />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
