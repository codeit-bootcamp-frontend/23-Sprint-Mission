import LinkBtn from "../btns/LinkBtn";

export default function ProductBack() {
  return (
    <div className="flex justify-center mt-12">
      <LinkBtn href="/items" className="bg-primary px-10 py-3 rounded-full">
        목록으로 돌아가기
      </LinkBtn>
    </div>
  );
}
