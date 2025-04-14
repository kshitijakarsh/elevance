import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { LoaderCircle, Code, Award, RefreshCw } from "lucide-react";

function Dsa() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");
  const resumeText = localStorage.getItem("resumeText");
  const [evaluation, setEvaluation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          <p className="mt-4 text-gray-300">
            Generating your DSA challenge...
          </p>
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

        <div className="w-1/2 pl-4 flex flex-col">
          <div className="flex items-center justify-between mb-4 pt-6">
            <h2 className="text-xl font-bold text-white">Solution</h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-black text-gray-300 py-2 px-3 rounded-md border border-gray-800 hover:border-gray-700 focus:outline-none focus:border-[#EBEBBA] transition-all duration-200"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
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