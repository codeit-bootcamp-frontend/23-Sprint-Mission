import { useEffect, useState } from "react";
import { getProducts } from "../../../../data/productsApi";
import ProductCard from "../ProductCard/ProductCard";
import searchIcon from "../../../../assets/images/search.svg";
import { Link } from "react-router-dom";
import PaginationBar from "../../Pagination/Pagination";
import type { Product } from "../../../../types/product";
import "./AllSection.css";

/* 반응형 pageSize 계산 */
function calculateAllSize(): number {
  const width = window.innerWidth;

  if (width < 767) return 4;
  if (width < 1280) return 6;
  return 10;
}

type OrderBy = "recent" | "favorite";


interface ProductListResponse {
  list: Product[];
  totalCount: number;
}

interface GetProductsParams {
  orderBy?: OrderBy;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

const ORDER_OPTIONS: { value: OrderBy; label: string }[] = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순" },
];

export default function AllSection() {
  const [items, setItems] = useState<Product[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>("recent");
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(calculateAllSize());
  const [totalCount, setTotalCount] = useState<number>(0);

  const [isOpen, setIsOpen] = useState<boolean>(false); // 드롭다운 열림 상태

  /* 상품 요청 */
  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const result = (await getProducts({
        orderBy,
        keyword,
        page,
        pageSize,
      } as GetProductsParams)) as ProductListResponse;

      setItems(result.list);
      setTotalCount(result.totalCount);
    };

    fetchProducts();
  }, [orderBy, keyword, page, pageSize]);

  /* resize 대응 */
  useEffect(() => {
    const handleResize = (): void => {
      const newSize = calculateAllSize();
      setPageSize((prev) => (prev !== newSize ? newSize : prev));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPageNum = Math.ceil(totalCount / pageSize);

  const handleSelect = (value: OrderBy): void => {
    setOrderBy(value); // 정렬 기준 변경
    setPage(1); // 페이지 1로 초기화
    setIsOpen(false); // 드롭다운 닫기
  };

  const onPageChange = (pageNum: number): void => {
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
              type="button"
              className="sortButton"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {orderBy === "recent" ? "최신순" : "좋아요순"} ▼
            </button>

            {isOpen && (
              <div className="dropdownMenu">
                <button type="button" onClick={() => handleSelect("recent")}>
                  최신순
                </button>
                <button type="button" onClick={() => handleSelect("favorite")}>
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
