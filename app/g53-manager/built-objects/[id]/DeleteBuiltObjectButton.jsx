"use client";

import { deleteBuiltObject } from "../../actions";

const DeleteBuiltObjectButton = ({ id, title }) => (
  <form
    action={deleteBuiltObject}
    onSubmit={(e) => {
      if (!confirm(`Удалить объект «${title}»?`)) e.preventDefault();
    }}
  >
    <input type="hidden" name="id" value={id} />
    <button
      type="submit"
      className="h-11 rounded-4xl border border-red-200 px-5 text-sm font-medium text-red-500 transition hover:bg-red-50"
    >
      Удалить объект
    </button>
  </form>
);

export default DeleteBuiltObjectButton;
