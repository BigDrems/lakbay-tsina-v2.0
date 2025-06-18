import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const LessonCard = ({ lesson, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link
        to={`/lessons/${lesson.id}`}
        className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
      >
        <div className="relative overflow-hidden">
          <div className="aspect-w-16 aspect-h-9">
            {!imageLoaded && (
              <div className="w-full h-52 bg-gray-200 animate-pulse"></div>
            )}
            <img
              src={lesson.image}
              alt={lesson.title}
              className={`w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-500 ${
                !imageLoaded ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoaded(true)}
              style={{ transition: "opacity 0.3s ease-in-out" }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex-grow p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#cd201c] transition-colors">
              {lesson.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lesson.instructor}`}
                  alt={lesson.instructor}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <p className="text-gray-600 text-sm">{lesson.instructor}</p>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {lesson.description}
            </p>
          </div>

          <div className="mt-auto">
            <div className="mt-4 w-full">
              <span className="flex items-center justify-center w-full py-2 px-4 bg-gray-100 rounded-lg text-gray-700 font-medium group-hover:bg-[#cd201c] group-hover:text-white transition-all duration-300">
                <span>Mag-aral Ngayon</span>
                <ChevronRight
                  size={16}
                  className="ml-1 transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default LessonCard;
