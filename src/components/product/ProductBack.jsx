import LinkBtn from "../btns/LinkBtn";
import BackIcon from "../../assets/icons/ic_back.svg";

export default function ProductBack() {
  return (
    <div className="flex justify-center mt-12">
      <LinkBtn
        href="/items"
        className="bg-primary px-10 py-3 rounded-full flex items-center gap-1"
      >
        <span>목록으로 돌아가기</span>
        <img src={BackIcon} />
      </LinkBtn>
    </div>
  );
}
