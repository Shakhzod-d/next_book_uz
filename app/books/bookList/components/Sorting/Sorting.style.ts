import styled from "@emotion/styled";
import { Menu } from "@mui/material";
import get from "lodash.get";

export const SortingStyled = styled("div")<{ isAnchor: boolean }>`
  button.selected-button {
    background-color: ${({ theme }) => get(theme, "palette.background.paper")};
    color: ${({ theme }) => get(theme, "palette.text.info")};
    padding: 10px 16px;
    border: none;
    outline: none;
    border-radius: 4px;

    span.chevron-icon {
      svg {
        transition: all 0.1s linear;
        transform: ${({ isAnchor }) =>
          !isAnchor ? "rotate(180deg)" : "rotate(0)"};
        path {
          stroke: ${({ theme }) => get(theme, "palette.text.info")};
        }
      }
    }
  }
`;

export const MenuStyled = styled(Menu)`
  &.sorting-menu {
    .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded {
      border-radius: 4px;
      background-color: ${({ theme }) =>
        get(theme, "palette.background.light")} !important;

      .sorting-menu-item {
        font-size: 14px;
      }
    }
  }
`;
