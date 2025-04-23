import { useState, useEffect, useRef } from "react";

/**
 * Performance optimization utilities
 */

/**
 * Custom hook that creates a debounced version of any function
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Custom hook for lazy loading images using Intersection Observer
 * @param {string} imageUrl - URL of the image to load
 * @param {string} placeholderUrl - URL of placeholder image
 * @returns {Object} - Object containing loaded status and image source
 */
export const useLazyLoadImage = (imageUrl, placeholderUrl = null) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState(placeholderUrl || "");
  const imgRef = useRef(null);

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imgRef.current && imageUrl) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // When image is visible in the viewport
          if (!didCancel && entry.isIntersecting) {
            setSrc(imageUrl);
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(imgRef.current);
    }

    return () => {
      didCancel = true;
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [imageUrl]);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return { isLoaded, src, imgRef, onLoad };
};

/**
 * Returns appropriate image size based on viewport and device pixel ratio
 * @param {Object} sizes - Object with different image sizes
 * @returns {string} - URL of the appropriate image size
 */
export const getResponsiveImageUrl = (sizes) => {
  const width = window.innerWidth;
  const pixelRatio = window.devicePixelRatio || 1;

  if (width < 640) {
    return pixelRatio > 1 ? sizes.smallRetina : sizes.small;
  } else if (width < 1024) {
    return pixelRatio > 1 ? sizes.mediumRetina : sizes.medium;
  } else {
    return pixelRatio > 1 ? sizes.largeRetina : sizes.large;
  }
};

/**
 * Dynamic import for code splitting
 * @param {Function} importFunc - Import function to call
 * @returns {Promise} - Promise that resolves to the imported module
 */
export const loadChunk = (importFunc) => {
  return importFunc().catch((err) => {
    console.error("Failed to load chunk:", err);
    // Retry once
    return importFunc();
  });
};
