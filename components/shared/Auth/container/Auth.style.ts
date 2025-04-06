import styled from "@emotion/styled";
import get from "lodash.get";

export const AuthStyled = styled("div")`
  background-color: ${({ theme }) => get(theme, "palette.background.info")};
  input {
    background-color: transparent !important;
  }
`;
