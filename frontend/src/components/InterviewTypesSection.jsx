import React from "react";
import { useNavigate } from "react-router-dom";

const InterviewTypesSection = ({ onScrollToLanding }) => {

  const interviewTypes = [
    {
      title: "Behavioral Interviews",
      description:
        "Master questions about past experiences, teamwork, conflict resolution, and leadership with AI-powered practice sessions.",
      icon: (
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-6 8a6 6 0 0112 0H4z" />
        </svg>
      ),
      color: "bg-gradient-to-br from-blue-600/80 to-blue-500/60",
    },
    {
      title: "DSA / Coding Challenges",
      description:
        "Practice solving algorithmic problems and coding challenges with personalized difficulty levels and step-by-step explanations.",
      icon: (
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 3a1 1 0 00-1 1v5H4a1 1 0 000 2h5v5a1 1 0 002 0v-5h5a1 1 0 000-2h-5V4a1 1 0 00-1-1z" />
        </svg>
      ),
      color: "bg-gradient-to-br from-green-600/80 to-green-500/60",
    },
    {
      title: "System Design",
      description:
        "Learn to architect scalable systems, discuss trade-offs, and communicate technical decisions with focused design interview practice.",
      icon: (
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "bg-gradient-to-br from-purple-600/80 to-purple-500/60",
    },
    {
      title: "Technical Round",
      description:
        "Prepare for in-depth technical questions specific to your role and tech stack with realistic interview scenarios.",
      icon: (
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H9.771l-.391 1.561-.58.58h-1.6l-.58-.58L6.229 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "bg-gradient-to-br from-amber-600/80 to-amber-500/60",
    },
  ];

  return (
    <div className="relative py-24 px-6 lg:px-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1f1f1f] to-[#082247] opacity-80"></div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
        
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-[#082247] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 left-20 w-80 h-80 bg-[#EBEBBA] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 text-sm border border-[#EBEBBA]/30 text-[#EBEBBA] rounded-full backdrop-filter backdrop-blur-sm bg-white/5">
            What We Offer
          </div>
          <h2 className="text-4xl font-special leading-tight mb-4 text-[#EBEBBA]">
            Master Every Interview Format
          </h2>
          <p className="text-[#d9d9a0] max-w-2xl mx-auto text-lg font-poppins">
            Our AI-powered platform helps you prepare for all types of tech interviews with personalized practice sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {interviewTypes.map((type, index) => (
            <div
              key={index}
              className="backdrop-filter backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-[#EBEBBA]/40 hover:shadow-2xl group"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`${type.color} p-3 rounded-lg shadow-lg flex items-center justify-center shrink-0`}
                  >
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="font-special text-xl text-[#EBEBBA] group-hover:text-white transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-[#d9d9a0] mt-2 font-poppins">
                      {type.description}
                    </p>
                    <button
                      className="mt-4 px-4 py-2 font-poppins bg-transparent border border-[#EBEBBA]/40 text-[#EBEBBA] rounded-lg hover:bg-[#EBEBBA]/10 transition-all text-sm flex items-center gap-2 group-hover:border-[#EBEBBA]"
                    >
                      Try Now
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-[#EBEBBA] text-black font-special rounded-lg hover:opacity-90 transition-all hover:shadow-lg hover:scale-[1.02] focus:outline-none" onClick={onScrollToLanding}>
            Explore All Features
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewTypesSection;