"use client";
import { useState, useEffect, useRef } from "react";
import { CheckMark } from "@/icons/CheckMark";
import { ChevronRight } from "@/icons/ChevronRight";

const ComplexSelector = ({ selectedComplex, onSelect, options }) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [isPressedParam, setIsPressedParam] = useState(null);
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
  }, [isOpenList]);

  const listComplex = [
    { name: "ЖК Юннатов" },
    { name: "ЖК Раздолье" },
    { name: "ЖК Шелонская" },
  ];

  const handleComplexSelect = (index) => {
    onSelect(options[index].name);
    setIsPressedParam(index);
    setIsOpenList(false);
  };

  const toggleComplexList = (e) => {
    setIsOpenList(!isOpenList);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleComplexList}
        className="font-medium ml-2 inline-flex items-center gap-1 hover:text-accent transition-colors outline-none"
      >
        {selectedComplex}
        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isOpenList ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`
            p-2 absolute z-10
            right-1/4 bg-white w-1/4
            border border-dark40 rounded-4xl 
            transform transition-all duration-300
            ease-in-out mt-5
            hidden sm:block shadow-lg
            ${isOpenList ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
    `}
      >
        {listComplex.map((item, index) => (
          <div
            key={index}
            className={`
                        flex w-full items-center justify-between
                        gap-4 rounded-3xl px-4 py-3
                        text-left text-sm transition
                            ${isPressedParam === index ? "bg-accent text-white" : "bg-white text-dark hover:bg-dark10"}
                            ${isPressedParam === index && index === 0 ? "rounded-t-4xl" : ""}
                            ${isPressedParam === index && index === listComplex.length - 1 ? "rounded-b-4xl" : ""}
                        `}
            onClick={() => handleComplexSelect(index)}
          >
            <span
              className={isPressedParam === index ? "text-white" : "text-dark"}
            >
              {item.name}
            </span>
            {isPressedParam === index && (
              <CheckMark className="w-5 h-5"/>
            )}
          </div>
        ))}
      </div>

      <div
        className={`
        fixed sm:hidden
        bottom-0 left-0 right-0
        z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpenList ? "translate-y-0" : "translate-y-full"}
    `}
      >
        <div className="bg-white rounded-t-3xl border-t border-dark20 shadow-lg">
          <div className="flex justify-between items-center p-4 border-b border-dark10">
            <span className="text-lg font-medium text-dark">
              Выберите жилой комплекс
            </span>
            <button
              onClick={toggleComplexList}
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

          <div className="max-h-[60vh] overflow-y-auto">
            {listComplex.map((item, index) => (
              <div
                key={index}
                className={`
                            flex justify-between items-center 
                            py-4 px-6 cursor-pointer
                            transition-colors duration-200
                            active:bg-dark10 text-base
                            ${isPressedParam === index ? "bg-accent text-white" : "bg-white text-dark"}
                            ${index !== listComplex.length - 1 ? "border-b border-dark10" : ""}
                        `}
                onClick={() => handleComplexSelect(index)}
              >
                <span
                  className={
                    isPressedParam === index
                      ? "text-white font-medium"
                      : "text-dark"
                  }
                >
                  {item.name}
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

          <div className="p-4 border-t border-dark10">
            <button
              onClick={toggleComplexList}
              className="w-full py-3 text-center text-dark60 hover:text-dark transition-colors text-base"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>

      {isOpenList && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity duration-300"
          onClick={toggleComplexList}
        />
      )}
    </div>
  );
};
export default ComplexSelector;
