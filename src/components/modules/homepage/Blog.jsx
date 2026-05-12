import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import LinkButton from "../../common/LinkButton";
import BlogCard from "../../common/BlogCard";
import { blogData } from "../../../data";

import CommonHeader from "../../common/CommonHeader";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      modules: [Pagination],
      slidesPerView: 1.15,
      spaceBetween: 15,
      loop: true,
      slidesOffsetBefore: 0,
      speed: 700,
      pagination: {
        el: ".swiper-pagination-blog",
        type: "progressbar",
      },
      breakpoints: {
        768: {
          slidesPerView: 2.15,
          spaceBetween: 20,
          slidesOffsetBefore: 0,
        },
        1024: {
          loop: false,
          slidesPerView: 3,
          spaceBetween: 15,
          slidesOffsetBefore: 0,
        },
        1280: {
          loop: false,
          slidesPerView: 3,
          spaceBetween: 15,
          slidesOffsetBefore: 0,
        },
      },
    });

    return () => swiper.destroy();
  }, []);

  return (
    <section className="w-full py-12 xl:py-24 overflow-hidden">
      <div className="w-full px-0">
        <CommonHeader 
          titlePart1="What's"
          titlePart2="New"
          imageSrc="/blog-header.png"
          buttonText="Explore More Thoughts"
          buttonTo="/blog"
        />

        <div className="px-4 md:px-7 pt-8 md:pt-10 lg:pt-12">
          <div ref={swiperRef} className="swiper">
            <div className="swiper-wrapper">
              {blogData.map((post) => (
                <div key={post.id} className="swiper-slide py-2">
                  <BlogCard data={post} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full relative py-3 mt-5">
            <div className="w-full relative">
              <div className="swiper-pagination swiper-pagination-blog"></div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center px-4 md:hidden">
          <LinkButton text="Explore More Thoughts" to="/blog" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Blog;
