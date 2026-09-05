"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SliderType = {
  spaceBetween: number;
  slidesPerView: number;
  pageList: string[];
};

export default function Slider({
  spaceBetween,
  slidesPerView,
  pageList,
}: SliderType) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      loop={true}
      navigation
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} bg-green-400! w-8! h-6! flex items-center justify-center text-base!">${index + 1}</span>`;
        },
        }}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
    >
      {pageList.map((src, index) => (
        <SwiperSlide key={index}>
          <Image
            src={src}
            className="h-80 w-full object-cover"
            alt={`Slide ${index + 1}`}
            width={400}
            height={300}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
