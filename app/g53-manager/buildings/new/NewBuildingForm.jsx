"use client";

import { useState } from "react";
import { createBuilding } from "../../actions";
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

const NewBuildingForm = ({ complexes }) => {
  const [heroImage, setHeroImage] = useState("");

  return (
    <form action={createBuilding} className="mt-8 grid gap-6">
      <input type="hidden" name="heroImage" value={heroImage} />

      <FormSection title="ЖК и основное">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className={labelCls}>
            ЖК *
            <select name="complexId" required className={selectCls}>
              <option value="">— выберите —</option>
              {complexes.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>

          <label className={labelCls}>
            Позиция (номер / обозначение)
            <input type="text" name="position" maxLength={10} className={inputCls} placeholder="1" />
          </label>

          <label className={labelCls}>
            Название
            <input type="text" name="name" maxLength={80} className={inputCls} placeholder="Корпус А" />
          </label>

          <label className={labelCls}>
            Адрес
            <input type="text" name="address" maxLength={200} className={inputCls} placeholder="ул. Юннатов, 12" />
          </label>

          <label className={labelCls}>
            Статус
            <select name="status" className={selectCls} defaultValue="active">
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
            <input type="number" name="floorsTotal" className={inputCls} placeholder="17" min="1" max="300" />
          </label>

          <label className={labelCls}>
            Подъездов
            <input type="number" name="entrancesTotal" className={inputCls} placeholder="4" min="1" max="99" />
          </label>

          <label className={labelCls}>
            Плановая дата сдачи
            <input type="date" name="plannedSettlementDate" className={inputCls} />
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

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="accent">Добавить дом</Button>
        <Button variant="outline" size="sm" linkToPage="/g53-manager/buildings">Отмена</Button>
      </div>
    </form>
  );
};

export default NewBuildingForm;
