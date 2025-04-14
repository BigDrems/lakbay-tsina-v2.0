import DynastyExplorer from "../components/DynastyExplorer";

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white rounded-lg shadow-md overflow-hidden"
  >
    <div className="h-40 overflow-hidden">
      <img
        src="/images/dynasty-explorer.jpg"
        alt="Dynasty Explorer"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-[#6B3100] mb-2">
        Dynasty Explorer
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Explore China's imperial dynasties through an interactive gallery with
        detailed historical information.
      </p>
      <Link
        to="/dynasty-explorer"
        className="inline-block bg-[#6B3100] text-white px-4 py-2 rounded-lg hover:bg-[#6B3100]/90 transition-colors  "
      >
        Explore Dynasties
      </Link>
    </div>
  </motion.div>
</div>;
