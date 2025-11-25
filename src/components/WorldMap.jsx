import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, MapPin } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Rectangle,
  Marker,
  Popup,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const WorldMap = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showChina, setShowChina] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Start the animation sequence
    const timer1 = setTimeout(() => setIsVisible(true), 500);
    const timer2 = setTimeout(() => setShowChina(true), 1500);
    const timer3 = setTimeout(() => setShowText(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleContinue = () => {
    onComplete();
  };

  // China GeoJSON data (simplified outline)
  const chinaGeoJSON = {
    type: "Feature",
    properties: { name: "China" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [134.7, 48.5], // Northeast corner
          [87.3, 49.2], // Northwest corner
          [73.6, 39.5], // Western point
          [79.8, 30.3], // Southwest Himalayas
          [97.5, 18.2], // Southern border with Myanmar
          [108.0, 17.0], // Southern border with Vietnam
          [121.9, 23.5], // Taiwan region
          [122.1, 31.2], // Eastern coast
          [126.0, 41.8], // Northeast near North Korea
          [134.7, 48.5], // Back to Northeast
        ],
      ],
    },
  };

  // Continents data for labels
  const continents = [
    { name: "North America", position: [45, -100] },
    { name: "South America", position: [-20, -60] },
    { name: "Europe", position: [54, 15] },
    { name: "Africa", position: [0, 20] },
    // Move Asia marker to the center of Asia (approximate: Mongolia/China/Kazakhstan border)
    { name: "Asia", position: [40, 90] },
    { name: "Australia", position: [-25, 135] },
    { name: "Antarctica", position: [-80, 0] },
  ];

  // Create custom marker icon
  const createMarkerIcon = (color) => {
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  const chinaIcon = createMarkerIcon("red");

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden p-2 sm:p-4 md:p-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-16 sm:w-32 h-16 sm:h-32 bg-blue-200 opacity-20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-20 sm:w-40 h-20 sm:h-40 bg-indigo-200 opacity-20 rounded-full filter blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-12 sm:w-24 h-12 sm:h-24 bg-cyan-200 opacity-15 rounded-full filter blur-3xl animate-float-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-4 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-2 sm:mb-4">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3" />
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Tuklasin ang China
            </h1>
          </div>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Tayo'y maglakbay sa mayamang kultura at kasaysayan ng bansang ito
          </p>
        </motion.div>

        {/* World Map Container */}
        <motion.div
          className="relative w-full max-w-5xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Map Background */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
            <MapContainer
              center={[20, 0]} // Center on the world
              zoom={2} // Show the whole world
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
              attributionControl={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}
              dragging={true}
              touchZoom={true}
              boxZoom={true}
              keyboard={true}
              maxBounds={[
                [-90, -180],
                [90, 180],
              ]}
              maxBoundsViscosity={0.5}
              minZoom={1}
              maxZoom={10}
            >
              {/* World map tiles */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* Zoom Control */}
              <ZoomControl position="topright" />

              {/* Continent Labels */}
              {showChina && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  {continents.map((continent, index) => (
                    <Marker
                      key={continent.name}
                      position={continent.position}
                      icon={L.divIcon({
                        className: "continent-label",
                        html: `<div class="text-xs sm:text-sm font-semibold text-gray-700 bg-white/80 px-1 py-0.5 rounded shadow-sm border border-gray-200">${continent.name}</div>`,
                        iconSize: [100, 20],
                        iconAnchor: [50, 10],
                      })}
                    />
                  ))}
                </motion.div>
              )}

              {/* China Highlight */}
              {showChina && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <GeoJSON
                    data={chinaGeoJSON}
                    style={() => ({
                      color: "#dc2626",
                      weight: 5,
                      fillColor: "#fef3c7",
                      fillOpacity: 0.8,
                      dashArray: "15, 10",
                    })}
                  />

                  {/* China marker */}
                  <Marker
                    position={[35, 105]}
                    icon={chinaIcon}
                    eventHandlers={{
                      click: handleContinue,
                      mouseover: (e) => {
                        e.target.getElement().style.cursor = "pointer";
                      },
                      mouseout: (e) => {
                        e.target.getElement().style.cursor = "default";
                      },
                    }}
                  >
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-lg text-amber-800">
                          CHINA
                        </h3>
                        <p className="text-sm text-gray-600">
                          Lupain ng sinaunang karunungan at mayamang kultura
                        </p>
                        <button
                          onClick={handleContinue}
                          className="mt-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded text-sm hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
                        >
                          Simulan ang Paglalakbay
                        </button>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Pulsing highlight effect around China */}
                  <motion.div
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, rgba(220, 38, 38, 0.1) 50%, transparent 70%)",
                      pointerEvents: "none",
                      zIndex: 1000,
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: [0.5, 1.5, 0.5],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              )}
            </MapContainer>
          </div>

          {/* Overlay text */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="text-white text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
                Maligayang Pagdating sa China
              </h3>
              <p className="text-xs sm:text-sm md:text-base opacity-90">
                Lupain ng sinaunang karunungan, mayamang kultura, at
                kamangha-manghang kasaysayan
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-2xl sm:text-4xl opacity-20"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{
            opacity: isVisible ? 0.2 : 0,
            rotate: isVisible ? 360 : 0,
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          🌍
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 text-xl sm:text-3xl opacity-20"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{
            opacity: isVisible ? 0.2 : 0,
            rotate: isVisible ? -360 : 0,
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          🗺️
        </motion.div>
      </div>

      {/* Custom CSS for continent labels */}
      <style>{`
        .continent-label {
          background: transparent !important;
          border: none !important;
        }
        .china-tooltip {
          background: rgba(220, 38, 38, 0.9) !important;
          color: white !important;
          border: 2px solid #dc2626 !important;
          border-radius: 8px !important;
          font-weight: bold !important;
        }
        .china-tooltip::before {
          border-top-color: #dc2626 !important;
        }
      `}</style>
    </div>
  );
};

export default WorldMap;
