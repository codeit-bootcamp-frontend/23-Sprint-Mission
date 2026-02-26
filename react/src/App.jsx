import styles from "./App.module.css";
import BestList from "./components/BestList";
import Header from "./components/Header";
import axios from "./utils/axios";
import AllList from "./components/AllList";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";

function App() {
  const [orderBy, setOrderBy] = useState("recent");
  const [items, setItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //검색 키워드 저장
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setPage(1);
  };

  const handleOrderChange = (newOrder) => {
    setOrderBy(newOrder);
    setPage(1);
  };

  //베스트 상품 4개 가져오기
  const loadBestItems = async () => {
    try {
      const response = await axios.get("/Products", {
        params: {
          orderBy: "favorite",
          pageSize: 4,
        },
      });

      setBestItems(response.data.list);
    } catch (error) {
      console.error("베스트 상품 로드 실패:", error);
    }
  };

  //전체 상품 가져오기
  const itemsLoad = async (
    currentPage,
    currentOrder,
    currentKeyword,
    currentPageSize,
  ) => {
    console.log("검색어 전달 확인:", currentKeyword);
    try {
      const response = await axios.get(`/Products`, {
        params: {
          orderBy: currentOrder,
          page: currentPage,
          pageSize: currentPageSize,
          keyword: currentKeyword,
        },
      });
      setItems(response.data.list);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("에러 상세:", error.response?.data?.message);
    }
  };

  const getPageSize = () => {
    if (windowWidth <= 773) return 4;
    if (windowWidth <= 1200) return 6;
    return 10;
  };

  const pageSize = getPageSize();

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    loadBestItems();
  }, []);

  useEffect(() => {
    itemsLoad(page, orderBy, keyword, pageSize);
  }, [page, orderBy, keyword, pageSize]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.main}>
        <BestList items={bestItems} type="best" />
        <AllList
          items={items}
          type="all"
          search={handleKeywordChange}
          setOrder={handleOrderChange}
        />
      </div>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />
    </div>
  );
}

export default App;
