import { useState, useEffect, useRef } from "react";

export const useTypingEffect = (text, typingSpeed = 60) => {
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textRef = useRef("");

  useEffect(() => {
    if (!text) {
      return;
    }

    textRef.current = text;
    setIsTyping(false);
    setTypingText("");

    const startTyping = () => {
      setIsTyping(true);
      let index = 0;
      setTypingText(text.charAt(0));
      index = 1;

      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setTypingText(text.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    };

    const typingTimer = setTimeout(startTyping, 200);
    return () => clearTimeout(typingTimer);
  }, [text, typingSpeed]);

  const skipTyping = () => {
    if (isTyping && textRef.current) {
      setTypingText(textRef.current);
      setIsTyping(false);
    }
  };

  return { typingText, isTyping, skipTyping };
};

export default useTypingEffect;
