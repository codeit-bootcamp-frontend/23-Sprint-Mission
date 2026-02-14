// axios 인스턴스 import (baseURL 설정되어 있음)
import axios from "../utils/axios";

// 상품 목록 조회 함수
// params → 쿼리스트링으로 자동 변환됨
export const getProducts = async (params = {}) => {
  // GET /products?orderBy=...&page=...&pageSize=...
  const { data } = await axios.get("/products", { params });

  // 서버에서 받은 상품 리스트 복사
  // (원본 데이터 직접 수정하지 않기 위해 spread 사용)
  let list = [...data.list];

  // 정렬 처리 (프론트에서 직접 정렬)

  // 최신순 정렬
  // createdAt을 날짜로 변환해서 최신 날짜가 위로 오도록 정렬
  if (params.orderBy === "recent") {
    list.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  // 좋아요순 정렬
  // favoriteCount 숫자 비교해서 큰 값이 위로 오도록 정렬
  if (params.orderBy === "favorite") {
    list.sort((a, b) => {
      return b.favoriteCount - a.favoriteCount;
    });
  }

  // 정렬된 리스트를 다시 반환
  return {
    ...data,
    list,
  };
};
