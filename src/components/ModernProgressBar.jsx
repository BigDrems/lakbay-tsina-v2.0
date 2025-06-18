import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const ModernProgressBar = ({
  progress,
  title = "Progress",
  subtitle = "Keep going! You're doing great",
  showStats = true,
  showMilestones = true,
  showCompletionMessage = true,
  size = "default", // "small", "default", "large"
  className = "",
  completedCount,
  totalCount,
  completionMessage = "Completed!",
}) => {
  const progressPercentage = Math.min(Math.max(progress, 0), 100);

  const sizeClasses = {
    small: {
      container: "p-4",
      icon: "w-8 h-8",
      iconInner: "w-4 h-4",
      title: "text-base",
      subtitle: "text-xs",
      percentage: "text-xl",
      bar: "h-2",
      dot: "w-3 h-3",
      milestones: "text-xs",
      stats: "text-xs",
    },
    default: {
      container: "p-6",
      icon: "w-10 h-10",
      iconInner: "w-5 h-5",
      title: "text-lg",
      subtitle: "text-sm",
      percentage: "text-2xl",
      bar: "h-3",
      dot: "w-4 h-4",
      milestones: "text-xs",
      stats: "text-sm",
    },
    large: {
      container: "p-8",
      icon: "w-12 h-12",
      iconInner: "w-6 h-6",
      title: "text-xl",
      subtitle: "text-base",
      percentage: "text-3xl",
      bar: "h-4",
      dot: "w-5 h-5",
      milestones: "text-sm",
      stats: "text-base",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${classes.container} ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`${classes.icon} rounded-full bg-gradient-to-br from-[#cd201c] to-[#ff4b45] flex items-center justify-center`}
          >
            <svg
              className={`${classes.iconInner} text-white`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className={`font-bold text-gray-900 ${classes.title}`}>
              {title}
            </h3>
            <p className={`text-gray-500 ${classes.subtitle}`}>{subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-bold text-gray-900 ${classes.percentage}`}>
            {Math.round(progressPercentage)}%
          </div>
          <div className={`text-gray-500 ${classes.subtitle}`}>Complete</div>
        </div>
      </div>

      {/* Modern Progress Bar */}
      <div className="relative">
        {/* Background track */}
        <div
          className={`w-full ${classes.bar} bg-gray-100 rounded-full overflow-hidden`}
        >
          {/* Animated progress fill */}
          <motion.div
            className={`h-full bg-gradient-to-r from-[#cd201c] via-[#ff4b45] to-[#ff6b6b] rounded-full relative`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.2,
            }}
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s ease-in-out infinite",
            }}
          >
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>

            {/* Progress indicator dot */}
            {progressPercentage > 0 && (
              <motion.div
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${classes.dot} bg-white rounded-full shadow-lg border-2 border-[#cd201c]`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              />
            )}
          </motion.div>
        </div>

        {/* Progress milestones */}
        {showMilestones && (
          <div
            className={`flex justify-between mt-2 ${classes.milestones} text-gray-400`}
          >
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        )}
      </div>

      {/* Progress stats */}
      {showStats && (
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className={`text-gray-600 ${classes.stats}`}>
                {completedCount !== undefined
                  ? `${completedCount} completed`
                  : "Completed"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className={`text-gray-600 ${classes.stats}`}>
                {totalCount !== undefined
                  ? `${totalCount - (completedCount || 0)} remaining`
                  : "Remaining"}
              </span>
            </div>
          </div>

          {/* Completion message */}
          {showCompletionMessage && progressPercentage === 100 && (
            <motion.div
              className="flex items-center gap-2 text-green-600 font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CheckCircle className="w-4 h-4" />
              {completionMessage}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModernProgressBar;
