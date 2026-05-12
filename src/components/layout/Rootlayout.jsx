import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageLoader from "../common/PageLoader";
import { ReactLenis } from "lenis/react";

const Rootlayout = () => {
  return (
    <ReactLenis root>
      <div className="min-h-screen flex flex-col">
        <PageLoader />
        <TopNav />
        <Navbar />

        <main className="main-content flex-1 relative z-[1]">
          <Outlet />
        </main>
        <footer className="main-content">
          <Footer />
        </footer>
      </div>
    </ReactLenis>
  );
};

export default Rootlayout;
