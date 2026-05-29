import Link from "next/link";

import { ArrowRight } from "@/icons/ArrowRight";

const FeaturedPromoBlock = ({ item }) => {
  if (!item) return null;

  const href = item.slug ? `/news/${item.slug}` : "#";

  return (
    <section className="group grid overflow-hidden rounded-3xl bg-[#EFEEE9] lg:h-full lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="order-2 flex flex-col justify-between p-5 text-dark sm:p-6 lg:order-1 lg:h-full lg:p-7">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-white">
                {item.label || "Акция"}
            </span>

            {item.date ? (
                <time className="rounded-full bg-dark10 px-3.5 py-1.5 text-xs font-medium text-dark80">
                {item.date}
              </time>
            ) : null}
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-dark50">
            В центре внимания
          </p>

          <h2 className="mt-3 line-clamp-2 max-w-2xl text-2xl font-medium leading-tight text-dark sm:text-[28px]">
            {item.title}
          </h2>

          {item.excerpt ? (
            <p className="mt-4 line-clamp-2 max-w-xl text-sm leading-6 text-dark80">
              {item.excerpt}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Link
            href={href}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-4xl bg-dark px-5 text-sm font-medium text-white transition duration-300 hover:bg-accent active:scale-[0.98]"
          >
            Подробнее
            <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" />
          </Link>

          <span className="h-px flex-1 bg-dark15" />
        </div>
      </div>

      <div className="order-1 relative h-48 overflow-hidden sm:h-56 lg:order-2 lg:h-full">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-dark/45 via-transparent to-transparent lg:bg-linear-to-r lg:from-white/10 lg:via-transparent lg:to-dark/25" />
      </div>
    </section>
  );
};

export default FeaturedPromoBlock;
