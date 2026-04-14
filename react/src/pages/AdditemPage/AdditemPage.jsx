import { useState } from "react";
import ButtonAdditem from "../../components/Additem/ButtonAdditem";
import FormAdditem from "../../components/Additem/FormAdditem";
import styles from "./AdditemPage.module.css";

function AdditemPage() {
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = (isValid) => {
    setIsFormValid(isValid);
  };

  return (
    <div className={styles.container}>
      <div className={styles.additemHeader}>
        <h1 className={styles.title}>상품 등록하기</h1>
        <ButtonAdditem disabled={!isFormValid} form="add-item-form" />
      </div>
      <FormAdditem onValidationChange={handleFormChange} />
    </div>
  );
}
export default AdditemPage;
