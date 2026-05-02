import { formatted } from '@/utils/formatPrice'
import AmenityList from '@/components/Amenity/AmenityList'
import AmenityItem from '@/components/Amenity/AmenityItem'
import FreemodeSliderChildren from '@/components/Swiper/FreemodeSliderChildren';

const AppartmentCard = ({
    view,
    id,
    rooms,
    sqm,
    price,
    priceSqm,
    imageUrl,
    imageAlt,
    position,
    floor,
    floorTotal,
    amenities = []
}) => {

    const formattedPrice = formatted(price)
    const formattedSqm = formatted(sqm)
    const formattedPriceSqm = formatted(priceSqm)
    if (view === 'grid') {
        return (
            <article className="bg-dark10 p-6 rounded-3xl cursor-pointer">
                <header className="grid gap-1">
                    <div className="flex justify-between">
                        <p className="text-2xl text-dark font-medium">{rooms} комнаты, {formattedSqm}&nbsp;м<sup>2</sup></p>
                        <div className="justify-items-end">
                            <p className="text-base bg-dark15 rounded-lg text-dark px-2 py-1">№{id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <p className="text-2xl text-accent font-medium">{formattedPrice}</p>
                        <p className="text-xl text-dark80">·</p>
                        <p className="text-sm text-dark80">{formattedPriceSqm} м<sup>2</sup></p>
                    </div>

                    <div>
                        <p className="text-sm text-dark80">Ипотека от 37 832 ₽ в мес.</p>
                    </div>
                </header>


                <div className="my-10 md:my-16 flex justify-center 2xl:justify-start">
                    <img className="mix-blend-multiply w-55 md:w-70 lg:w-auto" src={imageUrl} alt={imageAlt} />
                </div>

                <section className="flex items-center gap-1">
                    <p className="text-dark text-sm md:text-base">Позиция {position}</p>
                    <p className="text-xl text-dark80">·</p>
                    <p className="text-dark text-sm md:text-base">Этаж {floor} из {floorTotal}</p>
                </section>
                <footer className='border-t-2 border-dark/15 mt-2 pt-4'>
                    <FreemodeSliderChildren className='rounded-xl'>
                        {amenities.map((amenityId) => (
                            <AmenityItem key={amenityId} amenityId={amenityId} className={'rounded-xl text-sm'}/>
                        ))}
                    </FreemodeSliderChildren>
                    
                        {/* <AmenityList amenities={amenities} /> */}
                    
                </footer>
            </article>
        );
    } return (

        <article className='md:grid flex justify-between flex-row md:grid-cols-[1fr_1fr_0.6fr_1fr_0.4fr] gap-6 md:gap-10 lg:gap-auto xl:grid-cols-[1fr_1.3fr_1fr_1.3fr_1fr] bg-dark10 p-8 rounded-3xl'>
            <section className='content-center'>
                <img
                    className='mix-blend-multiply justify-self-center-safe mt-7 sm:ml-5 w-[clamp(150px,_25vw,_600px)] sm:w-50 -rotate-90 sm:rotate-0 md:w-50'
                    src={imageUrl}
                    alt={imageAlt} />
            </section>

            <section className='hidden md:flex flex-col gap-1 justify-center'>
                <section className="flex gap-4">
                    <h3 className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[28px] text-dark font-medium">{rooms} комнаты, {formattedSqm}&nbsp;м<sup>2</sup></h3>
                </section>
                <section className="grid lg:flex items-center gap-1">
                    <p className="text-base md:text-lg lg:text-2xl xl:text-2xl 2xl:text-[28px] text-accent font-medium">{formattedPrice}</p>
                    <p className="text-2xl hidden lg:block text-dark80">·</p>
                    <p className="text-xs lg:text-sm xl:text-base text-dark80">{formattedPriceSqm} м<sup>2</sup></p>
                </section>
                <section className='pt-2 lg:pt-0'>
                    <p className="text-xs lg:text-sm xl:text-base text-dark80">Ипотека от 37 832 ₽ в&nbsp;мес.</p>
                </section>
            </section>

            {/* mobile */}

            <section className='hidden md:grid gap-2 content-center justify-center'>
                <p className="text-dark text-xs lg:text-sm xl:text-base">Позиция {position}</p>
                {/* <p className="text-xl text-dark80 hidden lg:block">·</p> */}
                <p className="text-dark text-xs lg:text-sm xl:text-base">Этаж {floor} из {floorTotal}</p>
            </section>
            <section className='hidden md:grid mx-auto gap-2 content-center '>
                {amenities.map((amenityId) => (
                    <AmenityItem key={amenityId} amenityId={amenityId} className={'max-w-min text-xs rounded-xl lg:text-sm'}/>
                ))}
            </section>
            <section className='flex justify-end items-center absolute md:static'>
                <p className="text-xs lg:text-sm xl:text-base bg-dark/10 rounded-lg text-dark px-2 py-1">№{id}</p>
            </section>

            <section className='flex justify-between md:hidden'>
                <section className='flex flex-col gap-2'>
                    <p className='text-dark80 text-xs sm:text-sm'>Количество&nbsp;комнат:</p>
                    <p className='text-dark80 text-xs sm:text-sm'>Площадь</p>
                    <p className='text-dark80 text-xs sm:text-sm'>Стоимость:</p>
                    <p className='text-dark80 text-xs sm:text-sm'>Стоимость&nbsp;за&nbsp;м<sup>2</sup>:</p>
                    <p className='text-dark80 text-xs sm:text-sm'>Ипотека&nbsp;от&nbsp;(в&nbsp;месяц):</p>
                    <p className='text-dark80 text-xs sm:text-sm'>Позиция:</p>
                    <p className='text-dark80 text-xs sm:text-sm'>Этаж из {floorTotal}:</p>
                </section>
                <div className='grid'>
                    <section className='flex flex-col gap-2 items-end'>
                        
                            <p className="text-xs sm:text-sm text-dark font-medium ">{rooms}</p>
                            <p className='text-xs sm:text-sm text-dark font-medium'>{formattedSqm} м<sup>2</sup></p>
                        
                        
                            <p className="text-xs sm:text-sm text-dark font-medium">{formattedPrice}&nbsp;₽</p>
                            <p className="text-xs sm:text-sm text-dark">{formattedPriceSqm}&nbsp;₽</p>
                        
                        
                            <p className="text-xs sm:text-sm text-dark">37 832 ₽</p>
        
                    </section>
        
                    <section className='flex flex-col gap-2 items-end'>
                        <p className="text-dark text-sm">{position}</p>
                        <p className="text-dark text-sm">{floor}</p>
                    </section>
                
                </div>
            </section>
        </article>
    );
};




export default AppartmentCard;