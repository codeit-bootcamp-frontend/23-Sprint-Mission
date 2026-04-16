import { addTodo } from "@/libs/actions/todo";
import PlusIcon from "@/assets/icons/PlusIcon";

export default function SearchForm() {
  return (
    <form className="flex gap-6" action={addTodo}>
      <Input className="w-full" />
      <Btn className="min-w-30 md:min-w-42 active:bg-violet-600 active:text-white" />
    </form>
  );
}

const BASE_STYLE =
  "border-2 border-slate-900 rounded-full py-3 text-regular-16 shadow-rb focus:outline-none";

const Input = ({ className }: { className: string }) => (
  <>
    <label htmlFor="todo" className="sr-only">
      todo
    </label>
    <input
      type="text"
      name="todo"
      id="todo"
      className={`bg-slate-100 px-6 ${className} ${BASE_STYLE}`}
      placeholder="할 일을 입력해주세요"
    />
  </>
);

const Btn = ({ className }: { className: string }) => (
  <button
    type="submit"
    className={`flex items-center justify-center gap-1 bg-slate-200 cursor-pointer ${BASE_STYLE} ${className}`}
  >
    <PlusIcon />
    <span>추가하기</span>
  </button>
);
