'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/free-mode';

const FreemodeSliderChildren = ({ 
  children, 
  spaceBetween = 12, 
  slidesPerView = 'auto',
  className = "",
  slideClassName = "max-w-min",
  ...props 
}) => {
  return (
    <Swiper
      modules={[FreeMode]}
      freeMode={{
        enabled: true,
        momentum: true,
        momentumVelocityRatio: 0.5,
        momentumBounce: true,
        sticky: false,
      }}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      grabCursor={true}
      className={className}
      {...props}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <SwiperSlide key={index} className={slideClassName}>
            {child}
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide className={slideClassName}>
          {children}
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default FreemodeSliderChildren;