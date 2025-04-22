export const lessons = [
  {
    id: 1,
    title: "Kasaysayan at Dinastiya",
    instructor: "Ralph Santos",
    description:
      "Pag-aralan ang mayamang kasaysayan ng Tsina, mula sa mga sinaunang dinastiya hanggang sa modernong panahon.",
    students: 38,
    ratings: 4.5,
    price: "Free",
    image: "/images/history.png",
    category: "History",
    status: "Popular",
    duration: "4 weeks",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Kultura at Tradisyon",
    instructor: "Maria Chen",
    description:
      "Tuklasin ang mga natatanging kaugalian at tradisyon ng Tsina, kabilang ang mga pista, ritwal, at pamumuhay.",
    students: 45,
    ratings: 4.8,
    price: "Free",
    image: "/images/kultura (2).png",
    category: "Culture",
    status: "Certificate",
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Pulitika at Pamahalaan",
    instructor: "Dr. Li Wei",
    description:
      "Pag-unawa sa sistemang pampulitika ng Tsina at ang papel nito sa pandaigdigang larangan.",
    students: 32,
    ratings: 4.3,
    price: "Free",
    image: "/images/china.png",
    category: "Politics",
    status: "Learning",
    duration: "5 weeks",
    level: "Advanced",
  },
  {
    id: 4,
    title: "Ekonomiya ng Tsina",
    instructor: "Prof. Zhang Wei",
    description:
      "Pag-aaral sa ekonomikong pag-unlad ng Tsina at ang impluwensya nito sa global na ekonomiya.",
    students: 50,
    ratings: 4.7,
    price: "Free",
    image: "/images/economy.jpg",
    category: "Economics",
    status: "Popular",
    duration: "8 weeks",
    level: "Intermediate",
  },
  {
    id: 5,
    title: "Heograpiya ng Tsina",
    instructor: "Juan Dela Cruz",
    description:
      "Galugarin ang malawak na lupain ng Tsina, mula sa mga bundok hanggang sa mga modernong lungsod.",
    students: 28,
    ratings: 4.4,
    price: "Free",
    image: "/images/geography.jpg",
    category: "Geography",
    status: "Learning",
    duration: "3 weeks",
    level: "Beginner",
  },
];

export const categories = [
  "All",
  "History",
  "Culture",
  "Politics",
  "Economics",
  "Geography",
];

export const statistics = {
  totalLessons: lessons.length,
  completionRate: "91%",
  totalStudents: "193",
  averageRating: "4.6",
};
