import { FileSearch } from "lucide-react";
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
    <div className="bg-black border border-gray-800 rounded-lg p-6 transition-all duration-300 hover:border-[#EBEBBA] hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[#EBEBBA] text-lg font-medium">{job.company_name}</h3>
        <span className="text-xs text-gray-400 bg-gray-900 px-2 py-1 rounded-full">New</span>
      </div>
      
      <h2 className="text-white text-xl font-bold mb-3">{job.title}</h2>
      
      {/* Duration Badge */}
      <div className="inline-block bg-gray-900 border border-gray-700 rounded-md px-3 py-1 mb-3">
        <span className="text-[#EBEBBA] text-xs font-medium flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {formatContractTime(job.contract_time)}
        </span>
      </div>
      
      <p className="text-gray-400 text-sm mb-4 h-16 overflow-hidden">
        {job.description.length > 120
          ? job.description.substring(0, 120) + "..."
          : job.description}
      </p>
      
      <div className="flex justify-end">
        <a
          href={job.redirect_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#EBEBBA] text-sm font-medium transition-colors duration-200 hover:text-white flex items-center"
        >
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-[#EBEBBA] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {jobs.length > 0 ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-[#EBEBBA] text-center">
                Matching Jobs
              </h1>
              <p className="text-gray-400 text-center mt-2">
                We found {jobs.length} opportunities that match your profile
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 border border-gray-800 rounded-lg p-8">
            <h2 className="pt-2 text-[#EBEBBA] text-2xl font-bold mb-2">No Jobs Found</h2>
            <p className="text-gray-400 text-center mb-4">Upload your resume to find matching opportunities</p>
            <a className="m-4 p-3 font-special border border-solid border-gray-800 rounded-lg  text-white hover:border-[#EBEBBA]" href="/">
            Upload Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;