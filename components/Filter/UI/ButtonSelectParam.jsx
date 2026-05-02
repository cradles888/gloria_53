import { useState, useEffect } from "react"

const ButtonSelectParam = ({
  text,
  onButtonClick,
  activeParams = [],
}) => {
  const [isStateButton, setIsStateButton] = useState(false)

  useEffect(() => {
    setIsStateButton(activeParams.includes(text))
  }, [activeParams, text])

  const toggleParam = () => {
    const nextState = !isStateButton

    setIsStateButton(nextState)

    onButtonClick?.({
      value: text,
      isActive: nextState,
    })
  }

  return (
    <button
      type="button"
      onClick={toggleParam}
      aria-pressed={isStateButton}
      className={`
        flex h-12 w-16 items-center justify-center rounded-3xl border
        text-base font-medium outline-none
        transition-all duration-200
        active:scale-[0.98]
        focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2
        ${
          isStateButton
            ? 'border-accent bg-accent text-white shadow-sm hover:bg-accent'
            : 'border-dark40 bg-white text-dark hover:border-accent hover:text-accent'
        }
      `}
    >
      {text}
    </button>
  )
}

export default ButtonSelectParam