const PromoCard = ({
    title,
    text,
    image,
    alt,
    href = '#'
}) => {
    return (
        <article className="group relative min-h-[360px] overflow-hidden rounded-4xl sm:min-h-[420px] lg:min-h-[500px]">
      <img
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        src={image}
        alt={alt}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/10" />

      <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between p-6 sm:min-h-[380px] sm:p-8 lg:min-h-[460px]">
        <div>
          <h2 className="max-w-xl text-2xl font-medium leading-tight text-white sm:text-3xl xl:text-4xl">
            {title}
          </h2>

          {text ? (
            <p className="mt-3 max-w-md text-base leading-relaxed text-white/90 md:text-lg">
              {text}
            </p>
          ) : null}
        </div>

        <a
          href={href}
          className="flex h-12 w-12 items-center justify-center self-end rounded-full bg-white transition duration-200 active:scale-95 active:bg-accent md:h-15 md:w-15"
          aria-label={`Подробнее: ${title}`}
        >
          <img
            src="/arrow-right.svg"
            alt=""
            className="h-5 w-7 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-0 md:h-6 md:w-7"
          />
        </a>
      </div>
    </article>
    );
}
export default PromoCard;