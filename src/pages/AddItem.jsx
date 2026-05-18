import { useNavigate } from 'react-router-dom';
import { createProduct } from '../apis/product/createProduct';
import useProductForm from '../hooks/useProductForm';
import ProductForm from '../components/form/ProductForm';
import styled from 'styled-components';
import { Inner } from '../styles/layout';
import { DEVICE } from '../styles/breakpoints';

function AddItem() {
  const navigate = useNavigate();

  const {
    formValues,
    formattedPrice,
    tags,
    setTags,
    handleChangeFormValue,
    isFormValid,
  } = useProductForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      images: [],
      tags,
      price: Number(formValues.price),
      description: formValues.description,
      name: formValues.productName,
    };

    try {
      const createdProduct = await createProduct(productData);

      alert('상품이 등록되었습니다.');
      navigate(`/items/${createdProduct.id}`);
    } catch (error) {
      console.error('상품 등록 실패', error);
    }
  };

  return (
    <PageWrapper>
      <Inner>
        <FormHeader>
          <FormTitle>상품 등록하기</FormTitle>
        </FormHeader>
        <FormContent>
          <ProductForm
            formValues={formValues}
            formattedPrice={formattedPrice}
            tags={tags}
            setTags={setTags}
            handleChangeFormValue={handleChangeFormValue}
            onSubmit={handleSubmit}
            submitText="등록"
            isFormValid={isFormValid}
          />
        </FormContent>
      </Inner>
    </PageWrapper>
  );
}

export default AddItem;

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
