import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "./Input";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LandingSection = () => {
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
      toast.error("Please select PDF first.", {
        style: {
          background: "#000000",
          color: "white",
          borderRadius: "10px",
          border: "1px solid #374151",
        },
      });
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
      navigate("/interview");
    } catch (error) {
      console.error("Error uploading resume:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative bg-black text-[#EBEBBA] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1f1f1f] to-[#082247] opacity-80"></div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
        
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#082247] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 -right-20 w-80 h-80 bg-[#EBEBBA] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#EBEBBA] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center lg:text-left max-w-xl mt-20 lg:mt-0">
        <h1 className="text-4xl lg:text-5xl font-special leading-tight mb-6">
          Ace Your Next Tech Interview With Confidence
        </h1>

        <p className="text-[#d9d9a0] mb-8 text-lg font-poppins">
          Upload your resume and practice with our AI interviewer tailored to
          your experience.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center mt-10 lg:mt-0">
        <div className="w-full backdrop-filter backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">
          <div className="mb-4 text-center">
            <h3 className="text-xl font-special mb-2">Get Started</h3>
            <p className="text-sm text-[#d9d9a0] mb-6">Upload your resume to begin</p>
          </div>
          
          <Input
            isUploaded={uploaded}
            isLoading={loading}
            handleFileChange={handleFileChange}
          />
          
          <button
            className="mt-6 w-full bg-[#EBEBBA] text-black font-special py-3 rounded-lg hover:opacity-90 transition-all hover:shadow-lg hover:scale-[1.02] focus:outline-none"
            onClick={handleResumeUpload}
            disabled={loading}
          >
            {loading ? "Processing..." : "Start"}
          </button>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default LandingSection;