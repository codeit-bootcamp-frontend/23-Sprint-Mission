import { useState } from "react";
import SubmitBtn from "../btns/SubmitBtn";

export default function ProductAsk() {
  const [text, setText] = useState("");

  return (
    <form className="flex flex-col gap-4">
      <label htmlFor="ask" className="text-gray-800 font-semibold">
        문의하기
      </label>
      <textarea
        name="ask"
        id="ask"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        onChange={(e) => setText(e.target.value)}
        className="bg-gray-100 rounded-xl resize-none px-6 py-4 h-32.25 md:h-auto outline-0"
      />
      <div className="flex justify-end">
        <SubmitBtn
          disabled={!text}
          className="px-5.75 py-3 rounded-lg text-gray-100 font-semibold"
        >
          등록
        </SubmitBtn>
      </div>
    </form>
  );
}
