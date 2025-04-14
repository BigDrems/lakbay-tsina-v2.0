import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, PlayCircle, CheckCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { courseContent, getYouTubeVideoId } from "../data/courseData";

const CourseContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState(null);
  const lessons = courseContent[id] || [];

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
  };

  const handleOpenYouTube = (url) => {
    window.open(url, "_blank");
  };

  // Add console log to debug
  console.log("Course ID:", id);
  console.log("Available lessons:", lessons);

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(`/lessons/${id}`)}
            className="flex items-center gap-2 text-gray-700 hover:text-[#cd201c] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-white lg:text-black">Back to Lessons</span>
          </button>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-black">
                Course Lessons
              </h2>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      activeLesson?.id === lesson.id
                        ? "bg-[#cd201c] text-black lg:text-white"
                        : "bg-gray-50 lg:hover:bg-gray-100"
                    }`}
                    onClick={() => handleLessonClick(lesson)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle
                            size={20}
                            className={
                              activeLesson?.id === lesson.id
                                ? "text-white"
                                : "text-green-500"
                            }
                          />
                        ) : (
                          <PlayCircle
                            size={20}
                            className={
                              activeLesson?.id === lesson.id
                                ? "text-white"
                                : "text-[#cd201c]"
                            }
                          />
                        )}
                        <span className="font-medium text-black ">
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-sm text-black  ">
                        {lesson.duration}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            {activeLesson ? (
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4">
                  {activeLesson.title}
                </h2>

                {/* YouTube Video Embed */}
                <div className="aspect-video bg-gray-200 rounded-lg mb-6 overflow-hidden">
                  {activeLesson.videoUrl ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                        activeLesson.videoUrl
                      )}`}
                      title={activeLesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PlayCircle size={48} className="text-[#cd201c]" />
                    </div>
                  )}
                </div>

                {/* YouTube Link */}
                <div className="mb-6">
                  <a
                    href={activeLesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#cd201c] hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenYouTube(activeLesson.videoUrl);
                    }}
                  >
                    <ExternalLink size={18} />
                    <span>Watch on YouTube</span>
                  </a>
                </div>

                <div className="prose max-w-none">
                  <p className="text-black">
                    This lesson covers {activeLesson.title.toLowerCase()}. Watch
                    the video above to learn more about this topic.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center h-full">
                <div className="text-center">
                  <PlayCircle
                    size={48}
                    className="text-gray-400 mx-auto mb-4"
                  />
                  <h3 className="text-xl font-medium text-gray-600">
                    Select a lesson to begin
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
