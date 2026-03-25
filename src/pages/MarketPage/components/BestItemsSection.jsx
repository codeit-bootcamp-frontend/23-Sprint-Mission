import { useEffect, useState } from "react";
import { getProducts } from "../../../api/getProducts";
import ItemCard from "./ItemCard";

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

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    const fetchSortedData = async () => {
      const products = await getProducts({
        orderBy: "favorite",
        pageSize,
      });
      setItemList(products.list);
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <div className="bestItemsContainer">
      <h1 className="sectionTitle">베스트 상품</h1>

      <div className="bestItemsCardSection">
        {itemList?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestItemsSection;