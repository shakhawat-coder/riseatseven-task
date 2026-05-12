import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { FiClock } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";
import { useCursor } from "./Cursor";
import { Link } from "react-router-dom";

const BlogCard = ({ data, link = "/blog" }) => {
  const { activate, deactivate, getMousePos } = useCursor();
  const cardRef = useRef(null);
  const wasHovered = useRef(false);
  useEffect(() => {
    const handleScroll = () => {
      if (getMousePos) {
        const pos = getMousePos();
        if (pos && (pos.x !== 0 || pos.y !== 0)) {
          const el = document.elementFromPoint(pos.x, pos.y);
          const isHovered = el && cardRef.current && cardRef.current.contains(el);

          if (isHovered) {
            activate({ icon: "↗", hideOnMove: true });
            wasHovered.current = true;
          } else if (wasHovered.current) {
            deactivate();
            wasHovered.current = false;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activate, deactivate, getMousePos]);

  return (
    <Link
      to={`${link}/${data.id}`}
      ref={cardRef}
      onMouseEnter={() => activate({ icon: "↗" })}
      onMouseLeave={deactivate}
      className="group w-full flex flex-col items-start gap-y-5 transition-transform duration-300 circle-mask-container relative hover:cursor-none"
    >
      <div className="w-full grid">
        {data.category && (
          <div className="col-start-1 row-start-1 z-20 p-3">
            <div className="flex flex-wrap gap-1">
              <span className="inline-flex items-center font-medium tracking-tight leading-none rounded-full text-sm gap-x-2 px-3 py-1 min-h-7 xl:min-h-8 xl:py-1.5 xl:text-base text-white bg-white/20 backdrop-blur-sm">
                {data.category}
              </span>
            </div>
          </div>
        )}

        <div className="col-start-1 row-start-1 z-10 relative rounded-2xl overflow-hidden aspect-square lg:rounded-3xl">
          <div className="w-full h-full transition blur-md duration-1000 scale-120 circle-mask">
            <img
              src={data.image}
              alt={data.title}
              className="h-full w-full object-cover absolute top-0 left-0 transition-opacity"
              style={{ opacity: 0 }}
              loading="lazy"
              onLoad={(e) => (e.target.style.opacity = "1")}
            />
          </div>
        </div>

        <div className="col-start-1 row-start-1 aspect-square relative rounded-2xl overflow-hidden lg:rounded-3xl">
          <img
            src={data.image}
            alt={data.title}
            className="h-full w-full object-cover absolute top-0 left-0 transition-opacity"
            style={{ opacity: 0 }}
            loading="lazy"
            onLoad={(e) => (e.target.style.opacity = "1")}
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-y-3">
        <div className="flex items-start gap-1 mt-1">
          <div className="inline-flex items-center font-medium tracking-tight leading-none rounded-full text-sm gap-x-2 px-3 py-1 min-h-7 xl:min-h-8 xl:py-1.5 xl:text-base text-gray-400 bg-white border border-gray-100">
            <div className="inline-flex items-center justify-center -ml-1.5">
              <div className="rounded-full overflow-hidden -mr-1 w-5 h-5">
                <img
                  src={data.authorImage}
                  alt={data.author}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span>{data.author}</span>
          </div>

          <div className="inline-flex items-center font-medium tracking-tight leading-none rounded-full text-sm gap-x-2 px-3 py-1 min-h-7 xl:min-h-8 xl:py-1.5 xl:text-base text-gray-400 bg-white border border-gray-100">
            <FiClock className="text-xs" />
            <span>{data.readTime}</span>
          </div>
        </div>

        <h2 className="inline-flex flex-wrap text-balance relative text-left justify-start text-gray-900 text-xl md:text-2xl xl:text-[30px] font-medium tracking-tighter">
          {data.title}
        </h2>
      </div>


    </Link>
  );
};

export default BlogCard;
