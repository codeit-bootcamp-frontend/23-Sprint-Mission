import { ReactComponent as TodoEmptyImg } from "@/assets/images/todo-empty.svg";

export function TodoEmpty() {
  return (
    <>
      <TodoEmptyImg />
      <div className="text-center text-base font-bold text-slate-400">
        할 일이 없어요. <br /> TODO를 새롭게 추가해주세요!
      </div>
    </>
  );
}
