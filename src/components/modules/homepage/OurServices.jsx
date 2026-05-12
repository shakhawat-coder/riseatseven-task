import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LinkButton from "../../common/LinkButton";
import ServiceCard from "../../common/ServiceCard";
import CommonHeader from "../../common/CommonHeader";
import { SERVICES_DATA } from "../../../data";

gsap.registerPlugin(ScrollTrigger);


const OurServices = () => {
  return (
    <section className="w-full overflow-hidden pb-12 xl:pb-24">
      <div className="w-full px-0">
        <CommonHeader 
          titlePart1="Our"
          titlePart2="Services"
          imageSrc="/services/serviceHeader.webp"
          buttonText="View All Services"
          buttonTo="/services"
        />
        <div className="px-4 md:px-7 md:pt-10 lg:pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 lg:gap-x-12 lg:gap-x-20 xl:gap-x-4 md:gap-y-0">
            {SERVICES_DATA.map((service) => ( 
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </div>

        <div className="mt-2 lg:mt-10 flex justify-center px-4 md:hidden">
          <LinkButton text="View All Services" to="/services" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default OurServices;
