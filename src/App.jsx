import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <main className="flex flex-col max-w-screen overflow-x-hidden">
        <NavBar />
        <div className="max-w-[1343px]">
          <Routes>
            <Route index path="/" element={<Home />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
