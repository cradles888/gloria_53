"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import FeaturedPromoBlock from "./FeaturedPromoBlock";

import "swiper/css";

const PromoSlider = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <section className="overflow-hidden rounded-3xl">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        loop={items.length > 1}
        autoHeight={false}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            className=""
          >
            <FeaturedPromoBlock item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PromoSlider;
