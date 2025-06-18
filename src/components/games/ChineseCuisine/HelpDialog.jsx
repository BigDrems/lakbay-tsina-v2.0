import React from "react";
import { motion } from "framer-motion";

const HelpDialog = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#F5E6D3] p-3 rounded-lg mb-4 text-sm"
    >
      <h3 className="font-semibold mb-1">Paano Laruin:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Pumili ng tamang sangkap para sa putahe ng Tsino</li>
        <li>I-drag ang mga sangkap sa palayok</li>
        <li>
          Sundin ang mga hakbang sa pagluluto sa tamang pagkakasunud-sunod
        </li>
        <li>Kumpletuhin ang putahe bago matapos ang oras</li>
        <li>
          Matuto ng mga kagiliw-giliw na katotohanan tungkol sa lutuing Tsino!
        </li>
      </ul>
      <button onClick={onClose} className="text-[#6B3100] font-medium mt-2">
        Isara
      </button>
    </motion.div>
  );
};

export default HelpDialog;
