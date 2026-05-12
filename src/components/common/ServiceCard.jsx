import React from "react";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";


const easeSmooth = "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

export default function ServiceCard({ title, href, image }) {
  return (
    <Link
      to={href}
      className={`group relative flex w-full h-full after:absolute after:bottom-0 lg:after:left-15 lg:after:right-15 after:left-0 after:right-0 after:h-[1px] after:bg-black/20 after:transition-opacity after:duration-300 group-hover:after:opacity-0 md:[&:nth-last-child(-n+2)]:after:hidden`}
    >
      <div
        className={`relative flex w-full h-full min-h-[3.75rem] items-center py-4 lg:py-6 lg:overflow-hidden lg:rounded-full lg:pl-1 lg:pr-3 transition-[padding] duration-500 ${easeSmooth} md:min-h-[4.25rem] lg:pointer-fine:group-hover:px-7`}
      >
        <img
          src={image}
          alt=""
          className={`h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-[10px] object-cover mr-4 lg:mr-0 lg:absolute lg:inset-0 lg:z-0 lg:h-full lg:w-full lg:rounded-full lg:opacity-0 transition-all duration-500 ${easeSmooth} pointer-fine:group-hover:scale-105 lg:pointer-fine:group-hover:opacity-100`}
          loading="lazy"
        />
        <div
          className={`hidden lg:block absolute inset-0 z-[1] rounded-full bg-black/40 opacity-0 transition-opacity duration-500 ${easeSmooth} pointer-fine:group-hover:opacity-100`}
          aria-hidden
        />
        <div className="relative z-10 flex min-w-0 items-center lg:gap-2">
          <span
            className={`hidden lg:inline-flex shrink-0 text-white opacity-0 will-change-transform transition-all duration-[550ms] ${easeSmooth} pointer-fine:translate-x-[-14px] pointer-fine:translate-y-[14px] pointer-fine:group-hover:translate-x-0 pointer-fine:group-hover:translate-y-0 pointer-fine:group-hover:opacity-100`}
            aria-hidden
          >
            <GoArrowUpRight className="size-6 md:size-7 lg:size-10" />
          </span>
          <span
            className={`min-w-0 lg:whitespace-nowrap text-left text-3xl lg:text-4xl xl:text-[50px] font-medium tracking-tighter text-grey-900 transition-colors duration-500 ${easeSmooth}  lg:pointer-fine:group-hover:text-white`}
          >
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
}
