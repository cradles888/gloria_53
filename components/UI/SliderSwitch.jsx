'use client'
import { useState } from "react";

const SliderSwitch = ({view, setView}) => {
    
    return (
        <div className="bg-dark10 p-1 rounded-3xl inline-flex relative">
            <div className="grid grid-cols-2 relative">
                <div
                    className={`
            absolute bg-accent rounded-3xl transition-all duration-300 ease-out
            h-full w-1/2 z-10
            ${view === 'grid' ? 'translate-x-0' : 'translate-x-full'}
          `}
                />
                <button
                    onClick={() => setView('grid')}
                    className={`
            relative py-3 px-4 rounded-full z-10
            ${view === 'grid' ? 'text-white' : 'text-gray-500'}
          `}
                >
                    <svg className="h-4 w-4"  strokeWidth={1} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10.5C7.38071 10.5 8.5 11.6193 8.5 13V16C8.5 17.3807 7.38071 18.5 6 18.5H3C1.61929 18.5 0.5 17.3807 0.5 16V13C0.5 11.6193 1.61929 10.5 3 10.5H6ZM16 10.5C17.3807 10.5 18.5 11.6193 18.5 13V16C18.5 17.3807 17.3807 18.5 16 18.5H13C11.6193 18.5 10.5 17.3807 10.5 16V13C10.5 11.6193 11.6193 10.5 13 10.5H16ZM6 0.5C7.38071 0.5 8.5 1.61929 8.5 3V6C8.5 7.38071 7.38071 8.5 6 8.5H3C1.61929 8.5 0.5 7.38071 0.5 6V3C0.5 1.61929 1.61929 0.5 3 0.5H6ZM16 0.5C17.3807 0.5 18.5 1.61929 18.5 3V6C18.5 7.38071 17.3807 8.5 16 8.5H13C11.6193 8.5 10.5 7.38071 10.5 6V3C10.5 1.61929 11.6193 0.5 13 0.5H16Z" stroke="currentColor" />
                    </svg>

                </button>

                <button
                    onClick={() => setView('list')}
                    className={`
            relative py-3 px-4 rounded-full z-50
            ${view === 'list' ? 'text-white' : 'text-gray-500'}
          `}
                >
                    <svg className="h-4 w-5" strokeWidth={1.4} viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.8999 16.6998C25.1149 16.6998 26.1001 17.685 26.1001 18.9C26.1001 20.115 25.1149 21.1002 23.8999 21.1002H2.8999C1.68488 21.1002 0.699707 20.115 0.699707 18.9C0.699707 17.685 1.68488 16.6998 2.8999 16.6998H23.8999ZM23.8999 8.6998C25.1149 8.6998 26.1001 9.68497 26.1001 10.9C26.1001 12.115 25.1149 13.1002 23.8999 13.1002H2.8999C1.68488 13.1002 0.699707 12.115 0.699707 10.9C0.699707 9.68497 1.68488 8.6998 2.8999 8.6998H23.8999ZM23.8999 0.699799C25.1149 0.699799 26.1001 1.68497 26.1001 2.89999C26.1001 4.11502 25.1149 5.10019 23.8999 5.10019H2.8999C1.68488 5.10019 0.699707 4.11502 0.699707 2.89999C0.699707 1.68497 1.68488 0.699799 2.8999 0.699799H23.8999Z" stroke="currentColor"  />
                    </svg>


                </button>
            </div>
        </div>
    );
}

export default SliderSwitch;