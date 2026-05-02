'use client'

import { useRouter } from 'next/navigation'

const Button = ({
  children,
  text,
  type = 'button',
  size = 'md',
  variant = 'accent',
  className = '',
  isLoading = false,
  disabled = false,
  linkToPage = '',
  onClick,
  icon = false,
  iconUrl = '',
  iconAlt = '',
  iconClassName = '',
  iconPosition = 'right',
  fullWidth = false,
}) => {
  const router = useRouter()

  const variants = {
    accent: `
      bg-accent text-white
      hover:bg-dark hover:text-white
    `,
    white: `
      bg-white text-dark
      hover:bg-dark15 hover:text-dark
    `,
    outline: `
      border border-dark40 bg-transparent text-dark
      hover:border-accent hover:text-accent
    `,
    dark: `
      bg-dark text-white
      hover:bg-accent hover:text-white
    `,
    ghost: `
      bg-dark10 text-dark
      hover:bg-dark15
    `,
  }

  const sizes = {
    sm: 'h-10 px-5 text-sm rounded-4xl',
    md: 'h-12 px-auto sm:px-7 text-base rounded-4xl',
    lg: 'h-14 px-8 text-base rounded-4xl',
    icon: 'h-12 w-12 rounded-full',
  }

  const handleClick = (event) => {
    if (isLoading || disabled) return

    if (onClick) {
      onClick(event)
      return
    }

    if (linkToPage) {
      router.push(linkToPage)
    }
  }

  const content = children || text

  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-200
        active:scale-[0.98]
        disabled:pointer-events-none disabled:opacity-60
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${variants[variant] || variants.accent}
        ${sizes[size] || sizes.md}
        ${className}
        ${isLoading ? 'cursor-wait opacity-70' : ''}
      `}
    >
      {icon && iconPosition === 'left' ? (
        <img src={iconUrl} alt={iconAlt} className={iconClassName} />
      ) : null}
<span className="min-w-0 truncate">

      {isLoading ? 'Загрузка...' : content}
  </span>

      {icon && iconPosition === 'right' ? (
        <img src={iconUrl} alt={iconAlt} className={iconClassName} />
      ) : null}
    </button>
  )
}

export default Button;