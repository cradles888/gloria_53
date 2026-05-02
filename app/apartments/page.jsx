'use client'
import Filter from "@/components/Filter/page";
import ButtonDropdown from "@/components/UI/ButtonDropdown";
import ComplexSelector from "@/components/ComplexSelector";
import { useState } from "react";

import { allApartments } from '@/data/apartments'
import { complex } from '@/data/complex'

import SliderSwitch from '@/components/UI/SliderSwitch';
import AppartmentCard from "@/components/UI/AppartmentCard";

export default function Appartments() {
    const [selectedComplex, setSelectedComplex] = useState('ЖК Юннатов');
    const [view, setView] = useState('grid');
    
    const selectParamChoice = (indexButton) => {
        setSelectedParam(indexButton)
    }

    return (
        <div className="container-padding mx-auto">
            <div className="text-center my-30">
                <h1 className="text-4xl md:text-5xl text-dark px-4">
                    Квартиры в
                    <ComplexSelector
                        selectedComplex={selectedComplex}
                        onSelect={setSelectedComplex}
                        options={complex}
                    />
                </h1>
            </div>
            <article>
                <Filter />
                <div className="flex justify-between">
                <ButtonDropdown
                    text={'Сортировать'}
                    iconLink={'/chevron-arrow.svg'}
                    iconAlt={'next-to-page'}
                />
                            <SliderSwitch view={view} setView={setView}/>
                </div>
            </article>

        
            <div className={`${view == 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6' : 'grid gap-6'} mt-12`}>
                {allApartments.map((item, index) => (
                    <AppartmentCard view={view} key={index} {...item} />
                ))}
            </div>

        </div>
    );
}