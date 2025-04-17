import React from "react";

const InterviewTypesSection = () => {
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
      learnMoreColor: "text-[#EBEBBA]",
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
      learnMoreColor: "text-[#EBEBBA]",
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
      learnMoreColor: "text-[#EBEBBA]",
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
      learnMoreColor: "text-[#EBEBBA]",
    },
  ];

  return (
    <div className="relative min-h-screen py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1f1f1f] to-[#082247] opacity-80"></div>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>

        <div className="absolute -top-40 -left-40 w-96 h-96 bg-black rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-20 -right-20 w-80 h-80 bg-black rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1 text-sm border border-[#EBEBBA]/30 text-[#EBEBBA] rounded-full backdrop-filter backdrop-blur-sm bg-white/5">
            Comprehensive Platform
          </span>
          <h2 className="text-4xl font-special leading-tight mb-4 text-[#EBEBBA]">
            Practice Different Interview Types
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {interviewTypes.map((type, index) => (
            <div
              key={index}
              className="backdrop-filter backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-white/20 group"
            >
              {/* Image area */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={`/api/placeholder/600/300`}
                  alt={`${type.title} illustration`}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 scale-100 group-hover:scale-105"
                />
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              {/* Content area */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`${type.color} p-3 rounded-lg shadow-lg flex items-center justify-center shrink-0`}
                  >
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="font-special text-lg text-[#EBEBBA] group-hover:text-white transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-[#d9d9a0] text-sm mt-2 line-clamp-3">
                      {type.description}
                    </p>
                    <a
                      href="#"
                      className={`${type.learnMoreColor} mt-3 inline-flex items-center text-sm group-hover:underline transition-all`}
                    >
                      Learn more
                      <svg
                        className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
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
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewTypesSection;
