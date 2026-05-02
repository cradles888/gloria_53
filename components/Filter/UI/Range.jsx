"use client";
import { useState } from "react";
import { Range } from "react-range";

const RangeInput = ({
  step = 0.1,
  min = 0,
  max = 17,
  values = [0, 17],
  onChange,
  className = "",
  classNameBar = "",
}) => {
  const currentValues = values?.length === 2 ? values : [min, max];

  const leftPercent = ((currentValues[0] - min) / (max - min)) * 100;
  const rightPercent = ((currentValues[1] - min) / (max - min)) * 100;

  const handleChange = (newValues) => {
    onChange(newValues);
  };

  return (
    <div className="relative h-12 sm:h-12 rounded-full md:w-xs xl:w-lg bg-white px-4 border border-dark40 hover:border-accent ">
      <div className="grid grid-cols-[112px_auto_112px] justify-between items-center h-full text-base text-dark ">
        <div className="flex items-center justify-end gap-2 ">
          <span className="shrink-0">От</span>
          <span className="inline-block w-[72px] text-left font-medium text-dark80 tabular-nums whitespace-nowrap">
            {values[0]} млн
          </span>
        </div>

        <div className="mx-4 h-5 w-px bg-dark/30" />

        <div className="flex items-center justify-start">
          <span className="shrink-0">До</span>
          <span className="inline-block w-[72px] text-right text-dark80 font-medium tabular-nums whitespace-nowrap">
            {values[1]} млн
          </span>
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-2 translate-y-1/2 px-4 ">
        <Range
          step={step}
          min={min}
          max={max}
          values={values}
          onChange={handleChange}
          renderTrack={({ props, children }) => {
            const leftPercent = ((values[0] - min) / (max - min)) * 100;
            const rightPercent = ((values[1] - min) / (max - min)) * 100;

            return (
              <div
                {...props}
                className={`relative sm:-bottom-2 top-px sm:top-auto h-1  ${classNameBar}`}
                style={{
                  ...props.style,
                }}
              >
                <div
                  className="absolute h-full bg-accent rounded-full"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${rightPercent - leftPercent}%`,
                  }}
                />
                {children}
              </div>
            );
          }}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              key={index}
              className="w-3 h-3 bg-accent rounded-full focus:outline-none cursor-pointer hover:w-3.5 hover:h-3.5"
              style={{
                ...props.style,
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default RangeInput;
