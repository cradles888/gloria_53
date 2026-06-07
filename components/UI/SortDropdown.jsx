"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "@/icons/ChevronRight";
import { CheckMark } from "@/icons/CheckMark";

const SORT_KEYS = ["price-asc", "price-desc", "area-desc", "area-asc"];

const buttonIcon = ({ text, iconLink, iconAlt, isOpen = false, onChange, disabled = false }) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [isPressedParam, setIsPressedParam] = useState(null);
  const [paramSort, setParamSort] = useState([
    "Дешевле",
    "Дороже",
    "С большей площадью",
    "С маленькой площадью",
  ]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpenList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openDropdownList = () => {
    if (disabled) return;
    setIsOpenList(!isOpenList);
  };

  // В неактивном режиме список всегда закрыт
  useEffect(() => {
    if (disabled) setIsOpenList(false);
  }, [disabled]);

  const statusParam = (indexParam) => {
    const next = isPressedParam === indexParam ? null : indexParam;
    setIsPressedParam(next);
    onChange?.(next === null ? null : SORT_KEYS[next]);

    if (next === null) {
      return;
    }

    setIsOpenList(!isOpenList);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={openDropdownList}
        disabled={disabled}
        title={disabled ? "Сортировка недоступна в поэтажном режиме" : undefined}
        className={`
          flex h-12 min-w-auto sm:min-w-[220px] items-center
          justify-between gap-4 rounded-4xl
          border border-dark40 bg-white
          px-5 text-dark transition
          ${disabled
            ? "cursor-not-allowed opacity-50"
            : "hover:border-accent hover:text-accent active:scale-[0.99]"}
        `}
      >
        {isPressedParam !== null ? paramSort[isPressedParam] : text}
        <ChevronRight className={`inline ${isOpenList ? "rotate-180" : null } transition duration-300 ease-in-out w-5 h-5`}/>
      </button>

      {/* Десктопная версия - выпадающий список */}
      <div
        className={`
        p-2 absolute z-20 mt-4
      bg-white w-70 border border-dark40
        rounded-4xl transform transition-all
        duration-300 ease-in-out
        hidden sm:block  shadow-lg
        ${isOpenList ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
    `}
      >
        {paramSort.map((text, index) => (
          <div
            key={index}
            className={`
              flex w-full items-center justify-between
              gap-4 rounded-3xl px-4 py-3
              text-left text-sm transition
                ${isPressedParam === index ? "bg-accent text-white" : "bg-white text-dark hover:bg-dark10"}
                ${isPressedParam === index && index === 0 ? "rounded-t-4xl" : ""}
                ${isPressedParam === index && index === paramSort.length - 1 ? "rounded-b-4xl" : ""}
              `}
            onClick={() => statusParam(index)}
          >
            <span
              className={`inline-flex justify-between ${isPressedParam === index ? "text-white" : "text-dark"}`}
            >
              {text}
            </span>
            {isPressedParam === index && (
              <CheckMark className="w-5 h-5"/>
            )}
          </div>
        ))}
      </div>

      {/* Мобильная версия - модальное окно снизу */}
      <div
        className={`
        fixed sm:hidden
        bottom-0 left-0 right-0
        z-100
        transform transition-transform duration-300 ease-in-out
        ${isOpenList ? "translate-y-0" : "translate-y-full"}
    `}
      >
        {/* Заголовок модального окна */}
        <div className="bg-white rounded-t-3xl border-t border-dark20 shadow-lg">
          <div className="flex justify-between items-center p-4 border-b border-dark10">
            <span className="text-lg font-medium text-dark">
              Сортировать по
            </span>
            <button
              onClick={openDropdownList}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark5"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Список опций */}
          <div className="max-h-[60vh] overflow-y-auto">
            {paramSort.map((text, index) => (
              <div
                key={index}
                className={`
                            flex justify-between items-center 
                            py-4 px-6 cursor-pointer
                            transition-colors duration-200
                            active:bg-dark10
                            ${isPressedParam === index ? "bg-accent text-white" : "bg-white text-dark"}
                            ${index !== paramSort.length - 1 ? "border-b border-dark10" : ""}
                        `}
                onClick={() => statusParam(index)}
              >
                <span
                  className={
                    isPressedParam === index
                      ? "text-white font-medium"
                      : "text-dark"
                  }
                >
                  {text}
                </span>
                {isPressedParam === index && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Кнопка отмены */}
          <div className="p-4 border-t border-dark10">
            <button
              onClick={openDropdownList}
              className="w-full py-3 text-center text-dark60 hover:text-dark transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>

      {/* Затемнение фона для мобильной версии */}
      {isOpenList && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity duration-300"
          onClick={openDropdownList}
        />
      )}
    </div>
  );
};

export default buttonIcon;
