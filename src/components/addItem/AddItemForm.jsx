import { useCallback, useEffect, useRef, useState } from "react";

// Components
import SubmitBtn from "../btns/SubmitBtn";
import AddItemImg from "./AddItemImg";
import AddItemInput from "./AddItemInput";
import AddItemTag from "./AddItemTag";

export default function AddItemForm() {
  const [imageFile, setImageFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const formRef = useRef(null);

  const validateForm = useCallback(() => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get("name")?.toString().trim();
    const introduce = formData.get("introduce")?.toString().trim();
    const price = formData.get("price")?.toString().trim();

    const isValid = !!(name && introduce && price && tags.length > 0);
    setIsFormValid(isValid);
  }, [tags]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleAddItemSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    tags.forEach((tag) => formData.append("tags", tag));
  };

  return (
    <form
      ref={formRef}
      onChange={validateForm}
      onSubmit={handleAddItemSubmit}
      className="px-3.75 py-6 space-y-6"
    >
      <AddItemBtnContainer isFormValid={isFormValid} />
      <AddItemImg onImageChange={setImageFile} />
      <AddItemInput
        id="name"
        label="상품명"
        type="text"
        required
        placeholder="상품명을 입력해주세요"
      />
      <AddItemInput
        id="introduce"
        label="상품 소개"
        type="textarea"
        required
        placeholder="상품 소개를 입력해주세요"
        className="min-h-70.5"
      />
      <AddItemInput
        id="price"
        label="판매 가격"
        type="number"
        required
        min={0}
        placeholder="판매 가격을 입력해주세요"
      />
      <AddItemTag tags={tags} setTags={setTags} />
    </form>
  );
}

const AddItemBtnContainer = ({ isFormValid }) => (
  <div className="flex items-center justify-between">
    <h2 className="text-[20px] leading-[100%] font-bold text-gray-800">
      상품 등록하기
    </h2>

    <SubmitBtn
      disabled={!isFormValid}
      className="px-5.75 h-10.5 rounded-lg text-white"
    >
      등록
    </SubmitBtn>
  </div>
);
