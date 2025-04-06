import styled from "@emotion/styled";
import get from "lodash.get";

export const BookMarkListStyled = styled("div")`
  padding-bottom: 80px !important;
  color: ${({ theme }) => get(theme, "palette.text.primary")};
`;
