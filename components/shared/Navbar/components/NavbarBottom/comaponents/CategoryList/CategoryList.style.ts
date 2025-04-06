import styled from "@emotion/styled";
import get from "lodash.get";

export const CategoryListStyled = styled("div")`
  .genre-name {
    font-size: 17px;
  }
  .genre-list-item {
    transition: all 0.1s linear;
    .chevron-icon {
      svg {
        path {
          fill: ${({ theme }) => get(theme, "palette.text.main")};
        }
      }
    }
  }
  .genre-list-item.active {
    color: ${({ theme }) => get(theme, "palette.active.warning")};
    .chevron-icon {
      transform: rotate(-180deg);
      svg {
        path {
          fill: ${({ theme }) => get(theme, "palette.active.warning")};
        }
      }
    }
  }
`;

export const ChildList = styled("div")`
  border-left: 1px solid ${({ theme }) => get(theme, "palette.text.grey")};
  .child-genre {
    color: ${({ theme }) => get(theme, "palette.text.grey")};
  }
`;
