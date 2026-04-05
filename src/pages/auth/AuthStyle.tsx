import styled from "styled-components";

export const AuthContainer = styled.main`
  padding: 24px 16px;
  max-width: 432px;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    max-width: 640px;
    padding: 48px 0;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    padding: 60px 0;
  }
`;

export const LogoHomeLink = styled.a`
  display: block;
  margin-bottom: 24px;
  text-align: center;

  img {
    width: 198px;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      width: 396px;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-bottom: 40px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AuthSwitch = styled.div`
  font-weight: 500;
  font-size: 15px;
  text-align: center;

  a {
    color: #3182F6;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const SubmitButton = styled.button`
  background-color: var(--blue);
  color: #fff;
  padding: 14.5px 33.5px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #1967D6;
  }

  &:focus {
    background-color: #1251AA;
  }

  &:disabled {
    background-color: #9CA3AF;
    cursor: pointer;
  }
`