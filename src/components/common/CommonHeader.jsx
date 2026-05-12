import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LinkButton from "./LinkButton";

gsap.registerPlugin(ScrollTrigger);

const CommonHeader = ({
  titlePart1,
  titlePart2,
  imageSrc,
  buttonText,
  buttonTo
}) => {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.from(
        ".animate-char",
        {
          y: "120%",
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.04,
        },
        0
      );

      if (imageWrapperRef.current) {
        tl.fromTo(
          imageWrapperRef.current,
          { width: 0, opacity: 0, marginRight: 0 },
          {
            width: "75px",
            opacity: 1,
            marginRight: "0.5rem",
            duration: 1,
            ease: "expo.inOut",
          },
          "+=0.1"
        );
      }

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 0.8, opacity: 0, rotate: -5 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderLetters = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden py-1">
        <span className="animate-char inline-block translate-y-0">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="flex px-4 md:px-7 justify-between items-center pb-5 relative after:absolute after:bottom-0 after:left-7 after:right-7 md:after:h-[1px] after:bg-black/30 after:transition-opacity after:duration-300"
    >
      <div className="flex items-end">
        <h2 className="relative inline-flex flex-col flex-wrap justify-start text-left text-6xl font-medium tracking-tighter text-balance text-grey-900 md:text-7xl leading-[0.8]">
          <div className="flex flex-wrap relative text-left justify-start">
            <div className="inline mr-2">{renderLetters(titlePart1)}</div>
            <div
              ref={imageWrapperRef}
              className="relative mr-2 inline-flex shrink-0"
              style={{ width: 0 }}
            >
              <div
                ref={imageRef}
                className="relative h-16 w-16 md:h-20 md:w-20 shrink-0 overflow-hidden rounded-md"
              >
                <img
                  src={imageSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="inline mr-2">{renderLetters(titlePart2)}</div>
          </div>
        </h2>
      </div>

      <div className="hidden md:flex md:items-center">
        <LinkButton text={buttonText} to={buttonTo} />
      </div>
    </div>
  );
};

export default CommonHeader;
