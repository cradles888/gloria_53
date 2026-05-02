import Link from "next/link";
import styles from "./Card.module.css";
import { ArrowRight } from "@/icons/ArrowRight";

const CardNews = ({
  date,
  imageUrl,
  imageAlt,
  title,
  desc,
  href = "#",
  category = "Новости",
}) => {
  return (
    <article className="group grid h-[480px] overflow-hidden rounded-3xl bg-dark10 transition duration-300">
      <Link href={href} className="grid h-full content-start">
        <div className="relative overflow-hidden h-fit">
          <img
            className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-[1.04] sm:h-[220px] md:h-[240px]"
            src={imageUrl}
            alt={imageAlt || title}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-80" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-dark backdrop-blur">
              {category}
            </span>

            <time className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-dark backdrop-blur">
              {date}
            </time>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:p-6">
          <div className="grid gap-3">
            <h3 className={`line-clamp-2 text-xl font-medium leading-tight text-dark transition group-hover:text-accent ${styles.titleTruncate}`}>
              {title}
            </h3>

            {desc ? (
              <p
                className={`line-clamp-3 text-sm leading-relaxed text-dark50  ${styles.descriptionTruncate}`}
              >
                {desc}
              </p>
            ) : null}
          </div>

          <div className="mt-auto flex items-center justify-between gap-4 pt-2">

            <section className=" px-4 flex gap-3 h-10 w-30 items-center justify-center rounded-full bg-white transition group-hover:bg-accent group-hover:text-white">
            <span className="text-sm font-medium text-accent group-hover:text-white">Читать</span>
              <ArrowRight className="text-dark/70 group-hover:text-white h-5.5 w-5.5"/>
            </section>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CardNews;
