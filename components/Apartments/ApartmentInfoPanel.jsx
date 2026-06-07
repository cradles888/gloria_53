"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Check } from "lucide-react";

import Button from "@/components/UI/Button";
import AmenityItem from "@/components/Amenity/AmenityItem";
import { formatted } from "@/utils/formatPrice";
import { submitApplication } from "@/app/actions";

const formatArea = (value) => {
  if (value === null || value === undefined) return "";
  return String(value).replace(".", ",");
};


const InfoRow = ({ label, value }) => {
  if (value === null || value === undefined || value === "") return null;

  return (
    <div className="flex h-14 items-center justify-between gap-5 border-b border-dark/10 last:border-b-0">
      <p className="text-sm leading-relaxed text-dark50">{label}</p>

      <p className="text-right text-sm font-medium leading-relaxed text-dark sm:text-base">
        {value}
      </p>
    </div>
  );
};

const RoomAreaRow = ({ name, area }) => {
  return (
    <div className="flex h-14 items-center justify-between gap-4 border-b border-dark/10 last:border-b-0">
      <p className="text-sm text-dark50">{name}</p>

      <p className="text-sm font-medium text-dark">
        {formatArea(area)} м²
      </p>
    </div>
  );
};

const PurchaseOptionCard = ({ option, isActive, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className={`
        group grid w-full rounded-3xl border p-4 text-left
        ${
          isActive
            ? "border-accent bg-white shadow-sm"
            : "border-transparent bg-white hover:border-accent/30"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-dark">{option.name}</p>

          {option.description ? (
            <p className="mt-1 text-sm leading-relaxed text-dark/60">
              {option.description}
            </p>
          ) : null}
        </div>

        <span
          className={`
            flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition
            ${
              isActive
                ? "border-accent bg-accent text-white"
                : "border-dark/15 bg-white text-transparent group-hover:border-accent/40"
            }
          `}
        >
          <Check className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
};

const RequestModal = ({ isOpen, onClose, apartment, selectedPurchase }) => {
  const apartmentTitle = `${apartment.rooms}-комнатная, ${formatArea(
    apartment.areaTotal,
  )} м²`;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[120]">
      <div className="fixed inset-0 bg-black/70" />

      <div className="fixed inset-0 overflow-y-auto p-3 sm:p-5">
        <div className="flex min-h-full items-end justify-center sm:items-center">
          <DialogPanel className="relative w-full max-w-xl overflow-hidden rounded-t-4xl bg-white shadow-2xl sm:rounded-4xl">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-dark10 text-dark transition hover:bg-accent hover:text-white"
              aria-label="Закрыть форму"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className="
                max-h-[calc(100dvh-24px)] overflow-y-auto p-5 sm:max-h-[calc(100dvh-40px)] sm:p-7
                [scrollbar-width:thin]
                [scrollbar-color:rgba(0,0,0,0.16)_transparent]
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-dark/15
                hover:[&::-webkit-scrollbar-thumb]:bg-dark/25
              "
            >
              <div className="pr-12">
                <span className="mb-4 inline-flex rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                  Заявка на квартиру
                </span>

                <DialogTitle className="text-2xl font-medium leading-tight text-dark sm:text-3xl">
                  Оставить контактные данные
                </DialogTitle>

                <p className="mt-3 text-sm leading-relaxed text-dark60">
                  Менеджер свяжется с вами, уточнит детали по квартире и
                  выбранному условию покупки.
                </p>
              </div>

              <div className="mt-6 rounded-3xl bg-dark10 p-4">
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-dark50">Квартира</span>

                    <span className="text-right font-medium text-dark">
                      №{apartment.number}, {apartmentTitle}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-dark50">Стоимость</span>

                    <span className="text-right font-medium text-accent">
                      {formatted(apartment.price)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-dark50">Условие покупки</span>

                    <span className="text-right font-medium text-dark">
                      {selectedPurchase?.name}
                    </span>
                  </div>
                </div>
              </div>

              <form action={submitApplication} className="mt-6 grid gap-3">
                <label className="grid gap-2">
                  <span className="text-sm text-dark60">Ваше имя</span>

                  <input
                    type="text"
                    name="name"
                    placeholder="Иван"
                    className="h-12 rounded-2xl border border-dark/10 bg-white px-4 text-dark outline-none transition focus:border-accent"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-dark60">Телефон</span>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+7 ___ ___-__-__"
                    className="h-12 rounded-2xl border border-dark/10 bg-white px-4 text-dark outline-none transition focus:border-accent"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-dark60">Комментарий</span>

                  <textarea
                    name="comment"
                    rows={3}
                    defaultValue={`Интересует квартира №${apartment.number}. Условие покупки: ${selectedPurchase?.name ?? ""}.`}
                    className="resize-none rounded-2xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none transition focus:border-accent"
                  />
                </label>

                <input type="hidden" name="apartmentId" value={apartment.id} />
                <input
                  type="hidden"
                  name="purchaseOption"
                  value={selectedPurchase?.id ?? ""}
                />

                <div className="mt-3">
                  <Button
                    type="submit"
                    text="Отправить заявку"
                    variant="accent"
                    size="md"
                    fullWidth
                  />
                </div>

                <p className="text-center text-xs leading-relaxed text-dark50">
                  Нажимая кнопку, вы соглашаетесь на обработку контактных данных.
                </p>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

const ApartmentInfoPanel = ({ apartment, purchaseOptions = [], showSuccess = false }) => {
  const [selectedPurchase, setSelectedPurchase] = useState(purchaseOptions[0]);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const {
    id,
    number,
    rooms,
    areaTotal,
    price,
    pricePerSqm,
    buildingPosition,
    floor,
    floorsTotal,
    entrance,
    ceilingHeight,
    settlementDate,
    complexName,
    apartmentType,
    amenityItems,
    roomAreas,
  } = apartment;

  return (
    <>
      <aside className="relative flex max-h-none overflow-hidden rounded-4xl bg-white shadow-sm lg:max-h-[760px]">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-dark10 blur-3xl" />

        <div className="relative z-10 flex w-full flex-col">
          <div
            className="
              min-h-0 flex-1 overflow-y-auto px-5 pt-5 sm:px-8 sm:pt-8 lg:px-10 lg:pt-10
              [scrollbar-width:thin]
              [scrollbar-color:rgba(0,0,0,0.16)_transparent]
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-dark/15
              hover:[&::-webkit-scrollbar-thumb]:bg-dark/25
            "
          >
            <div className="pb-6">
              {showSuccess && (
                <div className="mb-6 rounded-3xl bg-accent/10 px-5 py-4 text-sm font-medium text-accent">
                  Заявка отправлена — менеджер свяжется с вами в ближайшее время.
                </div>
              )}

              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white">
                  Квартира №{number}
                </span>

                {buildingPosition ? (
                  <span className="rounded-full bg-dark10 px-4 py-2 text-sm font-medium text-dark">
                    Позиция {buildingPosition}
                  </span>
                ) : null}
              </div>

              <h1 className="max-w-3xl text-3xl font-medium leading-tight text-dark sm:text-4xl lg:text-5xl">
                {rooms}-комнатная, {formatArea(areaTotal)} м²
              </h1>

              <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
                <p className="text-3xl font-medium text-accent sm:text-4xl">
                  {formatted(price)}
                </p>

                {pricePerSqm ? (
                  <p className="pb-1 text-sm text-dark/50 sm:text-base">
                    {formatted(pricePerSqm)} ₽ / м²
                  </p>
                ) : null}
              </div>

              {amenityItems?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {amenityItems.map((amenity) => (
                    <AmenityItem
                      key={amenity.id}
                      amenity={amenity}
                      className="rounded-full h-7 bg-dark10 px-3 py-2 text-xs sm:text-sm"
                    />
                  ))}
                </div>
              ) : null}

              {purchaseOptions.length > 0 ? (
                <div className="mt-7 rounded-4xl bg-dark10 p-4 sm:p-5">
                  <p className="mb-4 text-base font-medium text-dark">
                    Условия покупки
                  </p>

                  <div className="grid gap-3">
                    {purchaseOptions.map((option) => (
                      <PurchaseOptionCard
                        key={option.id}
                        option={option}
                        isActive={selectedPurchase?.id === option.id}
                        onSelect={setSelectedPurchase}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-8 rounded-4xl bg-dark10 p-5">
                <p className="mb-2 text-base font-medium text-dark">
                  Все характеристики
                </p>

                <InfoRow
                  label="Жилой комплекс"
                  value={complexName || "ЖК Юннатов"}
                />
                <InfoRow
                  label="Тип недвижимости"
                  value={apartmentType || "Квартира"}
                />
                <InfoRow
                  label="Площадь"
                  value={`${formatArea(areaTotal)} м²`}
                />
                <InfoRow
                  label="Этаж"
                  value={
                    floorsTotal ? `${floor} из ${floorsTotal}` : String(floor)
                  }
                />
                <InfoRow label="Номер подъезда" value={entrance} />
                <InfoRow label="Позиция" value={buildingPosition} />
                <InfoRow
                  label="Высота потолков"
                  value={
                    ceilingHeight ? `${formatArea(ceilingHeight)} м` : null
                  }
                />
                <InfoRow label="Заселение" value={settlementDate} />
              </div>

              {roomAreas?.length ? (
                <div className="mt-5 rounded-4xl bg-dark10 p-5">
                  <p className="mb-2 text-base font-medium text-dark">
                    Площади помещений
                  </p>

                  <div>
                    {roomAreas.map((room) => (
                      <RoomAreaRow
                        key={room.id || `${room.name}-${room.sortOrder}`}
                        name={room.name}
                        area={room.area}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="sticky bottom-0 z-20 border-t border-dark/10 bg-white/88 px-5 py-4 backdrop-blur-xl sm:px-8 sm:py-5 lg:px-10">
            <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-white/88 to-transparent" />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                text="Оставить заявку"
                variant="accent"
                size="md"
                onClick={() => setIsRequestOpen(true)}
                className="sm:flex-1"
              />

              <Button
                text="Вернуться к квартирам"
                variant="outline"
                size="md"
                linkToPage="/apartments"
                className="sm:flex-1"
              />
            </div>
          </div>
        </div>
      </aside>

      <RequestModal
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
        apartment={apartment}
        selectedPurchase={selectedPurchase}
      />
    </>
  );
};

export default ApartmentInfoPanel;