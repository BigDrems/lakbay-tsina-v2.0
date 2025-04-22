import React from "react";
import { motion } from "framer-motion";

const StatsCard = ({ icon, label, value, color, delay }) => {
  const Icon = icon;

  const bgColorMap = {
    red: "bg-red-50",
    green: "bg-green-50",
    blue: "bg-blue-50",
    amber: "bg-amber-50",
  };

  const textColorMap = {
    red: "text-[#cd201c]",
    green: "text-emerald-600",
    blue: "text-blue-600",
    amber: "text-amber-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center">
        <div className={`${bgColorMap[color]} p-3 rounded-full`}>
          <Icon className={textColorMap[color]} size={18} />
        </div>
        <div className="ml-3">
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
