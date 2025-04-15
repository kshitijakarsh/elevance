import React, { useState, useEffect } from "react";
import axios from "axios";
import Stt from "../components/Stt";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Fin() {
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [availableVoices, setAvailableVoices] = useState([]);
  const [question, setQuestion] = useState("");
  const [editing, setEditing] = useState(false);

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
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <h1 className="text-3xl font-special font-thin text-center text-[#EBEBBA] mb-8">
        Final Round
      </h1>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex flex-col border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#EBEBBA]">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-[#EBEBBA] text-lg font-special">
              AI Assistant
            </h2>
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
                <div className="w-2 h-2 rounded-full bg-[#EBEBBA] mr-2 animate-pulse"></div>
                <p className="text-[#EBEBBA] text-sm font-poppins">
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
        <div className="w-full md:w-1/2 flex flex-col border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#EBEBBA]">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-[#EBEBBA] text-lg font-special">Voice Input</h2>
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
                  className="w-4 h-4 text-[#EBEBBA] mr-2"
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
                <p className="text-[#EBEBBA] text-sm font-poppins">
                  Transcript
                </p>
              </div>

              <div className="relativeoverflow-hidden hover:border-gray-700 transition-all duration-200">
                {editing ? (
                  <div className="relative">
                    <textarea
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      className="w-full h-32 p-4 bg-black text-gray-300 outline-none resize-none"
                      autoFocus
                      placeholder="Enter your text here..."
                    />
                    <div className="absolute bottom-0 left-0 right-0 flex justify-end p-2 bg-gradient-to-t from-black to-transparent">
                      <button
                        onClick={() => setEditing(false)}
                        className="bg-[#EBEBBA] text-black px-4 py-1.5 rounded-md text-sm font-medium hover:bg-white transition-colors duration-200 flex items-center"
                      >
                        <svg
                          className="w-3.5 h-3.5 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setEditing(true)}
                    className="h-32 p-4 text-gray-300 whitespace-pre-wrap cursor-pointer overflow-y-auto hover:bg-gray-900/30 transition-colors duration-200"
                  >
                    {transcript ? (
                      transcript
                    ) : (
                      <span className="text-gray-500 italic">
                        Speak something or click to edit...
                      </span>
                    )}
                    <div className="absolute bottom-2 right-2 opacity-40 hover:opacity-100 transition-opacity duration-200">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                )}
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

export default Fin;
