import { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export function AddTodoInput({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "font-nanum shadow-outline w-full flex-1 rounded-3xl bg-slate-100 px-6 py-4.25 text-base font-normal outline-2 outline-slate-900",
        className
      )}
      type="text"
      placeholder="할 일을 입력해주세요"
      {...props}
    />
  );
}
