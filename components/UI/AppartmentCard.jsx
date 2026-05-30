import Image from "next/image";

import { formatted } from "@/utils/formatPrice";
import AmenityItem from "@/components/Amenity/AmenityItem";
import FreemodeSliderChildren from "@/components/Swiper/FreemodeSliderChildren";
import Button from "@/components/UI/Button";

const formatArea = (value) => {
  if (value === null || value === undefined) return "";
  return String(value).replace(".", ",");
};

const ApartmentTitle = ({ rooms, areaTotal }) => {
  return (
    <h3 className="text-xl font-medium leading-tight text-dark sm:text-2xl">
      {rooms} комнаты, {formatArea(areaTotal)}&nbsp;м<sup>2</sup>
    </h3>
  );
};

const ApartmentPrice = ({ price, pricePerSqm }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="text-xl font-medium text-accent sm:text-2xl">
        {formatted(price)}
      </p>

      {pricePerSqm ? (
        <>
          <span className="text-dark80">·</span>

          <p className="text-sm text-dark80">
            {formatted(pricePerSqm)} ₽ / м<sup>2</sup>
          </p>
        </>
      ) : null}
    </div>
  );
};

const ApartmentMeta = ({
  buildingPosition,
  floor,
  floorsTotal,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 text-sm text-dark ${className}`}
    >
      {buildingPosition ? <span>Позиция {buildingPosition}</span> : null}

      {buildingPosition && floor ? <span className="text-dark80">·</span> : null}

      {floor ? (
        <span>
          Этаж {floor}
          {floorsTotal ? ` из ${floorsTotal}` : ""}
        </span>
      ) : null}
    </div>
  );
};

const ApartmentNumber = ({ number }) => {
  return (
    <span className="rounded-lg bg-dark15 px-2 py-1 text-sm text-dark">
      №{number}
    </span>
  );
};

const ApartmentImage = ({ mainImage, imageAlt, wrapperClassName = "", sizes = "280px" }) => {
  if (!mainImage) return null;

  return (
    <div className={`relative ${wrapperClassName}`}>
      <Image
        src={mainImage}
        alt={imageAlt}
        fill
        sizes={sizes}
        className="object-contain mix-blend-multiply"
      />
    </div>
  );
};

const ApartmentAmenitiesSlider = ({ amenityItems }) => {
  if (!amenityItems?.length) return null;

  return (
    <footer className="mt-4 flex overflow-y-auto md:block">
      <FreemodeSliderChildren className="rounded-xl">
        {amenityItems.map((amenity) => (
          <AmenityItem
            key={amenity.id}
            amenity={amenity}
            className="flex items-center gap-2 px-2 min-w-min bg-accent/10 h-7 rounded-full whitespace-nowrap rounded-xl text-sm"
          />
        ))}
      </FreemodeSliderChildren>
    </footer>
  );
};

const ApartmentAmenitiesList = ({ amenityItems }) => {
  if (!amenityItems?.length) return null;

  return (
    <div className="hidden gap-2 md:grid">
      {amenityItems.map((amenity) => (
        <AmenityItem
          key={amenity.id}
          amenity={amenity}
          className="max-w-max rounded-xl text-xs lg:text-sm"
        />
      ))}
    </div>
  );
};

const ApartmentMobileDetails = ({ apartment }) => {
  const rows = [
    ["Количество комнат", apartment.rooms],
    ["Площадь", `${formatArea(apartment.areaTotal)} м²`],
    ["Стоимость", formatted(apartment.price)],
    apartment.pricePerSqm
      ? ["Стоимость за м²", `${formatted(apartment.pricePerSqm)} ₽`]
      : null,
    ["Ипотека", "Рассчитывается индивидуально"],
    ["Позиция", apartment.buildingPosition],
    [
      apartment.floorsTotal ? `Этаж из ${apartment.floorsTotal}` : "Этаж",
      apartment.floor,
    ],
  ].filter(Boolean);

  return (
    <div className="grid gap-2 md:hidden">
      {rows.map(([label, value]) => (
        <div key={label} className="grid grid-cols-[1fr_auto] gap-4">
          <p className="text-xs text-dark80 sm:text-sm">{label}:</p>

          <p className="text-right text-xs font-medium text-dark sm:text-sm">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

const ApartmentCardGrid = ({ apartment }) => {
  return (
    <article className="group flex flex-col rounded-3xl bg-dark10 p-5 sm:p-6">
      <header className="grid gap-1">
        <div className="flex items-start justify-between gap-4">
          <ApartmentTitle
            rooms={apartment.rooms}
            areaTotal={apartment.areaTotal}
          />

          <ApartmentNumber number={apartment.number} />
        </div>

        <ApartmentPrice
          price={apartment.price}
          pricePerSqm={apartment.pricePerSqm}
        />
      </header>

      <div className="grid h-full content-between">
        <div className="my-8 flex w-full justify-center md:place-self-auto">
          <ApartmentImage
            mainImage={apartment.mainImage}
            imageAlt={apartment.imageAlt}
            wrapperClassName="h-[220px] w-full max-w-[280px]"
            sizes="(max-width: 768px) 70vw, 280px"
          />
        </div>

        <ApartmentMeta
          buildingPosition={apartment.buildingPosition}
          floor={apartment.floor}
          floorsTotal={apartment.floorsTotal}
          className="justify-center md:justify-start"
        />

        <ApartmentAmenitiesSlider amenityItems={apartment.amenityItems} />

        <div className="mt-5">
          <Button
            text="Подробнее"
            size="sm"
            variant="outlineAccent"
            fullWidth
            linkToPage={`/apartments/${apartment.id}`}
          />
        </div>
      </div>
    </article>
  );
};

const ApartmentCardList = ({ apartment }) => {
  return (
    <article className="relative grid gap-6 rounded-3xl bg-dark10 p-5 sm:p-6 md:grid-cols-[160px_1.5fr_0.8fr_1fr_auto_auto] md:items-center lg:p-8">
      <div className="flex justify-center md:justify-start">
        <ApartmentImage
          mainImage={apartment.mainImage}
          imageAlt={apartment.imageAlt}
          wrapperClassName="h-[160px] w-full max-w-[220px] md:h-[130px] md:max-w-[160px]"
          sizes="(max-width: 768px) 50vw, 160px"
        />
      </div>

      <div className="hidden gap-2 md:grid">
        <ApartmentTitle
          rooms={apartment.rooms}
          areaTotal={apartment.areaTotal}
        />

        <ApartmentPrice
          price={apartment.price}
          pricePerSqm={apartment.pricePerSqm}
        />

        <p className="text-sm text-dark80">
          Ипотека рассчитывается индивидуально
        </p>
      </div>

      <ApartmentMeta
        buildingPosition={apartment.buildingPosition}
        floor={apartment.floor}
        floorsTotal={apartment.floorsTotal}
        className="hidden md:flex"
      />

      <ApartmentAmenitiesList amenityItems={apartment.amenityItems} />

      <div className="absolute right-5 top-5 md:static">
        <ApartmentNumber number={apartment.number} />
      </div>

      <div className="hidden md:block">
        <Button
          text="Подробнее"
          size="sm"
          variant="outlineAccent"
          linkToPage={`/apartments/${apartment.id}`}
        />
      </div>

      <ApartmentMobileDetails apartment={apartment} />
    </article>
  );
};

const AppartmentCard = ({ view, apartment }) => {
  if (view === "grid") {
    return <ApartmentCardGrid apartment={apartment} />;
  }

  return <ApartmentCardList apartment={apartment} />;
};

export default AppartmentCard;