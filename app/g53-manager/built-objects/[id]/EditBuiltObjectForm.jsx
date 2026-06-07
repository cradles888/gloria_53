"use client";

import { useState } from "react";
import { updateBuiltObject } from "../../actions";
import ImageUpload from "@/components/UI/ImageUpload";

const inputCls =
  "h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent";
const labelCls = "grid gap-2 text-sm font-medium text-dark";

const FormSection = ({ title, children }) => (
  <section className="rounded-4xl bg-dark10 p-5 sm:p-6 lg:p-8">
    <h2 className="text-2xl font-medium text-dark">{title}</h2>
    <div className="mt-6">{children}</div>
  </section>
);

const EditBuiltObjectForm = ({ item }) => {
  const [lng, lat] = item.coordinates ?? [];
  const [images, setImages] = useState(item.images ?? []);

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
    <form id="edit-built-object" action={updateBuiltObject} className="mt-8 grid gap-6">
      <input type="hidden" name="id" value={item.id} />
      {images.map((url) => (
        <input key={url} type="hidden" name="images" value={url} />
      ))}

      <FormSection title="Основное">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className={labelCls}>
            Адрес / название
            <input type="text" name="title" className={inputCls} defaultValue={item.title} required />
          </label>

          <label className={labelCls}>
            Год сдачи
            <input type="text" name="year" className={inputCls} defaultValue={item.year} placeholder="2020" required />
          </label>

          <label className={`${labelCls} lg:col-span-2`}>
            Описание
            <textarea
              name="description"
              rows={3}
              className="rounded-3xl border border-dark15 bg-white px-5 py-3 text-base outline-none transition focus:border-accent"
              defaultValue={item.description ?? ""}
            />
          </label>

          <label className={labelCls}>
            ЖК (необязательно)
            <input type="text" name="complex" className={inputCls} defaultValue={item.complex ?? ""} placeholder="ЖК Раздолье" />
          </label>

          <label className={labelCls}>
            Порядок сортировки
            <input type="number" name="sortOrder" className={inputCls} defaultValue={item.sortOrder} min="0" max="100000" />
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
            <input type="number" name="lng" step="any" min="-180" max="180" className={inputCls} defaultValue={lng ?? ""} placeholder="31.2755" />
          </label>
          <label className={labelCls}>
            Широта (lat)
            <input type="number" name="lat" step="any" min="-90" max="90" className={inputCls} defaultValue={lat ?? ""} placeholder="58.5228" />
          </label>
        </div>
      </FormSection>
    </form>
  );
};

export default EditBuiltObjectForm;
