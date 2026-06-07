"use client";

import { useRouter } from "next/navigation";

const Button = ({
  children,
  text,
  type = "button",
  size = "md",
  variant = "accent",
  className = "",
  isLoading = false,
  disabled = false,
  linkToPage = "",
  onClick,
  icon = false,
  iconImport = null,
  iconUrl = "",
  iconAlt = "",
  iconClassName = "",
  iconPosition = "right",
  fullWidth = false,
  form,
}) => {
  const router = useRouter();

  const variants = {
    accent: `
    bg-accent text-white
    hover:bg-dark hover:text-white
  `,

    accentSoft: `
    bg-accent/10 text-accent
    hover:bg-accent hover:text-white
  `,

    accentLight: `
    bg-[#FFF1E8] text-accent
    hover:bg-accent hover:text-white
  `,

    white: `
    bg-white text-dark
    hover:bg-dark15 hover:text-dark
  `,

    outline: `
    border border-dark40 bg-transparent text-dark
    hover:border-accent hover:text-accent
  `,

    outlineAccent: `
    border border-accent bg-transparent text-accent
    hover:bg-accent hover:text-white
  `,

    dark: `
    bg-dark text-white
    hover:bg-accent hover:text-white
  `,

    gray: `
    bg-dark15 text-dark
    hover:bg-dark hover:text-white
  `,

    ghost: `
    bg-dark10 text-dark
    hover:bg-dark15
  `,

    glass: `
    bg-white/15 text-white backdrop-blur-sm
    border border-white/20
    hover:bg-white hover:text-dark
  `,

    glassAccent: `
    bg-accent/90 text-white backdrop-blur-sm
    border border-white/20
    hover:bg-white hover:text-accent
  `,
  };

  const sizes = {
    sm: "h-10 px-3 px-5 text-sm rounded-4xl",
    md: "h-12 px-6 sm:px-7 text-base rounded-4xl",
    lg: "h-14 px-8 text-base rounded-4xl",
    icon: "h-12 w-12 rounded-full",
  };

  const IconComponent = iconImport;

  const handleClick = (event) => {
    if (isLoading || disabled) return;

    if (onClick) {
      onClick(event);
      return;
    }

    if (linkToPage) {
      // tel:/mailto:/внешние ссылки next-роутер не умеет — открываем напрямую
      if (/^(tel:|mailto:|https?:)/i.test(linkToPage)) {
        window.location.href = linkToPage;
      } else {
        router.push(linkToPage);
      }
    }
  };

  const content = children || text;

  return (
    <button
      type={type}
      form={form}
      disabled={isLoading || disabled}
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-200
        active:scale-[0.98]
        disabled:pointer-events-none disabled:opacity-60
        ${fullWidth ? "w-full" : "w-auto"}
        ${variants[variant] || variants.accent}
        ${sizes[size] || sizes.md}
        ${className}
        ${isLoading ? "cursor-wait opacity-70" : ""}
      `}
    >
      {icon && iconPosition === "left" ? (
        <img src={iconUrl} alt={iconAlt} className={iconClassName} />
      ) : null}

      <span className="min-w-0 truncate">
        {isLoading ? "Загрузка..." : content}
      </span>

      {iconImport ? <IconComponent className={iconClassName} /> : null}

      {icon && iconPosition === "right" ? (
        <img src={iconUrl} alt={iconAlt} className={iconClassName} />
      ) : null}
    </button>
  );
};

export default Button;
