import styled from "@emotion/styled";
import get from "lodash.get";

export const CategoryButton = styled("button")`
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  outline: none;
  background: ${({ theme }) => get(theme, "palette.primary.light")};
  border-radius: 4px;
  font-weight: 500;
  color: ${({ theme }) => get(theme, "palette.text.info")};

  svg {
    path {
      fill: ${({ theme }) => get(theme, "palette.text.info")};
    }
  }
`;
