"use client";

import { CheckBoxDefault, CheckBoxChecked } from "@/assets/icons/CheckBox";
import { toggleTodo } from "@/libs/actions/todo";
import { TodoListType } from "@/libs/types/api";

const baseItemStyle =
  "flex items-center p-2 border-2 gap-3 border-slate-900 rounded-[27px] transition-colors";
const baseTextStyle = "text-regular-16 text-slate-800";

export default function TodoItem({ id, name, isCompleted }: TodoListType) {
  const completedItemStyle = isCompleted ? "bg-violet-100" : "bg-white";
  const completedTextStyle = isCompleted ? "line-through text-slate-500" : "";

  const handleToggle = async () => {
    await toggleTodo({ id, isCompleted: !isCompleted });
  };

  return (
    <li className={`${baseItemStyle} ${completedItemStyle}`}>
      <button onClick={handleToggle} className="cursor-pointer">
        {isCompleted ? <CheckBoxChecked /> : <CheckBoxDefault />}
      </button>

      <span className={`${baseTextStyle} ${completedTextStyle}`}>{name}</span>
    </li>
  );
}
