import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Components
import PowerPointViewer from "../components/PowerPointViewer";
import LessonCard from "../components/LessonCard";

// Data and constants
import { courseOverview } from "../data/courseData";
import { preloadImages } from "../utils/imageUtils";

// Memoized section components for better performance
const HeroSection = memo(() => (
  <div className="mb-12 text-center">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Maglibang Habang Natututo Tungkol sa Tsina! 🇨🇳
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Halika! Tuklasin natin ang mga nakakatuwang kwento at makukulay na
        kultura ng Tsina sa pamamagitan ng mga masayang presentation at aralin!
      </p>
    </motion.div>
  </div>
));

// Presentations Section Component
const PresentationsSection = memo(({ onPresentationSelect }) => {
  const presentations = [
    {
      id: 1,
      title: "Xia Dynasty",
      description:
        "Ang unang dinastiya ng Tsina na naglatag ng pundasyon ng sinaunang tradisyon at pamahalaan.",
      pdfUrl: "/Lessons/xia.pdf",
      thumbnail: "/dynasty/xia.jpg",
      category: "Kasaysayan",
    },
    {
      id: 2,
      title: "Shang Dynasty",
      description:
        "Ang ikalawang dinastiya ng Tsina na kilala sa paggamit ng bronse at unang sistema ng pagsusulat.",
      pdfUrl: "/Lessons/shang.pdf",
      thumbnail: "/dynasty/shang.jpg",
      category: "Kasaysayan",
    },
    {
      id: 3,
      title: "Song Dynasty",
      description:
        "Isang makapangyarihang dinastiya na nagpasimula ng pag-unlad sa sining, agham, at ekonomiya.",
      pdfUrl: "/Lessons/song.pdf",
      thumbnail: "/dynasty/song.jpg",
      category: "Kasaysayan",
    },
    {
      id: 4,
      title: "Han Dynasty",
      description:
        "Isang ginintuang panahon ng Tsina na nagpalaganap ng Confucianism at pinalawak ang Silk Road.",
      pdfUrl: "/Lessons/han.pdf",
      thumbnail: "/dynasty/han.jpg",
      category: "Kasaysayan",
    },
    {
      id: 5,
      title: "Ming Dynasty",
      description:
        "Kilala sa mahuhusay na arkitektura tulad ng Great Wall at pag-unlad ng sining at kalakalan.",
      pdfUrl: "/Lessons/ming.pdf",
      thumbnail: "/dynasty/ming.jpg",
      category: "Kasaysayan",
    },
    {
      id: 6,
      title: "Qin Dynasty",
      description:
        "Unang nagbigay ng pagkakaisa sa Tsina sa ilalim ng isang emperador at nagpatayo ng Great Wall.",
      pdfUrl: "/Lessons/qin.pdf",
      thumbnail: "/dynasty/qin.jpg",
      category: "Kasaysayan",
    },
    {
      id: 7,
      title: "Qing Dynasty",
      description:
        "Huling dinastiya ng Tsina na nagtagal ng mahigit 250 taon bago bumagsak noong ika-20 siglo.",
      pdfUrl: "/Lessons/qing.pdf",
      thumbnail: "/dynasty/qing.jpg",
      category: "Kasaysayan",
    },
    {
      id: 8,
      title: "Tang Dynasty",
      description:
        "Isang panahon ng kasiningan at kalakalan na tinuturing na gintong panahon ng kultura ng Tsina.",
      pdfUrl: "/Lessons/tang.pdf",
      thumbnail: "/dynasty/tang.jpg",
      category: "Kasaysayan",
    },
    {
      id: 9,
      title: "Yuan Dynasty",
      description:
        "Itinatag ng mga Mongol sa ilalim ni Kublai Khan at nagbukas ng Tsina sa internasyonal na kalakalan.",
      pdfUrl: "/Lessons/yuan.pdf",
      thumbnail: "/dynasty/yuan.jpg",
      category: "Kasaysayan",
    },
  ];

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Mga Masayang Presentation 📚
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {presentations.map((presentation, index) => (
          <motion.div
            key={presentation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onPresentationSelect(presentation)}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={presentation.thumbnail}
                alt={presentation.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {presentation.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                {presentation.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {presentation.description}
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Tingnan ang Presentation
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

// Lessons Section Component
const LessonsSection = memo(() => {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Mga Nakakatuwang Aralin 🎓
        </h2>
        <p className="text-gray-600 mt-2">
          Halika! Matuto tayo tungkol sa kasaysayan, kultura, pulitika,
          ekonomiya, at heograpiya ng Tsina sa masayang paraan!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseOverview.map((lesson, index) => (
          <LessonCard key={lesson.id} lesson={lesson} index={index} />
        ))}
      </div>
    </div>
  );
});

// Main component
const Aralin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPresentation, setSelectedPresentation] = useState(null);

  // Preload lesson images when component mounts
  useEffect(() => {
    setIsLoading(true);

    const lessonImages = courseOverview.map((lesson) => lesson.image);
    const avatarImages = courseOverview.map(
      (lesson) =>
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${lesson.instructor}`
    );

    // Preload all lesson images first
    preloadImages(lessonImages)
      .then(() => {
        console.log("Lesson images preloaded successfully");
        // Then preload instructor avatars
        return preloadImages(avatarImages);
      })
      .then(() => {
        console.log("Instructor avatars preloaded successfully");
        // Set loading to false when all images are preloaded
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn("Some images failed to preload", error);
        // Even if preloading fails, stop showing loading state after 3 seconds
        setTimeout(() => setIsLoading(false), 3000);
      });
  }, []);

  const handlePresentationSelect = (presentation) => {
    setSelectedPresentation(presentation);
  };

  const handleClosePresentation = () => {
    setSelectedPresentation(null);
  };

  // If a presentation is selected, show the PowerPoint viewer
  if (selectedPresentation) {
    return (
      <PowerPointViewer
        pdfUrl={selectedPresentation.pdfUrl}
        title={selectedPresentation.title}
        onBack={handleClosePresentation}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <HeroSection />

        {/* Presentations Section */}
        <PresentationsSection onPresentationSelect={handlePresentationSelect} />

        {/* Lessons Section */}
        <LessonsSection />
      </div>
    </div>
  );
};

export default Aralin;
