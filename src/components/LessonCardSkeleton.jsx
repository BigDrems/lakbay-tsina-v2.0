import { motion } from "framer-motion";

const LessonCardSkeleton = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
    >
      <div className="relative overflow-hidden">
        <div className="w-full h-52 bg-gray-200 animate-pulse"></div>
        <div className="absolute top-4 right-4 bg-gray-300 w-20 h-7 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <div className="w-16 h-5 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-20 h-5 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="p-5">
        <div className="w-3/4 h-7 bg-gray-200 rounded-md animate-pulse mb-2"></div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-5/6 h-4 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="w-12 h-5 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="w-12 h-5 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          <div className="mt-4 w-full">
            <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonCardSkeleton;
