import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import DynastyGallery from "./DynastyGallery";

const dynastyData = {
  dynasties: [
    {
      name: "Xia Dynasty",
      years: "c. 2070–1600 BCE",
      img: "qin.webp",
      capital: "Iba't ibang lokasyon (hindi tiyak ang eksaktong lugar)",
      culture: "Kulturang Panahon ng Tanso, maagang pagbuo ng estado sa Tsina",
      inventions: [
        "Maagang paghuhulma ng tanso",
        "Sistemang patubig",
        "Maagang anyo ng sulat Tsino (pinagtatalunan)",
      ],
      lifestyle: "Lipunang agrikultural, maagang pamayanang urban",
      notable_rulers: ["Yu the Great"],
      religion: "Pagsamba sa mga ninuno, mga diyos ng kalikasan",
      legacy:
        "Itinuturing na unang dinastiya sa tradisyonal na kasaysayan ng Tsina",
    },
    {
      name: "Shang Dynasty",
      years: "1600–1046 BCE",
      img: "Liu-bang.jpg",
      capital: "Yinxu (malapit sa modernong Anyang)",
      culture: "Sibilisasyong Panahon ng Tanso, oracle bone script",
      inventions: [
        "Sistema ng pagsusulat Tsino (oracle bone script)",
        "Advanced na metalurhiya ng tanso",
        "Pandigmang karwahe",
      ],
      lifestyle: "Mataas ang antas ng lipunan, may pagsasakripisyo ng tao",
      notable_rulers: ["King Tang", "King Zhou"],
      religion: "Pagsamba sa mga ninuno, panghuhula",
      legacy:
        "Pinakamaagang kumpirmadong dinastiya na may arkeolohikong ebidensya",
    },
    {
      name: "Zhou Dynasty",
      years: "1046–256 BCE",
      img: "zhou.jpg",
      capital: "Haojing, Luoyi",
      culture: "Pilosopiyang Mandate of Heaven, klasikal na pag-iisip Tsino",
      inventions: [
        "Teknolohiya ng paghuhulma ng bakal",
        "Pana (crossbow)",
        "Nabuo ang Confucianism at Daoism",
      ],
      lifestyle: "Sistemang pyudal, kalaunan ay sentralisadong burukrasya",
      notable_rulers: ["King Wu", "King Wen"],
      religion: "Pagsamba sa langit, patuloy na paggalang sa mga ninuno",
      legacy: "Pinakamatagal na dinastiya, pundasyon ng pilosopiyang Tsino",
    },
    {
      name: "Qin Dynasty",
      years: "221–206 BCE",
      img: "qin.webp",
      capital: "Xianyang",
      culture: "Legalistang estado, standardisasyon",
      inventions: [
        "Standardisadong sistema ng pagsusulat",
        "Pare-parehong timbang at sukat",
        "Sinimulan ang paggawa ng Great Wall",
      ],
      lifestyle: "Mataas ang sentralisasyon, mahigpit na batas",
      notable_rulers: ["Qin Shi Huang"],
      religion: "Kontrolado ng estado ang mga relihiyosong gawain",
      legacy: "Unang nagkaisang imperyo ng Tsina, Terracotta Army",
    },
    {
      name: "Han Dynasty",
      years: "206 BCE–220 CE",
      img: "Liu-bang.jpg",
      capital: "Chang'an, Luoyang",
      culture: "Estadong Confucian, kalakalan sa Silk Road",
      inventions: ["Papel", "Seismoscope", "Advanced na produksyon ng seda"],
      lifestyle: "Nagsimula ang civil service exams, maunlad ang mangangalakal",
      notable_rulers: ["Emperor Gaozu", "Emperor Wu"],
      religion:
        "Confucianism bilang ideolohiya ng estado, pagpapakilala ng Buddhism",
      legacy: "Tinatawag pa rin ng mga etnikong Tsino ang sarili bilang 'Han'",
    },
    {
      name: "Tang Dynasty",
      years: "618–907 CE",
      img: "Li_Xian.jpg",
      capital: "Chang'an",
      culture: "Ginintuang panahon, umunlad ang tula",
      inventions: ["Woodblock printing", "Gunpowder", "Mekanikal na orasan"],
      lifestyle: "Mataas ang urbanisasyon, popular ang pag-inom ng tsaa",
      notable_rulers: ["Emperor Taizong", "Empress Wu Zetian"],
      religion: "Umunlad ang Buddhism, pagpapaubaya sa relihiyon",
      legacy: "Itinuturing na ginintuang panahon ng kulturang Tsino",
    },
    {
      name: "Song Dynasty",
      years: "960–1279 CE",
      img: "song.webp",
      capital: "Bianjing, Lin'an",
      culture: "Nangingibabaw ang scholar-official class, landscape painting",
      inventions: [
        "Movable type printing",
        "Papel na pera",
        "Magnetic compass para sa nabigasyon",
      ],
      lifestyle: "Rebolusyong komersyal, lumitaw ang urban middle class",
      notable_rulers: ["Emperor Taizu", "Emperor Huizong"],
      religion: "Umunlad ang Neo-Confucianism",
      legacy: "Rurok ng ekonomiya at teknolohiya ng imperyal na Tsina",
    },
    {
      name: "Yuan Dynasty",
      years: "1271–1368 CE",
      img: "yuan.jpg",
      capital: "Dadu (Beijing)",
      culture: "Pamumunong Mongol sa Tsina, palitan ng kultura",
      inventions: [
        "Pinahusay na instrumentong astronomikal",
        "Pinakamahusay ang blue-and-white porcelain",
      ],
      lifestyle: "Multi-ethnic na lipunan, Mongol ang namumunong uri",
      notable_rulers: ["Kublai Khan"],
      religion: "Pagpapaubaya sa relihiyon, pabor sa Tibetan Buddhism",
      legacy: "Unang dayuhang dinastiyang kumontrol sa buong Tsina",
    },
    {
      name: "Ming Dynasty",
      years: "1368–1644 CE",
      img: "ming.jpg",
      capital: "Nanjing, kalaunan ay Beijing",
      culture: "Pagpapanumbalik ng pamumunong Han Chinese, sining ng porcelain",
      inventions: [
        "Pinakamahusay ang teknolohiya ng porcelain",
        "Umunlad ang pagsusulat ng nobela",
        "Itinayong muli ang Great Wall",
      ],
      lifestyle: "Mahigpit na hierarchy ng lipunan, scholar-gentry class",
      notable_rulers: ["Hongwu Emperor", "Yongle Emperor"],
      religion: "State Confucianism, nanatili ang folk religions",
      legacy: "Itinayo ang Forbidden City, mga paglalayag ni Zheng He",
    },
    {
      name: "Qing Dynasty",
      years: "1644–1912 CE",
      img: "sui.jpg",
      capital: "Beijing",
      culture: "Pamumunong Manchu, huling imperyal na dinastiya",
      inventions: [
        "Pinuhin ang pamamaraan ng pag-ukit ng jade",
        "Umunlad ang istilo ng court painting",
      ],
      lifestyle:
        "Pagkakahati ng Manchu-Han, kalaunan ay impluwensyang Kanluranin",
      notable_rulers: ["Kangxi Emperor", "Qianlong Emperor"],
      religion: "State Confucianism, mahalaga ang Tibetan Buddhism",
      legacy: "Huling imperyal na dinastiya, pagpapalawak ng teritoryo",
    },
  ],
  metadata: {
    source: "Mga makasaysayang tala at arkeolohikong ebidensya",
    note: "Ang ilang petsa at detalye ay maaaring mag-iba ayon sa iba't ibang interpretasyong pangkasaysayan",
    created: "2023-11-15",
  },
};
// Map dynasty names to image sources used in DynastyGallery
const dynastyImageMap = {
  "Qin Dynasty": "qin.webp",
  "Han Dynasty": "Liu-bang.jpg",
  "Tang Dynasty": "Li_Xian.jpg",
  "Song Dynasty": "song.webp",
  "Yuan Dynasty": "yuan.jpg",
  "Zhou Dynasty": "zhou.jpg",
  // Default images for dynasties not in the original gallery
  "Xia Dynasty": "qin.webp", // Using Qin image as placeholder
  "Shang Dynasty": "Liu-bang.jpg", // Using Han image as placeholder
  "Ming Dynasty": "Li_Xian.jpg", // Using Tang image as placeholder
  "Qing Dynasty": "song.webp", // Using Song image as placeholder
};

