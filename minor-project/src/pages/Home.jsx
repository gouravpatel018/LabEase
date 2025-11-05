import React from "react";
import Hero from "../components/Hero";
import HIW from "../components/HIW";
import WCU from "../components/WCU.JSX";

function Home() {
  
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <HIW />
      <WCU />
    </div>
  );
}

export default Home;
