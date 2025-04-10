import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Check, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

const locations = [
  {
    id: 1,
    name: "Great Wall of China",
    description:
      "One of the most iconic landmarks, stretching over 13,000 miles",
    coordinates: [40.4319, 116.5704],
    image: "/images/great-wall.jpg",
  },
  {
    id: 2,
    name: "Forbidden City",
    description: "Imperial palace complex in Beijing, home to Chinese emperors",
    coordinates: [39.9042, 116.4074],
    image: "/images/forbidden-city.jpg",
  },
  {
    id: 3,
    name: "Terracotta Army",
    description: "Ancient clay warrior statues in Xi'an",
    coordinates: [34.3844, 109.2783],
    image: "/images/terracotta-army.jpg",
  },
  {
    id: 4,
    name: "West Lake",
    description: "Famous freshwater lake in Hangzhou",
    coordinates: [30.2587, 120.1315],
    image: "/images/west-lake.jpg",
  },
  {
    id: 5,
    name: "Mount Huangshan",
    description: "Scenic mountain range known for its granite peaks",
    coordinates: [30.1333, 118.1667],
    image: "/images/huangshan.jpg",
  },
  {
    id: 6,
    name: "Three Gorges Dam",
    description: "World's largest power station on the Yangtze River",
    coordinates: [30.8231, 111.0039],
    image: "/images/three-gorges.jpg",
  },
];

// Create custom marker icons
const createMarkerIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const defaultIcon = createMarkerIcon("red");
const correctIcon = createMarkerIcon("green");
const selectedIcon = createMarkerIcon("blue");

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const GeographyExplorer = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [discoveredLocations, setDiscoveredLocations] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const calculateDistance = (pos1, pos2) => {
    // Haversine formula to calculate distance between two points
    const R = 6371; // Earth's radius in km
    const dLat = ((pos2[0] - pos1[0]) * Math.PI) / 180;
    const dLon = ((pos2[1] - pos1[1]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((pos1[0] * Math.PI) / 180) *
        Math.cos((pos2[0] * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleMapClick = (latlng) => {
    if (!selectedLocation || discoveredLocations.includes(selectedLocation.id))
      return;

    setClickedPosition([latlng.lat, latlng.lng]);
    setAttempts((prev) => prev + 1);

    const distance = calculateDistance(
      [latlng.lat, latlng.lng],
      selectedLocation.coordinates
    );

    if (distance <= 200) {
      // Within 200km radius
      setDiscoveredLocations((prev) => [...prev, selectedLocation.id]);
      setScore((prev) => prev + 10);
      setFeedback({
        type: "success",
        message: "Great job! You found the location!",
      });

      if (discoveredLocations.length + 1 === locations.length) {
        setGameComplete(true);
      }
    } else {
      let direction = "";
      const targetLat = selectedLocation.coordinates[0];
      const targetLng = selectedLocation.coordinates[1];

      if (latlng.lat < targetLat - 2) direction += "North";
      else if (latlng.lat > targetLat + 2) direction += "South";

      if (latlng.lng < targetLng - 2)
        direction += direction ? ", East" : "East";
      else if (latlng.lng > targetLng + 2)
        direction += direction ? ", West" : "West";

      setFeedback({
        type: "hint",
        message: `Try looking ${direction || "closer to your last click"}`,
      });
    }

    // Clear feedback and clicked position after 2 seconds
    setTimeout(() => {
      setFeedback(null);
      setClickedPosition(null);
    }, 2000);
  };

  const resetGame = () => {
    setSelectedLocation(null);
    setDiscoveredLocations([]);
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
    setClickedPosition(null);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-row justify-between items-center mb-4 gap-2">
          <button
            onClick={() => navigate("/entertainment")}
            className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="text-[#6B3100] font-medium text-sm sm:text-base">
              Score: {score}
            </div>
            <button
              onClick={resetGame}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
            >
              <RefreshCw size={16} className="sm:w-5 sm:h-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <h1 className="text-xl sm:text-3xl font-bold text-[#6B3100] mb-2 text-center">
            Geography Explorer
          </h1>
          <p className="text-center text-gray-600 mb-4 text-xs sm:text-base">
            Find famous locations across China
          </p>

          {gameComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 sm:py-8"
            >
              <h2 className="text-lg sm:text-2xl font-bold text-[#6B3100] mb-3">
                Excellent!
              </h2>
              <p className="text-sm sm:text-lg mb-4">
                You discovered all locations in {attempts} attempts!
              </p>
              <div className="text-base sm:text-xl font-bold mb-6">
                Your Score: {score}
              </div>
              <button
                onClick={resetGame}
                className="bg-[#6B3100] text-white px-4 py-2 rounded-lg hover:bg-[#6B3100]/90 transition-colors text-sm sm:text-base"
              >
                Play Again
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full mb-2">
                  <div
                    className="h-2 bg-[#6B3100] rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (discoveredLocations.length / locations.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-center text-[#6B3100] font-medium text-xs sm:text-sm">
                  {discoveredLocations.length} / {locations.length} Discovered
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 h-[400px] rounded-lg overflow-hidden">
                  <MapContainer
                    center={[35.8617, 104.1954]}
                    zoom={4}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapClickHandler onMapClick={handleMapClick} />

                    {discoveredLocations.map((id) => {
                      const location = locations.find((loc) => loc.id === id);
                      return (
                        <Marker
                          key={location.id}
                          position={location.coordinates}
                          icon={correctIcon}
                        >
                          <Popup>{location.name}</Popup>
                        </Marker>
                      );
                    })}

                    {clickedPosition && (
                      <Marker position={clickedPosition} icon={selectedIcon} />
                    )}
                  </MapContainer>
                </div>

                <div className="space-y-2">
                  {locations.map((location) => (
                    <motion.button
                      key={location.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full p-2 rounded-lg border-2 text-left
                        ${
                          discoveredLocations.includes(location.id)
                            ? "bg-green-100 border-green-500"
                            : selectedLocation?.id === location.id
                            ? "bg-[#6B3100]/10 border-[#6B3100]"
                            : "bg-white border-gray-300 hover:border-[#6B3100]/50"
                        }
                      `}
                      onClick={() => setSelectedLocation(location)}
                      disabled={discoveredLocations.includes(location.id)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                          <img
                            src={location.image}
                            alt={location.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#6B3100] text-sm">
                            {location.name}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-1">
                            {location.description}
                          </p>
                        </div>
                        {discoveredLocations.includes(location.id) && (
                          <Check className="text-green-500 flex-shrink-0 w-4 h-4" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`
                    mt-4 p-2 rounded-lg text-center text-sm
                    ${
                      feedback.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-[#6B3100]/10 text-[#6B3100]"
                    }
                  `}
                >
                  {feedback.message}
                </motion.div>
              )}

              <div className="mt-4 text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Select a location from the list and click on the map to find
                  it
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeographyExplorer;
