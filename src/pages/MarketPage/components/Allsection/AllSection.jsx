import { useEffect, useState } from "react";
import { getProducts } from "../../../../data/productsApi.js";
import ProductCard from "../ProductCard/ProductCard";
import searchIcon from "../../../../assets/images/search.svg";
import { Link } from "react-router-dom";
import PaginationBar from "../../Pagination/Pagination.jsx";
import "./AllSection.css";

/* 반응형 pageSize 계산 */
function calculateAllSize() {
  const width = window.innerWidth;

  if (width < 767) return 4;
  if (width < 1280) return 6;
  return 10;
}

const ORDER_OPTIONS = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순" },
];

export default function AllSection() {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState(ORDER_OPTIONS.value);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(calculateAllSize());
  const [totalCount, setTotalCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태

  /* 상품 요청 */

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts({
        orderBy,
        keyword,
        page,
        pageSize,
      });
  
      setItems(result.list);
      setTotalCount(result.totalCount);
    };
    fetchProducts();
  }, [orderBy, keyword, page, pageSize]);

  /* resize 대응 */
  useEffect(() => {
    const handleResize = () => {
      const newSize = calculateAllSize();
      setPageSize((prev) => (prev !== newSize ? newSize : prev));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPageNum = Math.ceil(totalCount / pageSize);

  const handleSelect = (value) => {
    setOrderBy(value); // 정렬 기준 변경
    setPage(1); // 페이지 1로 초기화
    setIsOpen(false); // 드롭다운 닫기
  };

  const onPageChange = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <section className="allSection wrapper">
      {/* 상단 영역 */}
      <div className="allSectionHeader">
        <h1 className="allTitle">전체 상품</h1>

        <div className="allControls">
          {/* 검색 */}
          <div className="searchBox">
            <img src={searchIcon} alt="검색" className="searchIcon" />

            <input
              type="search"
              placeholder="검색할 상품을 입력해주세요"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* 등록 버튼 */}
          <Link to="/addItem" className="button registerButton">
            상품 등록하기
          </Link>

          {/*드롭다운 */}
          <div className="sortDropdown">
            <button
              className="sortButton"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {orderBy === "recent" ? "최신순" : "좋아요순"} ▼
            </button>

            {isOpen && (
              <div className="dropdownMenu">
                <button onClick={() => handleSelect("recent")}>최신순</button>
                <button onClick={() => handleSelect("favorite")}>
                  좋아요순
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="allGrid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="paginationBarWrapper">
        <PaginationBar
          totalPageNum={totalPageNum}
          activePageNum={page}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}
