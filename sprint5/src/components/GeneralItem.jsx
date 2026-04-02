import "../GeneralItem.css";
import GeneralItemCard from "./GeneralItemCard";
import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "../assets/icon-search.svg";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../assets/icon-arrow-down.svg";
import dropdownIconMobile from "../assets/icon-dropdown-mobile.svg";

const GeneralItem = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState("recent"); // 디폴트 : 최신순
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const orderByLabel = {
    recent: "최신순",
    favorite: "좋아요순",
  };

  // orderByType에 따른 orderBy 변경
  const handleOrderBy = (orderByType) => {
    setOrderBy(orderByType);
    setCurrentPage(currentPage); // 현재 페이지에서
    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
  };

  // 상품 등록하기 클릭 시 /additem 페이지 이동
  const handleAdditemClick = () => {
    navigate("/additem");
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200)
        setPageSize(10); // Desktop(1200px 이상) -> 전체 상품 10개 보이기
      else if (width >= 768)
        setPageSize(6); // Tablet(768px 이상) -> 전체 상품 6개 보이기
      else setPageSize(4); // Mobile(768px 미만) -> 전체 상품 4개 보이기
    };

    handleResize();
    window.addEventListener("resize", handleResize); // 마운트 시 이벤트리스너 추가
    return () => window.removeEventListener("resize", handleResize); // 언마운트 시 이벤트리스너 제거
  }, []);

  // currentPage, pageSize, orderBy가 변경될 때마다 API 호출
  useEffect(() => {
    const fetchGeneralItem = async () => {
      try {
        const response = await axios.get(
          "https://panda-market-api.vercel.app/products",
          {
            params: { page: currentPage, pageSize, orderBy },
          },
        );
        setItems(response.data.list);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error("데이터 로딩 실패... ", error);
      }
    };
    fetchGeneralItem();
  }, [currentPage, pageSize, orderBy]);

  // 페이지네이션 로직
  const totalPage = Math.ceil(totalCount / pageSize);
  const pageGroup = Math.floor((currentPage - 1) / 5);
  const startPage = pageGroup * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPage);

  const pageNumber = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumber.push(i);
  }

  return (
    <section className="general-item-section">
      <div className="section-header">
        <h2 className="section-title">전체 상품</h2>
        <div className="section-feature">
          {/* 검색창 */}
          <div className="product-search">
            <div className="search-header">
              <img src={searchIcon} className="serach-icon" alt="검색 이미지" />
              <input
                className="search-input"
                placeholder="검색할 상품을 입력해주세요"
              />
            </div>
          </div>
          {/* 상품 등록하기 버튼(데스크탑/태블릿 : 검색창 옆, 모바일 : 전체 상품 타이틀 옆) */}
          <div className="product-add">
            <button className="product-add-btn" onClick={handleAdditemClick}>
              상품 등록하기
            </button>
          </div>
          <div className="product-orderby-dropdown">
            {/* 드롭다운 클릭 시 열고/닫힘 */}
            <div
              className="dropdown-menu"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              <span className="dropdown-title">{orderByLabel[orderBy]}</span>
              <img
                className="dropdown-icon"
                src={arrowIcon}
                alt="드롭다운 화살표"
              />
              <img
                className="dropdown-mobile-icon"
                src={dropdownIconMobile}
                alt="드롭다운 모바일 화살표"
              />
            </div>
            {isDropdownOpen && (
              <ul className="dropdown-menu-open">
                <li onClick={() => handleOrderBy("recent")}>최신순</li>
                <li onClick={() => handleOrderBy("favorite")}>좋아요순</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="general-item-list">
        {items.map((item) => (
          <GeneralItemCard key={item.id} data={item} />
        ))}
      </div>
      {/* 페이지네이션 */}
      <div className="pagination-container">
        <button
          className="pagination-arrow"
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19.5" fill="white" stroke="#E5E7EB" />
            <path
              d="M22 15L17 20L22 25"
              stroke="#1f2937"
              stroke-opacity="0.3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="pagination-number">
          {pageNumber.map((num) => (
            <button
              key={num}
              className={`page-number ${currentPage === num ? "active" : ""}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          className="pagination-arrow"
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPage))}
          disabled={currentPage === totalPage}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19.5" fill="white" stroke="#E5E7EB" />
            <path
              d="M18 15L23 20L18 25"
              stroke="#1f2937"
              stroke-opacity="0.3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default GeneralItem;
