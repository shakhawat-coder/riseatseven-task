import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoArrowUpRight, GoCheck } from "react-icons/go";
import Logo from "../common/Logo";

gsap.registerPlugin(ScrollTrigger);


const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "X", href: "https://x.com", icon: FaXTwitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
  { label: "TikTok", href: "https://tiktok.com", icon: FaTiktok },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
];

const NAV_COLS = [
  [
    { label: "Services", path: "/services" },
    { label: "Work", path: "/work" },
    { label: "About", path: "/about" },
    { label: "Culture", path: "/culture" },
    { label: "Meet The Risers", path: "/team" },
  ],
  [
    { label: "Testimonials", path: "/testimonials" },
    { label: "Blog & Resources", path: "/blog" },
    { label: "Webinars", path: "/webinar" },
    { label: "Careers", path: "/careers" },
  ],
  [
    { label: "Sheffield", path: "/sheffield" },
    { label: "Manchester", path: "/manchester" },
    { label: "London", path: "/london" },
    { label: "New York", path: "/new-york" },
    { label: "Contact", path: "/contact" },
  ],
];

function FooterLink({ label, path }) {
  return (
    <Link to={path} className="no-underline inline-block group">
      <span className="relative inline-flex flex-col overflow-hidden h-[1.4em]">
        <span className="block text-[18px] lg:text-[22px] font-medium leading-[1.0em] tracking-[-0.055em] whitespace-nowrap transition-all duration-300 ease-in-out text-white group-hover:-translate-y-full group-hover:text-[#b4f4e0]">
          {label}
        </span>
        <span className="block text-[18px] lg:text-[22px] font-medium leading-[1.0em] tracking-[-0.055em] whitespace-nowrap transition-all duration-300 ease-in-out absolute top-full left-0 text-[#b4f4e0] group-hover:-translate-y-full">
          {label}
        </span>
      </span>
    </Link>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const footerRootRef = useRef(null);
  const radiusShellRef = useRef(null);
  const innerCardRef = useRef(null);
  const brandRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      const fullHeight = innerCardRef.current.offsetHeight;

      gsap.set(radiusShellRef.current, { height: 0, opacity: 1 });
      gsap.set(overlayRef.current, { opacity: 1 });
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRootRef.current,
          start: "top 92%",
          end: "bottom bottom",
          scrub: true,
        },
      });

      revealTl.to(
        radiusShellRef.current,
        {
          height: fullHeight,
          ease: "none",
          duration: 1,
        },
        0,
      );

      revealTl.to(
        overlayRef.current,
        {
          opacity: 0,
          ease: "none",
          duration: 0.72,
        },
        0.18,
      );

      gsap.fromTo(
        brandRef.current,
        { y: 40 },
        {
          y: 0,
          scrollTrigger: {
            trigger: footerRootRef.current,
            start: "top 95%",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleSubmit = () => {
    if (email.trim()) setSent(true);
  };

  return (
    <>
      <div ref={footerRootRef} className="h-[600px] bg-transparent pointer-events-none" />

      <footer className="sticky bottom-0 z-[3] px-2 pb-2 mt-[-500px] max-sm:px-[6px]">
        <div className="bg-[#0e0e0e] rounded-[24px] overflow-hidden relative isolate will-change-[height]" ref={radiusShellRef}>
          <div ref={overlayRef} className="absolute inset-0 z-[2] bg-[#0e0e0e] rounded-[inherit] pointer-events-none will-change-opacity" />
          <div ref={innerCardRef} className="w-full bg-[#0e0e0e] relative z-[1] antialiased [text-rendering:geometricPrecision] font-['saans','Inter','Helvetica_Neue',Arial,sans-serif]">
            <div className="w-full mx-auto px-[15px] md:px-[30px] pt-[56px] pb-[105px] grid grid-cols-[41%_1fr] gap-0 max-[900px]:grid-cols-1 max-[900px]:gap-[34px] max-[900px]:pb-[56px]">
              <div className="flex flex-col">
                <p className="text-white font-bold text-[clamp(24px,2.1vw,31px)] leading-[1.08] tracking-[-0.055em] mb-[clamp(22px,2vw,28px)]">
                  Stay updated with Rise news
                </p>
                <div className="flex items-center gap-[8px] bg-[#1a1a1a] border-[1px] border-[#2a2a2a] rounded-full pt-[7px] pr-[7px] pb-[7px] pl-[24px] w-full lg:max-w-[315px] xl:max-w-[415px] h-[54px] lg:h-[66px] mb-[20px] overflow-hidden">
                  <input
                    type="email"
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-[clamp(18px,1.45vw,22px)] font-bold leading-[1.2] tracking-[-0.055em] placeholder:text-[#8c8c8c] placeholder:opacity-100"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address for newsletter"
                  />
                  <button
                    className="w-[36px] h-[36px] lg:w-[52px] lg:h-[52px] rounded-full bg-[#b4f4e0] border-none text-[#0e0e0e] cursor-pointer flex items-center justify-center overflow-hidden transition-[background-color,border-radius] duration-300 hover:bg-white group/btn shrink-0"
                    onClick={handleSubmit}
                  >
                    {sent ? (
                      <GoCheck
                        className="w-[25px] h-[25px] transition-transform duration-300"
                        aria-hidden="true"
                      />
                    ) : (
                      <GoArrowUpRight
                        className="w-[25px] h-[25px] transition-transform duration-300 group-hover/btn:rotate-90"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
                <div className="flex flex-wrap gap-[5px] mb-5">
                  {SOCIALS.map((s) => {
                    const Icon = s.icon;

                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        className="inline-flex items-center justify-center min-w-[34px] h-5 bg-white rounded-full px-2 text-[#0e0e0e] text-[13px] font-extrabold leading-none no-underline overflow-hidden transition-all duration-300 hover:rounded-[6px]"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                      >
                        <span className="flex items-center justify-center gap-1 pointer-events-none">
                          <Icon
                            className="w-3 h-3 shrink-0"
                            aria-hidden="true"
                          />
                          <GoArrowUpRight
                            className="w-3 h-3 shrink-0"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <nav className="grid grid-cols-3 max-sm:grid-cols-2 gap-x-0 gap-y-[clamp(34px,4vw,56px)]" aria-label="Footer navigation">
                {NAV_COLS.map((col, ci) => (
                  <div
                    key={ci}
                    className=" flex flex-col gap-[6px] border-l border-[#343434] pl-[clamp(12px,1.05vw,16px)] max-sm:border-l-0 max-sm:pl-0"
                  >
                    {col.map((item) => (
                      <FooterLink
                        key={item.path}
                        label={item.label}
                        path={item.path}
                      />
                    ))}
                  </div>
                ))}
              </nav>
            </div>

            <div className="overflow-hidden px-[clamp(26px,2.2vw,34px)] pb-[clamp(22px,2vw,28px)] select-none leading-none">
              <div ref={brandRef} className="text-[clamp(72px,13vw,180px)] font-black text-white leading-[0.9] tracking-[-0.03em] whitespace-nowrap [&_svg]:block [&_svg]:w-full [&_svg]:h-auto">
                <Logo />
              </div>
            </div>

            <div className="border-t-0 px-[15px] lg:px-[30px] pb-[45px]">
              <div className="w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-[10px]">
                <p className="text-white text-[12px] font-[300] leading-[1.35] flex flex-wrap gap-x-[10px] items-center m-0 [&>*:not(:last-child)]:after:content-['•'] [&>*:not(:last-child)]:after:ml-[14px]">
                  <span>© 2025 Rise at Seven Ltd. All rights reserved</span>
                  <span>Company Number 11955187</span>
                  <span>VAT Registered GB 322402945</span>
                  <Link to="/privacy" className="group text-white no-underline transition-colors duration-200">
                    <span className="relative before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-white before:scale-x-0 before:origin-right before:transition-transform before:duration-300 group-hover:before:scale-x-100 group-hover:before:origin-left">
                      Privacy Policy
                    </span>
                  </Link>
                  <Link to="/terms" className="group text-white no-underline transition-colors duration-200">
                    <span className="relative before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-white before:scale-x-0 before:origin-right before:transition-transform before:duration-300 group-hover:before:scale-x-100 group-hover:before:origin-left">
                      Terms & conditions
                    </span>
                  </Link>
                </p>
                <a href="#" className="group relative text-white text-[clamp(11px,0.9vw,13px)] leading-[1.35] no-underline transition-colors duration-200">
                  <span className="relative before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-white before:scale-x-0 before:origin-right before:transition-transform before:duration-300 group-hover:before:scale-x-100 group-hover:before:origin-left">
                    Website MadeByShape
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
