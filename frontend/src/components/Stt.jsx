import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Play, CirclePause, RotateCcw } from "lucide-react";

function Stt({ transcript, setTranscript, recording, setRecording }) {
  const {
    transcript: liveTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [isEditing, setIsEditing] = useState(false);
  const [editableTranscript, setEditableTranscript] = useState("");

  useEffect(() => {
    setTranscript(liveTranscript);
  }, [liveTranscript, setTranscript]);

  const toggleRecording = () => {
    const resumeText = localStorage.getItem("resumeText");

    if (!resumeText) {
      alert("Please upload your resume before starting the interview.");
      return;
    }

    if (recording) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }

    setRecording(!recording);
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <p className="text-red-500">
        Your browser does not support Speech Recognition.
      </p>
    );
  }

  return (
    <div className="text-[#F9FAFB]  px-6 py-8">
      <div className="flex items-center gap-4 bg-[#1C1C1E] border border-[#27272A] rounded-lg shadow-md px-4 py-3 w-fit">
        <button
          onClick={toggleRecording}
          className={`flex items-center gap-2 text-sm font-medium px-3 py-2 border rounded-md transition-colors ${
            recording
              ? "bg-red-900 border-red-500 hover:bg-red-800"
              : "bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] text-white border-none hover:opacity-90"
          }`}
          aria-label={recording ? "Stop Recording" : "Start Recording"}
        >
          {recording ? <CirclePause size={18} /> : <Play size={18} />}
          {recording ? "Stop" : "Start"}
        </button>

        <button
          onClick={resetTranscript}
          className="flex items-center gap-2 text-sm font-medium px-3 py-2 border border-[#4B5563] rounded-md bg-[#27272A] hover:bg-[#3F3F46] transition-colors"
          aria-label="Reset Transcript"
        >
          <RotateCcw size={18} />
          Reset
        </button>

        <span className="text-sm text-[#A1A1AA]">
          Mic:{" "}
          <span className={listening ? "text-[#8E2DE2]" : "text-red-500"}>
            {listening ? "on" : "off"}
          </span>
        </span>
      </div>

      <div className="mt-6 bg-[#1C1C1E] border border-[#27272A] rounded-lg p-4 max-w-xl">
        <h4 className="text-md font-semibold mb-2 text-[#F9FAFB]">
          Transcript:
        </h4>

        {isEditing ? (
          <>
            <textarea
              value={editableTranscript}
              onChange={(e) => setEditableTranscript(e.target.value)}
              className="w-full p-2 rounded-md bg-[#0F0F0F] text-white border border-[#4B5563]"
              rows={6}
            />
            <button
              onClick={() => {
                setTranscript(editableTranscript);
                setIsEditing(false);
              }}
              className="mt-2 px-3 py-1 text-sm font-medium bg-purple-600 rounded hover:bg-purple-700"
            >
              Send
            </button>
          </>
        ) : (
          <p
            className="text-sm text-[#D1D5DB] whitespace-pre-wrap cursor-pointer"
            onClick={() => {
              setEditableTranscript(transcript);
              setIsEditing(true);
            }}
          >
            {transcript || "Speak something..."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Stt;
