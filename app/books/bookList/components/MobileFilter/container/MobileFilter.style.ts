import styled from "@emotion/styled";
import get from "lodash.get";

export const MobileFilterStyled = styled("div")`
  button.mobile-filter-cancel-btn {
    background-color: transparent;
    outline: none;
    border: none;
  }
`;

export const FilterButton = styled("button")`
  border-radius: 4px;
  background-color: ${({ theme }) => get(theme, "palette.primary.light")};
  padding: 6px 16px;
  border: none;
  outline: none;
  color: ${({ theme }) => get(theme, "palette.text.info")};
`;
