import { useEffect, useState, useRef } from "react";
import styles from "./ItemsPage.module.css";
import BestList from "../../components/Items/BestList";
import AllList from "../../components/Items/AllList";
import Pagination from "../../components/Items/Pagination";
import { getAllProducts, getBestProducts } from "../../api/data";

function ItemsPage() {
  const [orderBy, setOrderBy] = useState("recent");
  const [items, setItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const prevPageSizeRef = useRef();

  const getPageSize = () => {
    if (windowWidth <= 773) return 4;
    if (windowWidth <= 1200) return 6;
    return 10;
  };
  const pageSize = getPageSize();

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setPage(1);
  };

  const handleOrderChange = (newOrder) => {
    setOrderBy(newOrder);
    setPage(1);
  };

  const loadBestItems = async () => {
    try {
      const bestProducts = await getBestProducts();
      setBestItems(bestProducts.list);
    } catch (error) {
      console.error("베스트 상품 로드 실패:", error);
    }
  };

  const itemsLoad = async (page, orderBy, keyword, pageSize) => {
    try {
      const response = await getAllProducts(page, orderBy, keyword, pageSize);
      setItems(response.list);
      setTotalCount(response.totalCount);
    } catch (error) {
      console.error(
        "상품 로드 에러:",
        error.response?.data?.message || error.message,
      );
    }
  };

  useEffect(() => {
    loadBestItems();
    prevPageSizeRef.current = pageSize;
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const isPageSizeChanged = prevPageSizeRef.current !== pageSize;

    const targetPage = isPageSizeChanged ? 1 : page;

    itemsLoad(targetPage, orderBy, keyword, pageSize);

    if (isPageSizeChanged) {
      setPage(1);
      prevPageSizeRef.current = pageSize;
    }
  }, [page, orderBy, keyword, pageSize]);

  return (
    <div className={styles.wrapper}>
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

export default ItemsPage;
