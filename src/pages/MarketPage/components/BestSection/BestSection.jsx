import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./BestSection.css";
import { getProducts } from "../../../../data/products";

/*
  화면 크기에 따라 한 번에 보여줄 상품 개수 계산
  - 768px 미만 → 1개
  - 1280px 미만 → 2개
  - 그 이상 → 4개
*/
function calculatePageSize() {
  const width = window.innerWidth;

  if (width < 767) return 1;
  if (width < 1280) return 2;
  return 4;
}

function ProductGrid() {
  // 상품 목록 상태
  const [items, setItems] = useState([]);

  // 화면 크기에 따른 pageSize 상태
  const [pageSize, setPageSize] = useState(calculatePageSize());

  /*
    베스트 상품 불러오기
    pageSize 상태값을 사용해서 API 요청
  */
  const fetchBestProducts = async () => {
    try {
      const result = await getProducts({
        orderBy: "favorite",
        pageSize, // 현재 상태값 사용
      });

      setItems(result.list);
    } catch (error) {
      console.error("상품 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    // 화면 크기 변경 시 pageSize 재계산
    const handleResize = () => {
      const newSize = calculatePageSize();

      // 기존 값과 다를 때만 변경 (불필요한 리렌더 방지)
      setPageSize((prev) => (prev !== newSize ? newSize : prev));
    };

    window.addEventListener("resize", handleResize);

    // pageSize가 변경될 때마다 상품 다시 요청
    fetchBestProducts();

    // cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <section className="bestItemsContainer">
      {/* 섹션 제목 */}
      <div className="BestSection wrapper">
        <h1 className="BestSectionTitle">베스트 상품</h1>

        {/* 상품 목록 */}
        <div className="BestGrid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
