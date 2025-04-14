import React, { useState, useEffect } from "react";
import axios from "axios";
import Stt from "../components/Stt";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Sys() {
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
          const response = await axios.post("https://elevance.onrender.com/interview/sys", {
            resumeText,
            transcript,
          });

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
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* AI Assistant */}
        <div className="w-full md:w-1/2 flex flex-col border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-400">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-purple-400 text-lg font-special">AI Assistant</h2>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
            <DotLottieReact
              src="https://lottie.host/4a5b7e2a-4a2d-47d5-9a7d-7b21d1c129d9/ca1KBW7Zoa.lottie"
              loop
              autoplay
              className="w-64 h-64 md:w-80 md:h-80"
            />

            <div className="w-full bg-black border border-gray-800 rounded-lg p-5 shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mr-2 animate-pulse"></div>
                <p className="text-purple-400 text-sm font-poppins">
                  AI Response
                </p>
              </div>
              <p className="text-gray-300 font-poppins">
                {question || "Waiting for your response..."}
              </p>
            </div>
          </div>
        </div>

        {/* Voice Input */}
        <div className="w-full md:w-1/2 flex flex-col border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-400">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-purple-400 text-lg font-special">Voice Input</h2>
          </div>

          <div className="flex-1 flex flex-col items-center p-6 gap-8">
            <div className="w-full flex justify-center mt-6">
              <Stt
                transcript={transcript}
                setTranscript={setTranscript}
                recording={recording}
                setRecording={setRecording}
              />
            </div>

            <div className="w-full border border-gray-800 rounded-lg p-5 bg-black shadow-lg">
              <div className="flex items-center mb-3">
                <svg
                  className="w-4 h-4 text-purple-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  ></path>
                </svg>
                <p className="text-purple-400 text-sm font-poppins">Transcript</p>
              </div>

              <div className="h-32 overflow-y-auto">
                <p className="text-gray-300 font-poppins whitespace-pre-wrap">
                  {transcript || "Speak something..."}
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-poppins ${
                    recording
                      ? "bg-red-900 text-red-200"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {recording ? "Recording..." : "Ready"}
                </div>
              </div>
            </div>

            <div className="w-full bg-black border border-gray-800 rounded-lg p-4 mt-auto">
              <p className="text-gray-400 text-sm text-center font-poppins">
                Speak clearly into your microphone to interact with the AI
                assistant
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sys;
