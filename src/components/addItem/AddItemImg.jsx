import { useState, useRef } from "react";

// Imges
import addItemImg from "../../assets/additem_img.svg";
import AddItemInput from "./AddItemInput";

const ERROR_MSG = "*이미지 등록은 최대 1개까지 가능합니다.";

export default function AddItemImg() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (previewUrl) {
      setErrorMessage(ERROR_MSG);
      e.target.value = "";
      return;
    }

    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }

    e.target.value = "";
  };

  const handleUploadImgClick = () => fileInputRef.current?.click();

  const handleImgDelete = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  return (
    <section className="space-y-4">
      <AddItemInput
        id="addItemImg"
        label="상품 이미지"
        type="file"
        accept="image/*"
        name="addItemImg"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <ImgContainer
        previewUrl={previewUrl}
        onUploadClick={handleUploadImgClick}
        onDelete={handleImgDelete}
      />

      {errorMessage && <ErrMsg errorMessage={errorMessage} />}
    </section>
  );
}

const ImgContainer = ({ previewUrl, onUploadClick, onDelete }) => {
  return (
    <div className="flex gap-2.5">
      <button type="button" onClick={onUploadClick} className="cursor-pointer">
        <img src={addItemImg} alt="이미지 추가 버튼" />
      </button>

      {previewUrl && (
        <SelectedImg previewUrl={previewUrl} onDelete={onDelete} />
      )}
    </div>
  );
};

const SelectedImg = ({ previewUrl, onDelete }) => (
  <div className="relative">
    <img
      src={previewUrl}
      alt="선택 이미지"
      className="w-40.5 h-40.5 object-cover rounded-xl border border-gray-100"
    />
    <button
      type="button"
      onClick={onDelete}
      className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/70 transition-colors"
    >
      x
    </button>
  </div>
);

const ErrMsg = ({ errorMessage }) => (
  <p className="text-red-500 text-[16px] leading-6.5 font-medium mt-2">
    {errorMessage}
  </p>
);
