import Link from "next/link";

import { ArrowRight } from "@/icons/ArrowRight";

const NewsSidebar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <aside className="w-full min-w-0 h-max lg:sticky lg:top-24">
      <div className="min-w-0 overflow-hidden rounded-4xl border border-dark10 bg-white shadow-sm">
        <div className="border-b border-dark10 p-5">
          <h2 className="mt-2 text-2xl font-medium text-dark">
            Новости и акции
          </h2>
        </div>

        <nav className="p-2">
          <div className="flex rounded-2xl gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.id)}
                  className={`group flex min-w-max items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition lg:w-full lg:min-w-0 lg:py-4 ${
                    isActive
                      ? "bg-dark text-white"
                      : "bg-transparent text-dark hover:bg-dark10"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      {category.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default NewsSidebar;
