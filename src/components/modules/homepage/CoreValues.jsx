import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    title: "Pioneers",
    description: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    description2: "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    bg: "bg-black",
    textColor: "text-white",
    image: "/core/core2.webp",
    rotation: 8,
    zIndex: 2,
  },
  {
    title: "Award\nWinning",
    description: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    description2: null,
    bg: "bg-mint",
    textColor: "text-grey-900",
    image: "/core/core3.webp",
    rotation: 12,
    zIndex: 1,
  },
  {
    title: "Speed",
    description: "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
    description2: null,
    bg: "bg-white",
    textColor: "text-grey-900",
    image: "/core/core1.webp",
    rotation: 16,
    zIndex: 0,
  }
];

const CoreValues = () => {
  const itemsRef = useRef([]);
  const swiperRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    const desktopSection = document.querySelector('.js-trigger-43');
    if (!desktopSection) return;

    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean);

      gsap.to(items, {
        yPercent: -100,
        rotation: -50,
        stagger: 1,
        ease: 'power2.inOut',
        duration: 3,
        scrollTrigger: {
          trigger: desktopSection,
          start: 'top 30%',
          end: 'bottom -50%',
          scrub: true,
        }
      });

      ScrollTrigger.create({
        trigger: desktopSection,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => document.body.classList.add('core-values-in-view'),
        onEnterBack: () => document.body.classList.add('core-values-in-view'),
        onLeave: () => document.body.classList.remove('core-values-in-view'),
        onLeaveBack: () => document.body.classList.remove('core-values-in-view'),
      });
    }, desktopSection);

    return () => {
      document.body.classList.remove('core-values-in-view');
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    let mql
    const shouldInit = () => window.matchMedia('(max-width: 1023px)').matches

    const initSwiper = () => {
      if (!swiperRef.current || swiperInstanceRef.current) return

      swiperInstanceRef.current = new Swiper(swiperRef.current, {
        modules: [Pagination],
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        slidesOffsetBefore: 15,
        speed: 700,
        pagination: {
          el: '.js-pagination-43',
          type: 'progressbar',
        },
        breakpoints: {
          640: {
            slidesPerView: 1.60,
            spaceBetween: 20,
          },
          1024: {
            loop: false,
            slidesPerView: 3,
            spaceBetween: 20,
          }
        },
        on: {
          init: function () {
            updateCustomProgress(this);
          },
          slideChange: function () {
            updateCustomProgress(this);
          },
          progress: function () {
            updateCustomProgress(this);
          }
        }
      })
    }

    const updateCustomProgress = (swiper) => {
      const progressBar = document.querySelector('.js-pagination-43 .swiper-pagination-progressbar-fill');
      if (progressBar) {
        const logicalIndex = swiper.realIndex % 3;
        const progress = ((logicalIndex + 1) / 3) * 100;
        progressBar.style.transform = `translate3d(0px, 0px, 0px) scaleX(${progress / 100}) scaleY(1)`;
        progressBar.style.transitionDuration = swiper.params.speed + 'ms';
      }
    }

    const destroySwiper = () => {
      if (swiperInstanceRef.current) {
        try { swiperInstanceRef.current.destroy(true, true) } catch (e) { }
        swiperInstanceRef.current = null
      }
    }

    const handleChange = () => {
      if (shouldInit()) initSwiper()
      else destroySwiper()
    }

    handleChange()

    try {
      mql = window.matchMedia('(max-width: 1023px)')
      mql.addEventListener ? mql.addEventListener('change', handleChange) : mql.addListener(handleChange)
    } catch (e) {
      window.addEventListener('resize', handleChange)
    }

    return () => {
      destroySwiper()
      try {
        if (mql) mql.removeEventListener ? mql.removeEventListener('change', handleChange) : mql.removeListener(handleChange)
        else window.removeEventListener('resize', handleChange)
      } catch (e) { }
    }
  }, []);

  const renderCardContent = (val) => (
    <div className={`w-full h-full flex-1 flex flex-col text-center rounded-2xl p-7 lg:items-center lg:rounded-3xl lg:h-[550px] lg:w-[550px] xl:py-10 xl:px-14 ${val.bg} ${val.textColor}`}>
      <div className="flex flex-col text-center lg:items-center gap-y-3 md:gap-y-5 flex-1">
        {val.image && (
          <div className="rounded-xl overflow-hidden w-full aspect-4/3 relative lg:aspect-1/1 lg:rounded-2xl lg:w-48 4xl:w-56 mx-auto">
            <img
              src={val.image}
              alt={val.title}
              className="w-full h-full object-cover block"
              loading="lazy"
            />
          </div>
        )}

        <h2 className={`inline-flex flex-wrap text-balance relative text-center justify-center ${val.textColor} text-3xl/none lg:text-5xl/none xl:text-6xl/none 3xl:text-7xl/0.9 font-sans-primary font-medium tracking-tight`}>
          {val.title}
        </h2>

        <div className="w-full flex flex-col justify-start">
          <p className={`text-sm font-sans-primary leading-normal text-pretty lg:text-base ${val.textColor}`}>
            {val.description}
          </p>
          {val.description2 && (
            <p className={`text-sm font-sans-primary leading-normal text-pretty mb-0! lg:text-base ${val.textColor}`}>
              {val.description2}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="w-full py-12 xl:py-24 lg:hidden ">
        <div className="w-full px-0 ">
          <div className="flex justify-center mb-3 px-4 md:px-7">
            <h2 className="inline-flex flex-wrap text-balance relative text-left justify-start text-grey-900 text-md/tight lg:text-lg/tight xl:text-xl/tight 4xl:text-2xl/none font-sans-primary font-medium tracking-tight js-heading">
              Legacy In The Making
            </h2>
          </div>

          <div className="px-4 md:px-7 js-trigger-43-mobile">
            <div ref={swiperRef} className="swiper overflow-x-hidden">
              <div className="swiper-wrapper !items-stretch">
                {[...VALUES, ...VALUES].map((val, i) => (
                  <div key={i} className="swiper-slide !h-auto flex items-stretch">
                    <div className="flex-1 flex flex-col items-stretch">
                      {renderCardContent(val)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full relative py-3 mt-5">
              <div className="w-full relative">
                <div className="swiper-pagination js-pagination-43 !relative !bottom-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full relative hidden lg:flex js-trigger-43" style={{ height: '300vh', overflowX: 'clip' }}>
        <div className="w-full h-screen-fix h-svh sticky top-0 left-0 ">
          <div className="absolute top-0 left-0 w-full flex justify-center mt-10 3xl:mt-16">
            <h2 className="inline-flex flex-wrap text-balance relative text-left justify-start text-grey-900 text-md/tight lg:text-lg/tight xl:text-xl/tight 4xl:text-2xl/none font-sans-primary font-medium tracking-tight js-heading">
              Legacy In The Making
            </h2>
          </div>

          {VALUES.map((val, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="js-item-43 w-full h-full absolute left-0 flex items-center justify-center top-8 "
              style={{
                zIndex: val.zIndex,
                willChange: 'transform'
              }}
            >
              <div
                className="w-fit"
                style={{ transform: `rotate(${val.rotation}deg)` }}
              >
                {renderCardContent(val)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CoreValues;
