import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LinkButton from '../../common/LinkButton'

gsap.registerPlugin(ScrollTrigger)

export default function GlobalTeam() {


  return (
    <section className="w-full pt-12 pb-6 xl:py-24"> 
      <div className="w-full px-4 md:px-7">
        <div className="w-full flex justify-between items-start flex-col-reverse md:flex-row gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-5">
          
          <div className="flex flex-col gap-2 sm:gap-4 w-full md:hidden">
            <LinkButton to="/about/" text="Our Story" />
            <LinkButton to="/services/" text="Our Services" className="bg-transparent" />
          </div>

          <div className="w-full mb-1 md:mt-2 md:mb-0 max-w-sm xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl 4xl:max-w-5xl">
            <div className="inline-flex flex-wrap text-balance relative text-left justify-start text-grey-900 text-lg/tight lg:text-lg/tight xl:text-2xl/none 4xl:text-3xl/none font-medium tracking-tight">
              A global team of search-first content marketers engineering semantic relevance & category signals for both the internet and people
            </div>
          </div>

          <div className="w-full grid max-w-[24rem] md:max-w-[40rem] xl:max-w-xl 2xl:max-w-[42rem] 3xl:max-w-[52rem] 4xl:max-w-5xl gap-y-3 md:gap-y-7">
            <h2 className="inline-flex flex-wrap text-balance relative flex flex-col text-left justify-start text-grey-900 text-5xl/none lg:text-6xl/none xl:text-7xl/0.9 3xl:text-7.5xl/0.9 4xl:text-8xl/0.9 font-medium tracking-tight">
              <div className="flex flex-wrap relative text-left justify-start">
                <span className="inline mr-2 pointer-fine:mr-0 js-word">Driving</span>
                <span className="inline mr-2 pointer-fine:mr-0 js-word">Demand</span>
                <span className="inline mr-2 pointer-fine:mr-0 js-word">&</span>
                <span className="inline mr-2 pointer-fine:mr-0 js-word">Discovery</span>
                <div className="inline shrink-0 flex bg-black/10 relative overflow-hidden bg-black/5 mr-2 pointer-fine:mr-0 js-image-wrapper">
                  <div className="w-[50px] h-[50px] rounded-lg overflow-hidden relative">
                    <img 
                      src="/featureheading.webp" 
                      alt="featureheading"
                      className="w-full h-full object-cover object-center "
                    />
                  </div>
                </div>
              </div>
            </h2>

            <div className="md:flex flex-wrap gap-4 hidden"> 
              <LinkButton to="/about/" text="Our Story" />
              <LinkButton to="/services/" text="Our Services" className="bg-transparent" />  
            </div>
          </div>
        </div> 
      </div>
    </section> 
  )
}
