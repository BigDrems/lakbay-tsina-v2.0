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
    return <div className="text-center mt-20">Lesson not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/lessons")}
            className="flex items-center text-gray-700 hover:text-[#cd201c] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* Hero Section */}
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-[300px] md:h-[400px]">
            <img
              src={lesson.image}
              alt={lesson.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="container mx-auto px-6">
                <motion.h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {lesson.title}
                </motion.h1>
                <motion.div
                  className="flex flex-wrap items-center gap-6 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <Users size={20} />
                    <span>{lesson.students} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={20} className="text-yellow-400 fill-current" />
                    <span>{lesson.ratings} Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={20} />
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
