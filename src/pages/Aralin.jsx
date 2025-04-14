import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Star } from "lucide-react";

const lessons = [
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
  },
];

const Lessons = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "History",
    "Culture",
    "Politics",
    "Economics",
    "Geography",
  ];

  const filteredLessons =
    selectedCategory === "All"
      ? lessons
      : lessons.filter((lesson) => lesson.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Mga Aralin
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-[#cd201c] text-black"
                  : "bg-white text-gray-700 lg:hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Link
              to={`/lessons/${lesson.id}`}
              key={lesson.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg lg:hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 right-4 bg-[#cd201c] text-white px-3 py-1 rounded-full text-sm">
                  {lesson.status}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {lesson.instructor}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {lesson.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{lesson.students} Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-current"
                      />
                      <span>{lesson.ratings}</span>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${
                      lesson.price === "Free"
                        ? "text-green-600"
                        : "text-[#cd201c]"
                    }`}
                  >
                    {lesson.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
