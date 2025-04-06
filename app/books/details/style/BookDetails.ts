import styled from "@emotion/styled";

export const AuthorTitleStyled = styled("h1")`
  font-weight: 600;
  font-size: 28px;

  @media screen and (max-width: 900px) {
    font-size: 24px;
  }
  @media screen and (max-width: 600px) {
    font-size: 22px;
    margin-bottom: 12px !important;
  }
`;
