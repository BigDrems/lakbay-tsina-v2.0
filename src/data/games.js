// Game categories
export const CATEGORIES = [
  "Lahat",
  "Wika",
  "Kasaysayan",
  "Kultura",
  "Musika",
  "Heograpiya",
];

// Game data
export const GAMES_DATA = [
  {
    id: 1,
    title: "Chinese Character Match",
    description:
      "Match Chinese characters with their Filipino meanings. Test your knowledge of basic Chinese characters!",
    icon: "Book",
    difficulty: "Easy",
    category: "Wika",
    image: "/images/character-match.png",
    path: "/games/character-match",
    popular: true,
  },
  {
    id: 2,
    title: "Dynasty Timeline",
    description:
      "Arrange Chinese dynasties in chronological order. Learn about the rich history of China!",
    icon: "Brain",
    difficulty: "Medium",
    category: "Kasaysayan",
    image: "/images/dynasty-timeline.png",
    path: "/games/dynasty-timeline",
    popular: false,
  },
  {
    id: 3,
    title: "Cultural Quiz",
    description:
      "Test your knowledge about Chinese festivals, traditions, and customs.",
    icon: "Trophy",
    difficulty: "Medium",
    category: "Kultura",
    image: "/images/cultural-quiz.png",
    path: "/games/cultural-quiz",
    popular: true,
  },
  {
    id: 4,
    title: "Chinese Cuisine Master",
    description:
      "Learn to cook famous Chinese dishes and discover culinary traditions. Drag ingredients and follow cooking steps!",
    icon: "ChefHat",
    difficulty: "Easy",
    category: "Kultura",
    image: "/images/chef.png",
    path: "/games/music-memory",
    popular: true,
  },
  {
    id: 5,
    title: "Geography Explorer",
    description:
      "Explore China's geography through an interactive map game. Learn about provinces and landmarks!",
    icon: "Gamepad2",
    difficulty: "Medium",
    category: "Heograpiya",
    image: "/images/geography.jpg",
    path: "/games/geography-explorer",
    popular: false,
  },
];

// Animation variants
export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  item: {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
};
