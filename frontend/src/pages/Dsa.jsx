import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { LoaderCircle } from "lucide-react";

function Dsa() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");
  const resumeText = localStorage.getItem("resumeText");
  const [evaluation, setEvaluation] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.post("https://elevance.onrender.com/interview/dsa", {
        resumeText,
      });
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

  const handleSubmit = async () => {
    try {
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
            className="animate-spin text-purple-400 mx-auto"
            size={48}
          />
          <p className="mt-4 text-gray-400">Generating your DSA challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0e0e0e] text-white relative">
      <div className="w-1/2 p-6 overflow-y-auto bg-[#1e1e1e] border-r border-gray-700">
        <h1 className="text-2xl font-bold text-purple-400 mb-4">
          1. DSA Challenge
        </h1>
        <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-300">
          {question}
        </div>
      </div>

      <div className="w-1/2 flex flex-col">
        <div className="p-4 bg-[#1e1e1e] border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Code</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

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
          }}
        />

        <div className="p-4 bg-[#1e1e1e] border-t border-gray-700 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>

      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl shadow-xl max-w-2xl w-full flex flex-col max-h-[80vh]">
            <div className="p-6 overflow-y-auto text-gray-300 flex-1">
              <h2 className="text-xl font-bold text-purple-400 mb-4">
                Evaluation
              </h2>
              <pre className="whitespace-pre-wrap">{evaluation}</pre>
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-end bg-[#1e1e1e]">
              <button
                onClick={() => {
                  setShowModal(false);
                  fetchQuestion();
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dsa;
