import styled from 'styled-components';
import IconSearch from '../../assets/icon/icon-search.png';
import { DEVICE } from '../../styles/breakpoints';
import { Link } from 'react-router-dom';

export default function PrdSearch() {
  return (
    <InputBox>
      <Form action="">
        <Input name="searchBox" placeholder="검색할 상품을 입력해주세요" />
        <Button to="/additem">상품 등록하기</Button>
      </Form>
    </InputBox>
  );
}

const InputBox = styled.div`
  @media ${DEVICE.mobile} {
    flex: 1;
  }
`;
const Form = styled.form`
  display: flex;
  gap: 12px;

  @media ${DEVICE.mobile} {
    width: 100%;
  }
`;
const Input = styled.input`
  width: 325px;
  height: 42px;
  padding: 9px 20px 9px 44px;
  background: var(--gray-100);
  border-radius: 12px;
  font-size: 16px;
  line-height: 1.6;
  color: var(--gray-800);

  background-image: url(${IconSearch});
  background-repeat: no-repeat;
  background-position: 16px center;
  background-size: 24px;

  &::placeholder {
    color: var(--gray-400);
  }

  @media ${DEVICE.tablet} {
    width: 242px;
  }

  @media ${DEVICE.mobile} {
    width: 100%;
  }
`;
const Button = styled(Link)`
  padding: 0 23px;
  background: var(--primary-100);
  color: var(--gray-100);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;

  @media ${DEVICE.mobile} {
    position: absolute;
    right: 0;
    top: -4px;
    height: 42px;
  }
`;
