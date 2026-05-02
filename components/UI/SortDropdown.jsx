'use client'

import { useEffect, useRef, useState } from 'react'

const DEFAULT_OPTIONS = [
  {
    label: 'Дешевле',
    value: 'price-asc',
  },
  {
    label: 'Дороже',
    value: 'price-desc',
  },
  {
    label: 'С большей площадью',
    value: 'area-desc',
  },
  {
    label: 'С меньшей площадью',
    value: 'area-asc',
  },
]

const SortDropdown = ({
  text = 'Сортировка',
  iconLink = '/chevron-arrow.svg',
  iconAlt = '',
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  className = '',
}) => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [localValue, setLocalValue] = useState(value || options[0]?.value)

  const currentValue = value ?? localValue

  const selectedOption =
    options.find((option) => option.value === currentValue) || null

  const buttonText = selectedOption?.label || text

  const closeDropdown = () => {
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const selectOption = (option) => {
    setLocalValue(option.value)
    onChange?.(option.value)
    closeDropdown()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        closeDropdown()
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          flex h-12 min-w-[220px] items-center justify-between gap-4
          rounded-4xl border border-dark40 bg-white px-5
          text-sm font-medium text-dark
          transition
          hover:border-accent hover:text-accent
          active:scale-[0.98]
        `}
      >
        <span className="truncate">{buttonText}</span>

        <img
          src={iconLink}
          alt={iconAlt}
          className={`
            h-5 w-5 shrink-0 transition-transform duration-200
            ${isOpen ? '-rotate-90' : 'rotate-90'}
          `}
        />
      </button>

      {/* Desktop dropdown */}
      <div
        className={`
          absolute left-0 top-full z-50 mt-3 hidden w-[280px]
          overflow-hidden rounded-4xl border border-dark40 bg-white p-2 shadow-xl
          transition-all duration-200 sm:block
          ${
            isOpen
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          }
        `}
      >
        <div role="listbox" aria-label="Сортировка">
          {options.map((option) => {
            const isSelected = option.value === currentValue

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(option)}
                className={`
                  flex w-full items-center justify-between gap-4
                  rounded-3xl px-4 py-3 text-left text-sm transition
                  ${
                    isSelected
                      ? 'bg-accent text-white'
                      : 'bg-white text-dark hover:bg-dark10'
                  }
                `}
              >
                <span>{option.label}</span>

                {isSelected ? (
                  <svg
                    className="h-5 w-5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          onClick={closeDropdown}
          aria-label="Закрыть сортировку"
        />
      ) : null}

      {/* Mobile bottom sheet */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50 sm:hidden
          overflow-hidden rounded-t-4xl bg-white shadow-xl
          transition-transform duration-300
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="flex items-center justify-between border-b border-dark10 px-5 py-4">
          <div>
            <p className="text-base font-medium text-dark">
              Сортировать по
            </p>
            <p className="mt-1 text-sm text-dark50">
              Выберите порядок показа квартир
            </p>
          </div>

          <button
            type="button"
            onClick={closeDropdown}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-dark10 text-2xl leading-none text-dark transition active:scale-[0.98]"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {options.map((option) => {
            const isSelected = option.value === currentValue

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => selectOption(option)}
                className={`
                  flex w-full items-center justify-between gap-4
                  rounded-3xl px-4 py-4 text-left text-sm transition
                  ${
                    isSelected
                      ? 'bg-accent text-white'
                      : 'bg-white text-dark active:bg-dark10'
                  }
                `}
              >
                <span className={isSelected ? 'font-medium' : ''}>
                  {option.label}
                </span>

                {isSelected ? (
                  <svg
                    className="h-5 w-5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="border-t border-dark10 p-4">
          <button
            type="button"
            onClick={closeDropdown}
            className="h-11 w-full rounded-4xl bg-dark10 text-sm font-medium text-dark transition active:scale-[0.98]"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  )
}

export default SortDropdown