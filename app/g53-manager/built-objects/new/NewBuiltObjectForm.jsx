"use client";

import { useState } from "react";
import { createBuiltObject } from "../../actions";
import ImageUpload from "@/components/UI/ImageUpload";
import Button from "@/components/UI/Button";

const inputCls =
  "h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent";
const labelCls = "grid gap-2 text-sm font-medium text-dark";

const FormSection = ({ title, children }) => (
  <section className="rounded-4xl bg-dark10 p-5 sm:p-6 lg:p-8">
    <h2 className="text-2xl font-medium text-dark">{title}</h2>
    <div className="mt-6">{children}</div>
  </section>
);

const NewBuiltObjectForm = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (index, url) => {
    setImages((prev) => {
      const next = [...prev];
      if (url) {
        next[index] = url;
      } else {
        next.splice(index, 1);
      }
      return next;
    });
  };

  const addImage = (url) => {
    if (url) setImages((prev) => [...prev, url]);
  };

  return (
    <form action={createBuiltObject} className="mt-8 grid gap-6">
      {images.map((url) => (
        <input key={url} type="hidden" name="images" value={url} />
      ))}

      <FormSection title="Основное">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className={labelCls}>
            Адрес / название
            <input type="text" name="title" className={inputCls} required placeholder="ул. Примерная, д. 1" />
          </label>

          <label className={labelCls}>
            Год сдачи
            <input type="text" name="year" className={inputCls} required placeholder="2024" />
          </label>

          <label className={`${labelCls} lg:col-span-2`}>
            Описание
            <textarea
              name="description"
              rows={3}
              className="rounded-3xl border border-dark15 bg-white px-5 py-3 text-base outline-none transition focus:border-accent"
            />
          </label>

          <label className={labelCls}>
            ЖК (необязательно)
            <input type="text" name="complex" className={inputCls} placeholder="ЖК Раздолье" />
          </label>

          <label className={labelCls}>
            Порядок сортировки
            <input type="number" name="sortOrder" className={inputCls} defaultValue={0} />
          </label>
        </div>
      </FormSection>

      <FormSection title="Фотографии">
        <div className="grid gap-4">
          {images.map((url, i) => (
            <ImageUpload
              key={i}
              value={url}
              folder="built-objects"
              label={`Фото ${i + 1}`}
              onChange={(newUrl) => handleImageChange(i, newUrl)}
            />
          ))}

          {images.length === 0 && (
            <ImageUpload
              value=""
              folder="built-objects"
              label="Добавить фото"
              onChange={addImage}
            />
          )}

          {images.length > 0 && (
            <ImageUpload
              value=""
              folder="built-objects"
              label="Добавить ещё фото"
              placeholder="Нажмите, чтобы добавить ещё одно фото"
              onChange={addImage}
            />
          )}
        </div>
      </FormSection>

      <FormSection title="Координаты на карте">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className={labelCls}>
            Долгота (lng)
            <input type="number" name="lng" step="any" className={inputCls} placeholder="31.2755" />
          </label>
          <label className={labelCls}>
            Широта (lat)
            <input type="number" name="lat" step="any" className={inputCls} placeholder="58.5228" />
          </label>
        </div>
      </FormSection>

      <div className="flex justify-end">
        <Button text="Создать объект" variant="accent" size="md" type="submit" />
      </div>
    </form>
  );
};

export default NewBuiltObjectForm;
