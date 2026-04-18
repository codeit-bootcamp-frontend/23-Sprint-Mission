

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Search({ className, ...props }: SearchProps) {
  const classes = `outline-none border-2 border-slate-900
    px-[22px] py-4 text-16-regular text-slate-800 bg-slate-100 rounded-full shadow-[4px_4px_var(--slate-900)] ${className}`;

  return (
    <input
      className={classes} {...props} />
  )
}