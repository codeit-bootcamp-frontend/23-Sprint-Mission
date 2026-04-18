type ButtonVariant ="add" | "delete" | "edit";

const variantClasses: Record<ButtonVariant, string> = {
  add: "bg-slate-200 text-slate-900 active:bg-violet-600 active:text-white",
  delete: "bg-rose-500 text-white",
  edit: "bg-slate-200 text-slate-900 active:bg-lime-300",
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

export default function Button({
  className,
  children,
  variant,
  ...props
}: ButtonProps) {
  const classes = `border-2 border-slate-900 rounded-full
    text-16-bold shadow-[4px_4px_var(--slate-900)] px-10 py-4 ${className}`;

    const variantClass = variantClasses[variant];

  return (
    <button className={`${classes} ${variantClass}`} {...props}>
      {children}
    </button>
  );
}