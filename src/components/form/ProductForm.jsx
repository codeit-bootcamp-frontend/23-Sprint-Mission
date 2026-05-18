import FormField from './FormField';
import InputBox from './InputBox';
import TextareaBox from './TextareaBox';
import UploadImage from './UploadImage';
import Tag from './Tag';
import SubmitButton from './SubmitButton';
import styled from 'styled-components';
import { DEVICE } from '../../styles/breakpoints';

function ProductForm({
  formValues,
  formattedPrice,
  tags,
  setTags,
  handleChangeFormValue,
  onSubmit,
  isFormValid,
  submitText,
}) {
  return (
    <Form onSubmit={onSubmit}>
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
        {submitText}
      </AddItemSubmitButton>
    </Form>
  );
}

export default ProductForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media ${DEVICE.tablet} {
    gap: 24px;
  }
`;
const AddItemSubmitButton = styled(SubmitButton)`
  position: absolute;
  top: -66px;
  right: 0;
`;
