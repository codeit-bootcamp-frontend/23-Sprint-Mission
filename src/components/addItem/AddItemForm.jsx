import { useState } from "react";
import SubmitBtn from "../btns/SubmitBtn";
import AddItemImg from "./AddItemImg";
import AddItemInput from "./AddItemInput";
import AddItemTag from "./AddItemTag";

export default function AddItemForm() {
  const [values, setValues] = useState({
    name: "",
    introduce: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const isFormValid = !!(
    values.name.trim() &&
    values.introduce.trim() &&
    values.price &&
    tags.length > 0
  );

  const handleAddItemSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("introduce", values.introduce);
    formData.append("price", values.price);

    if (imageFile) formData.append("image", imageFile);
    tags.forEach((tag) => formData.append("tags", tag));
    console.log("제출 데이터:", Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleAddItemSubmit} className="px-3.75 py-6 space-y-6">
      <AddItemBtnContainer isFormValid={isFormValid} />

      <AddItemImg onImageChange={setImageFile} />

      <AddItemInput
        id="name"
        label="상품명"
        type="text"
        placeholder="상품명을 입력해주세요"
        value={values.name}
        onChange={handleInputChange}
        required
      />

      <AddItemInput
        id="introduce"
        label="상품 소개"
        type="textarea"
        placeholder="상품 소개를 입력해주세요"
        className="min-h-70.5"
        value={values.introduce}
        onChange={handleInputChange}
        required
      />

      <AddItemInput
        id="price"
        label="판매 가격"
        type="number"
        placeholder="판매 가격을 입력해주세요"
        min={0}
        value={values.price}
        onChange={handleInputChange}
        required
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
      className="px-5.75 h-10.5 rounded-lg text-white font-semibold"
    >
      등록
    </SubmitBtn>
  </div>
);
