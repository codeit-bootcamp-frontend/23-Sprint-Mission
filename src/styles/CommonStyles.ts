import styled from "styled-components";

/**
 * 페이지 기본 레이아웃을 감싸는 컨테이너
 * 화면 크기에 따라 padding과 width를 조정
 */
export const Container = styled.div`
  padding: 16px; /* 모바일 기본 여백 */

  /* 태블릿 이상 */
  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 16px 24px;
  }

  /* 데스크탑 이상 */
  @media ${({ theme }) => theme.mediaQuery.desktop} {
    max-width: 1200px; 
    padding: 24px 0;
    margin: 0 auto; 
  }
`;

/**
 * 페이지 상단 제목 스타일
 * 반응형으로 폰트 크기 변경
 */
export const SectionTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 28px;
  }
`;

/**
 * 자주 사용하는 flex 기본 정렬
 * 좌우 배치 + 가운데 정렬
 */
export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/**
 * 공통 버튼 스타일
 * theme 색상 사용
 */
export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.blue.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue.hover};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.blue.active};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray.text};
    cursor: default;
    pointer-events: none;
  }
`;