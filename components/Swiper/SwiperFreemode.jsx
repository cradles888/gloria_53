"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    FreeMode
} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import { useState } from "react";
import Card from "@/components/Unnatov/UI/Card";
import CardNews from "@/components/News/Card";

const freemodeSlider = ({ data, type = "default", horizontalCard = false, slidesPerView = 0 }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [swiperInstance, setSwiperInstance] = useState(null);

    const slideComponents = {
        default: Card,
        news: CardNews
    }

    const defaultBreakpoints = {
        0: { slidesPerView: 1.2, spaceBetween: 20 },
        640: { slidesPerView: 1.3, spaceBetween: 20 },
        768: { slidesPerView: 1.5, spaceBetween: 24 },
        1024: { slidesPerView: 2, spaceBetween: 30 },
        1280: { slidesPerView: 3, spaceBetween: 30 },
    };

    const CardComponent = slideComponents[type]

    return (
        <div className="relative">
            <div className="gap-4 justify-end hidden md:flex">
                <button
                    onClick={() => swiperInstance?.slidePrev()}
                    className={`
                    left-4 top-1/2 -translate-y-1/2
                    z-20 w-11 h-11 rounded-full
                    flex items-center justify-center
                    transition-all duration-200 shadow-sm
                    ${isBeginning
                            ? "bg-dark25 cursor-not-allowed opacity-50"
                            : "bg-dark/10 backdrop-blur-3xl hover:bg-dark/10 hover:shadow-md active:scale-95 cursor-pointer"
                        }
                `}
                    disabled={isBeginning}
                    aria-label="Предыдущий"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={isBeginning ? "opacity-40" : ""}
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

                <button
                    onClick={() => swiperInstance?.slideNext()}
                    className={`
                    right-4 top-1/2 -translate-y-1/2
                    z-20 w-11 h-11 rounded-full
                    flex items-center justify-center
                    transition-all duration-200 shadow-sm
                    ${isEnd
                            ? "bg-dark25 cursor-not-allowed opacity-50"
                            : "bg-dark/10 backdrop-blur-3xl hover:bg-dark/10 hover:shadow-md active:scale-95 cursor-pointer"
                        }
                `}
                    disabled={isEnd}
                    aria-label="Следующий"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={isEnd ? "opacity-40" : ""}
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
            </div>
            <Swiper
                modules={[FreeMode, Navigation]}
                slidesPerView={slidesPerView || undefined}
                spaceBetween={30}
                freeMode={true}
                onSwiper={(swiper) => {
                    setSwiperInstance(swiper);
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                
                breakpoints={slidesPerView ? undefined : defaultBreakpoints}
            
                className="mySwiper rounded-xl"
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        {type === 'default' ? (<CardComponent {...item} horizontalCard={horizontalCard} />) : (<CardComponent {...item} /> )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default freemodeSlider;