import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const LinkButton = forwardRef(
  ({ text, to, className = "", dark = false }, ref) => {
    const height = "46px";

    const hasBg = className.includes("bg-");
    const hasTextColor = className.includes("text-");

    const defaultBg = dark ? "bg-black" : "bg-white";
    const defaultText = dark ? "text-white" : "text-black";

    return (
      <Link
        to={to}
        ref={ref}
        className={`nav-item rounded-[26px] hover:rounded-md transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group/cta ${!hasBg ? defaultBg : ""
          } ${!hasTextColor ? defaultText : ""} ${className}`}
        style={{
          height: height,
          minHeight: height,
          maxHeight: height,
          display: className.includes('hidden-mobile') || className.includes('show-mobile') ? undefined : 'inline-block',
          overflow: 'hidden'
        }}
      >
        <div style={{ height: height, overflow: 'hidden', position: 'relative' }}>
          <div
            className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/cta:-translate-y-1/2"
            style={{ height: 'auto' }}
          >
            <div
              className="flex items-center justify-center px-4 lg:px-6 text-[0.9rem] lg:text-base font-medium whitespace-nowrap gap-2"
              style={{ height: height }}
            >
              {text}{" "}
              <GoArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </div>
            <div
              className="flex items-center justify-center px-4 lg:px-6 text-[0.9rem] lg:text-base font-medium whitespace-nowrap gap-2"
              style={{ height: height }}
            >
              {text}{" "}
              <GoArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

export default LinkButton;
