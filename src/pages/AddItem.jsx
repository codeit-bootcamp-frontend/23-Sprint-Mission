import styled from 'styled-components';

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
              <FormField>
                <Label>상품 이미지</Label>
                <UploadImage />
              </FormField>
              <FormField>
                <Label>상품명</Label>
                <Input placeholder="상품명을 입력해주세요" />
              </FormField>
              <FormField>
                <Label>상품 소개</Label>
                <Input placeholder="상품 소개를 입력해주세요" />
              </FormField>
              <FormField>
                <Label>판매가격</Label>
                <Input placeholder="판매 가격을 입력해주세요" />
              </FormField>
              <FormField>
                <Label>태그</Label>
                <Input placeholder="태그를 입력해주세요" />
              </FormField>
            </Form>
          </FormContent>
        </Inner>
      </PageWrapper>
    </>
  );
}

export default AddItem;

const PageWrapper = styled.div``;
