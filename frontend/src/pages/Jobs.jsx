import React, { useEffect, useState } from "react";

function JobCard({ job }) {
  return (
    <div className="bg-black border border-purple-600 rounded-lg p-6 mb-4 shadow-lg hover:shadow-purple-700 transition-shadow">
      <div className="flex justify-between items-start">
        <h4 className="text-xl font-light text-white">{job.title}</h4>
        <span className="bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-sm font-light shadow-md">
          {job.contract_time}
        </span>
      </div>
      <p className="text-purple-300 mt-2 font-medium">
        Company: {job.company_name}
      </p>
      <p className="text-gray-300 mt-3 h-[4.5rem]">
        {job.description.length > 100
          ? job.description.substring(0, 100) + "... "
          : job.description}
        <a
          href={job.redirect_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 underline hover:text-purple-200"
        >
          read more
        </a>
      </p>
    </div>
  );
}

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("matchedJobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-light text-center text-white mb-8">
          Matching Jobs
        </h2>

        {jobs.length > 0 ? (
          <div className="max-h-[600px] overflow-y-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-8">
            No matching jobs found. Try uploading a different resume.
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
