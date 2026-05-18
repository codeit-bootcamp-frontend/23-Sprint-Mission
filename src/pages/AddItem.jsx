import { Inner } from '../styles/layout';
import useProductForm from '../hooks/useProductForm';
import ProductForm from '../components/form/ProductForm';
import styled from 'styled-components';
import { DEVICE } from '../styles/breakpoints';

function AddItem() {
  const {
    formValues,
    formattedPrice,
    tags,
    setTags,
    handleChangeFormValue,
    isFormValid,
  } = useProductForm();

  const handleSubmit = (e) => {
    e.preventDefault();
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
