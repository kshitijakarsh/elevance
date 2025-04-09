import Stt from "../components/Stt";
import axios from "axios";
import React, { useState, useEffect } from "react";

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
};

function Interview() {
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const resumeText = localStorage.getItem("resumeText");

  useEffect(() => {
    if (!recording && transcript) {
      const sendToBackend = async () => {
        try {
          const response = await axios.post("http://localhost:3000/interview", {
            resumeText,
            transcript,
          });

          const { nextQuestion } = response.data;
          setAiResponse(nextQuestion);
          speak(nextQuestion);
          console.log("AI says:", nextQuestion);
        } catch (error) {
          console.error("Error sending to backend:", error);
        }
      };

      sendToBackend();
    }
  }, [recording, transcript]);

  return (
    <div>
      <Stt
        transcript={transcript}
        setTranscript={setTranscript}
        recording={recording}
        setRecording={setRecording}
      />

      {aiResponse && (
        <div className="mt-6 bg-white p-4 rounded shadow border max-w-xl">
          <p className="font-semibold text-gray-700">AI:</p>
          <p className="text-gray-800">{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default Interview;
