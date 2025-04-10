import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  PlayCircle,
  Users,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LessonContent = ({ lesson }) => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handleContinue = () => {
    // Navigate to the course content page with the lesson ID
    navigate(`/course-content/${lesson.id}`);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 md:p-8"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      {/* Overview Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Course Description</h2>
          <p className="text-gray-700 leading-relaxed">{lesson.description}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Instructor</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="font-medium">{lesson.instructor}</p>
              <p className="text-gray-600">Course Instructor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        {lesson.topics.map((topic, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PlayCircle size={24} className="text-[#cd201c]" />
            <span>{topic}</span>
          </motion.div>
        ))}
      </div>

      {/* Requirements Section */}
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Course Requirements</h2>
        {lesson.requirements.map((req, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChevronRight size={20} className="text-[#cd201c]" />
            <span>{req}</span>
          </motion.div>
        ))}
      </div>

      {/* Objectives Section */}
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Learning Objectives</h2>
        {lesson.objectives.map((objective, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <BookOpen size={20} className="text-[#cd201c]" />
            <span>{objective}</span>
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="mt-10 flex justify-center">
        <motion.button
          onClick={handleContinue}
          className="flex items-center gap-2 bg-[#cd201c] text-black px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#b01c19] transition-colors shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Continue to Course</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LessonContent;
