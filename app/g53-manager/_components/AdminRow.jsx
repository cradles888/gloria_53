"use client";

import { useRouter } from "next/navigation";

import RowMenu from "./RowMenu";

// Строка списка в админке: клик по строке открывает объект (openHref),
// справа — меню действий (RowMenu) с «Редактировать» и «Удалить».
const AdminRow = ({
  openHref,
  editHref,
  deleteAction,
  deleteId,
  deleteName,
  className = "",
  children,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-stretch gap-1 pr-3 transition hover:bg-dark5 sm:pr-4">
      <div
        role="button"
        tabIndex={0}
        onClick={() => router.push(openHref)}
        onKeyDown={(e) => {
          if (e.key === "Enter") router.push(openHref);
        }}
        className={`min-w-0 flex-1 cursor-pointer p-5 sm:p-6 ${className}`}
      >
        {children}
      </div>

      <div className="flex items-center">
        <RowMenu
          editHref={editHref}
          deleteAction={deleteAction}
          deleteId={deleteId}
          deleteName={deleteName}
        />
      </div>
    </div>
  );
};

export default AdminRow;
