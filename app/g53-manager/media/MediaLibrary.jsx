"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FOLDERS = [
  { id: "apartments", label: "Квартиры" },
  { id: "buildings", label: "Дома" },
  { id: "news", label: "Новости" },
  { id: "built-objects", label: "Постр. объекты" },
  { id: "misc", label: "Прочее" },
];

const MediaLibrary = () => {
  const inputRef = useRef(null);
  const [folder, setFolder] = useState("apartments");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [copied, setCopied] = useState(null);

  const fetchFiles = useCallback(async (f) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/media?folder=${f}`);
      const data = await res.json();
      setFiles(data.files ?? []);
    } catch {
      setFiles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles(folder);
  }, [folder, fetchFiles]);

  const handleFolderChange = (f) => {
    setFolder(f);
    setFiles([]);
  };

  const handleCopy = async (url, path) => {
    await navigator.clipboard.writeText(url);
    setCopied(path);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = async (path) => {
    if (!confirm("Удалить это изображение?")) return;
    await fetch(`/api/upload?path=${encodeURIComponent(path)}`, { method: "DELETE" });
    setFiles((prev) => prev.filter((f) => f.path !== path));
  };

  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (!selectedFiles.length) return;

    setIsUploading(true);
    setUploadProgress({ done: 0, total: selectedFiles.length });

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      try {
        await fetch("/api/upload", { method: "POST", body: formData });
      } catch {
        // продолжаем с остальными файлами
      }
      setUploadProgress({ done: i + 1, total: selectedFiles.length });
    }

    setIsUploading(false);
    setUploadProgress(null);
    if (inputRef.current) inputRef.current.value = "";
    fetchFiles(folder);
  };

  return (
    <div className="mt-8">
      {/* ─ Панель управления ─ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Табы папок */}
        <div className="flex flex-wrap gap-2">
          {FOLDERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => handleFolderChange(f.id)}
              className={`h-9 rounded-full px-4 text-sm font-medium transition ${
                folder === f.id
                  ? "bg-dark text-white"
                  : "border border-dark15 text-dark hover:border-dark"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Кнопка загрузки */}
        <button
          type="button"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
          className="flex h-10 shrink-0 items-center gap-2 rounded-4xl bg-accent px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {isUploading ? (
            <>Загрузка {uploadProgress?.done}/{uploadProgress?.total}...</>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Загрузить фото
            </>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {/* ─ Сетка файлов ─ */}
      {isLoading ? (
        <div className="mt-10 text-center text-sm text-dark50">Загрузка...</div>
      ) : files.length === 0 ? (
        <div className="mt-10 rounded-4xl border-2 border-dashed border-dark15 p-12 text-center">
          <p className="text-sm text-dark50">В этой папке пока нет изображений</p>
          <p className="mt-1 text-xs text-dark30">Нажмите «Загрузить фото» чтобы добавить</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {files.map((file) => (
            <div key={file.path} className="group flex flex-col overflow-hidden rounded-3xl border border-dark15 bg-white">
              {/* Превью */}
              <div className="relative h-36 bg-dark10">
                <img
                  src={file.url}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
                {/* Кнопка удаления */}
                <button
                  type="button"
                  onClick={() => handleDelete(file.path)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition hover:bg-red-500 group-hover:opacity-100"
                  title="Удалить"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Имя и кнопка */}
              <div className="flex flex-col gap-2 p-3">
                <p className="truncate text-xs text-dark50" title={file.name}>
                  {file.name}
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy(file.url, file.path)}
                  className={`h-8 w-full rounded-full text-xs font-medium transition ${
                    copied === file.path
                      ? "bg-green-500 text-white"
                      : "bg-dark10 text-dark hover:bg-dark hover:text-white"
                  }`}
                >
                  {copied === file.path ? "Скопировано" : "Копировать ссылку"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
