import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { LoaderCircle, Award, RefreshCw } from "lucide-react";
import Stt from "../components/Stt";

function Dsa() {
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");
  const resumeText = localStorage.getItem("resumeText");
  const [evaluation, setEvaluation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coding, setCoding] = useState(false);
  const [editing, setEditing] = useState(false);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://elevance.onrender.com/interview/dsa",
        {
          resumeText,
        }
      );
      setQuestion(response.data.result);
      setCode("// Start coding here...");
      setEvaluation("");
    } catch (err) {
      console.error("Error fetching DSA question:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (!recording && transcript) {
      const evaluateAnswer = async () => {
        try {
          const response = await axios.post(
            "https://elevance.onrender.com/interview/eval",
            {
              question,
              answer: transcript,
              resumeText,
            }
          );
          setEvaluation(response.data.result);
          setShowModal(true);
        } catch (error) {
          console.error("Error sending to backend:", error);
        }
      };

      evaluateAnswer();
    }
  }, [recording, transcript]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "https://elevance.onrender.com/interview/eval",
        {
          question,
          answer: code,
          resumeText,
        }
      );

      setEvaluation(response.data.result);
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting code:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportedLanguages = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "C++", value: "cpp" },
    { label: "Java", value: "java" },
    { label: "TypeScript", value: "typescript" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <LoaderCircle
            className="animate-spin text-[#EBEBBA] mx-auto"
            size={48}
          />
          <p className="mt-4 text-gray-300">Generating your DSA challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="lg:hidden fixed inset-0 bg-black flex items-center justify-center z-50">
        <p className="text-[#EBEBBA] text-center px-6 text-xl">
          Please use a larger screen to access this page.
        </p>
      </div>


      <div className="hidden lg:flex h-screen bg-black text-white overflow-hidden relative px-6">
        <div className="w-1/2 pr-4 flex flex-col">
          <div className="flex items-center justify-between mb-4 pt-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#EBEBBA]">
                DSA Challenge
              </h1>
            </div>
            <button
              onClick={fetchQuestion}
              className="flex items-center text-gray-400 hover:text-[#EBEBBA] transition-colors duration-200"
            >
              <RefreshCw size={16} className="mr-1" />
              <span className="text-sm">New Problem</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto border border-gray-800 rounded-lg p-6 mb-6 bg-black hover:border-gray-700 transition-all duration-300">
            <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-300">
              {question}
            </div>
          </div>
        </div>

        {coding ? (
          <>
            <div className="w-1/2 pl-4 flex flex-col">
              <div className="flex items-center justify-between mb-4 pt-6">
                <h2 className="text-xl font-special text-white">Solution</h2>

                <div className="flex items-center gap-4">
                  <button
                    className="border border-gray-800 px-4 py-2 font-poppins rounded-lg text-[#EBEBBA] hover:border-[#EBEBBA] transition-all duration-200 flex items-center"
                    onClick={() => {
                      setCoding(false);
                    }}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7"
                      ></path>
                    </svg>
                    Text Box
                  </button>

                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-black font-poppins text-gray-300 py-2 px-3 rounded-lg border border-gray-800 hover:border-gray-700 focus:outline-none focus:border-[#EBEBBA] transition-all duration-200"
                  >
                    {supportedLanguages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 overflow-hidden border border-gray-800 rounded-lg mb-4 hover:border-gray-700 transition-all duration-300">
                <Editor
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                    folding: true,
                    lineNumbers: "on",
                    renderLineHighlight: "all",
                  }}
                />
              </div>

              <div className="flex justify-end mb-6">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex items-center bg-[#EBEBBA] text-black font-medium py-2 px-6 rounded-lg hover:bg-white transition-colors duration-200 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2" size={16} />
                      Evaluating...
                    </>
                  ) : (
                    "Submit Solution"
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full md:w-1/2 flex flex-col border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#EBEBBA]">
              <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-[#EBEBBA] text-lg font-special">
                  Voice Input
                </h2>

                <button
                  className="border border-gray-800 px-4 py-2 rounded-lg text-[#EBEBBA] hover:border-[#EBEBBA] transition-all duration-200 flex items-center font-poppins"
                  onClick={() => {
                    setCoding(true);
                  }}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    ></path>
                  </svg>
                  Code Editor
                </button>
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
          </>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-black border border-gray-800 rounded-lg shadow-xl max-w-2xl w-full flex flex-col max-h-[80vh] animate-fadeIn">
              <div className="p-6 border-b border-gray-800 flex items-center">
                <Award className="text-[#EBEBBA] mr-3" size={24} />
                <h2 className="text-xl font-bold text-white">
                  Solution Evaluation
                </h2>
              </div>

              <div className="p-6 overflow-y-auto text-gray-300 flex-1">
                <pre className="whitespace-pre-wrap">{evaluation}</pre>
              </div>

              <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="border border-gray-700 text-gray-300 font-medium py-2 px-5 rounded-lg hover:border-gray-600 hover:text-white transition-all duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    fetchQuestion();
                  }}
                  className="bg-[#EBEBBA] text-black font-medium py-2 px-5 rounded-lg hover:bg-white transition-colors duration-200"
                >
                  Next Challenge
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dsa;
