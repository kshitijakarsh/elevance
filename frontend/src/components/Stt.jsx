import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Stt({ setTranscript, recording, setRecording }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setTranscript(transcript);
  }, [transcript, setTranscript]);

  const toggleRecording = () => {
    if (recording) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setRecording(!recording);
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Speech recognition not supported in this browser.</p>;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <button
        onClick={toggleRecording}
        className={`flex items-center justify-center px-5 py-3 rounded-lg font-medium transition-all duration-200 w-full sm:w-auto ${
          recording
            ? "bg-gray-900 text-red-400 border border-red-900 hover:bg-gray-800"
            : "bg-[#EBEBBA] text-black hover:bg-white"
        }`}
      >
        <svg
          className={`w-5 h-5 mr-2 ${recording ? "animate-pulse" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {recording ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            ></path>
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            ></path>
          )}
        </svg>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      <button
        onClick={resetTranscript}
        className="flex items-center justify-center px-5 py-3 rounded-lg font-medium bg-black border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all duration-200 w-full sm:w-auto"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Reset
      </button>

      <div className="flex items-center mt-4 sm:mt-0 sm:ml-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800">
        <div
          className={`w-2 h-2 rounded-full mr-2 ${
            listening ? "bg-green-500" : "bg-gray-600"
          }`}
        ></div>
        <span className="text-xs text-gray-400">
          Mic: {listening ? "On" : "Off"}
        </span>
      </div>
    </div>
  );
}

export default Stt;
