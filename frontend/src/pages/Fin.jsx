import Stt from "../components/Stt";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Fin() {
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [availableVoices, setAvailableVoices] = useState([]);
  const [question, setQuestion] = useState("");

  const resumeText = localStorage.getItem("resumeText");

  const speak = (text) => {
    if (!text || availableVoices.length === 0) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1.1;
    utterance.rate = 0.95;
    utterance.volume = 1;

    const preferredVoice =
      availableVoices.find((voice) => voice.name === "Google US English") ||
      availableVoices.find((voice) => voice.name.includes("Google")) ||
      availableVoices.find((voice) => voice.lang === "en-US");

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
      }
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  useEffect(() => {
    if (!recording && transcript) {
      const sendToBackend = async () => {
        setQuestion("");
        try {
          const response = await axios.post(
            "https://elevance.onrender.com/interview/fin",
            {
              resumeText,
              transcript,
            }
          );

          const nextQuestion = response.data.result;
          setQuestion(nextQuestion);
          speak(nextQuestion);
          setTranscript("");
          setAiResponse(nextQuestion);
        } catch (error) {
          console.error("Error sending to backend:", error);
        }
      };

      sendToBackend();
    }
  }, [recording, transcript]);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <Stt
        transcript={transcript}
        setTranscript={setTranscript}
        recording={recording}
        setRecording={setRecording}
      />

      <div className="mt-6 ml-6 bg-[#1a1a1a] p-6 rounded-xl shadow-lg max-w-xl">
        <p className="font-semibold text-[#EBEBBA] mb-2">AI:</p>
        <p className="text-gray-200">{question}</p>
      </div>
    </div>
  );
}

export default Fin;
