import { motion } from "framer-motion";
import {
  Book,
  ChevronRight,
  Play,
  User,
  ArrowRight,
  Clock,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LessonContent = ({ lesson }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(`/course-content/${lesson.id}`);
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <motion.div
          className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Nilalaman */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <Book className="text-[#cd201c]" size={24} />
              Nilalaman ng Kurso
            </h2>
            <div className="space-y-3">
              {lesson.topics.map((topic, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-l-4 border-[#cd201c] hover:bg-gray-100 transition-colors cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#cd201c]/10 flex items-center justify-center flex-shrink-0">
                    <Play size={16} className="text-[#cd201c]" />
                  </div>
                  <div>
                    <span className="font-medium">{topic}</span>
                    <p className="text-xs text-gray-500">
                      {10 + index * 5} minuto
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Layunin */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <span className="text-[#cd201c]">✦</span>
              Mga Layunin ng Pag-aaral
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#cd201c]/10 flex items-center justify-center flex-shrink-0">
                    <ChevronRight size={14} className="text-[#cd201c]" />
                  </div>
                  <span>{objective}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md h-fit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Instructor */}
          <div className="mb-6 bg-gray-50 p-4 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Guro</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={24} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium">{lesson.instructor}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-3xl font-bold text-[#cd201c]">
                {lesson.modules || 5}
              </p>
              <p className="text-sm text-gray-600">Mga Modyul</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-3xl font-bold text-[#cd201c]">
                {lesson.students || 1250}+
              </p>
              <p className="text-sm text-gray-600">Mga Estudyante</p>
            </div>
          </div>

          {/* Button */}
          <motion.button
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2 bg-[#cd201c] text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-[#b01c19] transition-colors shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Simulan ang Kurso</span>
            <ArrowRight size={20} />
          </motion.button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Walang bayad • I-access Anumang Oras
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LessonContent;
