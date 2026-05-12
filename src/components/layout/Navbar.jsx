import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import navData from "./navData";
import { GoArrowUpRight } from "react-icons/go";
import LinkButton from "../common/LinkButton";
import Logo from "../common/Logo";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const linksWrapRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(DEFAULT_IMAGE);
  const closeTimer = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [pillStyle, setPillStyle] = useState({ opacity: 0, left: 0, width: 0 });
  const linkRefs = useRef([]);
  const [hoveredLinkIdx, setHoveredLinkIdx] = useState(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [renderedDropdownIdx, setRenderedDropdownIdx] = useState(null);
  const contentFadeTimer = useRef(null);
  const [measuredWidth, setMeasuredWidth] = useState(600);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const dropdownContentRef = useRef(null);

  useLayoutEffect(() => {
    if (activeDropdown !== null && dropdownContentRef.current) {
      const links = dropdownContentRef.current.querySelector(".links-col");
      const image = dropdownContentRef.current.querySelector(".image-col");
      if (links && image) {
        const w = links.offsetWidth + image.offsetWidth;
        const h = Math.max(links.offsetHeight, image.offsetHeight);
        if (w > 0) setMeasuredWidth(w);
        if (h > 0) setMeasuredHeight(h);
      }
    }
  }, [renderedDropdownIdx, activeDropdown, hoveredImage]);

  useEffect(() => {
    const onScroll = () => {
      if (activeDropdown !== null) {
        setActiveDropdown(null);
        setContentVisible(false);
      }
      if (
        document.body.classList.contains("featured-work-in-view") ||
        document.body.classList.contains("core-values-in-view")
      ) {
        setVisible(false);
        lastY.current = window.scrollY || 0;
        return;
      }
      const y = window.scrollY || 0;
      setScrolled(y > 40);
      if (y < 60) setVisible(true);
      else if (y > lastY.current) {
        if (activeDropdown === null) setVisible(false);
      } else setVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeDropdown]);

  const scrollYRef = useRef(0);
  useEffect(() => {
    const shouldLock = mobileOpen;
    if (shouldLock) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, scrollYRef.current);
      lastY.current = scrollYRef.current;
      setVisible(true);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (activeDropdown !== null)
      document.body.classList.add("nav-dropdown-open");
    else document.body.classList.remove("nav-dropdown-open");
    return () => document.body.classList.remove("nav-dropdown-open");
  }, [activeDropdown]);

  function openDropdown(idx, firstImage) {
    clearTimeout(closeTimer.current);
    const item = navData[idx];
    const targetWidth = item?.dropdown?.length > 5 ? 860 : 680;

    if (activeDropdown === null) {
      setRenderedDropdownIdx(idx);
      setActiveDropdown(idx);
      setHoveredImage(firstImage || DEFAULT_IMAGE);
      clearTimeout(contentFadeTimer.current);
      requestAnimationFrame(() => setContentVisible(true));
    } else if (activeDropdown !== idx) {
      setContentVisible(false);
      setActiveDropdown(idx);
      setHoveredImage(firstImage || DEFAULT_IMAGE);
      clearTimeout(contentFadeTimer.current);
      contentFadeTimer.current = setTimeout(() => {
        setRenderedDropdownIdx(idx);
        setContentVisible(true);
      }, 120);
    }
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
      setContentVisible(false);
      clearTimeout(contentFadeTimer.current);
      contentFadeTimer.current = setTimeout(
        () => setRenderedDropdownIdx(null),
        220,
      );
    }, 180);
  }

  function cancelClose() {
    clearTimeout(closeTimer.current);
  }

  function movePillTo(idx) {
    const el = linkRefs.current[idx];
    const wrap = linksWrapRef.current;
    if (!el || !wrap) return;
    const elRect = el.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    setHoveredLinkIdx(idx);
    setPillStyle({
      opacity: 1,
      left: elRect.left - wrapRect.left,
      width: elRect.width,
    });
  }
  function hidePill() {
    if (activeDropdown !== null) return;
    setHoveredLinkIdx(null);
    setPillStyle((prev) => ({ ...prev, opacity: 0 }));
  }

  useEffect(() => {
    if (activeDropdown === null) {
      setHoveredLinkIdx(null);
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeDropdown]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isActive = isMobile ? (mobileOpen ? scrollYRef.current > 40 : scrolled) : scrolled;
  const navGlassBg = isMobile ? "rgba(255, 255, 255, 0.72)" : "rgba(239, 238, 236, 0.74)";
  const navGlassBorder = isMobile ? (scrolled ? "rgba(0,0,0,0.08)" : "rgba(255, 255, 255, 0.2)") : "rgba(255, 255, 255, 0.42)";
  const navGlassShadow = isMobile ? (scrolled ? "0 4px 24px rgba(0, 0, 0, 0.06)" : "none") : "0 8px 36px rgba(16, 16, 16, 0.09)";

  const logo = <Logo />;

  return (
    <>


      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[9990] transition-all duration-350 ${activeDropdown !== null ? "pointer-events-auto backdrop-blur-[5px] bg-black/18" : "pointer-events-none backdrop-blur-0 bg-transparent"
          }`}
        onClick={() => {
          setActiveDropdown(null);
          setContentVisible(false);
        }}
      />

      <div
        id="navbar-root"
        data-navbar
        className="relative z-[9999]"
      >
        <nav
          className={`fixed left-0 right-0 z-50 transition-all duration-400 ${visible ? "translate-y-0" : "-translate-y-[200%]"
            }`}
          style={{
            top: isMobile ? ((mobileOpen ? scrollYRef.current > 40 : scrolled) ? "0" : "56px") : (scrolled ? "12px" : "64px"),
          }}
        >
          <div
            className={`relative z-50 transition-all duration-400 ${isMobile ? "m-0 rounded-none" : (scrolled ? "m-0 rounded-none" : "mx-3 rounded-full")
              } ${isActive ? "shadow-nav" : "shadow-none"}`}
            style={{
              backgroundColor: isActive ? navGlassBg : "transparent",
              backdropFilter: isActive ? "blur(18px) saturate(155%)" : "none",
              WebkitBackdropFilter: isActive ? "blur(18px) saturate(155%)" : "none",
              border: isActive ? `1px solid ${navGlassBorder}` : "1px solid transparent",
            }}
          >
            <div className={`mx-auto ${isMobile ? "px-[20px]" : "px-[12px]"}`}>
              <div className="flex items-center h-[64px]">
                <div
                  className={`shrink-0 transition-colors duration-400 ${(mobileOpen ? scrollYRef.current > 40 : scrolled) ? "text-black" : "text-white"
                    }`}
                  style={{ width: isMobile ? "130px" : "180px" }}
                >
                  <Link to="/" className="block h-[24px]">
                    {logo}
                  </Link>
                </div>

                <div
                  ref={linksWrapRef}
                  className="hidden lg:flex flex-1 justify-center items-center gap-0 relative"
                  onMouseLeave={() => {
                    scheduleClose();
                    hidePill();
                  }}
                  onMouseEnter={() => cancelClose()}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute top-1/2 -translate-y-1/2 h-[28px] rounded-full transition-all duration-250 cubic-bezier-[0.16,1,0.3,1] pointer-events-none z-0 ${isActive ? "bg-white/82 shadow-sm" : "bg-white/95"
                      }`}
                    style={{
                      left: pillStyle.left,
                      width: pillStyle.width,
                      opacity: pillStyle.opacity,
                    }}
                  />

                  {navData.map((item, idx) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      ref={(el) => (linkRefs.current[idx] = el)}
                      className={`nav-link-item no-underline outline-none items-center gap-1 px-[14px] py-[2px] rounded-full text-[16px] font-medium transition-colors duration-150 relative cursor-pointer z-10 bg-transparent ${hoveredLinkIdx === idx || isActive ? "text-grey-900" : "text-white"
                        } ${idx >= 6 ? "hidden min-[1280px]:inline-flex" : "inline-flex"}`}
                      onMouseEnter={() => {
                        cancelClose();
                        movePillTo(idx);
                        if (item.dropdown)
                          openDropdown(idx, item.dropdown[0]?.image);
                        else scheduleClose();
                      }}
                    >
                      {item.label}
                      {item.dropdown && (
                        <span className="text-[16px] inline-block">+</span>
                      )}
                      {item.badge && (
                        <span
                          className={`absolute inline-flex items-center justify-center w-[20px] h-[14px] rounded-[30px] bg-mint text-[8px] font-thin text-black  transition-all duration-350 cubic-bezier-[0.16,1,0.3,1] pointer-events-none z-20 ${hoveredLinkIdx === idx ? "-top-[20px] -right-[6px]" : "-top-[15px] -right-[6px]"
                            }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                <div className="ml-auto flex items-center gap-[10px]">
                  <LinkButton
                    className="!hidden  lg:!flex"
                    text="Get In Touch"
                    to="/contact"
                    dark={scrolled}
                  />

                  <button
                    className={`flex lg:hidden flex-col justify-center items-center w-9 h-9 border-none bg-transparent cursor-pointer p-0 relative shrink-0 transition-all duration-300 group/ham z-[9999] ${(mobileOpen ? scrollYRef.current > 40 : scrolled) ? "text-black" : "text-white"
                      }`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                  >
                    <span className={`block w-5 h-[1.5px] rounded-[2px] bg-current origin-center absolute transition-all duration-[380ms] cubic-bezier-[0.16,1,0.3,1] ${mobileOpen ? "rotate-45 translate-y-0" : "-translate-y-[3.5px]"}`} />
                    <span className={`block w-5 h-[1.5px] rounded-[2px] bg-current origin-center absolute transition-all duration-[380ms] cubic-bezier-[0.16,1,0.3,1] ${mobileOpen ? "-rotate-45 translate-y-0" : "translate-y-[3.5px]"}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {(() => {
            const item =
              renderedDropdownIdx !== null
                ? navData[renderedDropdownIdx]
                : null;
            const isWide = item?.dropdown?.length > 5;
            const isOpen = activeDropdown !== null && item?.dropdown;
            const IMAGE_SIZE = 280;

            return (
              <div
                className={`hidden lg:block fixed left-1/2 -translate-x-1/2 min-w-[400px] max-w-[calc(100vw-48px)] bg-white rounded-[20px] shadow-dropdown overflow-hidden z-60 transition-all duration-450 cubic-bezier-[0.16,1,0.3,1] ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                style={{
                  top: "68px",
                  width: measuredWidth ? `${measuredWidth}px` : "auto",
                  height: measuredHeight ? `${measuredHeight}px` : "auto",
                }}
                onMouseEnter={() => cancelClose()}
                onMouseLeave={() => scheduleClose()}
              >
                <div
                  ref={dropdownContentRef}
                  className="flex items-stretch transition-all duration-450 cubic-bezier-[0.16,1,0.3,1]"
                  style={{
                    width: measuredWidth ? `${measuredWidth}px` : "max-content",
                  }}
                >
                  {item && (
                    <>
                      <div className={`links-col shrink-0 w-max p-[40px_48px] transition-opacity duration-150 flex flex-col justify-center min-w-0 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
                        <p className="text-[11px] uppercase tracking-[0.12em] text-grey-400 font-semibold mb-5">
                          {item.categoryLabel || ""}
                        </p>

                        {isWide ? (
                          <div className="flex gap-[40px]">
                            <div className="flex flex-col gap-[8px]">
                              {item.dropdown.slice(0, Math.ceil(item.dropdown.length / 2)).map((d) => (
                                <DropdownLink
                                  key={d.path}
                                  d={d}
                                  onHover={() => d.image && setHoveredImage(d.image)}
                                  fontSize="22px"
                                  lineHeight="1.2"
                                />
                              ))}
                            </div>
                            <div className="flex flex-col gap-[8px]">
                              {item.dropdown.slice(Math.ceil(item.dropdown.length / 2)).map((d) => (
                                <DropdownLink
                                  key={d.path}
                                  d={d}
                                  onHover={() => d.image && setHoveredImage(d.image)}
                                  fontSize="22px"
                                  lineHeight="1.2"
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-[2px]">
                            {item.dropdown.map((d) => (
                              <DropdownLink
                                key={d.path}
                                d={d}
                                onHover={() =>
                                  d.image && setHoveredImage(d.image)
                                }
                                fontSize="30px"
                                lineHeight="1.2"
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <div
                        className={`image-col shrink-0 p-3 pl-0 transition-opacity duration-150 ${contentVisible ? "opacity-100" : "opacity-0"}`}
                        style={{ width: `${IMAGE_SIZE}px` }}
                      >
                        <div
                          className="relative w-full h-full rounded-[12px] overflow-hidden"
                          style={{ minHeight: `${IMAGE_SIZE}px` }}
                        >
                          <img
                            key={hoveredImage}
                            src={hoveredImage}
                            alt=""
                            className="animate-[imgFadeIn_0.3s_ease_forwards] absolute inset-0 w-full h-full object-cover block"
                          />

                          {item.label === "Services" && (
                            <div className="absolute bottom-3 left-2.5">
                              <LinkButton
                                text="View All Services"
                                to="/services"
                                dark
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })()}
          {activeDropdown !== null && (
            <div
              className="hidden lg:block absolute top-[56px] left-1/2 -translate-x-1/2 h-[60px] z-[59] bg-transparent"
              style={{ width: `${measuredWidth + 80}px` }}
              onMouseEnter={() => cancelClose()}
              onMouseLeave={() => scheduleClose()}
            />
          )}
        </nav>

        <div
          className={`fixed inset-2 z-[9997] bg-[rgba(8,8,8,0.82)] backdrop-blur-[28px] saturate-[160%] rounded-[20px] flex flex-col transition-opacity duration-[320ms] cubic-bezier-[0.16,1,0.3,1] overflow-y-auto lg:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
          <div className="flex items-center justify-between p-[14px_20px] shrink-0">
            <div className="w-max text-white">
              <Link
                to="/"
                className="block h-[16px]"
                onClick={() => setMobileOpen(false)}
              >
                {logo}
              </Link>
            </div>
            <button
              className={`flex flex-col justify-center items-center w-9 h-9 border-none bg-transparent cursor-pointer p-0 relative shrink-0 text-white group/ham close`}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <span className="block w-5 h-[1.5px] rounded-[2px] bg-current origin-center absolute transition-all duration-[380ms] cubic-bezier-[0.16,1,0.3,1] rotate-45" />
              <span className="block w-5 h-[1.5px] rounded-[2px] bg-current origin-center absolute transition-all duration-[380ms] cubic-bezier-[0.16,1,0.3,1] -rotate-45" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-[20px]">
            {navData.map((item, idx) => (
              <div
                key={item.id}
                className={`border-b first:border-t border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                // style={{ transitionDelay: mobileOpen ? `${idx * 60}ms` : "0ms" }}
              >
                <div
                  className="flex items-center justify-between py-3 cursor-pointer"
                  onClick={() => {
                    if (item.dropdown)
                      setMobileExpanded(mobileExpanded === idx ? null : idx);
                    else setMobileOpen(false);
                  }}
                >
                  <span className="text-3xl md:text-5xl font-medium text-white tracking-[-0.01em] leading-none">
                    {item.label}
                  </span>
                  {item.dropdown && (
                    <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                      <svg
                        className={`transition-transform duration-350 cubic-bezier-[0.16,1,0.3,1] ${mobileExpanded === idx ? "rotate-180" : ""}`}
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 4.5L6 8L9.5 4.5"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {item.dropdown && (
                  <div
                    className={`overflow-hidden transition-[max-height] duration-[380ms] cubic-bezier-[0.16,1,0.3,1] ${mobileExpanded === idx ? "max-h-[600px]" : "max-h-0"
                      }`}
                  >
                    <div className="pb-[10px] flex flex-col gap-[2px]">
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.path}
                          to={d.path}
                          className="nav-link-item no-underline outline-none block py-[6px] text-[15px] font-normal text-white/65 hover:text-white/90 transition-colors duration-200"
                          onClick={() => setMobileOpen(false)}
                        >
                          {d.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-[8px_22px_20px] shrink-0">
            <Link
              to="/contact"
              className="nav-link-item no-underline outline-none flex items-center justify-center gap-2 w-full p-[15px] bg-white text-black rounded-full text-[15px] font-bold text-center"
              onClick={() => setMobileOpen(false)}
            >
              Get In Touch
              <GoArrowUpRight className="text-md" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

function DropdownLink({ d, onHover, fontSize, lineHeight }) {
  return (
    <Link
      to={d.path}
      className="nav-link-item no-underline outline-none block self-start"
      onMouseEnter={onHover}
      style={{
        height: lineHeight,
        lineHeight,
      }}
    >
      <span className="relative overflow-hidden inline-block align-top cursor-pointer group">
        <span
          className="block whitespace-nowrap transition-transform duration-[440ms] cubic-bezier-[0.16,1,0.3,1] will-change-transform group-hover:-translate-y-[105%] font-medium text-grey-900"
          style={{ fontSize, lineHeight }}
        >
          {d.title}
        </span>
        <span
          className="block whitespace-nowrap transition-transform duration-[440ms] cubic-bezier-[0.16,1,0.3,1] will-change-transform absolute top-0 left-0 translate-y-[105%] group-hover:translate-y-0 font-medium text-grey-900"
          style={{ fontSize, lineHeight }}
        >
          {d.title}
        </span>
      </span>
    </Link>
  );
}

export default Navbar;
