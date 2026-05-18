import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../apis/product/getProductDetail';
import useProductForm from '../../hooks/useProductForm';
import ProductForm from '../../components/form/ProductForm';
import styled from 'styled-components';
import { Inner } from '../../styles/layout';

function EditItem() {
  const { productId } = useParams();

  const {
    formValues,
    setFormValues,
    formattedPrice,
    tags,
    setTags,
    handleChangeFormValue,
    isFormValid,
  } = useProductForm();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productData = await getProductDetail(productId);

        setFormValues({
          productName: productData.name,
          description: productData.description,
          price: String(productData.price),
        });

        setTags(productData.tags);
      } catch (error) {
        console.error('상품 정보 불러오기 실패', error);
      }
    };

    fetchProductDetail();
  }, [productId, setFormValues, setTags]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <PageWrapper>
      <Inner>
        <FormHeader>
          <FormTitle>상품 수정하기{productId}</FormTitle>
        </FormHeader>
        <FormContent>
          <ProductForm
            formValues={formValues}
            formattedPrice={formattedPrice}
            tags={tags}
            setTags={setTags}
            handleChangeFormValue={handleChangeFormValue}
            onSubmit={handleSubmit}
            submitText="수정 완료"
            isFormValid={isFormValid}
          />
        </FormContent>
      </Inner>
    </PageWrapper>
  );
}

export default EditItem;

const PageWrapper = styled.div`
  padding: 24px 0 70px;
`;
const FormHeader = styled.div`
  margin-bottom: 30px;
`;
const FormTitle = styled.h2`
  font-size: 20px;
  line-height: 1.6;
  font-weight: 700;
  color: var(--gray-800);
`;
const FormContent = styled.div`
  position: relative;
`;
