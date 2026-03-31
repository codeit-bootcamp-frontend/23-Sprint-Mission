import { useEffect, useState } from "react";
import getProducts from "../../../api/getProducts";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import DropdownList from "../../../components/MarketUI/DropdownList";
import PaginationBar from "../../../components/MarketUI/PaginationBar";
import SearchIcon from "../../../assets/icons/ic_search.svg?react";
import LoadingSpinner from "../../../components/LoadingSpinner";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile
    return 4;
  } else if (width < 1280) {
    // Tablet
    return 6;
  } else {
    // Desktop
    return 10;
  }
};

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [itemList, setItemList] = useState([]);
  const [totalPageNum, setTotalPageNum] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchSortedData = async ({ orderBy, page, pageSize }) => {
    setIsLoading(true);
    try {
      const products = await getProducts({ orderBy, page, pageSize });
      setItemList(products.list);
      setTotalPageNum(Math.ceil(products.totalCount / pageSize));
    } catch (error) {
      console.error("오류: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy, page, pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize]);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <div>
        <div className="allItemsHeaderWrapper">
          <h1 className="sectionTitle">전체 상품</h1>
          <Link to="/additem" className="loginLink button">
            상품 등록하기
          </Link>
        </div>

        <div className="allItemsHeaderWrapper">
          <div className="searchBarWrapper">
            <SearchIcon />
            <input
              className="searchBarInput"
              placeholder="검색할 상품을 입력해 주세요"
            />
          </div>
          <DropdownList onSortSelection={handleSortSelection} />
        </div>

        <div className="allItemsCardSection">
          {itemList?.map((item) => (
            <ItemCard item={item} key={`market-item-${item.id}`} />
          ))}
        </div>

        <div className="paginationBarWrapper">
          <PaginationBar
            totalPageNum={totalPageNum}
            activePageNum={page}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
}

export default AllItemsSection;