import { convertToIPA } from "./filipinoPronunciation";

export const initializeSpeech = (setIsLoaded) => {
  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      setIsLoaded(true);
    }
  };

  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;

  return () => {
    window.speechSynthesis.onvoiceschanged = null;
  };
};

export const speak = async (text, isSoundOn, volume, setIsPlaying) => {
  if (!isSoundOn) {
    setIsPlaying(false);
    return Promise.resolve();
  }

  window.speechSynthesis.cancel();
  setIsPlaying(true);

  return new Promise((resolve) => {
    // Pre-process text to handle common Filipino words
    let processedText = text;

    // Replace common Filipino words for better pronunciation
    processedText = processedText.replace(/\bsa\b/gi, "sah");
    processedText = processedText.replace(/\bng\b/gi, "nang");
    processedText = processedText.replace(/\bna\b/gi, "nah");
    processedText = processedText.replace(/\bmga\b/gi, "ma-NGAH");

    // Create a simple utterance
    const utterance = new SpeechSynthesisUtterance(processedText);
    utterance.volume = volume;
    utterance.rate = 0.9; // Slightly slower for Filipino accent
    utterance.pitch = 1.2; // Slightly higher pitch
    utterance.lang = "tl-PH"; // Set language to Tagalog

    const voices = window.speechSynthesis.getVoices();
    // Try to find a Tagalog/Filipino voice first
    const tagalogVoice = voices.find(
      (voice) =>
        (voice.lang === "tl-PH" ||
          voice.name.includes("Tagalog") ||
          voice.name.includes("Filipino")) &&
        voice.name.toLowerCase().includes("female")
    );
    const asianVoice = voices.find(
      (voice) =>
        (voice.name.includes("Asian") || voice.name.includes("Southeast")) &&
        voice.name.toLowerCase().includes("female")
    );
    const englishVoice = voices.find(
      (voice) =>
        ["en-US", "en-GB", "en"].includes(voice.lang) &&
        voice.name.toLowerCase().includes("female")
    );

    utterance.voice = tagalogVoice || asianVoice || englishVoice;
    console.log(
      `Using voice: ${utterance.voice?.name || "Default"} (${
        utterance.voice?.lang || "tl-PH"
      })`
    );

    const estimatedDuration = Math.max(3000, text.length * 80);
    const timeout = setTimeout(() => {
      console.warn("Speech synthesis timeout - forcing completion");
      setIsPlaying(false);
      resolve();
    }, estimatedDuration);

    utterance.onend = () => {
      clearTimeout(timeout);
      setIsPlaying(false);
      resolve();
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      clearTimeout(timeout);
      setIsPlaying(false);
      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
};
