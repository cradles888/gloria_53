"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ApartmentImportButton = () => {
  const inputRef = useRef(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFile = async (file) => {
    if (!file) return;
    setResult(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/apartments/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setResult({ error: data.error || "Ошибка загрузки" });
        return;
      }

      setResult(data);
      router.refresh();
    } catch {
      setResult({ error: "Ошибка соединения" });
    } finally {
      setIsLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <a
          href="/api/admin/apartments/template"
          className="flex h-10 items-center gap-2 rounded-4xl border border-dark15 px-4 text-sm text-dark50 transition hover:border-dark hover:text-dark"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Шаблон
        </a>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => inputRef.current?.click()}
          className="flex h-10 items-center gap-2 rounded-4xl border border-dark40 px-4 text-sm font-medium text-dark transition hover:border-accent hover:text-accent disabled:opacity-60"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          {isLoading ? "Загрузка..." : "Импорт Excel"}
        </button>
      </div>

      {result && (
        <div className={`rounded-3xl px-4 py-2.5 text-sm ${result.error ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
          {result.error ? (
            result.error
          ) : (
            <>
              Создано: {result.created} из {result.total}
              {result.skipped?.length > 0 && (
                <span className="ml-2 text-dark50">
                  · пропущено: {result.skipped.length}
                </span>
              )}
            </>
          )}
        </div>
      )}

      {result?.skipped?.length > 0 && (
        <ul className="w-full rounded-3xl border border-dark15 bg-white px-4 py-3 text-xs text-dark50">
          {result.skipped.map((s) => (
            <li key={s.row}>Строка {s.row}: {s.reason}</li>
          ))}
        </ul>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
};

export default ApartmentImportButton;
