import { useEffect, useState } from "react";
import { dynastyImageMap } from "../data/dynastyData";
import { preloadImages } from "../utils/imageUtils";

const ImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Get all unique image sources from dynastyImageMap
    const imageSources = [...new Set(Object.values(dynastyImageMap))];

    // Convert to full paths
    const fullPaths = imageSources.map((src) => `/images/${src}`);

    // Preload all images
    preloadImages(fullPaths)
      .then(() => {
        console.log("All dynasty images preloaded successfully");
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.warn("Some dynasty images failed to preload", error);
        // Still set as loaded to prevent blocking the app
        setImagesLoaded(true);
      });
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default ImagePreloader;
