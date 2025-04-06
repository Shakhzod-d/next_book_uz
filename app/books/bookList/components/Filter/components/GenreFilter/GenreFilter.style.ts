import styled from "@emotion/styled";
import get from "lodash.get";

export const FilterTemplateContainer = styled("div")`
  background-color: ${({ theme }) => get(theme, "palette.background.light")};
  border-radius: 8px 8px 0 0;
  border-bottom: 0.5px solid
    ${({ theme }) =>
      (get(theme, "palette.mode", "light") as "light" | "dark") === "dark"
        ? "#fff"
        : "#000"};

  .price-filter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg > path {
      fill: ${({ theme }) =>
        (get(theme, "palette.mode", "light") as "light" | "dark") === "dark"
          ? "#fff"
          : "#000"};
    }
  }

  .all-text {
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }

  span.checkbox {
    svg.MuiSvgIcon-root {
      fill: ${({ theme }) => get(theme, "palette.warning.main")};
      stroke-width: 1px !important;
      border-radius: 4px !important;
      font-size: 1.4rem;
    }
  }
`;

export const TemplateList = styled("ul")`
  height: 340px;
  overflow-y: auto;
  &.language-filter-list {
    height: auto;
  }
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      get(theme, "palette.mode") === "dark" ? "#1F365B" : "#dbdbdb"};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      get(theme, "palette.mode") === "light" ? "#adadad" : "#2B4B80"};
    border-radius: 4px;
  }
  li {
    label {
      user-select: none;
      color: ${({ theme }) => get(theme, "palette.text.main")};
    }
    span.checkbox {
      svg.MuiSvgIcon-root {
        stroke-width: 1px !important;
        fill-opacity: 0.7 !important;
        path {
          stroke-width: 1px !important;
          border-radius: 4px !important;
          rect {
            stroke-width: 1px !important;
          }
        }
      }
    }
  }
`;
