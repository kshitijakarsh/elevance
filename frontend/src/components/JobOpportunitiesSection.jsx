import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobOpportunitiesSection = () => {
  const navigate = useNavigate()

  const features = [
    {
      title: "Smart Search",
      description: "Our AI matches your profile with relevant job opportunities based on your interview performance.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.37-1.41 1.42-4.38-4.38zM8 14a6 6 0 100-12 6 6 0 000 12z" />
        </svg>
      ),
      color: "bg-gradient-to-br from-blue-600/80 to-blue-500/60",
    },
    {
      title: "Personalized Matches",
      description: "Get job recommendations that align with your skills, experience, and career goals.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-6 8a6 6 0 1112 0H4z" />
        </svg>
      ),
      color: "bg-gradient-to-br from-green-600/80 to-green-500/60",
    },
    {
      title: "Direct Applications",
      description: "Apply directly to companies with your enhanced profile showcasing your interview preparations.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v2H3V3zm0 4h14v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7zm4 2v2h6V9H7z" />
        </svg>
      ),
      color: "bg-gradient-to-br from-purple-600/80 to-purple-500/60",
    },
  ];

  return (
    <div className="relative py-24 px-6 lg:px-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1f1f1f] to-[#082247] opacity-80"></div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
        
        <div className="absolute top-40 left-20 w-96 h-96 bg-[#082247] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#EBEBBA] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 text-sm border border-[#EBEBBA]/30 text-[#EBEBBA] rounded-full backdrop-filter backdrop-blur-sm bg-white/5">
            Career Advancement
          </div>
          <h2 className="text-4xl font-special leading-tight mb-4 text-[#EBEBBA]">
            Discover Tech Opportunities
          </h2>
          <p className="text-[#d9d9a0] max-w-2xl mx-auto text-lg font-poppins">
            Access curated job listings tailored to your skills and experience level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="backdrop-filter backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-[#EBEBBA]/40 hover:shadow-2xl group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${feature.color} p-3 rounded-lg shadow-lg flex items-center justify-center shrink-0`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-special text-xl text-[#EBEBBA] group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[#d9d9a0] mt-2 text-sm font-poppins">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 border border-[#EBEBBA] text-[#EBEBBA] font-special rounded-lg hover:bg-[#EBEBBA]/10 transition-all hover:shadow-lg focus:outline-none" onClick={()=>{
            navigate("/jobs")
          }}>
            Browse Job Listings
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobOpportunitiesSection;