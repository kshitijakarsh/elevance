import React, { useEffect, useState } from "react";

function JobCard({ job }) {
  function formatContractTime(str) {
    if (!str) return "";
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
  return (
    <div className="backdrop-filter backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-[#EBEBBA]/40 hover:shadow-2xl group p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[#EBEBBA] text-lg font-special">{job.company_name}</h3>
        <span className="text-xs text-[#EBEBBA] bg-white/5 border border-[#EBEBBA]/20 px-2 py-1 rounded-full">New</span>
      </div>
      
      <h2 className="text-white text-lg font-poppins mb-3">{job.title}</h2>
      
      <div className="inline-block backdrop-filter backdrop-blur-sm bg-white/5 border border-[#EBEBBA]/20 rounded-md px-3 py-1 mb-3">
        <span className="text-[#d9d9a0] text-xs font-medium flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {formatContractTime(job.contract_time)}
        </span>
      </div>
      
      <p className="text-[#d9d9a0] text-sm mb-4 h-16 overflow-hidden">
        {job.description.length > 120
          ? job.description.substring(0, 120) + "..."
          : job.description}
      </p>
      
      <div className="flex justify-end">
        <a
          href={job.redirect_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#EBEBBA] text-sm font-special transition-colors duration-200 hover:text-white flex items-center group-hover:underline"
        >
          View Details
          <svg 
            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedJobs = localStorage.getItem("matchedJobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen relative bg-black flex items-center justify-center">
        {/* Background styling consistent with other components */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1f1f1f] to-[#082247] opacity-80"></div>
          
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
          
          {/* Animated blobs */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#082247] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 -right-20 w-80 h-80 bg-[#EBEBBA] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 backdrop-filter backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl px-8 py-6 shadow-xl">
          <div className="animate-pulse text-[#EBEBBA] text-xl font-special">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-black">
      {/* Background styling consistent with other components */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1f1f1f] to-[#082247] opacity-80"></div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
        
        {/* Animated blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#082247] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 -right-20 w-80 h-80 bg-[#EBEBBA] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#EBEBBA] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 py-24">
        {jobs.length > 0 ? (
          <>
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1 text-sm border border-[#EBEBBA]/30 text-[#EBEBBA] rounded-full backdrop-filter backdrop-blur-sm bg-white/5">
                Career Opportunities
              </div>
              <h2 className="text-4xl font-special leading-tight mb-4 text-[#EBEBBA]">
                Matching Jobs
              </h2>
              <p className="text-[#d9d9a0] max-w-2xl mx-auto text-lg font-poppins">
                We found {jobs.length} opportunities that match your profile and experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] backdrop-filter backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">
            <svg 
              className="w-16 h-16 text-[#EBEBBA]/50 mb-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <h2 className="text-[#EBEBBA] text-2xl font-special mb-4">No Jobs Found</h2>
            <p className="text-[#d9d9a0] text-center mb-8 max-w-md font-poppins">
              Upload your resume to find matching opportunities tailored to your skills and experience
            </p>
            <a 
              className="px-8 py-3 bg-[#EBEBBA] text-black font-special rounded-lg hover:opacity-90 transition-all hover:shadow-lg hover:scale-[1.02] focus:outline-none" 
              href="/"
            >
              Upload Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;