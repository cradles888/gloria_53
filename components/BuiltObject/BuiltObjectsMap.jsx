"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const DEFAULT_CENTER = [31.2755, 58.5228];

const BuiltObjectsMap = ({ objects = [] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(objects[0]);

  const initMap = useCallback(async () => {
    if (!mapRef.current || mapInstanceRef.current || !window.ymaps3) {
      return;
    }

    await window.ymaps3.ready;
    window.ymaps3.import.registerCdn("https://cdn.jsdelivr.net/npm/{package}", [
      "@yandex/ymaps3-default-ui-theme@0.0",
    ]);

    const { YMapZoomControl } = await window.ymaps3.import(
      "@yandex/ymaps3-default-ui-theme",
    );
    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapMarker,
      YMapControls,
    } = window.ymaps3;

    const map = new YMap(mapRef.current, {
      location: {
        center: DEFAULT_CENTER,
        zoom: 12,
      },
      behaviors: ["drag", "pinchZoom", "wheelZoom"],
    });
    map.addChild(
      new YMapControls({ position: "right" }).addChild(new YMapZoomControl({})),
    );

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    // маркеры
    objects.forEach((object) => {
      const markerElement = document.createElement("button");
      markerElement.type = "button";
      markerElement.className = `
  group relative flex h-10 w-10 items-center justify-center
  transition-all hover:scale-110 active:scale-95
`;

      markerElement.innerHTML = `
  <span class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5">
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-dark/80"
    >
      <path
        d="M16 3L28 9V27C28 28.1046 27.1046 29 26 29H6C4.89543 29 4 28.1046 4 27V9L16 3Z"
        fill="currentColor"
      />
      <path
        d="M12 29V22C12 20.8954 12.8954 20 14 20H18C19.1046 20 20 20.8954 20 22V29"
        fill="white"
      />
      <rect x="9" y="11" width="3" height="3" rx="0.6" fill="white" />
      <rect x="14.5" y="11" width="3" height="3" rx="0.6" fill="white" />
      <rect x="20" y="11" width="3" height="3" rx="0.6" fill="white" />
      <rect x="9" y="16" width="3" height="3" rx="0.6" fill="white" />
      <rect x="14.5" y="16" width="3" height="3" rx="0.6" fill="white" />
      <rect x="20" y="16" width="3" height="3" rx="0.6" fill="white" />
    </svg>
  </span>
`;

      markerElement.addEventListener("click", () => {
        setSelectedObject(object);

        map.update({
          location: {
            center: object.coordinates,
            zoom: 15,
            duration: 600,
          },
        });
      });

      const marker = new YMapMarker(
        { coordinates: object.coordinates },
        markerElement,
      );

      map.addChild(marker);
    });

    mapInstanceRef.current = map;
  }, []);

  // Инициализация карты
  useEffect(() => {
    // Небольшая задержка, чтобы ymaps3 точно подгрузился
    const timer = setTimeout(() => {
      initMap();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [initMap]);

  return (
    <div className="grid overflow-hidden rounded-4xl bg-accent backdrop-blur-xl lg:grid-cols-[1fr_360px]">
      <div className="relative min-h-[420px] lg:min-h-[520px]">
        <div ref={mapRef} className="absolute inset-0" />
      </div>

      <div className="relative">
        <img
          className="absolute right-0 w-full lg:w-[360px] h-full brightness-75 object-cover"
          src={selectedObject.images[0]}
          alt="object"
        />
        <aside className="grid relative h-full content-between gap-6 p-5 bg-black/20  sm:p-6 lg:p-7">
          <div>
            {/* <span className="mb-4 inline-flex rounded-4xl bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            Выбранный объект
          </span> */}

            <h3 className="text-2xl font-medium leading-tight text-white">
              {selectedObject.title}
            </h3>

            <p className="mt-3 text-base leading-relaxed text-white">
              {selectedObject.complex}
            </p>
          </div>
          <div>
            <p className="text-md sm:text-lg text-white/70">Год сдачи</p>

            <p className="mt-1 text-xl sm:text-2xl font-medium text-white">
              {selectedObject.year}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BuiltObjectsMap;
