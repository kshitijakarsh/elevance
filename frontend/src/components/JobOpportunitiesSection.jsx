import React from 'react';

const JobOpportunitiesSection = () => {
  return (
    <section className="bg-[#0B0F19] text-white py-20 px-6">
      <div className="text-center mb-14">
        <button className="bg-[#3D3D3D] text-sm text-white py-1.5 px-4 rounded-full mb-4">
          Find Your Dream Job
        </button>
        <h2 className="text-4xl font-bold mb-3">Discover Tech Opportunities</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Access curated job listings tailored to your skills and experience level.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-[#131A2B] border border-[#1E2A3A] rounded-xl p-6 shadow-md">
          <div className="bg-[#2B2B2B] w-10 h-10 flex items-center justify-center rounded-full mb-4">
            <svg className="w-5 h-5 text-[#C9C9C9]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.37-1.41 1.42-4.38-4.38zM8 14a6 6 0 100-12 6 6 0 000 12z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
          <p className="text-gray-400 text-sm">
            Our AI matches your profile with relevant job opportunities based on your interview performance.
          </p>
        </div>

        <div className="bg-[#131A2B] border border-[#1E2A3A] rounded-xl p-6 shadow-md">
          <div className="bg-[#2B2B2B] w-10 h-10 flex items-center justify-center rounded-full mb-4">
            <svg className="w-5 h-5 text-[#C9C9C9]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-6 8a6 6 0 1112 0H4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Personalized Matches</h3>
          <p className="text-gray-400 text-sm">
            Get job recommendations that align with your skills, experience, and career goals.
          </p>
        </div>

        <div className="bg-[#131A2B] border border-[#1E2A3A] rounded-xl p-6 shadow-md">
          <div className="bg-[#2B2B2B] w-10 h-10 flex items-center justify-center rounded-full mb-4">
            <svg className="w-5 h-5 text-[#C9C9C9]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v2H3V3zm0 4h14v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7zm4 2v2h6V9H7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Direct Applications</h3>
          <p className="text-gray-400 text-sm">
            Apply directly to companies with your enhanced profile showcasing your interview preparations.
          </p>
        </div>
      </div>

      <div className="text-center mt-16">
        <button className="bg-[#1C2943] text-blue-400 py-2 px-6 rounded-full text-sm hover:bg-[#24334F] transition">
          Simple Process
        </button>
      </div>
    </section>
  );
};

export default JobOpportunitiesSection;
