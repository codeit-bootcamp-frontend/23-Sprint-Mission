import { useEffect, useState } from "react";
import ImgAdditem from "./ImgAdditem";
import InputAdditem from "./InputAdditem";
import ProductDescriptionInput from "./ProductDescriptionInput";
import styles from "./FormAdditem.module.css";
import TagAdditem from "./TagAdditem";
import { useNavigate } from "react-router-dom";
import { postProduct, uploadImage } from "../../api/data";

function FormAdditem({ onValidationChange }) {
  const navigate = useNavigate();
  const [nameInputValue, setNameInputValue] = useState("");
  const [priceInputValue, setPriceInputValue] = useState(0);
  const [descriptionValue, setDescriptionValue] = useState("");

  useEffect(() => {
    const isNameValid = nameInputValue.trim().length > 0;
    const isPriceValid = Number(priceInputValue) > 0;
    const isDescriptionValid = descriptionValue.trim().length > 0;

    const isValid = isNameValid && isPriceValid && isDescriptionValid;

    if (onValidationChange) {
      onValidationChange(isValid);
    }
  }, [nameInputValue, priceInputValue, descriptionValue, onValidationChange]);

  const submit = async (formData) => {
    try {
      const rawData = Object.fromEntries(formData.entries());

      const imageFile = formData.get("images");
      let imageUrl = "";

      if (imageFile && imageFile.size > 0) {
        const fileExtension = imageFile.name.split(".").pop();

        const newFileName = `product_${Date.now()}.${fileExtension}`;

        const renamedFile = new File([imageFile], newFileName, {
          type: imageFile.type,
        });

        imageUrl = await uploadImage(renamedFile);
      }

      const finalData = {
        name: rawData.name,
        description: rawData.description,
        price: Number(rawData.price),
        tags: rawData.tags ? JSON.parse(rawData.tags) : [],
        images: imageUrl,
      };

      await postProduct(finalData);
      alert("상품 등록 성공!");
      navigate("/items");
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <form id="add-item-form" action={submit} className={styles.addForm}>
      <ImgAdditem name="images" />
      <InputAdditem
        inputName="name"
        value={nameInputValue}
        onChange={(e) => setNameInputValue(e.target.value)}
        placeholder="상품명을 입력해주세요"
      >
        상품명
      </InputAdditem>
      <ProductDescriptionInput
        value={descriptionValue}
        onChange={(e) => setDescriptionValue(e.target.value)}
      />

      <InputAdditem
        inputName="price"
        type="number"
        value={priceInputValue}
        onChange={(e) => setPriceInputValue(Number(e.target.value))}
        placeholder="판매 가격을 입력해주세요"
      >
        판매가격
      </InputAdditem>
      <TagAdditem />
    </form>
  );
}

export default FormAdditem;
