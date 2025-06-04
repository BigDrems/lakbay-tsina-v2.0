import { useState, useEffect } from "react";

export const useImagePreloader = (imageUrls) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const totalImages = imageUrls.length;
    let loadedCount = 0;

    const preloadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = img.onerror = () => {
          loadedCount++;
          resolve();
        };
      });
    };

    const preloadImagesSequentially = async () => {
      // First load priority images (first 3)
      const priorityImages = imageUrls.slice(0, 3);
      const remainingImages = imageUrls.slice(3);

      await Promise.all(priorityImages.map(preloadImage));

      // Then load remaining images
      for (const url of remainingImages) {
        await preloadImage(url);
      }

      setImagesLoaded(true);
    };

    preloadImagesSequentially();
  }, [imageUrls]);

  return imagesLoaded;
};
