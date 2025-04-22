import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Trophy,
  Brain,
  Music,
  Book,
  Gamepad2,
  ChefHat,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const games = [
  {
    id: 1,
    title: "Chinese Character Match",
    description:
      "Match Chinese characters with their Filipino meanings. Test your knowledge of basic Chinese characters!",
    icon: <Book className="w-8 h-8" />,
    difficulty: "Easy",
    category: "Wika",
    image: "/images/character-match.png",
    path: "/games/character-match",
  },
  {
    id: 2,
    title: "Dynasty Timeline",
    description:
      "Arrange Chinese dynasties in chronological order. Learn about the rich history of China!",
    icon: <Brain className="w-8 h-8" />,
    difficulty: "Medium",
    category: "Kasaysayan",
    image: "/images/dynasty-timeline.png",
    path: "/games/dynasty-timeline",
  },
  {
    id: 3,
    title: "Cultural Quiz",
    description:
      "Test your knowledge about Chinese festivals, traditions, and customs.",
    icon: <Trophy className="w-8 h-8" />,
    difficulty: "Medium",
    category: "Kultura",
    image: "/images/cultural-quiz.png",
    path: "/games/cultural-quiz",
  },
  {
    id: 4,
    title: "Chinese Cuisine Master",
    description:
      "Learn to cook famous Chinese dishes and discover culinary traditions. Drag ingredients and follow cooking steps!",
    icon: <ChefHat className="w-8 h-8" />,
    difficulty: "Easy",
    category: "Kultura",
    image: "/images/music-memory.jpg",
    path: "/games/music-memory",
  },
  {
    id: 5,
    title: "Geography Explorer",
    description:
      "Explore China's geography through an interactive map game. Learn about provinces and landmarks!",
    icon: <Gamepad2 className="w-8 h-8" />,
    difficulty: "Medium",
    category: "Heograpiya",
    image: "/images/geography-game.png",
    path: "/games/geography-explorer",
  },
];

const Libangan = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Lahat");
  const categories = [
    "Lahat",
    "Wika",
    "Kasaysayan",
    "Kultura",
    "Musika",
    "Heograpiya",
  ];

  const filteredGames =
    selectedCategory === "Lahat"
      ? games
      : games.filter((game) => game.category === selectedCategory);

  const handleGameClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#6B3100] mb-4">
            Mga Libangan at Laro
          </h1>
          <p className="text-lg text-[#6B3100]/80">
            Tuklasin ang Tsina sa pamamagitan ng mga masayang laro at aktibidad
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#6B3100] text-white lg:text-black"
                  : "bg-white text-white lg:text-[#6B3100] hover:bg-[#6B3100]/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#6B3100] text-white px-3 py-1 rounded-full text-sm">
                  {game.difficulty}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[#6B3100]">{game.icon}</div>
                  <h3 className="text-xl font-semibold text-[#6B3100]">
                    {game.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <button
                  onClick={() => handleGameClick(game.path)}
                  className="w-full bg-[#6B3100] text-white  lg:text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#6B3100]/90 transition-colors duration-300"
                >
                  Simulan ang Laro
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Libangan;
