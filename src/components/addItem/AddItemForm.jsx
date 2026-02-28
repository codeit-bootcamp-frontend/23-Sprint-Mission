// Components
import SubmitBtn from "../btns/SubmitBtn";
import AddItemImg from "./AddItemImg";
import AddItemInput from "./AddItemInput";

export default function AddItemForm() {
  return (
    <form className="px-3.75 py-6 space-y-6">
      <AddItemBtnContainer />
      <AddItemImg />
      <AddItemName />
      <AddItemIntroduce />
      <AddItemPrice />
      <AddItemTag />
    </form>
  );
}

const AddItemBtnContainer = () => (
  <div className="flex items-center justify-between">
    <h2 className="text-[20px] leading-[100%] font-bold text-gray-800">
      상품 등록하기
    </h2>

    <SubmitBtn disabled={true} className="px-5.75 h-10.5 rounded-lg text-white">
      등록
    </SubmitBtn>
  </div>
);

const AddItemName = () => (
  <AddItemInput
    id="addItemName"
    label="상품명"
    type="text"
    placeholder="상품명을 입력해주세요"
  />
);

const AddItemIntroduce = () => (
  <AddItemInput
    id="introduce"
    label="상품 소개"
    type="textarea"
    placeholder="상품 소개를 입력해주세요"
    className="min-h-70.5"
  />
);

const AddItemPrice = () => (
  <AddItemInput
    id="itemPrice"
    label="판매 가격"
    type="number"
    placeholder="판매 가격을 입력해주세요"
    min={0}
  />
);

const AddItemTag = () => {
  return (
    <AddItemInput
      id="tag"
      label="태그"
      type="text"
      placeholder="태그를 입력해주세요"
    />
  );
};
