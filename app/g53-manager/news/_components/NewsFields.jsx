"use client";

import { useState } from "react";
import ImageUpload from "@/components/UI/ImageUpload";

const formatInputDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
};

const NewsFields = ({ item = null }) => {
  const [image, setImage] = useState(item?.image || "");

  return (
    <div className="grid gap-4">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-dark">
          Заголовок
          <input
            name="title"
            defaultValue={item?.title || ""}
            className="h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent"
            required
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-dark">
          Slug
          <input
            name="slug"
            defaultValue={item?.slug || ""}
            className="h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent"
            required
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-dark">
        Краткое описание
        <textarea
          name="excerpt"
          defaultValue={item?.excerpt || ""}
          rows={2}
          required={!item}
          className="rounded-3xl border border-dark15 bg-white px-5 py-4 text-base outline-none transition focus:border-accent"
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-dark">
        Текст материала
        <textarea
          name="content"
          defaultValue={item?.content?.join("\n\n") || ""}
          rows={4}
          required={!item}
          className="rounded-3xl border border-dark15 bg-white px-5 py-4 text-base outline-none transition focus:border-accent"
        />
      </label>

      <div className="grid gap-4 lg:grid-cols-4">
        <label className="grid gap-2 text-sm font-medium text-dark">
          Тип
          <select
            name="type"
            defaultValue={item?.type || "news"}
            className="h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent"
          >
            <option value="news">Новости</option>
            <option value="promotion">Акция</option>
            <option value="construction">Ход строительства</option>
            <option value="tips">Полезно покупателю</option>
            <option value="mortgage">Ипотека</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-dark">
          Метка
          <input
            name="label"
            defaultValue={item?.label || "Новости"}
            className="h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-dark">
          Дата
          <input
            name="publishedAt"
            type="date"
            defaultValue={formatInputDate(item?.publishedAt)}
            required={!item}
            className="h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-dark">
          Порядок
          <input
            name="sortOrder"
            type="number"
            min="0"
            max="100000"
            defaultValue={item?.sortOrder ?? 0}
            className="h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent"
          />
        </label>
      </div>

      <input type="hidden" name="image" value={image} />
      <ImageUpload
        value={image}
        folder="news"
        label="Изображение"
        onChange={setImage}
      />

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-dark">
          <input
            name="isPublished"
            type="checkbox"
            defaultChecked={item?.isPublished ?? true}
            className="h-4 w-4 accent-accent"
          />
          Опубликовано
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-dark">
          <input
            name="isFeatured"
            type="checkbox"
            defaultChecked={item?.isFeatured || false}
            className="h-4 w-4 accent-accent"
          />
          В промо-блок
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-dark">
          <input
            name="showOnMain"
            type="checkbox"
            defaultChecked={item?.showOnMain || false}
            className="h-4 w-4 accent-accent"
          />
          На главную
        </label>
      </div>
    </div>
  );
};

export default NewsFields;
