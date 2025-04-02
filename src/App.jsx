import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import { useState } from "react";
import WelcomePage from "./pages/WelcomPage";

function App() {
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);

  const handleWelcomeComplete = () => {
    setIsWelcomeComplete(true);
  };

  return (
    <>
      <main className="flex flex-col max-w-screen overflow-x-hidden relative">
        {isWelcomeComplete && <NavBar />}
        <div className="max-w-[1343px] relative">
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
      </main>
    </>
  );
}

export default App;
