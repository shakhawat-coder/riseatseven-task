import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMAGES = [
  '/hero/hero1.jfif',
  '/hero/hero2.jfif',
  '/hero/hero3.jfif',
  '/hero/hero4.png',
]

const PLATFORMS = [
  { name: 'Google', src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Placeholder-logos/gogle.png?w=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847622&s=59fe266f52b52a2f5caded270cca5b0f' },
  { name: 'ChatGPT', src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Placeholder-logos/chat-gpt.png?w=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847621&s=4736cf2d6c608b09fccc2c64c443f9e5' },
  { name: 'Gemini', src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Social/White/gemini.png?w=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847619&s=463ddee81964da94d8f59fae9f7b1ded' },
  { name: 'TikTok', src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Placeholder-logos/tiktok.png?w=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847623&s=08b0dfde30f4100b663ca58de24c358c' },
  { name: 'YouTube', src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Placeholder-logos/youtube.png?w=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847623&s=2158714454d29911639dc9bb8c906e26' },
  { name: 'Pinterest', src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Social/White/pinterest.png?w=2000&q=100&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847620&s=84d9dfe2efd887886aa107c558d63139' },
  { name: 'Giphy', src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Social/White/giphy.png?w=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847619&s=78f10c1dacfadddf5ebd6d9a18a64091' },
  { name: 'Reddit', src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Social/White/reddit.png?w=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847620&s=80b6bca1e6630e7882d1a278c97351ff' },
  { name: 'Amazon', src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Social/White/amazon.png?w=2000&q=100&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847619&s=949d16b0f2c81d21db457ea97fc85885' },
]

const AWARDS = [
  { name: 'Global Search Awards', src: '/hero/hreoicon1.webp' },
  { name: 'The Drum', src: '/hero/hreoicon2.webp' },
  { name: 'UK Social Media Awards', src: '/hero/hreoicon3.webp' },
  { name: 'UK Content Awards', src: '/hero/hreoicon4.webp', hiddenMobile: true },
]

const TrophySVG = () => (
  <svg viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg"
    className="w-[20px] shrink-0 fill-white">
    <path d="M25.826 36.2423C24.1628 35.2302 22.3284 34.9354 20.4357 34.7259C19.6852 34.6204 18.9236 34.4691 18.193 34.2705C17.3545 34.0474 16.5347 33.7576 15.7419 33.4062L16.4438 31.9431C17.2169 30.332 16.5375 28.3991 14.9263 27.6261L14.0759 29.3985C13.5361 30.5234 13.7046 31.805 14.4037 32.7394C13.3196 32.1373 12.3026 31.4146 11.3802 30.5845L12.6328 29.1752C13.8199 27.8396 13.6998 25.7945 12.364 24.6072L11.0579 26.0765C10.0602 27.199 9.98609 28.8225 10.7806 30.0168C10.6575 29.8939 10.5358 29.7692 10.4166 29.6422C9.49052 28.6654 8.6932 27.5814 8.02681 26.4223L9.41226 25.5441C10.9217 24.5875 11.3698 22.5885 10.4131 21.0791L8.75281 22.1315C7.7684 22.7554 7.23555 23.8229 7.24942 24.9087C6.7712 23.8595 6.39118 22.7641 6.11088 21.6429L7.61991 21.1998C9.33444 20.6962 10.3162 18.8982 9.81266 17.1835L7.92644 17.7374C6.85358 18.0523 6.06774 18.8744 5.75319 19.8655C5.57825 18.727 5.50281 17.5732 5.52904 16.4239L7.2633 16.4128C9.05024 16.4013 10.4897 14.9435 10.4782 13.1565L8.5124 13.1691C7.23035 13.1773 6.12736 13.93 5.61055 15.0146C5.73 13.7312 5.98818 12.4645 6.37211 11.2376L8.06062 11.7101C9.78144 12.1916 11.5669 11.1871 12.0486 9.46623L10.1554 8.93641C8.90673 8.58696 7.62424 9.02009 6.83038 9.94142C7.30904 8.72939 7.91213 7.56635 8.62664 6.47593L10.1355 7.40528C11.6568 8.34265 13.6501 7.86898 14.5873 6.3476L12.9135 5.31658C11.788 4.62331 10.4045 4.70222 9.38126 5.40589C9.87033 4.76053 10.4008 4.14639 10.9692 3.56888C11.3054 3.84679 11.7648 3.98423 12.2801 3.86023C12.6898 3.7616 13.1 3.57083 13.4724 3.24067C15.26 1.65751 15.26 0.0708753 15.26 0.0708753C13.0683 -0.225683 11.698 0.452629 10.855 1.28334C10.1931 1.93542 10.3013 2.86694 10.8194 3.42667C10.0988 4.13143 9.44456 4.88605 8.85752 5.68142C9.29 4.30204 8.75303 2.75334 7.46577 1.96057L5.792 0.929551C4.85463 2.45093 5.3283 4.44425 6.84968 5.3814L8.39642 6.33437C7.60321 7.51085 6.94961 8.76602 6.43887 10.0721C6.32463 8.76906 5.42108 7.61187 4.087 7.23857L2.19384 6.70876C1.71237 8.42958 2.71694 10.215 4.43776 10.6965L5.94701 11.1194C5.49305 12.4223 5.20467 13.7871 5.08588 15.1818C4.58193 14.0569 3.48794 13.2531 2.20589 13.2449L0.240053 13.2323C0.228581 15.0193 1.66827 16.4771 3.45521 16.4886L5.18947 16.4997C5.21692 17.649 5.34426 18.8028 5.57328 19.9404C5.25873 18.9494 4.46119 18.152 3.38833 17.8371L1.50211 17.2832C0.998566 18.9979 1.98035 20.7959 3.69488 21.2995L5.20391 21.7426C5.48421 22.8638 5.86423 23.9592 6.34245 25.0084C6.13307 23.9236 5.40578 22.8998 4.41909 22.2773L2.75877 21.2249C1.80207 22.7343 2.25019 24.7333 3.75962 25.6899L5.14507 26.5681C5.81146 27.7272 6.60878 28.8112 7.53484 29.788C7.65402 29.915 7.77572 30.0397 7.89944 30.1622C7.09506 28.9502 7.16025 27.3147 8.14908 26.1939L9.45519 24.7245C10.7908 23.5374 12.8359 23.6573 14.0229 24.9929L14.8733 25.9458C16.4845 26.7188 17.1639 28.6517 16.3908 30.2628L15.6889 31.7259C16.4817 32.0773 17.3015 32.3671 18.14 32.5902C18.8706 32.7888 19.6322 32.9401 20.3827 33.0456C22.2754 33.2551 24.1098 33.55 25.7729 34.562C27.4361 35.5741 28.1379 37.2599 28.1379 37.2599C26.6361 36.2423 25.826 36.2423 25.826 36.2423Z" />
  </svg>
)

export default function Hero() {
  const sectionRef = useRef(null)
  const [currentIndex] = useState(() => Math.floor(Math.random() * HERO_IMAGES.length))

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 })

      const imageWrapper = document.querySelector('.js-image-wrapper')
      const image = document.querySelector('.js-image')
      if (imageWrapper) {
        tl.to(imageWrapper, { width: 'clamp(52px, 9vw, 90px)', opacity: 1, duration: 1, ease: 'expo.inOut' })
        if (image) {
          tl.fromTo(image,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
            '-=1'
          )
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full p-0">
      <div className="w-full p-0">
        <div className="w-full h-[100svh] relative p-[8px]">
          <div className="w-full h-full relative overflow-hidden rounded-[24px]">

            <div className="w-full h-full grid bg-[#111] rounded-[24px]">

              <div className="col-start-1 row-start-1 relative z-0 overflow-hidden blur-[8px] scale-[1.06]">
                <img
                  src={HERO_IMAGES[currentIndex]}
                  alt=""
                  className="w-full h-full object-cover absolute inset-0"
                  loading="eager"
                />
              </div>

              <div className=" col-start-1 row-start-1 z-10 relative flex flex-col justify-center bg-[rgba(10,8,6,0.30)]">

                <div className="flex flex-col items-center justify-center mb-[20px] px-[16px]">
                  <p className="text-[12px] font-medium uppercase tracking-[0.01em] text-white text-center mb-[10px] max-w-[200px] leading-[1.4]">
                    #1 Most recommended content marketing agency
                  </p>
                  <div className="flex items-center gap-[10px] flex-wrap justify-center">
                    <TrophySVG />
                    {AWARDS.map((award, i) => (
                      <div key={i} className={`w-[44px] aspect-[20/9] ${award.hiddenMobile ? 'hidden md:block' : 'block'}`}>
                        <img
                          src={award.src}
                          alt={award.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    ))}
                    <TrophySVG />
                  </div>
                </div>

                <h1 className="flex flex-col items-center justify-center text-center text-white font-medium tracking-[-0.03em] leading-[0.8] m-0 px-[12px] drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)] text-[60px] lg:text-[75px] xl:text-[120px]">
                  <div className="flex flex-wrap justify-center gap-x-[0.22em] gap-y-0 pb-[0.12em]">
                    <span>We</span>
                    <span>Create</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-[0.18em] gap-y-0 pb-[0.12em]">
                    <span>Category</span>

                    <span
                      className="js-image-wrapper inline-flex shrink-0 relative overflow-hidden rounded-[10px] bg-[rgba(0,0,0,0.2)] h-[clamp(52px,9vw,90px)] w-0 opacity-0 aspect-square align-middle"
                    >
                      <span className="js-image block w-full h-full">
                        <img
                          src={HERO_IMAGES[currentIndex]}
                          alt=""
                          className="w-full h-full object-cover absolute inset-0"
                        />
                      </span>
                    </span>

                    <span>Leaders</span>
                  </div>
                </h1>

                <p className="text-white font-medium tracking-[-0.02em] text-center mt-[clamp(16px,3vw,32px)] mb-0 px-[16px] text-[clamp(16px,3.5vw,30px)] leading-[1.2]">
                  on every searchable platform
                </p>

                <div className="absolute bottom-[20px] inset-x-0 mt-[clamp(32px,6vw,48px)] text-center md:hidden">
                  <p className="text-[clamp(13px,1.1vw,16px)] text-white m-0 leading-[1.5]">
                    <strong className="font-medium">4 Global Offices serving</strong><br />
                    <strong className="font-medium">UK, USA (New York) &amp; EU</strong>
                  </p>
                </div>

                <div className="w-full overflow-hidden mt-[clamp(28px,4vw,48px)] hidden min-[1400px]:flex justify-center relative z-0">
                  <div className="js-platforms-container flex gap-[56px]">
                    {PLATFORMS.map((platform, i) => (
                      <div key={i} className="w-[56px] aspect-[20/9] relative shrink-0">
                        <img
                          src={platform.src} alt={platform.name}
                          className="w-full h-full object-contain object-center absolute inset-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 z-20 hidden md:flex justify-between items-end px-[36px] pb-[36px]">
            <p className="text-[clamp(13px,1.1vw,16px)] text-white m-0 leading-[1.5] shrink-0">
              Organic media planners creating, distributing &amp;<br />
              <strong className="font-medium">search-first</strong> content for SEO, Social, PR, Ai and LLM search
            </p>
            <p className="text-[clamp(13px,1.1vw,16px)] text-white m-0 leading-[1.5] text-right shrink-0">
              <strong className="font-medium">4 Global Offices serving</strong><br />
              <strong className="font-medium">UK, USA (New York) &amp; EU</strong>
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @supports not (height: 100svh) {
          section > div > div:first-child {
            height: 100vh !important;
          }
        }
      `}</style>
    </section>
  )
}