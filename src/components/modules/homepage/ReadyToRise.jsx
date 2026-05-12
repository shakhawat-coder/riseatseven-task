import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReadyToRise({ text = "Ready to Rise at Seven?" }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const innerRef = useRef(null);
  const lettersRef = useRef([]);
  const [layoutReady, setLayoutReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (mounted) setLayoutReady(true);
      });
    } else {
      setLayoutReady(true);
    }

    return () => {
      mounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!layoutReady) return;

    const ctx = gsap.context(() => {
      const textEl = textRef.current;
      const letters = lettersRef.current.filter(Boolean);

      if (!textEl || !letters.length) return;

      gsap.set(textEl, {
        x: () => window.innerWidth + 48,
        force3D: true,
      });

      gsap.set(letters, {
        yPercent: 0,
        rotation: 0,
        transformOrigin: "50% 100%",
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 0.15,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        textEl,
        {
          x: () => -(textEl.scrollWidth + 48),
          ease: "none",
          duration: 1,
        },
        0,
      );

      tl.to(
        innerRef.current,
        {
          paddingBottom: "15vh",
          ease: "none",
          duration: 1,
        },
        0,
      );

      letters.forEach((el) => {
        const startX = window.innerWidth + 48;
        const endX = -(textEl.scrollWidth + 48);
        const travel = startX - endX;
        const letterCenter = el.offsetLeft + el.offsetWidth / 2;
        const viewportHitPoint = window.innerWidth * 0.88;
        const p = gsap.utils.clamp(
          0.05,
          0.95,
          (startX - (viewportHitPoint - letterCenter)) / travel,
        );
        const arcDur = 0.08;

        tl.to(
          el,
          {
            yPercent: -20,
            rotation: 15,
            ease: "power1.in",
            duration: arcDur,
          },
          p - arcDur,
        );
 
        tl.to(
          el,
          {
            yPercent: -25,
            rotation: 15,
            ease: "power1.in",
            duration: arcDur,
          },
          p - arcDur,
        );
        tl.to(
          el,
          {
            yPercent: -22,
            rotation: 15,
            ease: "power1.in",
            duration: arcDur,
          },
          p - arcDur,
        );

        tl.to(
          el,
          {
            yPercent: 95,
            rotation: 2,
            ease: "power1.out",
            duration: arcDur,
          },
          p,
        );
        tl.to(
          el,
          {
            yPercent: 80,
            rotation: 0,
            ease: "power1.out",
            duration: arcDur,
          },
          p + arcDur,
        );

      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [text, layoutReady]);

  const chars = [...text];
  let letterIndex = 0;

  return (
    <section
      ref={sectionRef}
      style={{ height: "90svh" }} 
      className="hidden lg:block relative w-full overflow-hidden bg-grey-100"
    >
      <div
        ref={innerRef}
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: "35vh",   
        }}
      >
        <div
          ref={textRef}
          style={{
            display: "flex",
            alignItems: "baseline",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {chars.map((char, i) => {
            const isSpace = char === " ";
            const idx = letterIndex;

            if (!isSpace) letterIndex += 1;

            return isSpace ? (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: "0.15em", 
                  fontSize: "clamp(116px, 15.6vw, 252px)",
                  flexShrink: 0,
                }}
              >
                {"\u00A0"}
              </span>
            ) : (
              <span
                key={i}
                ref={(el) => (lettersRef.current[idx] = el)}
                style={{
                  display: "inline-block",
                  fontSize: "204px",
                  fontWeight: 500,
                  lineHeight: 1,
                  letterSpacing: "-0.035em",
                  color: "#0a0a0a",
                  willChange: "transform",
                  flexShrink: 0,
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
