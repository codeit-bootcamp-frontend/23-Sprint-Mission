import { useEffect, useState } from "react";
import { getProduct } from "../libs/api/product";
import { useParams } from "react-router";
import ProductMain from "../components/product/ProductMain";
import ProductAsk from "../components/product/ProductAsk";
import ProductComment from "../components/product/ProductComment";
import ProductBack from "../components/product/ProductBack";

export default function ProductPage() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getProduct(productId);
        setProductData(result.data);
      } catch (error) {
        console.error("패치 데이터 오류", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  if (isLoading || !productData) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        loading
      </div>
    );
  }

  return (
    <div className="p-3.75 md:p-6 lg:mx-auto max-w-300 space-y-8">
      <ProductMain productData={productData} />
      <ProductAsk />
      <ProductComment productId={productId} />
      <ProductBack />
    </div>
  );
}
