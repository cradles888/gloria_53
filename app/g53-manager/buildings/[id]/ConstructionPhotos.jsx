"use client";

import { useState } from "react";

import ImageUpload from "@/components/UI/ImageUpload";
import Button from "@/components/UI/Button";
import {
  addConstructionPhoto,
  deleteConstructionPhoto,
} from "../../actions";

const formatDate = (value) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const ConstructionPhotos = ({ buildingId, photos = [] }) => {
  const [url, setUrl] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="mt-8 border-t border-dark15 pt-8">
      <h3 className="text-xl font-medium text-dark">Фотоотчёт строительства</h3>
      <p className="mt-1 text-sm text-dark50">
        Фотографии хода строительства этой позиции. Отображаются на странице ЖК
        в блоке «Фотоотчёт строительства».
      </p>

      {/* Существующие фото */}
      {photos.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-3xl border border-dark15 bg-dark5"
            >
              <img
                src={photo.url}
                alt=""
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-black/60 to-transparent p-3">
                <span className="text-xs font-medium text-white">
                  {formatDate(photo.takenAt)}
                </span>

                <form action={deleteConstructionPhoto}>
                  <input type="hidden" name="id" value={photo.id} />
                  <input type="hidden" name="buildingId" value={buildingId} />
                  <button
                    type="submit"
                    className="h-7 rounded-full bg-red-500/80 px-3 text-xs font-medium text-white backdrop-blur transition hover:bg-red-500"
                  >
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-3xl bg-dark5 px-5 py-4 text-sm text-dark50">
          Фотографий пока нет. Добавьте первое фото ниже.
        </p>
      )}

      {/* Добавление фото */}
      <form action={addConstructionPhoto} className="mt-8 grid gap-4 rounded-4xl border border-dark15 p-5 sm:p-6">
        <h4 className="text-base font-medium text-dark">Добавить фотографию</h4>

        <ImageUpload
          value={url}
          onChange={setUrl}
          folder="construction"
          label="Фотография"
          placeholder="Загрузите фото со стройки"
        />

        <div className="grid gap-2 sm:max-w-xs">
          <label className="text-sm font-medium text-dark" htmlFor="takenAt">
            Дата съёмки
          </label>
          <input
            id="takenAt"
            type="date"
            name="takenAt"
            defaultValue={today}
            max={today}
            className="h-12 rounded-2xl border border-dark15 bg-white px-4 text-dark outline-none transition focus:border-accent"
          />
        </div>

        <input type="hidden" name="buildingId" value={buildingId} />
        <input type="hidden" name="url" value={url} />

        <div>
          <Button
            type="submit"
            text="Добавить в фотоотчёт"
            variant="accent"
            size="md"
            disabled={!url}
          />
        </div>
      </form>
    </section>
  );
};

export default ConstructionPhotos;
