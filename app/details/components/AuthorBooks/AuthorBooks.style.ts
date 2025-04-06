import styled from "@emotion/styled";
import get from "lodash.get";

export const AuthorBooksStyled = styled("div")`
  .main-page-title {
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }
`;
