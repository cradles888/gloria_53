"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  Zoom,
} from "swiper/modules";

// Стили Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useState } from "react";

const ImageSlider = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // const openModal = (imageSrc, imageAlt) => {
  //   setSelectedImage({ src: imageSrc, alt: imageAlt });
  //   setIsModalOpen(true);
  //   document.body.style.overflow = "hidden";
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedImage(null);
  //   document.body.style.overflow = "auto";
  // };

  return (
    <div className="relative w-full bg-[#4b362a] backdrop-blur-3xl h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Zoom]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-prev",
          prevEl: ".custom-next",
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        zoom={{
          maxRatio: 3,
          minRatio: 1,
          toggle: true,
        }}
        grabCursor={true}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        className="w-full h-full"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container w-full h-full cursor-pointer">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-contain"
                // onClick={() => openModal(item.src, item.alt)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 border border-white/20 group">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="group-hover:scale-110 transition-transform"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 border border-white/20 group">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="group-hover:scale-110 transition-transform"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
{/* 
      Модалка на зум
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="relative w-full h-screen mx-auto content-center justify-items-center">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
            />

            {/* Кнопка закрытия */}
            {/* <button
              onClick={closeModal}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200"
              aria-label="Закрыть"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            Информация об изображении
            <div className="absolute -bottom-12 left-0 right-0 text-center text-white text-sm">
              {selectedImage.alt}
            </div>
          </div>
        </div> */}
      {/*)}*/}
    </div>
  );
};
export default ImageSlider;
