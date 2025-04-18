import React from "react";
import { useNavigate } from "react-router-dom";

const Interview = () => {
  const navigate = useNavigate();

  const goToInterview = (type) => {
    navigate(`/interview/${type}`);
  };

  const handleReset = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen relative bg-black text-[#EBEBBA] flex items-center justify-center px-6 py-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1f1f1f] to-[#082247] opacity-80"></div>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>

        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#082247] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-[#EBEBBA] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-[#EBEBBA] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex w-full max-w-6xl flex-col lg:flex-row justify-center gap-8 lg:gap-12">
        <div className="flex-1 text-center lg:text-left max-w-lg flex items-center justify-center">
          <div className="backdrop-filter backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
            <h1 className="text-4xl lg:text-5xl font-special text-[#EBEBBA] mb-6">
              Choose Your Interview Type
            </h1>
            <p className="text-[#d9d9a0] text-lg mb-6">
              Select an interview type below to begin preparing for your next
              step.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="backdrop-filter backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl w-full max-w-md">
            <div className="flex flex-col items-center gap-4">
              {[
                { label: "Behavioral", path: "behavioral"},
                { label: "DSA / Coding", path: "dsa"},
                { label: "Final Round", path: "final"},
                { label: "Project Discussion", path: "project"},
                { label: "System Design", path: "system"},
                { label: "Technical Round", path: "technical"},
              ].map(({ label, path, icon }) => (
                <button
                  key={path}
                  className="w-full h-14 rounded-lg text-white border border-white/20 shadow-lg 
                  hover:border-[#EBEBBA] bg-black/20 backdrop-filter backdrop-blur-sm
                  hover:bg-[#EBEBBA]/90 transition-all duration-300 hover:text-black 
                  hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3"
                  onClick={() => goToInterview(path)}
                >
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="mt-8 w-full h-14 rounded-lg text-[#EBEBBA] bg-transparent 
              border border-[#EBEBBA]/40 hover:bg-[#EBEBBA] hover:text-black transition-all 
              duration-300 hover:shadow-lg hover:scale-[1.02] backdrop-filter backdrop-blur-sm"
            >
              New Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
