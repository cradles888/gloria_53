import Card from "@/components/Unnatov/UI/Card";
import SwiperFreemode from "@/components/Swiper/SwiperFreemode";

const uniInfoBlock = ({
    title,
    desc,
    data,
    slider = false,
    className = "",
    classNameCol = "",
    colOff = false,
    typeSlider = "default",
    horizontalCard = false,
    slidesPerView = 0,
}) => {
    return (
        <article
            className={`${slider ? `${className} my-30` : `lg:gap-16 my-15 md:my-30 ${className}`}`}
        >
            <section
                className={`grid md:grid-cols-[1fr_1.3fr] gap-8 lg:gap-16 mb-16  ${slider ? "lg:mb-16" : ""}`}
            >
                <h3 className="text-xl md:text-[32px] font-medium text-dark leading-[116%]">
                    {title}
                </h3>
                <p className="text-base text-dark leading-[140%]">{desc}</p>
            </section>

            {slider ? (
                <SwiperFreemode
                    data={data}
                    type={typeSlider}
                    horizontalCard={horizontalCard}
                    slidesPerView={slidesPerView}
                />
            ) : (
                <div>
                    <section
                        className={`hidden lg:grid gap-6 ${colOff ? "" : "lg:grid-cols-2 "} ${classNameCol}`}
                    >
                        {data.map((item, index) => (
                            <Card key={index} {...item} />
                        ))}
                    </section>
                    <article className="lg:hidden">
                        <SwiperFreemode
                            data={data}
                            type={typeSlider}
                            horizontalCard={horizontalCard}
                            slidesPerView={slidesPerView}
                        />
                    </article>
                </div>
            )}
        </article>
    );
};

export default uniInfoBlock;
