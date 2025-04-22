import { useState, useEffect, useCallback } from "react";
import { speak, initializeSpeech } from "../utils/speech";

export function useSpeechSynthesis() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [synth, setSynth] = useState(null);

  // Initialize speech synthesis
  useEffect(() => {
    let cleanupFunction = null;

    const initSynth = async () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        try {
          window.speechSynthesis.getVoices();
          setTimeout(() => {
            setSynth(window.speechSynthesis);
            setIsLoaded(true);
            cleanupFunction = initializeSpeech(setIsLoaded);
          }, 100);
        } catch (error) {
          console.error("Speech synthesis initialization error:", error);
          setIsLoaded(false);
        }
      }
    };

    initSynth();

    return () => {
      if (cleanupFunction) cleanupFunction();
      if (synth) synth.cancel();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && synth) {
        synth.cancel();
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [synth]);

  // Speak text function
  const speakText = useCallback(
    async (text) => {
      if (!isSoundOn || !isLoaded || !synth || isPlaying) return;

      setIsPlaying(true);
      try {
        await speak(text, isSoundOn, volume, setIsPlaying);
      } catch (error) {
        console.error("Speech synthesis error:", error);
        setIsPlaying(false);
      }
    },
    [isSoundOn, isLoaded, synth, isPlaying, volume]
  );

  // Toggle sound
  const toggleSound = useCallback(
    async (text = null) => {
      const newSoundState = !isSoundOn;
      setIsSoundOn(newSoundState);
      setHasInteracted(true);

      if (!newSoundState && synth) {
        synth.cancel();
        setIsPlaying(false);
        return;
      }

      if (newSoundState && text) {
        try {
          if (window.speechSynthesis) {
            window.speechSynthesis.getVoices();
            setSynth(window.speechSynthesis);

            setTimeout(async () => {
              setIsPlaying(true);
              await speak(text, true, volume, setIsPlaying);
            }, 100);
          }
        } catch (error) {
          console.error("Speech activation error:", error);
          setIsPlaying(false);
        }
      }
    },
    [isSoundOn, synth, volume]
  );

  return {
    isSoundOn,
    volume,
    setVolume,
    isPlaying,
    isLoaded,
    hasInteracted,
    speakText,
    toggleSound,
  };
}
