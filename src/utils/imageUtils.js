/**
 * Preloads an image by creating a new Image object and setting its src
 * @param {string} src - The image source to preload
 * @returns {Promise} A promise that resolves when the image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    if (img.complete) {
      resolve(img);
    } else {
      img.onload = () => resolve(img);
      img.onerror = reject;
    }
  });
};

/**
 * Preloads multiple images at once
 * @param {Array<string>} sources - Array of image sources to preload
 * @returns {Promise} A promise that resolves when all images are loaded
 */
export const preloadImages = (sources) => {
  const promises = sources.map((src) => preloadImage(src));
  return Promise.all(promises);
};
