'use client'

import { GridIcon } from '@/icons/GridIcon'
import { ListIcon } from '@/icons/ListIcon'
import { FloorPlanIcon } from '@/icons/FloorPlanIcon'

const VIEW_OPTIONS = [
  { value: 'grid',  label: 'Плитка',     ariaLabel: 'Показать квартиры плиткой',     Icon: GridIcon },
  { value: 'list',  label: 'Список',     ariaLabel: 'Показать квартиры списком',     Icon: ListIcon },
  { value: 'floor', label: 'Поэтажно',   ariaLabel: 'Показать квартиры поэтажно',   Icon: FloorPlanIcon },
]

const TRANSLATE = { grid: 'translate-x-0', list: 'translate-x-full', floor: 'translate-x-[200%]' }

const SliderSwitch = ({ view = 'grid', setView, className = '' }) => {
  return (
    <div
      className={`inline-flex rounded-4xl bg-dark/7 p-1 shadow-inner ${className}`}
      role="group"
      aria-label="Переключение вида квартир"
    >
      <div className="relative grid grid-cols-3">
        <span
          className={`absolute left-0 top-0 z-0 h-full w-1/3 rounded-4xl bg-accent shadow-sm transition-transform duration-300 ease-out ${TRANSLATE[view] ?? 'translate-x-0'}`}
          aria-hidden="true"
        />

        {VIEW_OPTIONS.map(({ value, ariaLabel, Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setView(value)}
            aria-label={ariaLabel}
            aria-pressed={view === value}
            className={`relative z-10 flex h-11 min-w-12 items-center justify-center rounded-4xl px-4 transition duration-200 active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 ${
              view === value ? 'text-white' : 'text-dark50 hover:text-dark'
            }`}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default SliderSwitch
