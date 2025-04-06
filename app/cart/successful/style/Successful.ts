import styled from "@emotion/styled";
import get from "lodash.get";

export const SuccessfulStyled = styled.div`
  h1 {
    color: ${({ theme }: any) => theme.palette?.text?.secondary};
  }

  h2 {
    color: ${({ theme }: any) => theme.palette?.primary?.main};
  }
`;

export const PayLinkStyled = styled.a`
  font-size: 17px;
  transition: all 0.1s linear;
  color: ${({ theme }) => get(theme, "palette.primary.main")};
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;
