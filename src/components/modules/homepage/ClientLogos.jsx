import React, { useRef, useEffect } from 'react'
import Swiper from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const CLIENTS = [
  { name: 'Client 1', image: '/clientlogo/client1.webp' },
  { name: 'Client 2', image: '/clientlogo/client2.webp' },
  { name: 'Client 3', image: '/clientlogo/client3.webp' },
  { name: 'Client 4', image: '/clientlogo/client4.webp' },
  { name: 'Client 1', image: '/clientlogo/client1.webp' },
  { name: 'Client 2', image: '/clientlogo/client2.webp' },
  { name: 'Client 3', image: '/clientlogo/client3.webp' },
  { name: 'Client 4', image: '/clientlogo/client4.webp' },
  { name: 'Client 1', image: '/clientlogo/client1.webp' },
  { name: 'Client 2', image: '/clientlogo/client2.webp' },
  { name: 'Client 3', image: '/clientlogo/client3.webp' },
  { name: 'Client 4', image: '/clientlogo/client4.webp' },
]

export default function ClientLogos() {
  const swiperRef = useRef(null)

  useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      modules: [Autoplay],
      slidesPerView: 3,
      speed: 6000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      loop: true,
      allowTouchMove: true,
      grabCursor: true,
      freeMode: {
        enabled: true,
        momentum: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 80
        },
        1024: {
          slidesPerView: 'auto',
          spaceBetween: 100
        },
      },
    })

    return () => swiper.destroy()
  }, [])

  return ( 
    <section className="w-full mt-2 lg:mt-12 md:h-[83px] overflow-hidden flex items-center">
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}} />
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16 w-full md:h-full">
        <div className="pl-4 md:pl-12 shrink-0 pt-4 md:pt-0">
          <h2 className="text-grey-900 text-sm font-medium tracking-tight leading-tight">
            The agency <br className='hidden lg:block' /> behind ...
          </h2>
        </div>

        <div className="relative flex-1 w-full h-[60px] md:h-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#efeeec] via-[#efeeec]/90 to-transparent z-10 backdrop-blur-[4px]" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#efeeec] via-[#efeeec]/90 to-transparent z-10 backdrop-blur-[4px]" />

          <div className="swiper !h-full !w-full !ease-linear" ref={swiperRef}>
            <div className="swiper-wrapper !h-full !flex !items-center !ease-linear">
              {CLIENTS.map((client, i) => (
                <div key={i} className="swiper-slide min-[768px]:!w-auto !h-full !flex !items-center !justify-center">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
