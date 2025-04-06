import styled from "@emotion/styled";
import get from "lodash.get";

export const SearchInputStyled = styled("div")`
  position: relative;
  input.filter-search-input {
    background: ${({ theme }) => get(theme, "palette.background.info")};
    border-radius: 4px;
    border: none;
    outline: none;
    width: 100%;
    padding: 10px 12px;
    ::placeholder {
      color: ${({ theme }) =>
        get(theme, "palette.mode") == "dark"
          ? "#5B80BD"
          : get(theme, "palette.text.secondary")};
    }
    color: ${({ theme }) =>
      get(theme, "palette.mode") == "dark"
        ? "#5B80BD"
        : get(theme, "palette.text.secondary")};
  }
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    path {
      fill: ${({ theme }) =>
        get(theme, "palette.mode") == "dark"
          ? "#5B80BD"
          : "rgb(152, 152, 152)"};
    }
  }
`;
