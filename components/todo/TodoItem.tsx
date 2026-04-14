import { CheckBoxDefault, CheckBoxChecked } from "@/assets/icons/CheckBox";

interface TodoItemProps {
  text: string;
  isCompleted: boolean;
  onToggle?: () => void;
}

const baseItemStyle =
  "flex items-center p-2 border-2 gap-3 border-slate-900 rounded-[27px] transition-colors";
const baseTextStyle = "text-regular-16 text-slate-800";

export default function TodoItem({
  text,
  isCompleted,
  onToggle,
}: TodoItemProps) {
  const completedItemStyle = isCompleted ? "bg-violet-100" : "bg-white";
  const completedTextStyle = isCompleted ? "line-through text-slate-500" : "";

  return (
    <li className={`${baseItemStyle} ${completedItemStyle}`}>
      <button onClick={onToggle} className="cursor-pointer">
        {isCompleted ? <CheckBoxChecked /> : <CheckBoxDefault />}
      </button>

      <span className={`${baseTextStyle} ${completedTextStyle}`}>{text}</span>
    </li>
  );
}
