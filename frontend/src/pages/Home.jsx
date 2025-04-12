import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";

import toast, { Toaster } from "react-hot-toast";

function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [interviewOptionsVisible, setInterviewOptionsVisible] = useState(false);

  const notify = () => toast("Please upload resume first.");

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
    if (!uploaded) {
      toast.error("Please select PDF first.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://elevance.onrender.com/submit",
        formData,
        {
          headers: { "Content-Type": "application/pdf" },
        }
      );

      const resumeText = response.data.resumeText;
      const jobArrays = response.data.data;

      if (resumeText) {
        localStorage.setItem("resumeText", resumeText);
      }

      if (Array.isArray(jobArrays)) {
        const allJobs = jobArrays.flat();
        localStorage.setItem("matchedJobs", JSON.stringify(allJobs));
      }

      setLoading(false);
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
        <div className="mt-20 max-w-2xl mx-auto mb-8">
          {!loading ? (
            <h1 className="text-3xl font-special font-thin text-center text-[#EBEBBA] mb-8">
              {interviewOptionsVisible
                ? "Choose Interview Type"
                : uploaded
                ? "Resume Loaded"
                : "Upload Your Resume"}
            </h1>
          ) : (
            <h1 className="text-3xl font-special font-thin text-center text-[#EBEBBA] mb-8">
              Loading ...
            </h1>
          )}

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
                  className="mt-6 w-52 h-12 rounded-lg font-special text-white border-solid border-2 border-[#FFF8C6] shadow-lg hover:bg-[#FFF8C6] hover:text-black"
                  onClick={handleResumeUpload}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Upload Resume"}
                </button>
                <Toaster />
              </div>
            </>
          )}

          {interviewOptionsVisible && (
            <div className="mt-10 text-center">
              <div className="flex font-poppins flex-wrap justify-center gap-4 mb-6">
                {[
                  { label: "Behavioral", path: "behavioral" },
                  { label: "DSA / Coding", path: "dsa" },
                  { label: "Final Round", path: "final" },
                  { label: "Project Discussion", path: "project" },
                  { label: "System Design", path: "system" },
                  { label: "Technical Round", path: "technical" },
                ].map(({ label, path }) => (
                  <button
                    key={path}
                    className="mt-6 w-52 h-12 rounded-lg text-white border-solid border-2 border-[#FFF8C6] shadow-lg hover:bg-[#FFF8C6] hover:text-black"
                    onClick={() => goToInterview(path)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2 border font-special border-white text-white rounded-lg hover:bg-white hover:text-black transition"
              >
                New Resume
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
