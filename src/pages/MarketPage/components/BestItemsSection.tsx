import { useEffect, useState } from "react";
import styled from "styled-components";
import getProducts from "../../../api/getProducts";
import ItemCard from "./ItemCard";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Product, ProductListResponse, ProductSortOption } from "../../../types/productTypes";
import { MarketSectionTitle } from "../MarketStyles";

const BestItemsContainer = styled.div`
  padding-top: 17px;
  padding-bottom: 24px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-bottom: 40px;
  }
`;

const BestItemsCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px 8px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile
    return 1;
  } else if (width < 1280) {
    // Tablet
    return 2;
  } else {
    // Desktop
    return 4;
  }
};

const BestItemsSection: React.FC = () => {
  const [itemList, setItemList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [isLoading, setIsLoading] = useState(true);

  const fetchSortedData = async ({ orderBy, pageSize } : {
    orderBy: ProductSortOption;
    pageSize: number;
  }) => {
    setIsLoading(true);
    try {
      const products: ProductListResponse = await getProducts({ orderBy, pageSize });
      setItemList(products.list);
    } catch (error) {
      console.error("오류: ", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy: "favorite", pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <BestItemsContainer>
        <MarketSectionTitle>베스트 상품</MarketSectionTitle>

        <BestItemsCardSection>
          {itemList?.map((item) => (
            <ItemCard item={item} key={`best-item-${item.id}`} />
          ))}
        </BestItemsCardSection>
      </BestItemsContainer>
    </>
  );
}

export default BestItemsSection;