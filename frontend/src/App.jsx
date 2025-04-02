import React, { useState } from "react";
import axios from "axios";
import { Input } from "./components/Input";

function JobCard({ job }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start">
        <h4 className="text-xl font-light text-gray-800">{job.title}</h4>
        <span className="bg-white text-slate-900 px-3 py-1 drop-shadow-md rounded-full text-sm font-light">
          {job.contract_time}
        </span>
      </div>

      <p className="text-gray-600 mt-2 font-medium">
        {" "}
        Company : {job.company_name}
      </p>

      <p className="text-gray-700 mt-3 h-[4.5rem]">
        {job.description.length > 100
          ? job.description.substring(0, 100) + "... "
          : job.description}
        <a
          href={job.redirect_url}
          target="_blank"
          rel="noopener noreferrer"
          className=" text-black bg-white underline "
        >
        read more
        </a>
      </p>
    </div>
  );
}

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [jobs, setJobs] = useState([]);

  function handleFileChange(event) {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
    setUploaded(true);
  }

  async function extractText() {
    setUploaded(false);
    setLoading(true);
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/submit",
        formData,
        {
          headers: { "Content-Type": "application/pdf" },
        }
      );

      const jobArrays = response.data.data;
      console.log(jobArrays);

      if (Array.isArray(jobArrays)) {
        const allJobs = jobArrays.flat();
        console.log(allJobs);

        setJobs(allJobs);
        setLoading(false);
        setCompleted(true);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-thin text-center mb-8">Look for jobs</h1>

          <Input
            isUploaded={uploaded}
            handleFileChange={handleFileChange}
            isCompleted={completed}
            isLoading={loading}
          />

          <div className="flex justify-center">
            <button
              className="mt-6 w-52 h-12 rounded-lg drop-shadow-lg bg-zinc-200 text-black hover:bg-zinc-600 hover:text-white transition-colors disabled:opacity-50"
              onClick={extractText}
              disabled={loading}
            >
              {loading ? "Processing..." : "Find Jobs"}
            </button>
          </div>
        </div>

        {jobs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Matching Jobs
            </h2>

            <div className="max-h-[600px] overflow-y-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No Jobs Message */}
        {!loading && jobs.length === 0 && completed && (
          <div className="text-center text-gray-600 mt-8">
            No matching jobs found. Try uploading a different resume.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
