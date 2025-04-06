import styled from "@emotion/styled";
import get from "lodash.get";
import { Button } from "@mui/material";

export const CategoryList = styled("ul")`
  background-color: ${({ theme }) => get(theme, "palette.background.light")};
  border-radius: 8px;
  overflow-y: auto;
  height: 480px;
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #dbdbdb;
  }

  ::-webkit-scrollbar-thumb {
    background: #adadad;
    border-radius: 4px;
  }
`;

export const ChildList = styled("ul")`
  li {
    padding: 12px 16px 8px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const TooltipButton = styled(Button)`
  background-color: transparent;
  transition-duration: 0.2ms;
  padding: 10px 16px 10px !important;
  width: 100%;
  display: block;
  border-radius: 0;
  text-align: start;
  color: ${({ theme }) => get(theme, "palette.text.primary")};
  font-size: 16px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
  &.active,
  &:hover {
    background-color: ${({ theme }) => get(theme, "palette.warning.main")};
    color: ${({ theme }) => get(theme, "palette.warning.contrastText")};
  }
  .MuiTouchRipple-root.css-8je8zh-MuiTouchRipple-root {
    display: none;
  }
`;
