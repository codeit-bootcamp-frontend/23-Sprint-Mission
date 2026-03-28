import styled from "styled-components";

export const Container = styled.div`
  margin-top: 70px;
  padding: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 16px 24px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    max-width: 1200px;
    padding: 24px 0;
    margin: 0 auto;
  }
`;

export const SectionTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.black};

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 28px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ailgn-items: center;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.color.blue[0]};
  color: ${({ theme }) => theme.color.white};
  width: 74px;
  height: 42px;
  border-radius: 8px;
  padding: 11.5px 23px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.blue[1]};
  }

  &:focus {
    background-color: ${({ theme }) => theme.color.blue[2]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.gray[0]};
    cursor: pointer;
    pointer-events: none;
  }
`;