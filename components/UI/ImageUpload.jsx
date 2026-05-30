"use client";

import { useRef, useState } from "react";
import { UploadIcon } from "@/icons";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const BUCKET = "gloria-images";

const getPathFromUrl = (url) => {
  if (!url || !SUPABASE_URL) return null;
  const prefix = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`;
  return url.startsWith(prefix) ? url.slice(prefix.length) : null;
};

const deleteStorageFile = async (url) => {
  const path = getPathFromUrl(url);
  if (!path) return;
  try {
    await fetch(`/api/upload?path=${encodeURIComponent(path)}`, { method: "DELETE" });
  } catch {
    // best-effort cleanup
  }
};

const ImageUpload = ({
  value = "",
  onChange,
  folder = "misc",
  label = "Фотография",
  placeholder = "Нажмите или перетащите файл",
}) => {
  const inputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file) => {
    if (!file) return;
    setError("");
    setIsUploading(true);

    const oldUrl = value;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка загрузки");
        return;
      }

      if (oldUrl) {
        await deleteStorageFile(oldUrl);
      }

      onChange(data.url);
    } catch {
      setError("Ошибка соединения");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    await deleteStorageFile(value);
    onChange("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="grid gap-2">
      {label && <span className="text-sm font-medium text-dark">{label}</span>}

      {value ? (
        <div className="relative overflow-hidden rounded-3xl border border-dark15 bg-dark5">
          <img src={value} alt="" className="h-125 w-full object-cover" />
          <div className="absolute inset-0 flex items-end justify-between gap-3 bg-linear-to-t from-black/50 to-transparent p-4">
            <span className="truncate text-xs text-white/80">{value.split("/").pop()}</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="h-8 rounded-full bg-white/20 px-3 text-xs font-medium text-white backdrop-blur transition hover:bg-white/30"
              >
                Заменить
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="h-8 rounded-full bg-red-500/80 px-3 text-xs font-medium text-white backdrop-blur transition hover:bg-red-500"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          disabled={isUploading}
          className="flex h-36 w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-dark20 bg-dark5 text-dark50 transition hover:border-accent hover:bg-accent/5 hover:text-accent disabled:opacity-60"
        >
          {isUploading ? (
            <span className="text-sm">Загрузка...</span>
          ) : (
            <>
              <UploadIcon />
              <span className="text-sm">{placeholder}</span>
              <span className="text-xs">JPEG, PNG, WebP до 10 МБ</span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

export default ImageUpload;
