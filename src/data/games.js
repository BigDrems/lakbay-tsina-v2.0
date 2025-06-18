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
    title: "Pagpapares ng mga Karakter ng Tsino",
    description:
      "I-pares ang mga karakter ng Tsino sa kanilang mga kahulugan sa Filipino. Subukan ang iyong kaalaman sa mga pangunahing karakter ng Tsino!",
    icon: "Book",
    difficulty: "Madali",
    category: "Wika",
    image: "/images/character-match.png",
    path: "/games/character-match",
    popular: true,
  },
  {
    id: 2,
    title: "Tagpo ng mga Dinastiya",
    description:
      "Ayusin ang mga dinastiya ng Tsino sa pagkakasunud-sunod ng panahon. Matuto tungkol sa mayamang kasaysayan ng China!",
    icon: "Brain",
    difficulty: "Katamtaman",
    category: "Kasaysayan",
    image: "/images/dynasty-timeline.png",
    path: "/games/dynasty-timeline",
    popular: false,
  },
  {
    id: 3,
    title: "Pagsusulit sa Kultura",
    description:
      "Subukan ang iyong kaalaman tungkol sa mga pista, tradisyon, at kaugalian ng Tsino.",
    icon: "Trophy",
    difficulty: "Katamtaman",
    category: "Kultura",
    image: "/images/cultural-quiz.png",
    path: "/games/cultural-quiz",
    popular: true,
  },
  {
    id: 4,
    title: "Dakilang Tagapagluto ng Lutuing Tsino",
    description:
      "Matuto magluto ng mga kilalang putahe ng Tsino at tuklasin ang mga tradisyon sa pagluluto. I-drag ang mga sangkap at sundin ang mga hakbang sa pagluluto!",
    icon: "ChefHat",
    difficulty: "Madali",
    category: "Kultura",
    image: "/images/chef.png",
    path: "/games/music-memory",
    popular: true,
  },
  {
    id: 5,
    title: "Taggalug ng Heograpiya",
    description:
      "Tuklasin ang heograpiya ng China sa pamamagitan ng interactive na laro sa mapa. Matuto tungkol sa mga lalawigan at mga landmark!",
    icon: "Gamepad2",
    difficulty: "Katamtaman",
    category: "Heograpiya",
    image: "/images/geography.jpg",
    path: "/games/geography-explorer",
    popular: false,
  },
  {
    id: 6,
    title: "Pagsusulit sa mga Termino",
    description:
      "Basahin ang kahulugan at tingnan ang larawan, pagkatapos ay isulat ang tamang termino. Subukan ang iyong kaalaman sa mga terminong Tsino!",
    icon: "BookOpen",
    difficulty: "Madali",
    category: "Wika",
    image: "/images/history.png",
    path: "/games/term-definition",
    popular: true,
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
