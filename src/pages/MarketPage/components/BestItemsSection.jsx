import { useEffect, useState } from "react";
import getProducts from "../../../api/getProducts";
import ItemCard from "./ItemCard";
import LoadingSpinner from "../../../components/LoadingSpinner";

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

function BestItemsSection() {
  const [itemList, setItemList] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [isLoading, setIsLoading] = useState(true);

  const fetchSortedData = async ({ orderBy, pageSize }) => {
    setIsLoading(true);
    try {
      const products = await getProducts({ orderBy, pageSize });
      setItemList(products.list);
    } catch (error) {
      console.error("오류: ", error.message);
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

      <div className="bestItemsContainer">
        <h1 className="sectionTitle">베스트 상품</h1>

        <div className="bestItemsCardSection">
          {itemList?.map((item) => (
            <ItemCard item={item} key={`best-item-${item.id}`} />
          ))}
        </div>
      </div>
    </>
  );
}

export default BestItemsSection;