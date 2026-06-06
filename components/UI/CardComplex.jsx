"use client";

import { useEffect, useState } from "react";
import Button from "@/components/UI/Button";

const APARTMENT_TYPES = [
  {
    rooms: "1-комнатные",
    area: "от 30.7 м²",
    price: "от 5.4 млн",
  },
  {
    rooms: "2-комнатные",
    area: "от 50 м²",
    price: "от 6.3 млн",
  },
  {
    rooms: "3-комнатные",
    area: "от 75.4 м²",
    price: "от 10.3 млн",
  },
];

const NEARBY_PLACES = [
  {
    title: "Здоровье",
    items: ["Поликлиника", "Станция скорой помощи"],
  },
  {
    title: "Учёба",
    items: ["Пед.институт", "Школа, детский сад"],
  },
  {
    title: "Культура",
    items: ["Дворец культуры", 'Кинотеатр "Россия"'],
  },
  {
    title: "Спорт",
    items: ['Дворец спорта "Химик"'],
  },
];

const ApartmentTypesDesktop = () => {
  return (
    <div className="flex flex-wrap gap-8 xl:gap-16">
      <div className="grid gap-4 text-start">
        {APARTMENT_TYPES.map((apartment) => (
          <p key={apartment.rooms} className="text-white lg:text-base xl:text-xl">
            {apartment.rooms}
          </p>
        ))}
      </div>

      <div className="grid gap-4 text-start">
        {APARTMENT_TYPES.map((apartment) => (
          <p key={apartment.area} className="text-white lg:text-base xl:text-xl">
            {apartment.area}
          </p>
        ))}
      </div>

      <div className="grid gap-4 text-start">
        {APARTMENT_TYPES.map((apartment) => (
          <p key={apartment.price} className="text-white lg:text-base xl:text-xl">
            {apartment.price}
          </p>
        ))}
      </div>
    </div>
  );
};

const ApartmentTypesMobile = () => {
  return (
    <div className="flex flex-wrap gap-8 sm:gap-12">
      <div className="grid gap-3 text-start sm:gap-4">
        {APARTMENT_TYPES.map((apartment) => (
          <p key={apartment.rooms} className="text-sm text-dark sm:text-base xl:text-xl">
            {apartment.rooms}
          </p>
        ))}
      </div>

      <div className="grid gap-3 text-start sm:gap-4">
        {APARTMENT_TYPES.map((apartment) => (
          <p key={apartment.area} className="text-sm text-dark sm:text-base xl:text-xl">
            {apartment.area}
          </p>
        ))}
      </div>

      <div className="grid gap-3 text-start sm:gap-4">
        {APARTMENT_TYPES.map((apartment) => (
          <p key={apartment.price} className="text-sm text-dark sm:text-base xl:text-xl">
            {apartment.price}
          </p>
        ))}
      </div>
    </div>
  );
};

