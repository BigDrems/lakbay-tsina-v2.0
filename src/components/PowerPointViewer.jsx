import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ArrowLeft,
} from "lucide-react";

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const PowerPointViewer = ({
  pdfUrl,
  title = "PowerPoint Presentation",
  onBack,
}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageWidth, setPageWidth] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [imageLoadingProgress, setImageLoadingProgress] = useState(0);
  const [useAlternativeRendering, setUseAlternativeRendering] = useState(false);
  const containerRef = useRef(null);

  // Improved PDF options with better image handling
  const pdfOptions = useMemo(
    () => ({
      cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      disableAutoFetch: false,
      disableStream: false,
      disableRange: false,

      // Significantly increased limits for better image rendering
      maxImageSize: useAlternativeRendering ? 262144 : 131072, // 256KB vs 128KB
      maxCanvasPixels: useAlternativeRendering ? 268435456 : 134217728, // 256M vs 128M pixels
      canvasMaxArea: useAlternativeRendering ? 268435456 : 134217728,

      // Image-specific improvements
      isEvalSupported: false,
      useSystemFonts: true, // Changed to true for better font rendering
      verbosity: 0, // Reduced verbosity for production
      enableXfa: true, // Enable XFA forms which might contain images
      disableFontFace: false,
      standardFontDataUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,

      // Better image handling
      forceDataSchema: true, // Force data schema for images
      enableScripting: false,
      renderInteractiveForms: true,

      // Graphics state improvements
      maxCanvasDrawOperations: 100000, // Increase draw operations limit

      // Alternative rendering options for problematic PDFs
      ...(useAlternativeRendering && {
        disableRange: false, // Keep false for better streaming
        disableStream: false, // Keep false for better streaming
        disableAutoFetch: false,
        // Force canvas rendering instead of SVG
        useOnlyCSS: false,
        // Increase memory limits even more
        maxImageSize: 524288, // 512KB
        maxCanvasPixels: 536870912, // 512M pixels
      }),
    }),
    [useAlternativeRendering]
  );
  // Reset state when pdfUrl changes
  useEffect(() => {
    setLoading(true);
    setError(null);
    setPageNumber(1);
    setNumPages(null);
    setScale(1.0);
    setPageWidth(null);
  }, [pdfUrl]);

  // Measure container width
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        console.log("Container width:", width);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }) => {
      console.log("PDF loaded successfully with", numPages, "pages");
      console.log("PDF URL:", pdfUrl);
      setNumPages(numPages);
      setLoading(false);
      setError(null);
      setImageLoadingProgress(100);
    },
    [pdfUrl]
  );

  // Enhanced error handling for document loading
  const onDocumentLoadError = useCallback(
    (error) => {
      console.error("PDF load error:", error);
      console.error("PDF URL that failed:", pdfUrl);
      console.error("Error details:", error.message, error.name, error.stack);

      // Check if it's an image-related error
      if (
        error.message?.includes("image") ||
        error.message?.includes("decode")
      ) {
        console.log(
          "Image-related error detected, trying alternative rendering"
        );
        if (!useAlternativeRendering) {
          setUseAlternativeRendering(true);
          return; // Don't set error state yet, try alternative rendering
        }
      }

      setError(
        `May problema sa pag-load ng PDF: ${error.message || "Unknown error"}`
      );
      setLoading(false);
    },
    [pdfUrl, useAlternativeRendering]
  );

  // Add image error recovery
  const onPageLoadError = useCallback(
    (error) => {
      console.error("Page load error:", error);
      console.error("Page number:", pageNumber);
      console.error("Current scale:", scale);
      console.error("Alternative rendering mode:", useAlternativeRendering);

      // If it's an image or memory error, try alternative rendering
      if (
        error.message?.includes("image") ||
        error.message?.includes("memory") ||
        error.message?.includes("canvas") ||
        error.message?.includes("decode")
      ) {
        console.log(
          "Detected image/memory error, enabling alternative rendering"
        );
        if (!useAlternativeRendering) {
          setUseAlternativeRendering(true);
          // Reset the page to retry with new settings
          setTimeout(() => {
            setPageNumber(pageNumber);
          }, 100);
        }
      }
    },
    [pageNumber, scale, useAlternativeRendering]
  );

  // Enhanced document load progress
  const onDocumentLoadProgress = useCallback(({ loaded, total }) => {
    if (total > 0) {
      const progress = Math.round((loaded / total) * 100);
      setImageLoadingProgress(progress);
      console.log(
        `PDF loading progress: ${progress}% (${loaded}/${total} bytes)`
      );

      // Log if it's a large file
      if (total > 10 * 1024 * 1024) {
        // > 10MB
        console.log(
          "Large PDF detected, may need more time for image processing"
        );
      }
    }
  }, []);

  // Improved page load success handler
  const onPageLoadSuccess = useCallback(
    (page) => {
      console.log("Page loaded successfully:", page);

      const viewport = page.getViewport({ scale: 1 });
      setPageWidth(viewport.width);

      // Better auto-scaling logic
      if (containerWidth && viewport.width > 0) {
        const padding = 32; // Account for padding
        const availableWidth = containerWidth - padding;

        if (viewport.width > availableWidth) {
          // Only scale down if necessary, maintain quality
          const newScale = Math.max(0.7, availableWidth / viewport.width);
          setScale(newScale);
          console.log("Auto-fitted scale:", newScale);
        } else {
          // For smaller PDFs, use a reasonable minimum scale
          setScale(Math.max(1.0, availableWidth / viewport.width));
        }
      }

      // Extended timeout for complex images
      setTimeout(() => {
        setImageLoadingProgress(100);
        console.log("Extended image loading timeout completed");
      }, 5000); // Increased to 5 seconds
    },
    [containerWidth]
  );

  // Better Page component with quality settings
  <Page
    pageNumber={pageNumber}
    scale={scale}
    rotate={rotation}
    className="shadow-lg mx-auto max-w-full"
    renderTextLayer={false} // Keep disabled for performance
    renderAnnotationLayer={true} // Enable for better form/image rendering
    onLoadSuccess={onPageLoadSuccess}
    onLoadError={(error) => {
      console.error("Page load error:", error);
      console.error("Page number:", pageNumber);
      // Try alternative rendering on page error
      if (!useAlternativeRendering) {
        setUseAlternativeRendering(true);
      }
    }}
    // Additional rendering options
    canvasBackground="white" // Ensure white background
    devicePixelRatio={window.devicePixelRatio || 1} // Use device pixel ratio for quality
    loading={
      <div className="flex items-center justify-center h-64 sm:h-96">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">
            Naglo-load ng page {pageNumber}...
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Loading images and designs...
          </p>
        </div>
      </div>
    }
  />;

  const changePage = useCallback(
    (offset) => {
      setPageNumber((prevPageNumber) => {
        const newPageNumber = prevPageNumber + offset;
        return Math.min(Math.max(1, newPageNumber), numPages);
      });
    },
    [numPages]
  );

  const previousPage = useCallback(() => changePage(-1), [changePage]);
  const nextPage = useCallback(() => changePage(1), [changePage]);

  const zoomIn = useCallback(
    () => setScale((prev) => Math.min(prev + 0.2, 3.0)),
    []
  );
  const zoomOut = useCallback(
    () => setScale((prev) => Math.max(prev - 0.2, 0.5)),
    []
  );
  const resetZoom = useCallback(() => setScale(1.0), []);
  const rotate = useCallback(
    () => setRotation((prev) => (prev + 90) % 360),
    []
  );

  const fitToWidth = useCallback(() => {
    if (pageWidth && containerWidth) {
      const newScale = containerWidth / pageWidth;
      setScale(newScale);
      console.log("Fit to width scale:", newScale);
    }
  }, [pageWidth, containerWidth]);

  const downloadPDF = useCallback(() => {
    const link = document.createElement("a");
    link.href = pdfUrl;

    // Extract filename from pdfUrl
    const urlParts = pdfUrl.split("/");
    const filename = urlParts[urlParts.length - 1] || "presentation.pdf";

    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pdfUrl]);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 pdf-viewer-container">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header with back button */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm sm:text-base"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
            </div>
            <div className="flex-1 text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Tingnan ang PowerPoint presentation sa web browser
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Empty div for balance */}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
            {/* Navigation */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <button
                onClick={previousPage}
                disabled={pageNumber <= 1 || loading}
                className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Nakaraan</span>
              </button>

              <span className="text-xs sm:text-sm text-gray-600 min-w-[80px] sm:min-w-[120px] text-center">
                Pahina {pageNumber} sa {numPages || "..."}
              </span>

              <button
                onClick={nextPage}
                disabled={pageNumber >= numPages || loading}
                className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <span className="hidden sm:inline">Susunod</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <button
                onClick={zoomOut}
                disabled={loading}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Palakihin"
              >
                <ZoomOut size={16} />
              </button>

              <span className="text-xs sm:text-sm text-gray-600 min-w-[50px] sm:min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>

              <button
                onClick={zoomIn}
                disabled={loading}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Palakihin"
              >
                <ZoomIn size={16} />
              </button>

              <button
                onClick={resetZoom}
                disabled={loading}
                className="px-2 sm:px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
              >
                Reset
              </button>

              <button
                onClick={fitToWidth}
                disabled={loading}
                className="px-2 sm:px-3 py-2 rounded-lg bg-green-100 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
                title="I-fit sa width"
              >
                <span className="hidden sm:inline">Fit Width</span>
                <span className="sm:hidden">Fit</span>
              </button>
            </div>

            {/* Additional Controls */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <button
                onClick={rotate}
                disabled={loading}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="I-rotate"
              >
                <RotateCw size={16} />
              </button>

              <button
                onClick={downloadPDF}
                disabled={loading}
                className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <Download size={16} />
                <span className="hidden sm:inline">I-download</span>
                <span className="sm:hidden">Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 min-h-[60vh] sm:min-h-[80vh]">
          {error && (
            <div className="flex items-center justify-center h-48 sm:h-64">
              <div className="text-center px-4">
                <div className="text-red-500 text-4xl sm:text-6xl mb-4">⚠️</div>
                <p className="text-red-600 mb-2 text-sm sm:text-base">
                  Error sa pag-load
                </p>
                <p className="text-gray-600 text-sm sm:text-base">{error}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 truncate">
                  File: {pdfUrl}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Subukan Muli
                </button>
              </div>
            </div>
          )}

          {!error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center min-h-[50vh] sm:min-h-[70vh]"
              ref={containerRef}
            >
              <div className="w-full max-w-full lg:max-w-6xl">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  onLoadProgress={onDocumentLoadProgress}
                  options={pdfOptions}
                  loading={
                    <div className="flex items-center justify-center h-64 sm:h-96">
                      <div className="text-center px-4">
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 text-sm sm:text-base">
                          Naglo-load ng PDF...
                        </p>
                        {imageLoadingProgress > 0 &&
                          imageLoadingProgress < 100 && (
                            <div className="mt-2">
                              <div className="w-32 sm:w-48 bg-gray-200 rounded-full h-2 mx-auto">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${imageLoadingProgress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                {imageLoadingProgress}% - Naglo-load ng mga
                                imahe...
                              </p>
                            </div>
                          )}
                      </div>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    rotate={rotation}
                    className="shadow-lg mx-auto max-w-full"
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    onLoadSuccess={onPageLoadSuccess}
                    onLoadError={(error) => {
                      console.error("Page load error:", error);
                      console.error("Page number:", pageNumber);
                    }}
                    loading={
                      <div className="flex items-center justify-center h-64 sm:h-96">
                        <div className="text-center px-4">
                          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                          <p className="text-gray-600 text-sm sm:text-base">
                            Naglo-load ng page {pageNumber}...
                          </p>
                        </div>
                      </div>
                    }
                  />
                </Document>
              </div>
            </motion.div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
          <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">
            Paano Gamitin:
          </h3>
          <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
            <li>
              • Gamitin ang mga arrow button para mag-navigate sa mga slide
            </li>
            <li>• I-zoom in/out para makita ang mga detalye</li>
            <li>• I-rotate ang presentation kung kailangan</li>
            <li>• I-download ang PDF file para sa offline viewing</li>
            <li>
              • Para sa malalaking PDF, maghintay hanggang ma-load ang lahat ng
              imahe
            </li>
          </ul>

          {/* Large PDF warning */}
          {pdfUrl && pdfUrl.includes("shang.pdf") && (
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs sm:text-sm text-yellow-800">
                <strong>Note:</strong> Ang Shang Dynasty PDF ay may maraming
                imahe at malaking file size (51MB). Maaaring tumagal ng ilang
                segundo bago ma-load ang lahat ng imahe.
              </p>
              {!useAlternativeRendering && (
                <button
                  onClick={() => {
                    setUseAlternativeRendering(true);
                    setLoading(true);
                    setError(null);
                    console.log("Trying alternative rendering mode...");
                  }}
                  className="mt-2 px-2 sm:px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition-colors"
                >
                  Subukan ang Alternative Rendering (kung walang imahe)
                </button>
              )}
              {useAlternativeRendering && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                  <p className="text-xs text-green-800">
                    Alternative rendering mode enabled. Mas malaking memory
                    limit para sa mga imahe.
                  </p>
                  <button
                    onClick={() => {
                      setUseAlternativeRendering(false);
                      setLoading(true);
                      setError(null);
                      console.log("Resetting to normal rendering mode...");
                    }}
                    className="mt-2 px-2 sm:px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                  >
                    Balik sa Normal Rendering
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PowerPointViewer;

// Add responsive styles
const styles = `
  .pdf-viewer-container {
    overflow-x: hidden;
  }
  
  /* Mobile optimizations */
  @media (max-width: 640px) {
    .pdf-viewer-container .react-pdf__Page {
      max-width: 100% !important;
      height: auto !important;
    }
    
    .pdf-viewer-container .react-pdf__Page__canvas {
      max-width: 100% !important;
      height: auto !important;
    }
    
    .pdf-viewer-container .react-pdf__Page__textContent {
      display: none !important;
    }
    
    .pdf-viewer-container .react-pdf__Page__annotations {
      display: none !important;
    }
  }
  
  /* Tablet optimizations */
  @media (min-width: 641px) and (max-width: 1024px) {
    .pdf-viewer-container .react-pdf__Page {
      max-width: 90% !important;
    }
  }
  
  /* Desktop optimizations */
  @media (min-width: 1025px) {
    .pdf-viewer-container .react-pdf__Page {
      max-width: 100% !important;
    }
  }
  
  /* Ensure PDF pages are responsive */
  .pdf-viewer-container .react-pdf__Page__canvas {
    max-width: 100% !important;
    height: auto !important;
  }
  
  /* Hide text layer on mobile for better performance */
  @media (max-width: 768px) {
    .pdf-viewer-container .react-pdf__Page__textContent {
      display: none !important;
    }
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
