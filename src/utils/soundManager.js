// Sound effects for the game
const sounds = {
  correct: new Audio("/sounds/correct.mp3"),
  wrong: new Audio("/sounds/wrong.mp3"),
  complete: new Audio("/sounds/complete.mp3"),
  background: new Audio("/sounds/background.mp3"),
  flip: new Audio("/sounds/flip.mp3"),
  success: new Audio("/sounds/pass.mp3"),
  fail: new Audio("/sounds/fail.mp3"),
};

// Configure background music
sounds.background.loop = true;
sounds.background.volume = 0.3;

// Configure flip sound volume
sounds.flip.volume = 0.4;

// Sound manager functions
export const playSound = (soundName) => {
  if (sounds[soundName]) {
    // Create a new instance of the audio to allow overlapping sounds
    const sound = sounds[soundName].cloneNode();
    sound.play().catch((error) => {
      console.log("Error playing sound:", error);
    });
  }
};

export const playBackgroundMusic = () => {
  sounds.background.play().catch((error) => {
    console.log("Error playing background music:", error);
  });
};

export const stopBackgroundMusic = () => {
  sounds.background.pause();
  sounds.background.currentTime = 0;
};

export const setBackgroundVolume = (volume) => {
  sounds.background.volume = Math.max(0, Math.min(1, volume));
};
