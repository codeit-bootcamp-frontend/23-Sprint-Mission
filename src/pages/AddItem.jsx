import styled from 'styled-components';
import FormField from '../components/form/FormField';
import InputBox from '../components/form/InputBox';
import TextareaBox from '../components/form/TextareaBox';
import UploadImage from '../components/form/UploadImage';

function AddItem() {
  return (
    <PageWrapper>
      <Inner>
        <FormHeader>
          <FormTitle>상품 등록하기</FormTitle>
        </FormHeader>
        <FormContent>
          <Form>
            <FormField label="상품 이미지" id="product-image">
              <UploadImage id="product-image" />
            </FormField>
            <FormField label="상품명" id="product-name">
              <InputBox id="product-name" placeholder="상품명을 입력해주세요" />
            </FormField>
            <FormField label="상품 소개" id="description">
              <TextareaBox
                id="description"
                placeholder="상품 소개를 입력해주세요"
              />
            </FormField>
            <FormField label="판매가격" id="price">
              <InputBox id="price" placeholder="판매 가격을 입력해주세요" />
            </FormField>
            <FormField label="태그" id="tag">
              <InputBox id="tag" placeholder="태그를 입력해주세요" />
            </FormField>
            <SubmitButton type="button">등록</SubmitButton>
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
const Inner = styled.div`
  padding: 0 24px;
  margin: 0 auto;
  max-width: 1248px;
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
const SubmitButton = styled.button`
  position: absolute;
  top: -66px;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  padding: 12px 23px;
  font-size: 16px;
  line-height: 1.6;
  font-weight: 600;
  color: #f3f4f6;
  background: var(--gray-400);
  border-radius: 8px;
`;
const FormContent = styled.div`
  position: relative;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
