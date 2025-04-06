import styled from "@emotion/styled";
import get from "lodash.get";

export const ActionsContainer = styled("div")`
  .limit-text {
    color: ${({ theme }) => get(theme, "palette.text.grey")};
  }
  .grid-icon:hover {
    cursor: pointer;
  }
  .grid-icon.active {
    svg {
      rect:not(:first-of-type) {
        fill: ${({ theme }) => get(theme, "palette.primary.main")};
      }
    }
  }
`;

export const CountButton = styled("button")<{ mode: string }>`
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  transition: all 0.2s linear;
  background: ${({ theme }) => get(theme, "palette.background.paper")};
  color: ${({ theme }) => get(theme, "palette.text.secondary")};
  &.active {
    background: ${({ theme, mode }) =>
      mode === "light"
        ? get(theme, "palette.primary.light")
        : "rgba(16, 127, 228, 0.1)"};
    color: ${({ theme }) => get(theme, "palette.primary.main")};
  }
  &:hover {
    cursor: pointer;
  }
`;
