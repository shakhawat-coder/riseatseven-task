import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiTrendingUp } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "../../common/Cursor";
import LinkButton from "../../common/LinkButton";

gsap.registerPlugin(ScrollTrigger);

import { WORK_ITEMS } from "../../../data";

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const imagesRef = useRef(null);
  const headingsRef = useRef(null);
  const viewportRef = useRef(null);
  const leftHoverClearTimerRef = useRef(null);
  const [activeId, setActiveId] = useState(WORK_ITEMS[0].id);
  const [leftHoverId, setLeftHoverId] = useState(null);
  const { activate, deactivate, getMousePos } = useCursor();
  const wasHoveredRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!getMousePos) return;
      const pos = getMousePos();
      if (!pos || (pos.x === 0 && pos.y === 0)) return;

      const el = document.elementFromPoint(pos.x, pos.y);
      if (!el) return;

      const isInsideImages = imagesRef.current && imagesRef.current.contains(el);

      if (!isInsideImages) {
        if (wasHoveredRef.current) {
          deactivate();
          setLeftHoverId(null);
          wasHoveredRef.current = false;
        }
        return;
      }

      activate({ icon: "↗", hideOnMove: true });

      const trigger = el.closest('.group');

      if (trigger) {
        const href = trigger.getAttribute('href');
        if (href) {
          const matchedItem = WORK_ITEMS.find(item => item.href === href);
          if (matchedItem) {
            wasHoveredRef.current = true;
            setActiveId(matchedItem.id);
            setLeftHoverId(matchedItem.id);
            return;
          }
        }
      } else {
        if (wasHoveredRef.current) {
          wasHoveredRef.current = false;
          setLeftHoverId(null);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activate, getMousePos]);

  const cancelLeftHoverClear = () => {
    if (leftHoverClearTimerRef.current) {
      clearTimeout(leftHoverClearTimerRef.current);
      leftHoverClearTimerRef.current = null;
    }
  };

  const scheduleLeftHoverClear = () => {
    cancelLeftHoverClear();
    leftHoverClearTimerRef.current = setTimeout(() => {
      setLeftHoverId(null);
      deactivate();
      leftHoverClearTimerRef.current = null;
    }, 140);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = triggerRef.current;
      const imagesContainer = imagesRef.current;
      const headingsContainer = headingsRef.current;
      const viewport = viewportRef.current;

      if (!trigger || !imagesContainer || !headingsContainer || !viewport)
        return;

      const getHeadingsScrollDistance = () => {
        return Math.max(
          0,
          headingsContainer.scrollHeight - viewport.clientHeight,
        );
      };
      const getImagesScrollDistance = () => {
        const viewportHeight = trigger.clientHeight;
        return Math.max(
          0,
          imagesContainer.scrollHeight - viewportHeight + 20,
        );
      };

      gsap.from(".js-featured-work-heading", {
        opacity: 0,
        y: 18,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top+=5",
          end: () =>
            `+=${Math.max(getImagesScrollDistance() * 2, WORK_ITEMS.length * 300)}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (getImagesScrollDistance() <= 0) return;
            const index = Math.min(
              WORK_ITEMS.length - 1,
              Math.max(0, Math.round(self.progress * (WORK_ITEMS.length - 1))),
            );
            const next = WORK_ITEMS[index];
            if (next) {
              setActiveId((prev) => (prev === next.id ? prev : next.id));
            }
          },
        },
      });

      tl.to(
        headingsContainer,
        {
          y: () => -getHeadingsScrollDistance(),
          ease: "none",
        },
        0,
      );
      tl.to(
        imagesContainer,
        {
          y: () => -getImagesScrollDistance(),
          ease: "none",
        },
        0,
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onEnter: () => document.body.classList.add("featured-work-in-view"),
        onEnterBack: () => document.body.classList.add("featured-work-in-view"),
        onLeave: () => document.body.classList.remove("featured-work-in-view"),
        onLeaveBack: () =>
          document.body.classList.remove("featured-work-in-view"),
      });
    }, sectionRef);

    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (headingsRef.current) ro.observe(headingsRef.current);
    if (imagesRef.current) ro.observe(imagesRef.current);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      document.body.classList.remove("featured-work-in-view");
      cancelLeftHoverClear();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full">
      <div className="w-full px-4 md:px-7 pb-12">
        <div
          ref={triggerRef}
          className="js-trigger-fwork w-full relative -my-7 flex overflow-hidden pointer-fine:overflow-visible"
        >
          <div className="w-full pt-6 top-0 h-screen-fix-50 pointer-fine:h-screen-fix pointer-fine:sticky">
            <div className="w-full h-full overflow-hidden bg-grey-900 rounded-3xl grid grid-cols-12 gap-x-0 lg:gap-x-8 px-5 py-3 lg:pl-8 lg:pr-8 xl:pl-10 xl:pr-10">
              <div className="relative col-span-12 items-start hidden lg:flex lg:flex-row lg:items-center lg:col-span-6 lg:h-[96svh]">
                <div className="flex flex-col items-start relative z-10 h-full pt-16 lg:pt-24 lg:pb-32 lg:gap-y-20">
                  <h2 className="js-featured-work-heading inline-flex flex-wrap text-balance relative text-left justify-start text-white text-md/tight lg:text-lg/tight xl:text-xl/tight 4xl:text-2xl/none font-medium tracking-tight">
                    Featured Work
                  </h2>

                  <div
                    ref={viewportRef}
                    className="relative flex-1 overflow-hidden hidden lg:inline-block pr-5 min-h-0 w-full"
                    onMouseLeave={scheduleLeftHoverClear}
                  >
                    <div className="absolute top-0 left-0 w-full h-1/3 z-20 pointer-events-none bg-linear-to-b from-grey-900 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1/3 z-20 pointer-events-none bg-linear-to-t from-grey-900 to-transparent" />

                    <div
                      ref={headingsRef}
                      className="featured-work-headings grid gap-y-2 relative z-10 2xl:gap-y-3 4xl:gap-y-5"
                    >
                      {WORK_ITEMS.map((item) => (
                        <div
                          key={item.id}
                          className={`js-heading-fwork relative featured-work-item transition-all duration-200 ${activeId === item.id ? "is-active" : ""
                            }`}
                        >
                          <Link
                            to={item.href}
                            className="inline-flex items-start gap-x-3 group"
                            onMouseEnter={() => {
                              cancelLeftHoverClear();
                              setActiveId(item.id);
                              setLeftHoverId(item.id);
                            }}
                          >
                            <span className="inline-flex flex-wrap text-balance relative text-left justify-start text-white text-5xl/none lg:text-6xl/none xl:text-7xl/0.9 3xl:text-7.5xl/0.9 font-medium tracking-tight">
                              {item.title}
                            </span>
                            <span className="text-white/75 text-xs font-medium mt-2 shrink-0">
                              {item.year}
                            </span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={imagesRef}
                className="col-span-12 grid pt-7 pb-14 lg:col-span-6 lg:col-start-7"
                onPointerMove={(e) => {
                  const el = document.elementFromPoint(e.clientX, e.clientY);
                  if (el) {
                    const trigger = el.closest('.group');
                    if (trigger) {
                      const href = trigger.getAttribute('href');
                      if (href) {
                        const matchedItem = WORK_ITEMS.find(item => item.href === href);
                        if (matchedItem) {
                          cancelLeftHoverClear();
                          setActiveId(matchedItem.id);
                          setLeftHoverId(matchedItem.id);
                        }
                      }
                    } else {
                      setLeftHoverId(null);
                    }
                  }
                }}
                onMouseEnter={() => activate({ icon: "↗" })}
                onMouseLeave={() => {
                  deactivate();
                  setLeftHoverId(null);
                  wasHoveredRef.current = false;
                }}
              >
                <div className="mb-5 lg:hidden">
                  <h2 className="js-featured-work-heading inline-flex flex-wrap text-balance relative text-left justify-start text-white text-md/tight lg:text-lg/tight xl:text-xl/tight 4xl:text-2xl/none font-medium tracking-tight">
                    Featured Work
                  </h2>
                </div>

                <div className="hidden lg:grid gap-6">
                  {WORK_ITEMS.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className={`group relative rounded-2xl hover:cursor-none ${leftHoverId === item.id
                        ? "featured-work-card-sync-hover"
                        : ""
                        }`}
                    >
                      <div
                        className="relative overflow-hidden rounded-2xl"
                        style={{ paddingTop: "72%" }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="featured-work-card-media absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />
                        {item.category ? (
                          <div
                            className="pointer-events-none absolute right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 pointer-fine:group-hover:text-grey-900"
                          >
                            <FiSearch
                              className="size-4 shrink-0 transition-colors duration-200"
                              aria-hidden
                            />
                            <span>{item.category}</span>
                            <FiTrendingUp
                              className="size-4 shrink-0 transition-colors duration-200"
                              aria-hidden
                            />
                          </div>
                        ) : null}

                        <div
                          className="featured-work-hover-panel absolute inset-0 z-30 p-5 lg:p-6"
                          style={{
                            backgroundColor: item.colour,
                            color: "#111212",
                          }}
                        >
                          <p className="max-w-[24ch] text-3xl/none lg:text-5xl/none font-medium tracking-tight">
                            {item.result}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="grid gap-5 lg:hidden">
                  {WORK_ITEMS.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      className="group relative block overflow-hidden rounded-2xl"
                      onMouseEnter={() => {
                        setActiveId(item.id);
                        setLeftHoverId(item.id);
                      }}
                      onMouseLeave={() => {
                        setLeftHoverId(null);
                        wasHoveredRef.current = false;
                      }}
                    >
                      <div
                        className="relative w-full overflow-hidden aspect-[4/3]"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 pointer-fine:group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 z-10 h-32 w-full bg-linear-to-t from-black opacity-70" />
                        <div className="absolute inset-0 z-20 p-4 flex flex-col justify-between pointer-events-none">
                          <div className="flex justify-end">
                            {item.category ? (
                              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                                <FiSearch className="size-3.5" />
                                <span>{item.category}</span>
                                <FiTrendingUp className="size-3.5" />
                              </div>
                            ) : null}
                          </div>

                          <div className="flex flex-col gap-y-1">
                            <div className="text-[10px] font-medium text-white/80 uppercase tracking-wider">
                              {item.year}
                            </div>
                            <div className="text-3xl font-medium tracking-tighter text-white uppercase">
                              {item.title}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 flex justify-center ">
          <LinkButton text="Explore Our Work" to="/work" className="w-full lg:w-auto" />
        </div>
      </div>
    </section>
  );
}
