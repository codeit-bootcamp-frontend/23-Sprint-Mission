'use client';

import UncheckedIcon from "@/public/icons/ic_unchecked.svg";
import CheckedIcon from "@/public/icons/ic_checked.svg";

const variantClasses = {
  todo: "bg-slate-100",
  done: "bg-violet-100 line-through",
}

interface TodoItemProps {
  className?: string;
  name: string;
  isCompleted: boolean;
  id: number;
  onClick: (id: number, isCompleted: boolean) => void;
}

export default function TodoItem({
  className,
  name,
  isCompleted,
  id,
  onClick,
}: TodoItemProps) {
  const classes = `flex items-center gap-4 outline-none border-2 border-slate-900
    px-[10px] py-[7px] text-16-regular text-slate-800 rounded-full w-full
    ${className}`;
  
  const variant = isCompleted ? "done" : "todo";
  const variantClass = variantClasses[variant];

  const Icon = isCompleted ? CheckedIcon : UncheckedIcon;

  return (
    <button
      className={`${classes} ${variantClass}`}
      onClick={() => onClick(id, isCompleted)}
    >
      <Icon width="32px" height="32px" />
      {name}
    </button>
  )
}