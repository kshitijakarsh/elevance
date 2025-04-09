import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import React, { useState, useEffect } from "react";
import { Play, CirclePause, RotateCcw } from "lucide-react";

function Stt({ transcript, setTranscript, recording, setRecording }) {
  const {
    transcript: currentTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setTranscript(currentTranscript);
  }, [currentTranscript]);

  const toggleRecording = () => {
    const resumeText = localStorage.getItem("resumeText");

    if (!resumeText) {
      alert("Please upload your resume before starting the interview.");
      return;
    }

    if (recording) {
      SpeechRecognition.stopListening();
      setRecording(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setRecording(true);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 bg-white border border-gray-300 rounded-lg shadow-md px-4 py-3 w-fit">
        <button
          className="flex items-center gap-2 text-sm font-medium px-3 py-2 border border-gray-300 rounded-md bg-green-100 hover:bg-green-200 transition-colors"
          onClick={toggleRecording}
        >
          {recording ? <CirclePause size={18} /> : <Play size={18} />}
          {recording ? "Stop" : "Start"}
        </button>

        <button
          className="flex items-center gap-2 text-sm font-medium px-3 py-2 border border-gray-300 rounded-md bg-yellow-100 hover:bg-yellow-200 transition-colors"
          onClick={resetTranscript}
        >
          <RotateCcw size={18} />
          Reset
        </button>

        <span className="text-sm text-gray-600">
          Mic:{" "}
          <span className={listening ? "text-green-600" : "text-red-500"}>
            {listening ? "on" : "off"}
          </span>
        </span>
      </div>

      <div className="mt-6 bg-gray-100 border border-gray-300 rounded-lg p-4 max-w-xl">
        <h4 className="text-md font-semibold mb-2 text-gray-700">
          Transcript:
        </h4>
        <p className="text-gray-800 text-sm">
          {transcript || "Speak something..."}
        </p>
      </div>
    </div>
  );
}

export default Stt;