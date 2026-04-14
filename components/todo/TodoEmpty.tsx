import Image from "next/image";
import EmptyTodoImg from "@/assets/img/EmptyTodoImg-lg.svg";
import EmptyDoneImg from "@/assets/img/EmptyDoneImg-lg.svg";

const EMPTY_CONFIG = {
  todo: {
    img: EmptyTodoImg,
    p: ["할 일이 없어요.", "TODO를 새롭게 추가해주세요!"],
  },
  done: {
    img: EmptyDoneImg,
    p: ["아직 다 한 일이 없어요.", "해야 할 일을 체크해보세요!"],
  },
} as const;

export default function TodoEmpty({ type }: { type: "todo" | "done" }) {
  const config = EMPTY_CONFIG[type];

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <Image src={config.img} alt="" priority className="mx-auto" />
      <div className="flex flex-col items-center gap-1 text-bold-16 text-slate-400 text-center leading-relaxed">
        {config.p.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}