const DynastyExplorer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDynasty, setSelectedDynasty] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Check for dynasty parameter in URL
    const params = new URLSearchParams(location.search);
    const dynastyName = params.get("dynasty");

    if (dynastyName) {
      const dynasty = dynastyData.dynasties.find((d) => d.name === dynastyName);
      if (dynasty) {
        handleDynastyClick(dynasty);
      }
    }
  }, [location]);

  const handleDynastyClick = (dynasty) => {
    setSelectedDynasty(dynasty);
    setCurrentIndex(
      dynastyData.dynasties.findIndex((d) => d.name === dynasty.name)
    );
  };

  const handleClose = () => {
    setSelectedDynasty(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : dynastyData.dynasties.length - 1
    );
    setSelectedDynasty(
      dynastyData.dynasties[
        currentIndex > 0 ? currentIndex - 1 : dynastyData.dynasties.length - 1
      ]
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < dynastyData.dynasties.length - 1 ? prev + 1 : 0
    );
    setSelectedDynasty(
      dynastyData.dynasties[
        currentIndex < dynastyData.dynasties.length - 1 ? currentIndex + 1 : 0
      ]
    );
  };

  const renderDynastyGallery = () => {
    if (!selectedDynasty) return null;

    const imageSrc = dynastyImageMap[selectedDynasty.name] || "qin.webp";
    const project = {
      title1: selectedDynasty.name.split(" ")[0],
      title2: selectedDynasty.name.split(" ")[1] || "Dynasty",
      src: imageSrc,
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#6B3100]">
              {selectedDynasty.name}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-4">
            <div className="flex justify-center items-center mb-6">
              <div className="w-64 h-48 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={`/images/${selectedDynasty.img}`}
                  alt={selectedDynasty.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
              <div>
                <h3 className="text-lg font-semibold text-[#6B3100] mb-2">
                  Overview
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Years:</span>{" "}
                    {selectedDynasty.years}
                  </p>
                  <p>
                    <span className="font-medium">Capital:</span>{" "}
                    {selectedDynasty.capital}
                  </p>
                  <p>
                    <span className="font-medium">Culture:</span>{" "}
                    {selectedDynasty.culture}
                  </p>
                  <p>
                    <span className="font-medium">Lifestyle:</span>{" "}
                    {selectedDynasty.lifestyle}
                  </p>
                </div>
              </div>

              <div className="text-black">
                <h3 className="text-lg font-semibold text-[#6B3100] mb-2 ">
                  Details
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Notable Rulers:</span>{" "}
                    {selectedDynasty.notable_rulers.join(", ")}
                  </p>
                  <p>
                    <span className="font-medium">Religion:</span>{" "}
                    {selectedDynasty.religion}
                  </p>
                  <p>
                    <span className="font-medium">Legacy:</span>{" "}
                    {selectedDynasty.legacy}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-black">
              <h3 className="text-lg font-semibold text-[#6B3100] mb-2">
                Inventions & Achievements
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {selectedDynasty.inventions.map((invention, index) => (
                  <li key={index}>{invention}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-between">
            <button
              onClick={handlePrev}
              className="flex bg-white items-center gap-1 text-[#6B3100] lg:hover:text-[#6B3100]/80"
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 text-[#6B3100] lg:hover:text-[#6B3100]/80"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row justify-between items-center mb-4 gap-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 lg:text-[#6B3100] text-black lg:hover:text-[#6B3100]/80 text-sm sm:text-base"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            <span>Back</span>
          </button>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-1 lg:text-[#6B3100] text-black lg:hover:text-[#6B3100]/80 text-sm sm:text-base"
          >
            <Info size={16} className="sm:w-5 sm:h-5" />
            <span>About</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <h1 className="text-xl sm:text-3xl font-bold text-[#6B3100] mb-2 text-center">
            Chinese Dynasties Explorer
          </h1>
          <p className="text-center text-gray-600 mb-6 text-xs sm:text-base">
            Explore the rich history of China's imperial dynasties
          </p>

          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-[#6B3100]/5 rounded-lg border border-[#6B3100]/20"
            >
              <h3 className="font-semibold text-[#6B3100] mb-2">
                About This Explorer
              </h3>
              <p className="text-sm mb-2">
                This explorer provides information about China's major
                dynasties, from the legendary Xia to the final Qing Dynasty.
                Click on any dynasty to view detailed information and see it in
                the gallery.
              </p>
              <p className="text-xs text-gray-500">
                Source: {dynastyData.metadata.source} | Note:{" "}
                {dynastyData.metadata.note}
              </p>
              <button
                onClick={() => setShowInfo(false)}
                className="mt-2 text-[#6B3100] text-sm font-medium"
              >
                Close
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dynastyData.dynasties.map((dynasty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:border-[#6B3100]/50 transition-colors cursor-pointer"
                onClick={() => handleDynastyClick(dynasty)}
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={`/images/${
                      dynastyImageMap[dynasty.name] || "qin.webp"
                    }`}
                    alt={dynasty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-[#6B3100]">
                    {dynasty.name}
                  </h3>
                  <p className="text-xs text-gray-600">{dynasty.years}</p>
                  <p className="text-xs mt-2 line-clamp-2">{dynasty.legacy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {selectedDynasty && renderDynastyGallery()}
    </div>
  );
};

export default DynastyExplorer;
