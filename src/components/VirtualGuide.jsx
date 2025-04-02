import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Mic, Send } from "lucide-react";

const VirtualGuide = () => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const audioRef = useRef(null);
  const speechRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initialGreeting =
    "Hey there! I'm Alex, your virtual guide. Glad you're here—let's chat! What brings you here today?";

  useEffect(() => {
    // Play initial greeting
    speak(initialGreeting);
  }, []);

  const speak = (text) => {
    if (isMuted) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = volume;
    utterance.rate = 1;
    utterance.pitch = 1;

    // Use a female voice if available
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find((voice) => voice.name.includes("Female"));
    if (femaleVoice) utterance.voice = femaleVoice;

    speechSynthesis.speak(utterance);
  };

  const handleUserInput = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: userInput, sender: "user" }]);

    // Simulate Alex's response
    setIsTyping(true);
    setTimeout(() => {
      const response = generateResponse(userInput);
      setMessages((prev) => [...prev, { text: response, sender: "alex" }]);
      speak(response);
      setIsTyping(false);
    }, 1500);

    setUserInput("");
  };

  const generateResponse = (userInput) => {
    // Simple response logic - can be expanded with more sophisticated AI
    const responses = [
      "That's interesting! Tell me more about that.",
      "I'd love to help you explore that topic!",
      "Great question! Let me think about that...",
      "I'm here to help you learn and discover new things!",
      "That's fascinating! What made you interested in that?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      speechSynthesis.cancel();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#cd201c] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#cd201c] font-bold">A</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Alex</h3>
            <p className="text-white/80 text-sm">Virtual Guide</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-[#cd201c] text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleUserInput} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd201c]"
          />
          <button
            type="submit"
            className="p-2 bg-[#cd201c] text-white rounded-lg hover:bg-[#b31b17] transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default VirtualGuide;
