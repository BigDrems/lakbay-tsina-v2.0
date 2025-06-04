import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Star, Clock, Award, ArrowLeft } from "lucide-react";
import { useState } from "react";
import LessonContent from "../components/LessonContent";
import { courseOverview } from "../data/courseData";

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = courseOverview.find((l) => l.id === parseInt(id));

  if (!lesson) {
    return <div className="text-center mt-20">Hindi natagpuan ang aralin</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-10">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/lessons")}
            className="flex items-center gap-1 text-gray-700 hover:text-[#cd201c] transition-colors font-medium"
            aria-label="Bumalik"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Hero Section */}
        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-[250px] md:h-[350px]">
            <img
              src={lesson.image}
              alt={lesson.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
              <div className="container mx-auto px-6">
                <motion.h1
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {lesson.title}
                </motion.h1>
                <motion.div
                  className="flex flex-wrap items-center gap-6 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>{lesson.students} Mag-aaral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-yellow-400 fill-current" />
                    <span>{lesson.ratings} Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={18} />
                    <span>{lesson.status}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lesson Content */}
        <LessonContent lesson={lesson} />
      </div>
    </div>
  );
};

export default LessonDetail;
