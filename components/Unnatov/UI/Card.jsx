const Card = ({ title, desc, imageUrl, imageAlt, horizontalCard = false }) => {
    return(
        <article className="relative rounded-4xl w-full select-none min-h-[400px] sm:min-h-[500px] lg:min-h-[425px] overflow-hidden">
            <img
                className="absolute inset-0 w-full h-full object-cover object-top-left"
                src={imageUrl}
                alt={imageAlt}
            />
            <div className={`absolute z-10 inset-0  ${horizontalCard ? 'flex justify-between items-end py-8 px-6 xl:px-8' : 'grid content-end py-6 px-6 xl:px-8'}`}>
                <p className="text-white text-lg md:text-xl lg:text-xl xl:text-2xl font-medium">
                    {title}
                </p>
                <p className={`text-twopart text-base md:text-base lg:text-lg xl:text-xl ${horizontalCard ? 'font-semibold' : ''}`}>
                    {desc}
                </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </article>
    );
}

export default Card;