import React, { useRef } from "react";
import LandingSection from "../components/LandingSection";
import InterviewTypesSection from "../components/InterviewTypesSection";
import JobOpportunitiesSection from "../components/JobOpportunitiesSection";

function Home() {

  const landingRef = useRef(null);

  const scrollToLanding = () => {
    landingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <LandingSection ref={landingRef} />
      <InterviewTypesSection onScrollToLanding={scrollToLanding} />
      <JobOpportunitiesSection />
    </>
  );
}

export default Home;
