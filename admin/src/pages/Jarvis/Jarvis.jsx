import React, { useContext, useEffect, useRef } from "react";
import "./jarvis.css";
import { jarvisAssets } from "../../assets/assets.js";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { JarvisContext } from "../../JarvisContext/JarvisProvider";

export default function Jarvis() {
  const { isActive, setIsActive } = useContext(JarvisContext);
  const hasSpokenRef = useRef(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.volume = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const speakIntroAndInstructions = () => {
    const messages = [
      "Hello, I am Jarvis, your virtual assistant.",
      "I can help you navigate your website.",
      "You can say things like: 'Go to dashboard', 'Open orders', 'Show me images', or 'Create image'.",
      "I can also tell you the current time or date, and open websites like Google, YouTube, or Facebook.",
      "How may I assist you today?",
    ];

    // Speak each message in sequence
    let index = 0;
    const speakNext = () => {
      if (index < messages.length) {
        const utterance = new SpeechSynthesisUtterance(messages[index]);
        utterance.onend = () => {
          index++;
          speakNext();
        };
        window.speechSynthesis.speak(utterance);
      }
    };

    speakNext();
  };

  useEffect(() => {
    if (!isActive) {
      setIsActive(true); // This triggers JARVIS activation
    } else if (!hasSpokenRef.current) {
      // Only speak intro once after page load
      speakIntroAndInstructions();
      hasSpokenRef.current = true;
    }
  }, [isActive, setIsActive]);

  const toggleJarvis = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <section className="main">
      <div className="image-container">
        <div className="image">
          <img src={jarvisAssets.giphy_icon} alt="jarvis gif" />
        </div>
        <h1>J A R V I S</h1>
        <p>I'm a Virtual Assistant JARVIS, How may I help you?</p>
      </div>

      <div className="input">
        <button
          onClick={toggleJarvis}
          className={`talk ${isActive ? "active" : ""}`}
        >
          <MdOutlineKeyboardVoice className="voiceIcon" />
        </button>
        <h1 className="content">{isActive ? "Deactivate JARVIS" : "Activate JARVIS"}</h1>
      </div>
    </section>
  );
}
