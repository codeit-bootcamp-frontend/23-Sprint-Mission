import { useState } from 'react';
import styled from 'styled-components';
import FormField from '../components/form/FormField';
import InputBox from '../components/form/InputBox';
import TextareaBox from '../components/form/TextareaBox';
import UploadImage from '../components/form/UploadImage';
import Tag from '../components/form/Tag';
import { DEVICE } from '../styles/breakpoints';
import { Inner } from '../styles/layout';
import SubmitButton from '../components/form/SubmitButton';

function AddItem() {
  const [formValues, setFormValues] = useState({
    productName: '',
    description: '',
    price: '',
  });

  const [tags, setTags] = useState([]);

  const handleChangeFormValue = (e) => {
    const { name, value } = e.target;

    if (name === 'price') {
      const onlyNumber = value.replace(/[^0-9]/g, '');

      setFormValues({
        ...formValues,
        [name]: onlyNumber,
      });

      return;
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const isFormValid =
    formValues.productName.trim() !== '' &&
    formValues.description.trim() !== '' &&
    formValues.price.trim() !== '' &&
    tags.length > 0;

  const formattedPrice = formValues.price
    ? Number(formValues.price).toLocaleString()
    : '';

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
          <Form onSubmit={handleSubmit}>
            <FormField label="상품 이미지" id="product-image">
              <UploadImage id="product-image" />
            </FormField>
            <FormField label="상품명" id="product-name">
              <InputBox
                id="product-name"
                placeholder="상품명을 입력해주세요"
                name="productName"
                value={formValues.productName}
                onChange={handleChangeFormValue}
              />
            </FormField>
            <FormField label="상품 소개" id="description">
              <TextareaBox
                id="description"
                placeholder="상품 소개를 입력해주세요"
                name="description"
                value={formValues.description}
                onChange={handleChangeFormValue}
              />
            </FormField>
            <FormField label="판매가격" id="price">
              <InputBox
                id="price"
                placeholder="판매 가격을 입력해주세요"
                name="price"
                value={formattedPrice}
                onChange={handleChangeFormValue}
              />
            </FormField>
            <FormField label="태그" id="tag">
              <Tag tags={tags} setTags={setTags} />
            </FormField>
            <AddItemSubmitButton type="submit" disabled={!isFormValid}>
              등록
            </AddItemSubmitButton>
          </Form>
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
const AddItemSubmitButton = styled(SubmitButton)`
  position: absolute;
  top: -66px;
  right: 0;
`;
const FormContent = styled.div`
  position: relative;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media ${DEVICE.tablet} {
    gap: 24px;
  }
`;
