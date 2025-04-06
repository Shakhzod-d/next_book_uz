import styled from "@emotion/styled";
import { Tabs } from "@mui/material";
import get from "lodash.get";

export const TabsStyled = styled(Tabs)`
  button.tab-item {
    background-color: ${({ theme }) => get(theme, "palette.warning.light")};
    color: ${({ theme }) => get(theme, "palette.text.primary")};
    padding: 14px 20px;
    border-radius: 8px;
    @media screen and (max-width: 600px) {
      margin-right: 12px !important;
      min-height: 32px;
    }
  }
  button.tab-item.Mui-selected {
    background-color: ${({ theme }) => get(theme, "palette.warning.main")};
    color: ${({ theme }) => get(theme, "palette.warning.contrastText")};
  }
  span.MuiTabs-indicator {
    display: none;
  }
`;

export const CollectionSkeletonList = styled("div")`
  .collection-skeleton-list-item {
    border-radius: 8px;
  }
`;
