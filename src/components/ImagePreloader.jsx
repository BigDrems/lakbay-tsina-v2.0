import { useEffect, useState } from "react";
import { dynastyImageMap } from "../data/dynastyData";

const ImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Get all unique image sources from dynastyImageMap
    const imageSources = [...new Set(Object.values(dynastyImageMap))];

    // Convert to full paths from dynasty folder
    const fullPaths = imageSources.map((src) => `/dynasty/${src}`);

    // Preload all images using dynamic import
    import("../utils/imageUtils").then(({ preloadImages }) => {
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
    });
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default ImagePreloader;
