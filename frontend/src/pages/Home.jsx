import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";

function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [interviewOptionsVisible, setInterviewOptionsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const resumeText = localStorage.getItem("resumeText");
    if (resumeText) {
      setInterviewOptionsVisible(true);
    }
  }, []);

  function handleFileChange(event) {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
    setUploaded(true);
  }

  async function handleResumeUpload() {
    setUploaded(false);
    setLoading(true);
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/submit", formData, {
        headers: { "Content-Type": "application/pdf" },
      });

      const resumeText = response.data.resumeText;
      const jobArrays = response.data.data;

      if (resumeText) {
        localStorage.setItem("resumeText", resumeText);
      }

      if (Array.isArray(jobArrays)) {
        const allJobs = jobArrays.flat();
        localStorage.setItem("matchedJobs", JSON.stringify(allJobs));
      }

      setInterviewOptionsVisible(true);
    } catch (error) {
      console.error("Error uploading resume:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleReset = () => {
    localStorage.clear();
    setInterviewOptionsVisible(false);
    setUploaded(false);
    setFile(null);
  };

  const goToInterview = (type) => {
    navigate(`/interview/${type}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-thin text-center text-white mb-8">
            Upload Your Resume
          </h1>

          {!interviewOptionsVisible && (
            <>
              <Input
                isUploaded={uploaded}
                handleFileChange={handleFileChange}
                isCompleted={false}
                isLoading={loading}
              />

              <div className="flex justify-center">
                <button
                  className="mt-6 w-52 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-400 hover:to-purple-600 shadow-lg hover:shadow-purple-700 transition-colors disabled:opacity-50"
                  onClick={handleResumeUpload}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Upload Resume"}
                </button>
              </div>
            </>
          )}

          {interviewOptionsVisible && (
            <div className="mt-10 text-center">
              <h2 className="text-xl text-white mb-4">Choose Interview Type:</h2>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {[
                  { label: "Technical", path: "technical" },
                  { label: "HR", path: "hr" },
                  { label: "Behavioral", path: "behavioral" },
                  { label: "System Design", path: "system-design" },
                  { label: "Coding", path: "dsa" }, 
                ].map(({ label, path }) => (
                  <button
                    key={path}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    onClick={() => goToInterview(path)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
              >
                Reset & Upload Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
