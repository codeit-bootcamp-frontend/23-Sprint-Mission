import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-top: 70px;

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

export const StyledLink = styled(Link)`
  background-color: ${({ theme }) => theme.color.blue.primary};
  color: ${({ theme }) => theme.color.white};
  padding: 11.5px 23px;
  border-radius: ${(props) => (props.$pill ? "999px" : "8px")};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.blue.hover};
  }

  &:focus {
    background-color: ${({ theme }) => theme.color.blue.focus};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.gray[400]};
    cursor: default;
    pointer-events: none;
  }
`;

export const LineDivider = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: var(--gray-200);
  margin: ${(props) => props.$margin || "16px 0"};
`;