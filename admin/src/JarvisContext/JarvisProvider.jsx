// JarvisProvider.jsx
import React, { createContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const JarvisContext = createContext();

export default function JarvisProvider({ children }) {
  const [isActive, setIsActive] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.volume = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleNavigation = (command) => {
    const routeMap = {
      dashboard: "/",
      home: "/",
      main: "/",
      add: "/add",
      new: "/add",
      create: "/add",
      list: "/list",
      products: "/list",
      items: "/list",
      orders: "/orders",
      purchases: "/orders",
      images: "/imageList",
      gallery: "/imageList",
      photos: "/imageList",
      "create image": "/createImg",
      "make image": "/createImg",
      jarvis: "/jarvis",
      assistant: "/jarvis",
    };

    let bestMatch = { score: 0, path: null, name: null };

    for (const [routeName, path] of Object.entries(routeMap)) {
      const score = command.includes(routeName) ? routeName.length : 0;
      if (score > bestMatch.score) {
        bestMatch = { score, path, name: routeName };
      }
    }

    if (bestMatch.path) {
      navigate(bestMatch.path);
      speak(`Navigating to ${bestMatch.name.replace(/-/g, " ")} page`);
    } else {
      speak("I couldn't find that route.");
    }
  };

  const takeCommand = (message) => {
    const lower = message.toLowerCase();

    if (
      lower.includes("go to") ||
      lower.includes("navigate to") ||
      lower.includes("open") ||
      lower.includes("take me to") ||
      lower.includes("show me")
    ) {
      handleNavigation(lower);
    } else if (lower.includes("hello") || lower.includes("hey")) {
      speak("Hello Sir, How may I help you?");
    } else if (lower.includes("open google")) {
      window.open("https://www.google.com", "_blank");
      speak("Opening Google...");
    } else if (lower.includes("open youtube")) {
      window.open("https://www.youtube.com", "_blank");
      speak("Opening YouTube...");
    } else if (lower.includes("open facebook")) {
      window.open("https://facebook.com", "_blank");
      speak("Opening Facebook...");
    } else if (lower.includes("what is") || lower.includes("who is")) {
      window.open(
        `https://www.google.com/search?q=${message.replace(" ", "+")}`,
        "_blank"
      );
      speak("This is what I found on the internet.");
    } else if (lower.includes("time")) {
      speak(new Date().toLocaleTimeString());
    } else if (lower.includes("date")) {
      speak(new Date().toLocaleDateString());
    } else {
      speak("Searching on Google...");
      window.open(
        `https://www.google.com/search?q=${message.replace(" ", "+")}`,
        "_blank"
      );
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      console.log("Heard:", transcript);
      takeCommand(transcript);
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      speak("Jarvis activated");
      recognitionRef.current?.start();
    } else {
      recognitionRef.current?.stop();
      speak("Jarvis deactivated");
    }
  }, [isActive]);

  return (
    <JarvisContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </JarvisContext.Provider>
  );
}