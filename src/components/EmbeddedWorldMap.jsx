import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const EmbeddedWorldMap = ({ onComplete }) => {
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
          [134.8, 48.5], // Northeast corner - most eastern point
          [87.3, 49.2], // Northwest corner
          [73.6, 39.5], // Western point
          [79.8, 30.3], // Southwest Himalayas
          [97.5, 18.2], // Southern border with Myanmar
          [108.0, 17.0], // Southern border with Vietnam
          [117.5, 18.5], // Hainan Island area
          [119.5, 23.5], // Eastern coast - Fujian province (mainland side)
          [120.9, 31.2], // Eastern coast - Shanghai area
          [124.5, 40.1], // Eastern coast - Liaoning province
          [126.0, 41.8], // Northeast near North Korea border
          [133.5, 45.8], // Far northeast - Heilongjiang
          [134.8, 48.5], // Back to Northeast - most eastern point
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
    { name: "Asia", position: [20, 77] },
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
    <div className="relative w-full h-full bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-2 left-2 w-8 h-8 bg-blue-200 opacity-20 rounded-full filter blur-xl animate-float"></div>
        <div className="absolute bottom-2 right-2 w-10 h-10 bg-indigo-200 opacity-20 rounded-full filter blur-xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 w-full h-full">
        {/* World Map Container */}
        <motion.div
          className="relative w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Map Background */}
          <div className="relative w-full h-full">
            <MapContainer
              center={[20, 0]} // Center on the world
              zoom={2} // Show the whole world
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
              attributionControl={false}
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
                        html: `<div class="text-xs font-semibold text-gray-700 bg-white/80 px-1 py-0.5 rounded shadow-sm border border-gray-200">${continent.name}</div>`,
                        iconSize: [80, 16],
                        iconAnchor: [40, 8],
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
                      weight: 3,
                      fillColor: "transparent",
                      fillOpacity: 0,
                      dashArray: "10, 8",
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
                        <h3 className="font-bold text-base text-amber-800">
                          CHINA
                        </h3>
                        <p className="text-xs text-gray-600">
                          Lupain ng sinaunang karunungan at mayamang kultura
                        </p>
                        <button
                          onClick={handleContinue}
                          className="mt-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-1 rounded text-xs hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
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
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, rgba(220, 38, 38, 0.1) 50%, transparent 70%)",
                      pointerEvents: "none",
                      zIndex: 1000,
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: [0.5, 1.2, 0.5],
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
        </motion.div>
      </div>

      {/* Custom CSS for continent labels */}
      <style jsx>{`
        .continent-label {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default EmbeddedWorldMap;
