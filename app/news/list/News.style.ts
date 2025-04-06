import styled from "@emotion/styled";

export const NewsStyled = styled("section")`
  padding-bottom: 100px !important;

  @media screen and (max-width: 600px) {
    padding-bottom: 0;
  }

  color: ${({ theme }: any) => theme.palette?.text?.main};
`;
