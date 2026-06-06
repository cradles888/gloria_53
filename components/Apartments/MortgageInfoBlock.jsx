import Button from '@/components/UI/Button'

const MortgageInfoBannerMini = () => {
  return (
    <section className="my-6">
      <div className="relative overflow-hidden rounded-4xl">
        <img
          src="/apartments/MortageBanner.png"
          alt="Интерьер квартиры"
          className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:p-8">
          <div className="max-w-2xl text-white">
            <p className="mb-2 text-xl font-medium sm:text-2xl">
              Ипотека рассчитывается индивидуально
            </p>

            <p className="text-sm leading-relaxed text-white/85 sm:text-base">
              Мы поможем сориентироваться по условиям и подобрать удобный вариант покупки.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              text="Узнать условия"
              size="sm"
              variant="white"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MortgageInfoBannerMini