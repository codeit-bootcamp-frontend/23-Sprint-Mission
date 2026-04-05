import { useEffect, useState } from "react";
import styled from "styled-components";
import getProducts from "../../../api/getProducts";
import ItemCard from "./ItemCard";
import DropdownList from "../../../components/MarketUI/DropdownList";
import PaginationBar from "../../../components/MarketUI/PaginationBar";
import SearchIcon from "../../../assets/icons/ic_search.svg?react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { StyledLink } from "../../../styles/Common";
import { Product, ProductListResponse, ProductSortOption } from "../../../types/productTypes";
import { MarketSectionTitle } from "../MarketStyles";

const AllItemsSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:first-child {
    padding-bottom: 8px;
  }

  &:nth-child(2) {
    padding-bottom: 16px;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  background-color: var(--gray-100);
  border-radius: 12px;
  padding: 9px 16px;
  flex: 1;
  align-items: center;
`;

const SearchBarInput = styled.input`
  border: none;
  flex: 1;
  background-color: inherit;
  margin-left: 4px;

  &::placeholder {
    color: var(--gray-400);
    font-size: 16px;
  }

  &:focus {
    outline: none;
  }
`;

const AddItemLink = styled(StyledLink)``;

const AllItemsCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 8px;

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 40px 24px;
  }
`;

const PaginationBarWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 8px;
`;

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

const AllItemsSection: React.FC = () => {
  const [orderBy, setOrderBy] = useState<ProductSortOption>("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [itemList, setItemList] = useState<Product[]>([]);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSortedData = async ({ orderBy, page, pageSize } : {
    orderBy: ProductSortOption;
    page: number;
    pageSize: number;
  }) => {
    setIsLoading(true);
    try {
      const products: ProductListResponse = await getProducts({ orderBy, page, pageSize });
      setItemList(products.list);
      setTotalPageNum(Math.ceil(products.totalCount / pageSize));
    } catch (error) {
      console.error("오류: ", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortSelection = (sortOption: ProductSortOption) => {
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

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <div>
        <AllItemsSectionHeader>
          <MarketSectionTitle>판매 중인 상품</MarketSectionTitle>
          <AddItemLink to="/additem">상품 등록하기</AddItemLink>
        </AllItemsSectionHeader>

        <AllItemsSectionHeader>
          <SearchBarWrapper>
            <SearchIcon />
            <SearchBarInput placeholder="검색할 상품을 입력해 주세요" />
          </SearchBarWrapper>
          <DropdownList onSortSelection={handleSortSelection} />
        </AllItemsSectionHeader>

        <AllItemsCardSection>
          {itemList?.map((item) => (
            <ItemCard item={item} key={`market-item-${item.id}`} />
          ))}
        </AllItemsCardSection>

        <PaginationBarWrapper>
          <PaginationBar
            totalPageNum={totalPageNum}
            activePageNum={page}
            onPageChange={onPageChange}
          />
        </PaginationBarWrapper>
      </div>
    </>
  );
}

export default AllItemsSection;