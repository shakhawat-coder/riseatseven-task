import React from "react";
import Hero from "../components/modules/homepage/Hero";
import ClientLogos from "../components/modules/homepage/ClientLogos";
import GlobalTeam from "../components/modules/homepage/GlobalTeam";
import FeaturedWork from "../components/modules/homepage/FeaturedWork";
import Blog from "../components/modules/homepage/Blog";
import ReadyToRise from "../components/modules/homepage/ReadyToRise";
import OurServices from "../components/modules/homepage/OurServices";
import ContactScroll from "../components/modules/homepage/ContactScroll";
import CoreValues from "../components/modules/homepage/CoreValues";

const Home = () => {
  return (
    <div className="home-page bg-grey-100">
      <Hero />
      <ClientLogos />
      <GlobalTeam />
      <FeaturedWork /> 
      <OurServices />
      <ContactScroll />
      <CoreValues />
      <Blog />
      <ReadyToRise />
    </div>
  );
};

export default Home;
