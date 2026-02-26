import styles from "./OrderSelect.module.css";
import arrowDown from "../../../images/ic_arrow_down.svg";
import sortIc from "../../../images/ic_sort.svg";
import { useState } from "react";

function OrderSelect({ setOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("최신순");

  const options = [
    { label: "최신순", value: "recent" },
    { label: "좋아요순", value: "favorite" },
  ];

  const handleOptionClick = (label, value) => {
    setSelectedLabel(label);
    setOrder(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectWrapper}>
      <div className={styles.selectTrigger} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.label}>{selectedLabel}</span>
        <img src={arrowDown} className={styles.arrowIcon} alt="arrow" />
        <img src={sortIc} className={styles.mobileSortIcon} alt="sort" />
      </div>
      {isOpen && (
        <ul className={styles.optionList}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={styles.optionItem}
              onClick={() => handleOptionClick(opt.label, opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default OrderSelect;
