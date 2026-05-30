"use client";

import { useState } from "react";
import { updateBuilding } from "../../actions";
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

const toDateInputValue = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
};

const EditBuildingForm = ({ building }) => {
  const [heroImage, setHeroImage] = useState(building.heroImage ?? "");

  return (
    <form action={updateBuilding} className="mt-8 grid gap-6">
      <input type="hidden" name="id" value={building.id} />
      <input type="hidden" name="heroImage" value={heroImage} />

      <FormSection title="Основное">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className={labelCls}>
            Позиция (номер / обозначение)
            <input
              type="text"
              name="position"
              className={inputCls}
              defaultValue={building.position ?? ""}
              placeholder="Позиция 1"
            />
          </label>

          <label className={labelCls}>
            Название
            <input
              type="text"
              name="name"
              className={inputCls}
              defaultValue={building.name ?? ""}
              placeholder="Корпус А"
            />
          </label>

          <label className={labelCls}>
            Адрес
            <input
              type="text"
              name="address"
              className={inputCls}
              defaultValue={building.address ?? ""}
              placeholder="ул. Юннатов, 12"
            />
          </label>

          <label className={labelCls}>
            Статус
            <select name="status" className={selectCls} defaultValue={building.status}>
              <option value="active">Активен</option>
              <option value="inactive">Неактивен</option>
            </select>
          </label>
        </div>
      </FormSection>

      <FormSection title="Параметры">
        <div className="grid gap-4 lg:grid-cols-3">
          <label className={labelCls}>
            Этажей всего
            <input
              type="number"
              name="floorsTotal"
              className={inputCls}
              defaultValue={building.floorsTotal ?? ""}
              placeholder="17"
              min="1"
            />
          </label>

          <label className={labelCls}>
            Подъездов
            <input
              type="number"
              name="entrancesTotal"
              className={inputCls}
              defaultValue={building.entrancesTotal ?? ""}
              placeholder="4"
              min="1"
            />
          </label>

          <label className={labelCls}>
            Плановая дата сдачи
            <input
              type="date"
              name="plannedSettlementDate"
              className={inputCls}
              defaultValue={toDateInputValue(building.plannedSettlementDate)}
            />
          </label>
        </div>
      </FormSection>

      <FormSection title="Фото для выбора позиции">
        <ImageUpload
          value={heroImage}
          folder="buildings"
          label=""
          onChange={setHeroImage}
        />
      </FormSection>

      <div className="flex justify-end">
        <Button text="Сохранить" variant="accent" size="md" type="submit" />
      </div>
    </form>
  );
};

export default EditBuildingForm;
