const ButtonIcon = ({ 
  icon: Icon,
  onClick,
  size = "md",        // sm, md, lg
  variant = "default", // default, primary, outline, ghost
  className = "",
  ariaLabel = "button",
  disabled = false,
  type = "button",
  ...props
}) => {

  const sizes = {
    sm: {
      button: "p-1.5",
      icon: "w-4 h-4"
    },

    md: {
      button: "p-2",
      icon: "w-5 h-5"
    },

    lg: {
      button: "p-3",
      icon: "w-6 h-6"
    },

    lgFull: {
        button: "w-full",
        icon: "w-5 h-5"
    },

  };

  const variants = {
    default: "hover:bg-gray-100 active:bg-gray-200 text-gray-700",
    primary: "bg-accent hover:bg-accent/90 active:bg-accent/80 text-white",
    outline: "border border-gray-300 hover:bg-gray-50 active:bg-gray-100 text-gray-700",
    ghost: "hover:bg-gray-100 active:bg-gray-200 text-gray-700"
  };

  return (
    <button
    {...props}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        ${sizes[size].button}
        ${variants[variant]}
        rounded-full transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-accent/50
        ${className}
      `}
    >
      <Icon className={sizes[size].icon} />
    </button>
  );
};

export default ButtonIcon;