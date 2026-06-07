"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

// Единое меню действий для строки списка в админке: «Редактировать» и «Удалить».
// Меню рендерится через anchor (портал Headless UI), поэтому не обрезается
// родительским overflow-hidden карточки списка.
const RowMenu = ({ editHref, deleteAction, deleteId, deleteName = "запись" }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm(`Удалить «${deleteName}»? Действие необратимо.`)) return;

    const formData = new FormData();
    formData.set("id", String(deleteId));
    startTransition(() => deleteAction(formData));
  };

  return (
    <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
      <Menu>
        <MenuButton
          aria-label="Действия"
          className="flex h-9 w-9 items-center justify-center rounded-full text-dark50 transition hover:bg-dark10 hover:text-dark data-[open]:bg-dark10 data-[open]:text-dark"
        >
          <MoreVertical className="h-5 w-5" />
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className="z-50 w-48 origin-top-right rounded-2xl border border-dark15 bg-white p-1 shadow-xl [--anchor-gap:6px] focus:outline-none"
        >
          <MenuItem>
            <Link
              href={editHref}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-dark data-[focus]:bg-dark5"
            >
              <Pencil className="h-4 w-4 text-dark50" />
              Редактировать
            </Link>
          </MenuItem>

          <MenuItem>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-red-600 data-[focus]:bg-red-50 disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" />
              {isPending ? "Удаление…" : "Удалить"}
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default RowMenu;
