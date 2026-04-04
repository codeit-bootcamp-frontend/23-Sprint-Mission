import { useState, useEffect } from "react";
import axios from "axios";
import "../BestItem.css";
import BestItemCard from "./BestItemCard";

const BestItem = () => {
  // 베스트 상품이 담길 items의 초기값은 빈 배열
  const [items, setItems] = useState([]);

  // pageSize 초기값에 4를 넣어 Desktop 기준
  const [pageSize, setPageSize] = useState(4);

  // 화면 너비를 감지하여 pageSize를 변경해주는 handleResize 추가
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setPageSize(4); // Desktop(1200px 이상) -> 베스트 상품 4개 보이기
      } else if (width >= 768) {
        setPageSize(2); // Tablet(768px 이상) -> 베스트 상품 2개 보이기
      } else {
        setPageSize(1); // Mobile(768px 미만) -> 베스트 상품 1개 보이기
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize); // 마운트 시 이벤트리스너 추가
    return () => window.removeEventListener("resize", handleResize); // 언마운트 시 이벤트리스너 제거
  }, []);

  // pageSize가 변경될 때마다 API 호출
  useEffect(() => {
    const fetchBestItem = async () => {
      try {
        const response = await axios.get(
          "https://panda-market-api.vercel.app/products",
          {
            params: {
              page: 1,
              pageSize: pageSize,
              orderBy: "favorite",
            },
          },
        );
        setItems(response.data.list);
      } catch (error) {
        console.log("데이터 로딩 실패... ", error);
      }
    };

    fetchBestItem();
  }, [pageSize]);

  return (
    <section className="best-item-section">
      <h2 className="section-title">베스트 상품</h2>
      <div className="best-item-list">
        {items.map((item) => (
          <BestItemCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default BestItem;
