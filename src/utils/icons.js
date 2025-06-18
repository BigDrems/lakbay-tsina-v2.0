import {
  Book,
  Brain,
  Trophy,
  ChefHat,
  Gamepad2,
  Music,
  BookOpen,
} from "lucide-react";

const iconMap = {
  Book,
  Brain,
  Trophy,
  ChefHat,
  Gamepad2,
  Music,
  BookOpen,
};

export const getIconComponent = (iconName) => {
  return iconMap[iconName] || Book; // Default to Book icon if not found
};
