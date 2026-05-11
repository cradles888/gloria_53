"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Maximize2 } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Zoom } from "swiper/modules";

import './Apartments.module.css'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

const ApartmentHeroGallery = ({ images = [], apartmentTitle = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const galleryImages = images.filter((image) => image?.src);

    if (!galleryImages.length) return null;

    const openGallery = (index) => {
        setStartIndex(index);
        setIsOpen(true);
    };

    const activeImage = galleryImages[activeIndex] || galleryImages[0];

    return (
        <>
            <div className="relative grid min-h-[420px] min-w-0 overflow-hidden rounded-4xl bg-white p-4 sm:p-8 lg:min-h-full">
                <div className="absolute inset-x-8 top-1/2 h-32 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />

                <div className="apartment-hero-gallery relative z-10 grid min-h-[360px] min-w-0 grid-rows-[auto_1fr] overflow-hidden">
                    <div className="relative z-20 mb-3 flex items-center justify-between gap-3">
                        <div className="min-w-0 rounded-full bg-dark/80 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm">
                            <p className="truncate">
                                {activeImage.caption}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => openGallery(activeIndex)}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dark/80 text-white shadow-lg backdrop-blur-sm transition hover:bg-accent"
                            aria-label={`Открыть изображение: ${activeImage.caption}`}
                        >
                            <Maximize2 className="h-4.5 w-4.5" />
                        </button>
                    </div>

                    <div className="min-h-0 min-w-0 overflow-hidden">
                        <Swiper
                            modules={[Navigation, Pagination, Keyboard]}
                            navigation
                            pagination={{ clickable: true }}
                            keyboard={{ enabled: true }}
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            className="h-full w-full"
                            style={{
                                "--swiper-navigation-color": "#E85D1F",
                                "--swiper-pagination-color": "#E85D1F",
                                "--swiper-navigation-size": "30px",
                                "--swiper-navigation-sides-offset": "-5px",
                            }}
                        >
                            {galleryImages.map((image, index) => (
                                <SwiperSlide key={image.src} className="!grid !place-items-center">
                                    <button
                                        type="button"
                                        onClick={() => openGallery(index)}
                                        className="grid h-full w-full place-items-center"
                                        aria-label={`Открыть изображение: ${image.caption}`}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.alt || image.caption || apartmentTitle}
                                            loading={index === 0 ? "eager" : "lazy"}
                                            decoding="async"
                                            className="max-h-[500px] w-full max-w-[560px] object-contain px-7 pb-12 pt-4 mix-blend-multiply sm:px-14"
                                        />
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-[100]"
            >
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

                <div className="fixed inset-0 grid place-items-center p-3 sm:p-5">
                    <DialogPanel className="relative grid h-full max-h-[92vh] w-full max-w-7xl overflow-hidden rounded-4xl bg-white shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-dark shadow-lg backdrop-blur-sm transition hover:bg-accent hover:text-white"
                            aria-label="Закрыть просмотр"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <DialogTitle className="sr-only">
                            Просмотр изображений квартиры
                        </DialogTitle>

                        <Swiper
                            modules={[Navigation, Pagination, Keyboard, Zoom]}
                            navigation
                            pagination={{ clickable: true }}
                            keyboard={{ enabled: true }}
                            zoom
                            initialSlide={startIndex}
                            className="h-full w-full"
                            style={{
                                "--swiper-navigation-color": "#E85D1F",
                                "--swiper-pagination-color": "#E85D1F",
                                "--swiper-navigation-size": "32px",
                                "--swiper-navigation-sides-offset": "14px",
                            }}
                        >
                            {galleryImages.map((image) => (
                                <SwiperSlide key={image.src}>
                                    <div className="grid h-full grid-rows-[1fr_auto] bg-white">
                                        <div className="swiper-zoom-container min-h-0 p-4 sm:p-8">
                                            <img
                                                src={image.src}
                                                alt={image.alt || image.caption || apartmentTitle}
                                                className="max-h-full max-w-full object-cover mix-blend-multiply"
                                            />
                                        </div>

                                        <div className="border-t border-dark/10 bg-white px-5 py-4 text-center">
                                            <p className="text-sm font-medium text-dark sm:text-base">
                                                {image.caption}
                                            </p>

                                            <p className="mt-1 mb-3 text-xs text-dark50 sm:text-sm">
                                                Для приближения используйте двойной клик, колесо мыши или жест на телефоне
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default ApartmentHeroGallery;