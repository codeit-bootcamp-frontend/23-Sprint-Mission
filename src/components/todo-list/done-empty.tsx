import { ReactComponent as DoneEmptyImg } from "@/assets/images/done-empty.svg";

export function DoneEmpty() {
  return (
    <>
      <DoneEmptyImg height={240} />
      <div className="text-center text-base font-bold text-slate-400">
        아직 다 한 일이 없어요. <br /> 해야 할 일을 체크해보세요!
      </div>
    </>
  );
}
