import "../GeneralItem.css";
import GeneralItemCard from "./GeneralItemCard";
import { useState, useEffect } from "react";
import axios from "axios";

const GeneralItem = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState("recent"); // 디폴트 : 최신순
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortLabels = {
    recent: "최신순",
    favorite: "좋아요순",
  };

  // 정렬 변경 함수
  const handleSort = (sortType) => {
    setOrderBy(sortType);
    setCurrentPage(currentPage); // 정렬 바뀔 때 현재 페이지에서
    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200)
        setPageSize(10); // Desktop
      else if (width >= 768)
        setPageSize(6); // Tablet
      else setPageSize(4); // Mobile
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // API 호출 (상태 변화 시마다 호출)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://panda-market-api.vercel.app/products",
          {
            params: { page: currentPage, pageSize, orderBy },
          },
        );
        setItems(response.data.list);
      } catch (error) {
        console.error("데이터 로딩 실패", error);
      }
    };
    fetchProducts();
  }, [currentPage, pageSize, orderBy]);

  return (
    <section className="general-item-section">
      <div className="section-header">
        <h2 className="section-title">전체 상품</h2>
        <div className="sort-dropdown-container">
          <div
            className="sort-dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{sortLabels[orderBy]}</span>
            <svg
              className={`arrow-icon ${isDropdownOpen ? "rotated" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12.7151 15.4653C12.3975 15.7654 11.9008 15.7654 11.5832 15.4653L5.8047 10.006C5.26275 9.49404 5.6251 8.58286 6.37066 8.58286L17.9276 8.58286C18.6732 8.58286 19.0355 9.49404 18.4936 10.006L12.7151 15.4653Z"
                fill="#1F2937"
              />
            </svg>
          </div>

          {isDropdownOpen && (
            <ul className="sort-dropdown-menu">
              <li onClick={() => handleSort("recent")}>최신순</li>
              <li onClick={() => handleSort("favorite")}>좋아요순</li>
            </ul>
          )}
        </div>
      </div>

      <div className="product-grid">
        {items.map((item) => (
          <GeneralItemCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default GeneralItem;
