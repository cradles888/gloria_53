"use client";

import { useState } from "react";
import { createApartment } from "../../actions";
import ImageUpload from "@/components/UI/ImageUpload";
import Button from "@/components/UI/Button";

const inputCls =
  "h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent";
const selectCls =
  "h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent";
const labelCls = "grid gap-2 text-sm font-medium text-dark";

const FormSection = ({ title, children }) => (
  <section className="rounded-4xl bg-dark10 p-5 sm:p-6 lg:p-8">
    <h2 className="text-2xl font-medium text-dark">{title}</h2>
    <div className="mt-6">{children}</div>
  </section>
);

const AmenityCheckboxes = ({ amenities = [], selectedIds = [] }) => {
  if (!amenities.length) return null;
  return (
    <FormSection title="Удобства">
      <div className="flex flex-wrap gap-3">
        {amenities.map((a) => (
          <label
            key={a.id}
            className="flex cursor-pointer items-center gap-2 rounded-4xl border border-dark15 bg-white px-4 py-2.5 text-sm text-dark transition hover:border-accent has-checked:border-accent has-checked:bg-accent/10"
          >
            <input
              type="checkbox"
              name="amenities"
              value={a.id}
              defaultChecked={selectedIds.includes(a.id)}
              className="h-4 w-4 accent-accent"
            />
            {a.name}
          </label>
        ))}
      </div>
    </FormSection>
  );
};

const NewApartmentForm = ({ buildings, amenities = [] }) => {
  const [mainImage, setMainImage] = useState("");
  const [planImage, setPlanImage] = useState("");

  return (
    <form action={createApartment} className="mt-8 grid gap-6">
      <input type="hidden" name="mainImage" value={mainImage} />
      <input type="hidden" name="planImage" value={planImage} />

      <FormSection title="Дом и номер">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className={labelCls}>
            Дом / позиция *
            <select name="buildingId" required className={selectCls}>
              <option value="">— выберите —</option>
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.complex.name} · позиция {b.position ?? b.name ?? b.id}
                </option>
              ))}
            </select>
          </label>

          <label className={labelCls}>
            Номер квартиры *
            <input name="number" required placeholder="42" className={inputCls} />
          </label>
        </div>
      </FormSection>

      <FormSection title="Площадь и расположение">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className={labelCls}>
            Комнат *
            <input name="rooms" type="number" min="0" max="10" required defaultValue="2" className={inputCls} />
          </label>

          <label className={labelCls}>
            Этаж *
            <input name="floor" type="number" min="1" required defaultValue="1" className={inputCls} />
          </label>

          <label className={labelCls}>
            Подъезд
            <input name="entrance" type="number" min="1" placeholder="—" className={inputCls} />
          </label>

          <label className={labelCls}>
            Площадь, м² *
            <input name="areaTotal" type="number" step="0.01" min="0.01" required placeholder="45.70" className={inputCls} />
          </label>

          <label className={`${labelCls} sm:col-span-2 lg:col-span-4 lg:max-w-xs`}>
            Высота потолков, м
            <input name="ceilingHeight" type="number" step="0.01" min="0" placeholder="2.70 (по умолчанию)" className={inputCls} />
          </label>
        </div>
      </FormSection>

      <FormSection title="Цена и статус">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className={labelCls}>
            Цена, ₽ *
            <input name="price" type="number" min="0" required placeholder="7780000" className={inputCls} />
          </label>

          <label className={labelCls}>
            Цена за м², ₽ *
            <input name="pricePerSqm" type="number" min="0" required placeholder="171240" className={inputCls} />
          </label>

          <label className={labelCls}>
            Статус
            <select name="status" className={selectCls}>
              <option value="available">Доступна</option>
              <option value="reserved">Забронирована</option>
              <option value="sold">Продана</option>
            </select>
          </label>
        </div>
      </FormSection>

      <FormSection title="Изображения">
        <div className="grid gap-6 lg:grid-cols-2">
          <ImageUpload
            value={mainImage}
            folder="apartments"
            label="Главное изображение *"
            onChange={setMainImage}
          />
          <ImageUpload
            value={planImage}
            folder="apartments"
            label="Изображение плана этажа *"
            onChange={setPlanImage}
          />
        </div>
      </FormSection>

      <AmenityCheckboxes amenities={amenities} />

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="dark">Добавить квартиру</Button>
        <Button variant="outline" size="sm" linkToPage="/g53-manager/apartments">Отмена</Button>
      </div>
    </form>
  );
};

export default NewApartmentForm;
