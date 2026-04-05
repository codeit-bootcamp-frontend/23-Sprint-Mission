import styled from "styled-components";
import { Container, LineDivider, StyledLink } from "../../styles/Common";
import getProductDetail from "../../api/getProductDetail";
import BackIcon from "../../assets/icons/ic_back.svg?react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import ItemProfileSection from "./components/ItemProfileSection";

import { Product } from "../../types/productTypes";
import ItemCommentSection from "./components/ItemCommentSection";

const BackLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
`;

const ItemPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { productId } = useParams();

  const productIdNumber = Number(productId);

  useEffect(() => {
    async function fetchProduct() {
      if (!productIdNumber) {
        setError("상품 아이디가 제공되지 않았습니다.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data: Product = await getProductDetail(productIdNumber);
        if (!data) {
          throw new Error("해당 상품의 데이터를 찾을 수 없습니다.");
        }
        setProduct(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [productIdNumber]);

  if (error) {
    alert(`오류: ${error}`);
  }

  if (!productId || !product) return null;

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <Container>
        <ItemProfileSection product={product} />

        <LineDivider />

        <ItemCommentSection productId={productIdNumber} />

        <BackLink $pill to="/items">
          목록으로 돌아가기
          <BackIcon />
        </BackLink>
      </Container>
    </>
  )
}

export default ItemPage;