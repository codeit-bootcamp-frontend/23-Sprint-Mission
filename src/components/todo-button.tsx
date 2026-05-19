import { cva, VariantProps } from "class-variance-authority";

import { ReactComponent as CheckIcon } from "@/assets/images/check.svg";
import { ReactComponent as PlusIcon } from "@/assets/images/plus.svg";
import { ReactComponent as XIcon } from "@/assets/images/X.svg";

const ACTION_MAP = {
  add: {
    text: "추가하기",
    icon: <PlusIcon />,
  },
  delete: {
    text: "삭제하기",
    icon: <XIcon />,
  },
  edit: {
    text: "수정하기",
    icon: <CheckIcon />,
  },
} as const;

const ButtonStyle = cva(
  "font-nanum shadow-outline flex items-center justify-center rounded-3xl py-4.25 text-base font-bold outline-2 active:outline-2 active:outline-slate-900",
  {
    variants: {
      size: {
        sm: "px-5",
        lg: "gap-1 px-10",
      },
      actionType: {
        add: "bg-slate-200 text-slate-900 active:bg-violet-600 active:text-white",
        delete: "bg-rose-500 text-white",
        edit: "bg-slate-200 text-slate-900 active:bg-lime-300",
      },
    },
    defaultVariants: {
      size: "lg",
      actionType: "add",
    },
  }
);

type TodoSearchButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof ButtonStyle>;

export function TodoButton({
  size = "lg",
  actionType,
  className,
  ...props
}: TodoSearchButtonProps) {
  const action = actionType ?? "add";
  const { text, icon } = ACTION_MAP[action];

  return (
    <button
      className={ButtonStyle({ size, actionType: action, className })}
      {...props}
    >
      {icon}
      {size === "lg" && <span>{text}</span>}
    </button>
  );
}
