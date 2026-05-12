import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useCursor } from '../../common/Cursor';

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
  "https://rise-atseven.transforms.svdcdn.com/production/images/IMG_5023.jpg?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750846538&s=cb2016613a41d1153d28e086f39c0c72",
  "https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-25-at-14.49.00.png?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750859361&s=f220bffc8303450846250315e3fcb457",

];

const ContactScroll = () => {
  const sectionRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const marqueeRef = useRef(null);
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);
  const { activate, deactivate } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 40,
        repeat: -1,
      });

      gsap.fromTo(
        scrollWrapperRef.current,
        { x: '2%' },
        {
          x: '-2%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      [imageRef1.current, imageRef2.current].forEach(img => {
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      const xTo = gsap.quickTo({}, "x"); 
      const yTo = gsap.quickTo({}, "y");

      const handleMouseMove = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const handleMouseEnter = () => {
        activate({ label: "Send Us Your Brief" });
      };

      const handleMouseLeave = () => {
        deactivate();
      };

      const section = sectionRef.current;
      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("mouseleave", handleMouseLeave);
      };

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const MarqueeGroup = ({ imgRef1, imgRef2 }) => (
    <div className="flex shrink-0 items-center justify-around">
      <div className="flex items-center shrink-0">
        <span className="mx-2">Not</span>
        <span className="mx-2">Algorithms</span>
        <div className="relative shrink-0 rounded-2xl overflow-hidden w-[20vw] md:w-[15vw] lg:mb-10 lg:rounded-3xl lg:w-[12vw] mx-6 md:mx-10 aspect-square">
          <img
            ref={imgRef1}
            src={HERO_IMAGES[0]}
            alt="Work"
            className="absolute -top-[15%] left-0 h-[130%] w-full object-cover object-center will-change-transform"
          />
        </div>
      </div>
      <div className="flex items-center shrink-0">
        <span className="mx-2">Chasing</span>
        <span className="mx-2">Consumers</span>
        <div className="relative shrink-0 rounded-2xl overflow-hidden w-[20vw] md:w-[15vw] lg:mb-10 lg:rounded-3xl lg:w-[12vw] mx-6 md:mx-10 aspect-square">
          <img
            ref={imgRef2}
            src={HERO_IMAGES[1]}
            alt="Work"
            className="absolute top-0 left-0 h-[130%] w-full object-cover object-center will-change-transform"
          />
        </div>
      </div>
    </div>
  );

  return (
    <Link to="/connect-with-us" className="block cursor-none">
      <section
        ref={sectionRef}
        className="relative flex w-full items-center pb-15 overflow-hidden"
      >
        <div ref={scrollWrapperRef} className="will-change-transform">
          <div
            ref={marqueeRef}
            className="flex w-max whitespace-nowrap font-medium tracking-tighter text-grey-900 will-change-transform text-[75px] md:text-[100px] lg:text-[220px]"
            style={{ lineHeight: 1 }}
          >
            <MarqueeGroup imgRef1={imageRef1} imgRef2={imageRef2} />
            <MarqueeGroup />
          </div>
        </div>
      </section>
    </Link>
  );
};

export default ContactScroll;

