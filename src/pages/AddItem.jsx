import styled from 'styled-components';
import FormField from '../components/form/FormField';
import InputBox from '../components/form/InputBox';
import TextareaBox from '../components/form/TextareaBox';

function AddItem() {
  return (
    <>
      <PageWrapper>
        <Inner>
          <FormHeader>
            <FormTitle>상품 등록하기</FormTitle>
            <SubmitButton>등록</SubmitButton>
          </FormHeader>
          <FormContent>
            <Form>
              <FormField label="상품 이미지">{/* <UploadImage /> */}</FormField>
              <FormField label="상품명">
                <InputBox placeholder="상품명을 입력해주세요" />
              </FormField>
              <FormField label="상품 소개">
                <TextareaBox placeholder="상품 소개를 입력해주세요" />
              </FormField>
              <FormField label="판매가격">
                <InputBox placeholder="판매 가격을 입력해주세요" />
              </FormField>
              <FormField label="태그">
                <InputBox placeholder="태그를 입력해주세요" />
              </FormField>
            </Form>
          </FormContent>
        </Inner>
      </PageWrapper>
    </>
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
const FormHeader = styled.div``;
const FormTitle = styled.div``;
const SubmitButton = styled.div``;
const FormContent = styled.div``;
const Form = styled.form``;