const NearbyPlacesDesktop = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {NEARBY_PLACES.map((group) => (
        <div key={group.title} className="grid justify-items-start gap-2 text-white">
          <p className="mt-2 text-base font-medium">{group.title}</p>

          {group.items.map((item) => (
            <p key={item} className="text-sm">
              — {item}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

const NearbyPlacesMobile = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {NEARBY_PLACES.map((group) => (
        <div key={group.title} className="grid justify-items-start gap-2 text-dark">
          <p className="mt-2 text-sm font-medium sm:text-base">{group.title}</p>

          {group.items.map((item) => (
            <p key={item} className="text-[13px] sm:text-sm">
              — {item}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

const ResidentialComplex = ({
  name,
  street,
  price,
  imageUrl,
  imageAlt,
  linkToPage,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (event) => {
      setIsDesktop(event.matches);

      if (event.matches) {
        setIsClicked(false);
      }
    };

    setIsDesktop(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setIsClicked(false);
    }
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  return (
    <article className="grid gap-8 group ">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={isClicked}
        className="relative min-h-[680px] lg:h-152 [perspective:1400px]"
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
          }
        }}
      >
        <div
          className={`relative h-full w-full rounded-4xl transition-transform duration-700 [transform-style:preserve-3d] ${
            !isDesktop && isClicked ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 cursor-pointer overflow-hidden rounded-4xl bg-cover bg-center bg-no-repeat [backface-visibility:hidden]"
            style={{
              boxShadow: "inset 0 -20px 20px -10px rgba(0, 0, 0, 0.5)",
            }}
            aria-label={imageAlt}
          >
            <img src={imageUrl} alt="imageAlt" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"/>
            <div
              className={`relative top-[calc(100%-11rem)] grid h-44 content-center items-center justify-between gap-3 rounded-b-4xl bg-gradient-to-t from-black/80 via-black/60 to-transparent px-6 pb-12 transition-opacity duration-300 sm:flex sm:px-8 sm:pb-5 md:flex lg:px-10 ${
                isDesktop && isClicked ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="grid justify-start">
                <p className="select-none text-[28px] font-medium leading-tight text-white sm:text-[34px] lg:text-5xl">
                  {name}
                </p>

                <p className="select-none text-sm font-medium text-dark25 sm:text-base lg:text-2xl">
                  {street}
                </p>
              </div>

              <div>
                <p className="select-none text-lg font-medium text-white sm:text-xl lg:text-2xl">
                  {price}
                </p>
              </div>
            </div>

            {/* DESKTOP GLASS PANEL */}
            <div
              className={`absolute right-0 top-0 hidden h-full w-1/2 overflow-hidden rounded-r-4xl border-l border-white/10 transition-all duration-300 lg:block ${
                isClicked
                  ? "bg-white/10 opacity-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-xl saturate-150"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <div className="absolute inset-0 overflow-hidden rounded-r-4xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28)_0%,transparent_38%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_35%,transparent_60%)]" />
              </div>

              <div
                className={`relative z-10 mt-14 w-full transform px-10 transition-all duration-300 ease-in-out xl:px-16 ${
                  isClicked
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <p className="mb-8 text-start text-2xl font-medium text-white">
                  Квартиры в {name}
                </p>

                <ApartmentTypesDesktop />

                <div className="my-6 h-px w-[80%] bg-dark40" />

                <div className="grid">
                  <p className="text-lg font-medium text-white">Места поблизости</p>

                  <NearbyPlacesDesktop />
                </div>

                <div onClick={handleButtonClick}>
                  <Button
                    text="Перейти на страницу ЖК"
                    size="md"
                    variant="accent"
                    className="saturate-66 my-14"
                    linkToPage={linkToPage}
                  />
                </div>
              </div>
            </div>

            <div
              className={`absolute bottom-4 right-4 block rounded-full bg-black/40 px-3 py-1 text-xs text-white group-hover:bg-white group-hover:text-dark transition duration-300 ${
                isClicked ? "hidden" : ""
              }`}
            >
              Нажмите для подробного просмотра
            </div>
          </div>

          {/* BACK - MOBILE ONLY */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-4xl bg-dark15 lg:hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="relative z-10 w-full flex-1 overflow-y-auto px-5 pb-6 pt-8 sm:px-8 sm:py-12">
              <p className="mb-6 text-start text-xl font-medium text-dark sm:mb-8 sm:text-2xl">
                Квартиры в {name}
              </p>

              <ApartmentTypesMobile />

              <div className="my-5 h-px w-full bg-dark40 sm:my-6 sm:w-[80%]" />

              <div className="mb-6 grid">
                <p className="text-base font-medium text-dark sm:text-lg">
                  Места поблизости
                </p>

                <NearbyPlacesMobile />
              </div>

              <div className="z-20 bottom-5 left-14 flex justify-center" onClick={handleButtonClick}>
                <Button
                  text="Перейти на страницу ЖК"
                  size="md"
                  variant="accent"
                  linkToPage={linkToPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ResidentialComplex;