export const websitePurpose =
  "Welcome to Lakbay China! I am Li Mei, your enthusiastic guide to discovering the culture and history of China.";

export const pages = [
  {
    name: "Cultural",
    purpose: "Discover the amazing traditions and culture of China.",
    path: "/",
  },
  {
    name: "About",
    purpose: "Discover the creator and content of the website.",
    path: "/about",
  },
  {
    name: "Lessons",
    purpose: "Discover the lessons and activities of the website.",
    path: "/lessons",
  },
  {
    name: "Entertainment",
    purpose: "Discover the entertainment and fun of the website.",
    path: "/entertainment",
  },
];

export const characterPuzzle = [
  {
    character: "文",
    meaning: "Culture",
    hint: "Discover the beauty and elegance of China.",
    id: "char1",
  },
  {
    character: "化",
    meaning: "Change",
    hint: "Change and development",
    id: "char2",
  },
  {
    character: "旅",
    meaning: "Journey",
    hint: "Travel and discovery",
    id: "char3",
  },
  {
    character: "学",
    meaning: "Learning",
    hint: "Learning and information",
    id: "char4",
  },
];

export const conversation = [
  {
    text: `${websitePurpose} Are you ready to start an unforgettable journey in China?`,
    options: [{ label: "Let's explore!", nextStep: 1 }],
  },
  {
    text: "I found an exciting ancient scroll with secrets about Chinese culture. Would you like to help me figure out what it means?",
    options: [
      { label: "Yes, I'll help you!", nextStep: 2 },
      { label: "Tell me the details first!", nextStep: 3 },
    ],
  },
  {
    text: "Match the items from China! When you match correctly, you'll get a piece!",
    type: "puzzle",
    options: [],
  },
  {
    text: "Excellent! The scroll shows four amazing paths that you can explore. Each path reveals cool and interesting information about China!",
    options: [{ label: "Show me the paths", nextStep: 4 }],
  },
  {
    text: "Which path would you like to learn about first?",
    options: pages.map((page) => ({
      label: `Explore ${page.name}`,
      nextStep: page.path,
    })),
  },
];
