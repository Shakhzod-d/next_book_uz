import styled from "@emotion/styled";
import get from "lodash.get";

export const CheckoutContainer = styled("div")`
  .main-page-title {
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }
`;
