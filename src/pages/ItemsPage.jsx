import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

// Api
import { getProducts } from "../libs/api/product";

// Components
import ItemsLayout from "../components/items/ItemsLayout";
import Items from "../components/items/Items";
import ItemPagination from "../components/items/ItemPagination";

// Utils
import { getPageSizes } from "../libs/utils/pagination";

export default function ItemsPage() {
  const [loading, setLoading] = useState(false);
  const [bestProductsData, setBestProductsData] = useState({});
  const [productsData, setProductsData] = useState({});

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentOrder = searchParams.get("orderBy") || "recent";
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        const { BEST_PAGE_SIZE, ALL_PAGE_SIZE } = getPageSizes();

        const [bestData, recentData] = await Promise.all([
          getProducts(BEST_PAGE_SIZE, "favorite"),
          getProducts(ALL_PAGE_SIZE, currentOrder, currentPage, keyword),
        ]);

        setBestProductsData(bestData);
        setProductsData(recentData);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [currentPage, currentOrder, keyword]);

  const totalCount = productsData.totalCount || 0;
  const { ALL_PAGE_SIZE } = getPageSizes();
  const totalPage = Math.ceil(totalCount / ALL_PAGE_SIZE);

  if (loading) {
    return <div className="min-h-313.5"></div>;
  }

  return (
    <ItemsLayout>
      <Items label="베스트 상품" itemData={bestProductsData} />
      <Items label="전체 상품" itemData={productsData} />
      <ItemPagination currentPage={currentPage} totalPage={totalPage} />
    </ItemsLayout>
  );
}
