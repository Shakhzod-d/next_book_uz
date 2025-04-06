import styled from "@emotion/styled";
import { Pagination } from "@mui/material";
import get from "lodash.get";

export const MuiPagination = styled(Pagination)`
  &.MuiPagination-root {
    ul.MuiPagination-ul {
      li:not(:first-of-type, :last-child) {
        button.MuiButtonBase-root.MuiPaginationItem-root {
          padding: 16px;
          border-radius: 8px;
          @media screen and (max-width: 600px) {
            padding: 8px 10px;
            font-size: 13px;
            margin: 1px;
          }
          &.Mui-selected,
          &:hover {
            background-color: ${({ theme }) =>
              get(theme, "palette.mode") === "light"
                ? get(theme, "palette.primary.light")
                : "rgba(16, 127, 228, 0.1)"};
            color: ${({ theme }) => get(theme, "palette.primary.main")};
          }
        }
      }
    }
  }
`;
