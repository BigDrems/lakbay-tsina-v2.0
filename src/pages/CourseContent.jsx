import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { courseContent, getYouTubeVideoId } from "../data/courseData";
import ModernProgressBar from "../components/ModernProgressBar";

const CourseContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load lessons from courseContent and add completed property if not present
    const courseLessons = courseContent[id] || [];

    // Check if lessons are stored in localStorage
    const storedLessons = localStorage.getItem(`course_${id}_lessons`);

    if (storedLessons) {
      const parsedStoredLessons = JSON.parse(storedLessons);

      // Merge courseData.js with localStorage data to ensure videoUrl updates are reflected
      const mergedLessons = courseLessons.map((courseLesson, index) => {
        const storedLesson = parsedStoredLessons[index];
        return {
          ...courseLesson, // This ensures videoUrl and other properties from courseData.js are used
          completed: storedLesson?.completed || courseLesson.completed || false,
          // Preserve any other localStorage-specific data if needed
        };
      });

      setLessons(mergedLessons);

      // Update localStorage with merged data
      localStorage.setItem(
        `course_${id}_lessons`,
        JSON.stringify(mergedLessons)
      );
    } else {
      // Initialize lessons with completed status from courseContent or set to false
      const initializedLessons = courseLessons.map((lesson) => ({
        ...lesson,
        completed: lesson.completed || false,
      }));
      setLessons(initializedLessons);

      // Store in localStorage
      localStorage.setItem(
        `course_${id}_lessons`,
        JSON.stringify(initializedLessons)
      );
    }
  }, [id]);

  useEffect(() => {
    // Set first lesson as active by default if none selected
    if (lessons.length > 0 && !activeLesson) {
      setActiveLesson(lessons[0]);
    }

    // Calculate progress
    const completedLessons = lessons.filter(
      (lesson) => lesson.completed
    ).length;
    const calculatedProgress =
      lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;
    setProgress(calculatedProgress);

    // Save updated lessons to localStorage whenever they change
    if (lessons.length > 0) {
      localStorage.setItem(`course_${id}_lessons`, JSON.stringify(lessons));
    }
  }, [lessons, activeLesson, id]);

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
    setShowMobileMenu(false);
    // Smooth scroll to top on mobile when selecting a lesson
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenYouTube = (url) => {
    window.open(url, "_blank");
  };

  const handleMarkAsCompleted = (lessonId) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, completed: !lesson.completed }
          : lesson
      )
    );

    // Show toast or notification (could be added here)
  };

  // Function to reset localStorage and reload from courseData.js
  const handleResetCourseData = () => {
    // Clear localStorage for this course
    localStorage.removeItem(`course_${id}_lessons`);

    // Reload the component by re-initializing lessons
    const courseLessons = courseContent[id] || [];
    const initializedLessons = courseLessons.map((lesson) => ({
      ...lesson,
      completed: lesson.completed || false,
    }));
    setLessons(initializedLessons);

    // Store fresh data in localStorage
    localStorage.setItem(
      `course_${id}_lessons`,
      JSON.stringify(initializedLessons)
    );
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(`/lessons/${id}`)}
              className="flex items-center gap-2 text-gray-700 hover:text-[#cd201c] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Course</span>
            </button>

            <div className="flex items-center gap-2">
              {/* Reset button for development - only show in development mode */}
              {process.env.NODE_ENV === "development" && (
                <button
                  onClick={handleResetCourseData}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                  title="Reset course data from courseData.js"
                >
                  Reset Data
                </button>
              )}

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
              >
                <BookOpen size={18} />
                <span>Lessons</span>
                <ChevronRight
                  size={16}
                  className={`transform transition-transform ${
                    showMobileMenu ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Overall Progress */}
          <ModernProgressBar
            progress={progress}
            title="Course Progress"
            subtitle="Keep going! You're doing great"
            showStats={true}
            showMilestones={true}
            showCompletionMessage={true}
            size="default"
            className="mb-6"
            completedCount={lessons.filter((l) => l.completed).length}
            totalCount={lessons.length}
            completionMessage="Course Completed!"
          />
        </div>

        {/* Course Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          {/* Mobile Drawer for Lessons */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileMenu(false)}
              >
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-3/4 bg-white shadow-xl p-4 overflow-y-auto"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-xl font-bold text-gray-800">Lessons</h2>
                    <button
                      onClick={() => setShowMobileMenu(false)}
                      className="p-1"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2">
                    {lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          activeLesson?.id === lesson.id
                            ? "bg-[#cd201c]/10 border-l-4 border-[#cd201c]"
                            : "bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              lesson.completed
                                ? "bg-green-100"
                                : "bg-[#cd201c]/10"
                            }`}
                          >
                            {lesson.completed ? (
                              <CheckCircle
                                size={18}
                                className="text-green-600"
                              />
                            ) : (
                              <PlayCircle
                                size={18}
                                className="text-[#cd201c]"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 line-clamp-1">
                              {index + 1}. {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock size={14} className="text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {lesson.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar - Desktop Lessons List */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  Course Lessons
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {lessons.filter((l) => l.completed).length} of{" "}
                  {lessons.length} completed
                </p>
              </div>
              <div className="p-4 max-h-[calc(100vh-240px)] overflow-y-auto">
                <motion.div
                  className="space-y-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {lessons.map((lesson, index) => (
                    <motion.div
                      key={lesson.id}
                      variants={itemVariants}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${
                        activeLesson?.id === lesson.id
                          ? "bg-[#cd201c]/10 border-l-4 border-[#cd201c]"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => handleLessonClick(lesson)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            lesson.completed
                              ? "bg-green-100"
                              : "bg-[#cd201c]/10"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle size={18} className="text-green-600" />
                          ) : (
                            <PlayCircle size={18} className="text-[#cd201c]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {index + 1}. {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            {activeLesson ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLesson.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Video Section */}
                  <div className="aspect-video bg-gray-900 relative">
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
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
                        <PlayCircle size={64} className="text-[#cd201c] mb-4" />
                        <p className="text-white text-lg">
                          Video not available
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                        {activeLesson.title}
                      </h1>

                      <div className="flex items-center gap-2">
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full p-2 transition-colors">
                          <Clock size={18} />
                        </button>

                        {activeLesson.videoUrl && (
                          <button
                            onClick={() =>
                              handleOpenYouTube(activeLesson.videoUrl)
                            }
                            className="bg-[#cd201c] hover:bg-[#b81c18] text-white rounded-full p-2 transition-colors"
                          >
                            <ExternalLink size={18} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="prose max-w-none mb-6">
                      <p className="text-gray-700 leading-relaxed">
                        This lesson covers{" "}
                        <strong>{activeLesson.title.toLowerCase()}</strong>.
                        Watch the video above to learn more about this topic.
                        {activeLesson.description && (
                          <span> {activeLesson.description}</span>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-8">
                      {/* Additional controls or related content could go here */}
                      {activeLesson.videoUrl && (
                        <a
                          href={activeLesson.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-[#cd201c] text-white px-4 py-2 rounded-lg hover:bg-[#b81c18] transition-colors"
                        >
                          <ExternalLink size={18} />
                          <span>Watch on YouTube</span>
                        </a>
                      )}

                      <button
                        onClick={() => handleMarkAsCompleted(activeLesson.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          activeLesson.completed
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {activeLesson.completed ? (
                          <>
                            <CheckCircle size={18} />
                            <span>Completed</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle size={18} />
                            <span>Mark as Completed</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="border-t p-4 flex justify-between">
                    <button
                      className="flex items-center gap-2 text-gray-600 hover:text-[#cd201c] transition-colors disabled:opacity-50 disabled:hover:text-gray-600"
                      disabled={lessons.indexOf(activeLesson) === 0}
                      onClick={() => {
                        const currentIndex = lessons.indexOf(activeLesson);
                        if (currentIndex > 0) {
                          handleLessonClick(lessons[currentIndex - 1]);
                        }
                      }}
                      aria-label="Previous Lesson"
                    >
                      <ArrowLeft size={18} />
                    </button>

                    <button
                      className="flex items-center gap-2 text-gray-600 hover:text-[#cd201c] transition-colors disabled:opacity-50 disabled:hover:text-gray-600"
                      disabled={
                        lessons.indexOf(activeLesson) === lessons.length - 1
                      }
                      onClick={() => {
                        const currentIndex = lessons.indexOf(activeLesson);
                        if (currentIndex < lessons.length - 1) {
                          handleLessonClick(lessons[currentIndex + 1]);
                        }
                      }}
                      aria-label="Next Lesson"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center max-w-md">
                  <div className="bg-[#cd201c]/10 p-4 rounded-full inline-flex mb-6">
                    <PlayCircle size={48} className="text-[#cd201c]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Ready to start learning?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Select a lesson from the menu to begin your learning
                    journey.
                  </p>
                  {lessons.length > 0 && (
                    <button
                      onClick={() => handleLessonClick(lessons[0])}
                      className="bg-[#cd201c] hover:bg-[#b81c18] text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      <PlayCircle size={20} />
                      <span>Start First Lesson</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
