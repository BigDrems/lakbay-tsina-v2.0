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
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = volume;
    utterance.rate = text.length > 50 ? 0.75 : 0.85; // Dynamic rate
    utterance.pitch = 1.1;
    utterance.lang = "en-US";

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (voice) =>
        ["en-US", "en-GB", "en"].includes(voice.lang) &&
        voice.name.toLowerCase().includes("female")
    );
    const microsoftOrGoogleVoice = voices.find(
      (voice) =>
        (voice.name.includes("Microsoft") || voice.name.includes("Google")) &&
        voice.name.includes("Female")
    );
    const femaleVoice = voices.find((voice) =>
      voice.name.toLowerCase().includes("female")
    );

    utterance.voice = englishVoice || microsoftOrGoogleVoice || femaleVoice;
    console.log(
      `Using voice: ${utterance.voice?.name || "Default"} (${
        utterance.voice?.lang || "en-US"
      })`
    );

    const estimatedDuration = Math.max(3000, text.length * 80); // Adjusted for English
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
