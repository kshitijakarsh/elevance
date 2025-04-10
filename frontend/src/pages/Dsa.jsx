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

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.post("http://localhost:3000/interview/dsa", {
          resumeText,
        });
        setQuestion(response.data.result);
      } catch (err) {
        console.error("Error fetching DSA question:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  const handleSubmit = () => {
    console.log("Language:", language);
    console.log("Code submitted:", code);
    // TODO: Send code + language to backend for evaluation
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
          <LoaderCircle className="animate-spin text-purple-400 mx-auto" size={48} />
          <p className="mt-4 text-gray-400">Generating your DSA challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0e0e0e] text-white">
      {/* Left - Question Section */}
      <div className="w-1/2 p-6 overflow-y-auto bg-[#1e1e1e] border-r border-gray-700">
        <h1 className="text-2xl font-bold text-purple-400 mb-4">1. DSA Challenge</h1>
        <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-300">
          {question}
        </div>
      </div>

      {/* Right - Code Editor Section */}
      <div className="w-1/2 flex flex-col">
        {/* Header with language selector */}
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
          onChange={(value) => setCode(value)}
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
    </div>
  );
}

export default Dsa;
