"use client";

import { deleteBuilding } from "../../actions";

const DeleteBuildingButton = ({ id, name }) => (
  <form
    action={deleteBuilding}
    onSubmit={(e) => {
      if (!confirm(`Удалить дом «${name}»? Это действие необратимо.`)) {
        e.preventDefault();
      }
    }}
  >
    <input type="hidden" name="id" value={id} />
    <button
      type="submit"
      className="h-11 rounded-4xl border border-red-200 px-5 text-sm font-medium text-red-500 transition hover:border-red-400 hover:bg-red-50"
    >
      Удалить дом
    </button>
  </form>
);

export default DeleteBuildingButton;
