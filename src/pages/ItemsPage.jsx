import { useEffect, useState } from "react";

// Api
import { getProducts } from "../libs/api/product";

// Components
import ItemsLayout from "../components/items/ItemsLayout";
import Items from "../components/items/Items";
import ItemPagination from "../components/items/ItemPagination";

export default function ItemsPage() {
  const [loading, setLoading] = useState(false);
  const [bestProductsData, setBestProductsData] = useState({});
  const [productsData, setProductsData] = useState({});

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);

        const [bestData, recentData] = await Promise.all([
          getProducts(4, "favorite"),
          getProducts(10, "recent"),
        ]);

        setBestProductsData(bestData);
        setProductsData(recentData);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  if (loading) {
    return <div className="min-h-313.5"></div>;
  }

  return (
    <ItemsLayout>
      <Items label="베스트 상품" itemData={bestProductsData} />
      <Items label="전체 상품" itemData={productsData} />
      <ItemPagination />
    </ItemsLayout>
  );
}
