import { useNavigate } from "react-router-dom";
import ic_back from "../../assets/ic_back.svg";
import styles from "./BackButton.module.css";

function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/items");
  };

  return (
    <div className={styles.backButtonWrapper} onClick={handleBack}>
      <span className={styles.backButtonText}>목록으로 돌아가기</span>
      <img src={ic_back} alt="back" className={styles.backIcon} />
    </div>
  );
}

export default BackButton;
