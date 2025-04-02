export const websitePurpose =
  "Welcome to Lakbay China! I'm Li Mei, your friendly guide to discovering the amazing world of China!";

export const pages = [
  {
    name: "Cultural Journey",
    purpose: "Explore the rich tapestry of Chinese traditions and customs.",
    path: "/",
  },
  {
    name: "Historical Treasures",
    purpose: "Uncover ancient mysteries and legendary tales.",
    path: "/",
  },
  {
    name: "Modern Marvels",
    purpose: "Experience China's innovative spirit and modern achievements.",
    path: "/",
  },
  {
    name: "Learning Hub",
    purpose: "Master Chinese language and cultural insights.",
    path: "/",
  },
];

export const characterPuzzle = [
  {
    character: "文",
    meaning: "Culture",
    hint: "Written language and literature",
    id: "char1",
  },
  {
    character: "化",
    meaning: "Transform",
    hint: "Change and development",
    id: "char2",
  },
  {
    character: "旅",
    meaning: "Journey",
    hint: "Travel and exploration",
    id: "char3",
  },
  {
    character: "学",
    meaning: "Learn",
    hint: "Study and knowledge",
    id: "char4",
  },
];

export const conversation = [
  {
    text: `${websitePurpose} Are you ready for an awesome adventure through the Land of Dragons?`,
    options: [{ label: "Let's Go!", nextStep: 1 }],
  },
  {
    text: "I've found a cool ancient scroll with secrets about Chinese culture. Want to help me figure out what it means?",
    options: [
      { label: "Sure, I'll help!", nextStep: 2 },
      { label: "Tell me more first", nextStep: 3 },
    ],
  },
  {
    text: "Let's play a fun matching game! Can you match these Chinese characters with what they mean? Each correct match will unlock part of your journey!",
    type: "puzzle",
    options: [],
  },
  {
    text: "Great job! The scroll shows four amazing paths to explore. Each one will show you something cool and interesting about China!",
    options: [{ label: "Show me the paths", nextStep: 4 }],
  },
  {
    text: "Which awesome path do you want to try first?",
    options: pages.map((page) => ({
      label: `Explore ${page.name}`,
      nextStep: page.path,
    })),
  },
];
