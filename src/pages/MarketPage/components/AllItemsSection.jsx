import { useEffect, useState } from "react";
import { getProducts } from "../../../api/getProducts";
import { Link } from "react-router-dom";
import DropdownList from "../../../components/MarketUI/DropdownList";
import ItemCard from "./ItemCard";
import PaginationBar from "../../../components/MarketUI/PaginationBar";
import SortIcon from "../../../assets/icons/ic_sort.svg?react";
import SearchIcon from "../../../assets/icons/ic_search.svg?react";

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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [totalPageNum, setTotalPageNum] = useState();

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    const fetchSortedData = async () => {
      const products = await getProducts({ orderBy, page, pageSize });
      setItemList(products.list);
      setTotalPageNum(Math.ceil(products.totalCount / pageSize));
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div>
      <div className="allItemsHeaderWrapper">
        <div className="topRow">
          <h1 className="sectionTitle">전체 상품</h1>
          <Link to="/additem" className="registerButton button">
            상품 등록하기
          </Link>
        </div>

        <div className="bottomRow">
          <div className="searchBarWrapper">
            <SearchIcon />
            <input
              className="searchBarInput"
              placeholder="검색할 상품을 입력해 주세요"
            />
          </div>
          <div className="sortButtonWrapper">
            <button
              className="sortDropdownTriggerButton"
              onClick={toggleDropdown}
            >
              <SortIcon />
            </button>
            {isDropdownVisible && (
              <DropdownList onSortSelection={handleSortSelection} />
            )}
          </div>
        </div>
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
  );
}

export default AllItemsSection;